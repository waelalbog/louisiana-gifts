"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewProductPage() {
  const router = useRouter();

  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [category, setCategory] = useState("bouquets");
  
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin");
        return;
      }

      setCheckingAuth(false);
    };

    checkUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      setError("يرجى اختيار صورة للمنتج");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // إنشاء اسم فريد للصورة
      const extension = image.name.split(".").pop()?.toLowerCase();

      if (!extension) {
        throw new Error("صيغة الصورة غير صالحة");
      }

      const fileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
      const filePath = `${category}/${fileName}`;

      // رفع الصورة
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, image, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // الحصول على الرابط العام
      const { data: publicUrlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      // إضافة المنتج إلى قاعدة البيانات
      const { error: insertError } = await supabase
        .from("products")
        .insert({
          name_ar: nameAr.trim(),
          name_en: nameEn.trim(),
          category,
          image_url: imageUrl,
          is_active: true,
          
        });

      if (insertError) {
        // إذا فشل حفظ المنتج نحذف الصورة التي رفعناها
        await supabase.storage
          .from("product-images")
          .remove([filePath]);

        throw insertError;
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "حدث خطأ أثناء إضافة المنتج"
      );

      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf7f4]">
        <p className="text-[#7a6d66]">جاري التحميل...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf7f4] px-5 py-10" dir="rtl">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8 flex items-center justify-between gap-5">
          <div>
            <p className="mb-2 text-xs tracking-[0.25em] text-[#b28a63]">
              LOUISIANA
            </p>

            <h1 className="text-3xl font-semibold text-[#2b211d]">
              إضافة منتج جديد
            </h1>
          </div>

          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="rounded-xl border border-[#d9ccc4] bg-white px-5 py-3 text-sm text-[#2b211d]"
          >
            رجوع
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[#eadfd7] bg-white p-7 shadow-sm md:p-10"
        >
          <div className="space-y-6">

            <div>
              <label className="mb-2 block text-sm text-[#4a3d37]">
                اسم المنتج بالعربي
              </label>

              <input
                type="text"
                required
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                className="w-full rounded-xl border border-[#ded3cc] px-4 py-3 outline-none focus:border-[#b28a63]"
                placeholder="مثال: باقة الورد الوردي"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-[#4a3d37]">
                اسم المنتج بالإنجليزي
              </label>

              <input
                type="text"
                required
                dir="ltr"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                className="w-full rounded-xl border border-[#ded3cc] px-4 py-3 outline-none focus:border-[#b28a63]"
                placeholder="Pink Rose Bouquet"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-[#4a3d37]">
                التصنيف
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-[#ded3cc] bg-white px-4 py-3 outline-none focus:border-[#b28a63]"
              >
                <option value="bouquets">باقات ورد</option>
                <option value="gifts">هدايا</option>
                <option value="occasions">مناسبات</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-[#4a3d37]">
                صورة المنتج
              </label>

              <input
                type="file"
                required
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) =>
                  setImage(e.target.files?.[0] ?? null)
                }
                className="w-full rounded-xl border border-[#ded3cc] bg-white px-4 py-3"
              />

              <p className="mt-2 text-xs text-[#8a7c74]">
                JPG أو PNG أو WEBP — الحد الأقصى 5MB
              </p>
            </div>

      

            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#2b211d] py-4 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "جاري إضافة المنتج..." : "إضافة المنتج"}
            </button>

          </div>
        </form>

      </div>
    </main>
  );
}