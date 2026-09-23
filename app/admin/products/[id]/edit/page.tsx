"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Product = {
  id: number;
  name_ar: string;
  name_en: string;
  category: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();

  const productId = params.id as string;

  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [category, setCategory] = useState("bouquets");
  
  const [isActive, setIsActive] = useState(true);

  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      // التحقق من تسجيل الدخول
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin");
        return;
      }

      setCheckingAuth(false);

      // جلب المنتج
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error || !data) {
        console.error("Error loading product:", error);
        setError("تعذر العثور على المنتج");
        setLoadingProduct(false);
        return;
      }

      const product = data as Product;

      setNameAr(product.name_ar);
      setNameEn(product.name_en);
      setCategory(product.category);
      
      setIsActive(product.is_active);
      setCurrentImageUrl(product.image_url);

      setLoadingProduct(false);
    };

    loadProduct();
  }, [productId, router]);

  const getStoragePath = (url: string) => {
    try {
      const marker = "/product-images/";

      if (!url.includes(marker)) {
        return null;
      }

      const encodedPath = url.split(marker)[1];

      return decodeURIComponent(encodedPath);
    } catch {
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    let newImageUrl = currentImageUrl;
    let newImagePath: string | null = null;

    try {
      // إذا اختار المستخدم صورة جديدة
      if (newImage) {
        const extension = newImage.name
          .split(".")
          .pop()
          ?.toLowerCase();

        if (!extension) {
          throw new Error("صيغة الصورة غير صالحة");
        }

        const fileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
        newImagePath = `${category}/${fileName}`;

        // رفع الصورة الجديدة
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(newImagePath, newImage, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(newImagePath);

        newImageUrl = publicUrlData.publicUrl;
      }

      // تحديث المنتج
      const { error: updateError } = await supabase
        .from("products")
        .update({
          name_ar: nameAr.trim(),
          name_en: nameEn.trim(),
          category,
          image_url: newImageUrl,
          is_active: isActive,
          
        })
        .eq("id", productId);

      if (updateError) {
        // إذا فشل التحديث نحذف الصورة الجديدة
        if (newImagePath) {
          await supabase.storage
            .from("product-images")
            .remove([newImagePath]);
        }

        throw updateError;
      }

      // بعد نجاح التحديث نحذف الصورة القديمة
      if (newImage && currentImageUrl) {
        const oldImagePath = getStoragePath(currentImageUrl);

        if (oldImagePath) {
          const { error: deleteOldImageError } =
            await supabase.storage
              .from("product-images")
              .remove([oldImagePath]);

          if (deleteOldImageError) {
            console.error(
              "Error deleting old image:",
              deleteOldImageError
            );
          }
        }
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "حدث خطأ أثناء تعديل المنتج"
      );

      setSaving(false);
    }
  };

  if (checkingAuth || loadingProduct) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf7f4]">
        <p className="text-[#7a6d66]">
          جاري تحميل المنتج...
        </p>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-[#faf7f4] px-5 py-10"
      dir="rtl"
    >
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-5">
          <div>
            <p className="mb-2 text-xs tracking-[0.25em] text-[#b28a63]">
              LOUISIANA
            </p>

            <h1 className="text-3xl font-semibold text-[#2b211d]">
              تعديل المنتج
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

        {error === "تعذر العثور على المنتج" ? (
          <div className="rounded-3xl border border-[#eadfd7] bg-white p-10 text-center shadow-sm">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[#eadfd7] bg-white p-7 shadow-sm md:p-10"
          >
            <div className="space-y-6">

              {/* Arabic Name */}
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
                />
              </div>

              {/* English Name */}
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
                />
              </div>

              {/* Category */}
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

              {/* Current Image */}
              <div>
                <label className="mb-2 block text-sm text-[#4a3d37]">
                  الصورة الحالية
                </label>

                {currentImageUrl && (
                  <div className="mb-4 overflow-hidden rounded-2xl border border-[#eadfd7]">
                    <img
                      src={currentImageUrl}
                      alt={nameAr}
                      className="h-64 w-full object-cover"
                    />
                  </div>
                )}

                <label className="mb-2 block text-sm text-[#4a3d37]">
                  تغيير الصورة
                </label>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) =>
                    setNewImage(e.target.files?.[0] ?? null)
                  }
                  className="w-full rounded-xl border border-[#ded3cc] bg-white px-4 py-3"
                />

                <p className="mt-2 text-xs text-[#8a7c74]">
                  اترك الحقل فارغًا إذا كنت لا تريد تغيير الصورة.
                </p>
              </div>

              

            
              {/* Visibility */}
              <div className="rounded-xl border border-[#eadfd7] p-4">
                <label className="flex cursor-pointer items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-[#2b211d]">
                      إظهار المنتج في الموقع
                    </p>

                    <p className="mt-1 text-xs text-[#8a7c74]">
                      يمكنك إخفاء المنتج بدون حذفه.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) =>
                      setIsActive(e.target.checked)
                    }
                    className="h-5 w-5"
                  />
                </label>
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-xl bg-[#2b211d] py-4 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "جاري حفظ التعديلات..."
                  : "حفظ التعديلات"}
              </button>

            </div>
          </form>
        )}

      </div>
    </main>
  );
}