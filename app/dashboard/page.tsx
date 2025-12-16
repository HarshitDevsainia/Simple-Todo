"use client";
import { useEffect, useState } from "react";
import { FaPlus, FaCheck, FaTimes, FaTrash, FaEdit } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineTaskAlt } from "react-icons/md";
import { useRouter } from "next/navigation";
import { HiSparkles } from "react-icons/hi2";

interface Todo {
  _id: string;
  title: string;
  status: "todo" | "done";
  createdAt: string;
}

function TodoSkeleton() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl
      bg-gradient-to-br from-white/10 to-white/5
      backdrop-blur-xl border border-white/15
      p-5 flex items-center gap-4
      animate-pulse"
    >
      {/* left accent */}
      <div className="absolute left-0 top-0 h-full w-1 bg-white/20" />

      {/* checkbox */}
      <div className="w-6 h-6 rounded-full bg-white/20" />

      {/* text */}
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 bg-white/20 rounded" />
        <div className="h-3 w-1/3 bg-white/10 rounded" />
      </div>
    </div>
  );
}

export default function TodoGlassUI() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState("");

  // modal states
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "done" | "todo">("all");
  const [aiLoading, setAiLoading] = useState(false);

  const router = useRouter();

  async function load() {
    setLoading(true);
    const res = await fetch("/api/todos", { credentials: "include" });
    if (!res.ok) return;
    setTodos(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function saveTask() {
    if (!title.trim()) return;

    const method = editId ? "PUT" : "POST";
    const body = editId ? { id: editId, title } : { title, status: "todo" };

    await fetch("/api/todos", {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setTitle("");
    setEditId(null);
    setOpen(false);
    load();
  }

  async function toggle(todo: Todo) {
    const newStatus = todo.status === "done" ? "todo" : "done";

    // smooth optimistic update
    setTodos((prev) =>
      prev.map((t) => (t._id === todo._id ? { ...t, status: newStatus } : t))
    );

    await fetch("/api/todos", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: todo._id, status: newStatus }),
    });
  }

  async function remove(id: string) {
    setTodos((prev) => prev.filter((t) => t._id !== id));

    await fetch("/api/todos", {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  }

  async function generateSubtasks() {
    if (!title.trim()) return;

    setAiLoading(true);

    const res = await fetch("/api/ai/breakdown", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    const data = await res.json();
    console.log(data.tasks); // array of subtasks

    if (data.tasks.length != 0) setTitle(data.tasks[0]);
    setAiLoading(false);
  }

  const filtered = todos.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());

    if (filter === "all") return matchesSearch;
    return matchesSearch && t.status === filter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white p-8">
      {/* Header */}
      {/* Header */}
      <div className="w-full mx-auto flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-10">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Back button */}
          <button
            onClick={() => router.push("/")}
            className="group p-3 rounded-xl bg-white/10 backdrop-blur
                 border border-white/20 hover:bg-white/20
                 transition-all duration-300"
          >
            <FaArrowLeft className="text-white group-hover:-translate-x-1 transition" />
          </button>

          {/* Logo + title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-black text-black flex items-center justify-center font-bold">
              <img src="logo.png" alt="logo" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">SimpleTodo</h1>
              <p className="text-xs text-white/50">
                Stay focused. Get things done.
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-3 w-full lg:w-auto lg:flex-row lg:items-center">
          <input
            placeholder="Search tasks..."
            className="w-full lg:w-64 px-4 py-2 rounded-xl bg-white/10 backdrop-blur
             border border-white/20 focus:ring-2
             focus:ring-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div
            className="flex items-center gap-2
  bg-white/10 backdrop-blur
  border border-white/20 rounded-xl p-1
  overflow-x-auto"
          >
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition
    ${
      filter === "all"
        ? "bg-white text-black"
        : "text-white/70 hover:text-white"
    }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("todo")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition
    ${
      filter === "todo"
        ? "bg-blue-500 text-white"
        : "text-white/70 hover:text-white"
    }`}
            >
              Pending
            </button>

            <button
              onClick={() => setFilter("done")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition
    ${
      filter === "done"
        ? "bg-emerald-500 text-white"
        : "text-white/70 hover:text-white"
    }`}
            >
              Completed
            </button>
          </div>

          <button
            onClick={() => {
              setEditId(null);
              setTitle("");
              setOpen(true);
            }}
            className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 px-5 py-2
             rounded-xl flex items-center justify-center gap-2
             font-semibold transition"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      {/* List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {loading &&
          Array.from({ length: 5 }).map((_, i) => <TodoSkeleton key={i} />)}

        {!loading &&
          filtered.map((todo) => (
            <div
              key={todo._id}
              className="group relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-white/10 to-white/5
        backdrop-blur-xl border border-white/15
        p-5 flex items-center gap-4
        shadow-[0_10px_30px_rgba(0,0,0,0.35)]
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.55)]
        transition-all duration-300"
            >
              {/* left accent */}
              <div
                className={`absolute left-0 top-0 h-full w-1
      ${todo.status === "done" ? "bg-emerald-400" : "bg-blue-500"}`}
              />

              {/* checkbox */}
              <button
                onClick={() => toggle(todo)}
                className={`relative w-6 h-6 rounded-full flex items-center justify-center
      border transition-all duration-300
      ${
        todo.status === "done"
          ? "bg-emerald-500 border-emerald-400 scale-110"
          : "border-white/40 hover:border-white"
      }`}
              >
                {todo.status === "done" && (
                  <FaCheck size={12} className="animate-scaleIn" />
                )}
              </button>

              {/* content */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-lg font-medium tracking-wide ${
                    todo.status === "done"
                      ? "line-through text-white/40"
                      : "text-white"
                  }`}
                >
                  {todo.title}
                </p>

                <span className="text-xs text-white/50">
                  {new Date(todo.createdAt).toLocaleString()}
                </span>
              </div>

              {/* actions */}
              <div
                className="flex gap-3 opacity-0 translate-x-4
               group-hover:opacity-100 group-hover:translate-x-0
               transition-all duration-300"
              >
                <button
                  onClick={() => {
                    setEditId(todo._id);
                    setTitle(todo.title);
                    setOpen(true);
                  }}
                  className="text-blue-400 hover:text-blue-300"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => remove(todo._id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-white/40 mt-10">No tasks found</p>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 mx-4 sm:mx-0 bg-black/70 backdrop-blur flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-800 border border-white/20 rounded-2xl w-full max-w-md p-6 animate-fadeIn">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">
                {editId ? "Edit Task" : "New Task"}
              </h2>
              <button onClick={() => setOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <input
              placeholder="Task title"
              className="w-full px-4 py-2 mb-6 rounded-lg bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <button
              onClick={saveTask}
              disabled={aiLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition"
            >
              {editId ? "Update Task" : "Add Task"}
            </button>
            <button
              onClick={generateSubtasks}
              disabled={aiLoading}
              className="
    flex items-center justify-center gap-2 mt-2 w-full
    px-4 py-2 rounded-xl
    bg-gradient-to-r from-purple-600/30 to-indigo-600/30
    border border-purple-500/40
    text-purple-100 font-medium
    hover:from-purple-600/40 hover:to-indigo-600/40
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-300
  "
            >
              <HiSparkles className="text-lg" />
              <span>{aiLoading ? "Thinking..." : "AI Assist"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
