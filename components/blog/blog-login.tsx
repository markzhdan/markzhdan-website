"use client";

import { useState } from "react";
import { Heading } from "@/components/heading";
import { fetchBackend } from "@/lib/api";

interface BlogLoginProps {
  onLogin: (token: string) => void;
}

export function BlogLogin({ onLogin }: BlogLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await fetchBackend("/users/login", "POST", { username, password });
      if (data.isAdmin && data.token) {
        onLogin(data.token);
      } else {
        setError("Not authorized.");
      }
    } catch {
      setError("Invalid credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Heading>Admin</Heading>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-b border-black bg-transparent py-1.5 text-sm outline-none placeholder:text-black/30 focus:border-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-b border-black bg-transparent py-1.5 text-sm outline-none placeholder:text-black/30 focus:border-black"
          required
        />
      </div>
      {error && <p className="text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="font-heading text-sm uppercase tracking-widest hover:opacity-60 transition-opacity text-left disabled:opacity-30"
      >
        {loading ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
