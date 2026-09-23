"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#faf7f4] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-white border border-[#eadfd7] rounded-3xl shadow-sm p-8 md:p-10">
          
          <div className="text-center mb-8">
            <p className="text-[#b28a63] tracking-[0.25em] text-xs uppercase mb-3">
              Louisiana
            </p>

            <h1 className="text-3xl font-semibold text-[#2b211d]">
              لوحة الإدارة
            </h1>

            <p className="text-sm text-[#7a6d66] mt-3">
              تسجيل الدخول لإدارة المنتجات والصور
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5" dir="rtl">
            <div>
              <label className="block text-sm text-[#4a3d37] mb-2">
                البريد الإلكتروني
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#ded3cc] px-4 py-3 outline-none focus:border-[#b28a63]"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="block text-sm text-[#4a3d37] mb-2">
                كلمة المرور
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#ded3cc] px-4 py-3 outline-none focus:border-[#b28a63]"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#2b211d] py-3.5 text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}