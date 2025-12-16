"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false, // prevents automatic redirect
        email,
        password,
      });

      console.log("res:", res);

      if (res?.error) {
        setError(res.error);
        setLoading(false);
      } else if (res?.ok) {
        router.push("/dashboard"); // manual redirect on success
      } else {
        setError("Login failed. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-center text-gray-500 mt-1">
          Login to your account
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-600 text-center mt-2 font-medium">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/register")}
              className="text-black font-semibold cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>

        <p className="text-xs text-center text-gray-500 mt-6">
          © 2025 SimpleTodo. All rights reserved.
        </p>
      </div>
    </div>
  );
}
