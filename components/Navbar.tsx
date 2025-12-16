import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <h1 className="font-bold text-xl">EduFlow AI</h1>
      <div className="space-x-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/courses">Courses</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}
