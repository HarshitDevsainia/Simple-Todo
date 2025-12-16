import { connectDB } from "@/lib/mongodb";
import Todo from "@/models/Todo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const todos = await Todo.find({ userId: session.user.email }).sort({ createdAt: -1 });
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error("GET todos error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, status = "todo", time } = await req.json();
    if (!title || title.trim() === "") {
      return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    await connectDB();
    const todo = await Todo.create({
      title,
      userId: session.user.email,
      status,
      time,
    });
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error("POST todo error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    await connectDB();
    const deleted = await Todo.findOneAndDelete({ _id: id, userId: session.user.email });
    if (!deleted) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE todo error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id, title, status, time } = await req.json();
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    if (title && title.trim() === "") {
      return NextResponse.json({ message: "Title cannot be empty" }, { status: 400 });
    }

    await connectDB();
    const updateData: any = {};
    if (title) updateData.title = title;
    if (status) updateData.status = status;
    if (time) updateData.time = time;

    const updated = await Todo.findOneAndUpdate(
      { _id: id, userId: session.user.email },
      updateData,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT todo error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
