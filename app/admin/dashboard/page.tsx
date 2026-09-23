"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin");
        return;
      }

      setEmail(user.email ?? "");
      setLoading(false);
    };

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin");
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#faf7f4]">
        <p className="text-[#7a6d66]">جاري التحميل...</p>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-[#faf7f4] px-6 py-10"
      dir="rtl"
    >
      <div className="mx-auto max-w-6xl">

        <header className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-xs tracking-[0.25em] text-[#b28a63]">
              LOUISIANA
            </p>

            <h1 className="text-3xl font-semibold text-[#2b211d]">
              لوحة الإدارة
            </h1>

            <p className="mt-2 text-sm text-[#7a6d66]">
              {email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-[#d9ccc4] bg-white px-5 py-3 text-sm text-[#2b211d] transition hover:bg-[#f5efeb]"
          >
            تسجيل الخروج
          </button>
        </header>

        <section>
          <div className="rounded-3xl border border-[#eadfd7] bg-white p-8 shadow-sm">

            <p className="mb-2 text-sm text-[#b28a63]">
              إدارة المتجر
            </p>

            <h2 className="text-2xl font-semibold text-[#2b211d]">
              المنتجات والصور
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#7a6d66]">
              من هنا يمكنك إضافة المنتجات والصور وتعديلها وحذفها
              بدون الحاجة إلى تعديل كود الموقع.
            </p>

            <div className="mt-8">
              <button
              onClick={() => router.push("/admin/products")}

                className="rounded-xl bg-[#2b211d] px-6 py-3 text-white transition hover:opacity-90"
              >
                إدارة المنتجات
              </button>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}