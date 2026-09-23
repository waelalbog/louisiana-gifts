"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

export default function ProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      // حماية الصفحة
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin");
        return;
      }

      // جلب المنتجات
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading products:", error);
      } else {
        setProducts(data ?? []);
      }

      setLoading(false);
    };

    loadPage();
  }, [router]);
const handleDelete = async (product: Product) => {
  const confirmed = window.confirm(
    `هل أنت متأكد من حذف "${product.name_ar}"؟`
  );

  if (!confirmed) return;

  // حذف المنتج من قاعدة البيانات
  const { error: deleteError } = await supabase
    .from("products")
    .delete()
    .eq("id", product.id);

  if (deleteError) {
    console.error("Error deleting product:", deleteError);
    alert("حدث خطأ أثناء حذف المنتج");
    return;
  }

  // حذف الصورة من Storage
  try {
    const marker = "/product-images/";

    if (product.image_url.includes(marker)) {
      const encodedPath = product.image_url.split(marker)[1];
      const imagePath = decodeURIComponent(encodedPath);

      const { error: storageError } = await supabase.storage
        .from("product-images")
        .remove([imagePath]);

      if (storageError) {
        console.error("Error deleting image:", storageError);
      }
    }
  } catch (error) {
    console.error("Error processing image path:", error);
  }

  // حذف المنتج من الشاشة مباشرة
  setProducts((current) =>
    current.filter((item) => item.id !== product.id)
  );
};
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf7f4]">
        <p className="text-[#7a6d66]">جاري تحميل المنتجات...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf7f4] px-5 py-10" dir="rtl">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-xs tracking-[0.25em] text-[#b28a63]">
              LOUISIANA
            </p>

            <h1 className="text-3xl font-semibold text-[#2b211d]">
              إدارة المنتجات
            </h1>

            <p className="mt-2 text-sm text-[#7a6d66]">
              إضافة وتعديل وحذف منتجات المتجر
            </p>
          </div>

          <button
            onClick={() => router.push("/admin/dashboard")}
            className="rounded-xl border border-[#d9ccc4] bg-white px-5 py-3 text-sm text-[#2b211d] transition hover:bg-[#f5efeb]"
          >
            العودة للوحة الإدارة
          </button>
        </div>

        {/* Add Product */}
        <div className="mb-8">
          <button
  onClick={() => router.push("/admin/products/new")}
  className="rounded-xl bg-[#2b211d] px-6 py-3 text-white transition hover:opacity-90"
>
  + إضافة منتج جديد
</button>
        </div>

        {/* Products */}
        {products.length === 0 ? (
          <div className="rounded-3xl border border-[#eadfd7] bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto max-w-md">
              <h2 className="text-xl font-semibold text-[#2b211d]">
                لا توجد منتجات بعد
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#7a6d66]">
                أول منتج تضيفه من لوحة الإدارة سيظهر هنا، وبعدها سنعرضه
                تلقائيًا في الموقع.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-3xl border border-[#eadfd7] bg-white shadow-sm"
              >
                <div className="aspect-[4/3] bg-[#f5efeb]">
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name_ar}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                <div className="p-5">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-semibold text-[#2b211d]">
                        {product.name_ar}
                      </h2>

                      <p className="mt-1 text-sm text-[#7a6d66]">
                        {product.name_en}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        product.is_active
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {product.is_active ? "ظاهر" : "مخفي"}
                    </span>
                  </div>

                  <p className="text-xs text-[#b28a63]">
                    {product.category}
                  </p>

                  <div className="mt-5 flex gap-2">
                    <button
  onClick={() => router.push(`/admin/products/${product.id}/edit`)}
  className="flex-1 rounded-xl border border-[#d9ccc4] px-4 py-2 text-sm text-[#2b211d] transition hover:bg-[#f5efeb]"
>
  تعديل
</button>

                    <button
  onClick={() => handleDelete(product)}
  className="flex-1 rounded-xl border border-red-200 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50"
>
  حذف
</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}