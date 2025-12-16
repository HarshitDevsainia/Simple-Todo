"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white">
      {/* ================= NAVBAR ================= */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-6">
        {/* Logo + Heading */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-black text-black flex items-center justify-center font-bold">
            <img src="logo.png" alt="logo" />
          </div>
          <h1 className="text-xl font-semibold tracking-wide">SimpleTodo</h1>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-4 items-center">
          {status === "loading" ? null : session ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm px-4 py-2 rounded-lg hover:bg-white/10 transition"
              >
                Dashboard
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm px-4 py-2 rounded-lg bg-red-500/90 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm px-4 py-2 rounded-lg hover:bg-white/10 transition"
              >
                Login
              </Link>

              <Link
                href="/dashboard"
                className="text-sm px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-zinc-200 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-28 text-center">
        <span className="inline-block mb-6 px-4 py-1 rounded-full text-sm bg-white/10 text-white/80">
          🔐 Secure • Fast • Minimal
        </span>

        <h2 className="text-5xl md:text-6xl font-bold leading-tight">
          Organize your tasks.
          <br />
          <span className="text-zinc-400">Focus on what matters.</span>
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-zinc-400">
          SimpleTodo helps you manage daily tasks with authentication, cloud
          storage, and a distraction-free experience.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          {session ? (
            <Link
              href="/dashboard"
              className="px-8 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="px-8 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition"
              >
                Start for Free
              </Link>

              <Link
                href="/login"
                className="px-8 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h3 className="text-3xl font-bold text-center mb-14">
            Why SimpleTodo?
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            <Feature
              title="🔐 Secure Authentication"
              desc="Modern authentication with protected routes and encrypted credentials."
            />
            <Feature
              title="⚡ Fast & Reliable"
              desc="Powered by Next.js and MongoDB for high performance and scalability."
            />
            <Feature
              title="🧘 Minimal & Clean UI"
              desc="Glassmorphic design that keeps focus on productivity, not clutter."
            />
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center py-8 text-sm text-zinc-400">
        © 2025 SimpleTodo. Built with ❤️ using Next.js <br />
        Developed by Harshit Soni
      </footer>
    </main>
  );
}

/* ================= FEATURE CARD ================= */

type FeatureProps = {
  title: string;
  desc: string;
};

function Feature({ title, desc }: FeatureProps) {
  return (
    <div
      className="
        rounded-2xl p-6 
        bg-white/10 backdrop-blur-lg 
        border border-white/20 
        shadow-lg
        hover:bg-white/15 hover:border-white/30
        transition
      "
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-3 text-white/70">{desc}</p>
    </div>
  );
}
