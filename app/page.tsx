"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const [languageReady, setLanguageReady] = useState(false);

  const isArabic = language === "ar";
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const savedLanguage = localStorage.getItem("louisiana-language");

    if (savedLanguage === "ar" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }

    setLanguageReady(true);
  }, []);

  const changeLanguage = () => {
    const newLanguage = isArabic ? "en" : "ar";
    setLanguage(newLanguage);
    localStorage.setItem("louisiana-language", newLanguage);
  };

  if (!languageReady) {
    return <div className="min-h-screen bg-[#1A0710]" />;
  }

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-[#1A0710] text-white"
    >
      {/* ================= NAVBAR ================= */}
      <header className="relative z-50 border-b border-white/10 bg-[#1A0710]">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-8">
          
          {/* Brand */}
          <a href="#" className="group flex flex-col">
            <span className="font-serif text-3xl tracking-[0.12em] text-[#D6B36A] transition group-hover:text-[#E7C982]">
              LOUISIANA
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.42em] text-white/50">
              Flowers & Gifts
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-9 lg:flex">
            <a
              href="#home"
              className="text-sm text-white/75 transition hover:text-[#D6B36A]"
            >
              {isArabic ? "الرئيسية" : "Home"}
            </a>

            <a
              href="#collections"
              className="text-sm text-white/75 transition hover:text-[#D6B36A]"
            >
              {isArabic ? "تشكيلاتنا" : "Collections"}
            </a>

            <a
              href="#occasions"
              className="text-sm text-white/75 transition hover:text-[#D6B36A]"
            >
              {isArabic ? "المناسبات" : "Occasions"}
            </a>

            <a
              href="#about"
              className="text-sm text-white/75 transition hover:text-[#D6B36A]"
            >
              {isArabic ? "عن لوزيانا" : "About"}
            </a>

            <a
              href="#contact"
              className="text-sm text-white/75 transition hover:text-[#D6B36A]"
            >
              {isArabic ? "تواصل معنا" : "Contact"}
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={changeLanguage}
              className="border border-white/20 px-4 py-2 text-xs font-medium tracking-wider text-white/80 transition hover:border-[#D6B36A] hover:text-[#D6B36A]"
            >
              {isArabic ? "EN" : "عربي"}
            </button>
{/* Mobile Menu Button */}
<button
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  className="flex h-10 w-10 items-center justify-center border border-white/20 text-xl text-white transition hover:border-[#D6B36A] hover:text-[#D6B36A] lg:hidden"
  aria-label="Toggle menu"
>
  {mobileMenuOpen ? "×" : "☰"}
</button>
            <a
              href="https://wa.me/963991603130"
              target="_blank"
              rel="noreferrer"
              className="hidden bg-[#D6B36A] px-5 py-2.5 text-xs font-semibold text-black transition hover:bg-[#E7C982] sm:inline-flex"
            >
              {isArabic ? "اطلب الآن" : "Order Now"}
            </a>
          </div>
        </div>
        {/* Mobile Navigation */}
{mobileMenuOpen && (
  <nav className="border-t border-white/10 bg-[#1A0710] px-6 py-6 lg:hidden">
    <div className="flex flex-col gap-5">
      <a
        href="#home"
        onClick={() => setMobileMenuOpen(false)}
        className="text-sm text-white/75 transition hover:text-[#D6B36A]"
      >
        {isArabic ? "الرئيسية" : "Home"}
      </a>

      <a
        href="#collections"
        onClick={() => setMobileMenuOpen(false)}
        className="text-sm text-white/75 transition hover:text-[#D6B36A]"
      >
        {isArabic ? "تشكيلاتنا" : "Collections"}
      </a>

      <a
        href="#occasions"
        onClick={() => setMobileMenuOpen(false)}
        className="text-sm text-white/75 transition hover:text-[#D6B36A]"
      >
        {isArabic ? "المناسبات" : "Occasions"}
      </a>

      <a
        href="#about"
        onClick={() => setMobileMenuOpen(false)}
        className="text-sm text-white/75 transition hover:text-[#D6B36A]"
      >
        {isArabic ? "عن لوزيانا" : "About"}
      </a>

      <a
        href="#contact"
        onClick={() => setMobileMenuOpen(false)}
        className="text-sm text-white/75 transition hover:text-[#D6B36A]"
      >
        {isArabic ? "تواصل معنا" : "Contact"}
      </a>

      <a
        href="https://wa.me/963991603130"
        target="_blank"
        rel="noreferrer"
        className="mt-2 flex justify-center bg-[#D6B36A] px-5 py-3 text-sm font-semibold text-black"
      >
        {isArabic ? "اطلب الآن" : "Order Now"}
      </a>
    </div>
  </nav>
)}
      </header>

      {/* ================= HERO ================= */}
<section
  id="home"
  className="relative min-h-[calc(100vh-6rem)] overflow-hidden bg-[#1A0710]"
>
  {/* Soft decorative glow */}
  <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#D8A7B1]/10 blur-[140px]" />

  <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[0.9fr_1.1fr]">

    {/* ================= CONTENT ================= */}
    <div className="relative z-20 flex items-center px-6 pb-16 pt-36 sm:px-10 lg:px-16 xl:px-24">

      <div className="max-w-xl">

        {/* Small label */}
        <div className="mb-7 flex items-center gap-4">
          <span className="h-px w-10 bg-[#D6B36A]" />

          <span className="text-[20px] font-medium uppercase tracking-[0.28em] text-[#D6B36A]">
            {isArabic
              ? "ورد · هدايا · مناسبات"
              : "Flowers · Gifts · Occasions"}
          </span>
        </div>

        {/* Brand */}
        <p className="mb-5 font-serif text-xl tracking-[0.3em] text-white/45">
          LOUISIANA
        </p>

        {/* Heading */}
        <h1
          className={`text-white ${
            isArabic
              ? "text-5xl font-medium leading-[1.35] sm:text-6xl lg:text-[64px]"
              : "font-serif text-6xl leading-[1.05] sm:text-7xl"
          }`}
        >
          {isArabic ? (
            <>
              نهدي مشاعرك
              <span className="block text-[#E7B8C3]">
                بأجمل التفاصيل.
              </span>
            </>
          ) : (
            <>
              Beautiful moments,
              <span className="mt-2 block text-[#E7B8C3]">
                beautifully made.
              </span>
            </>
          )}
        </h1>

        {/* Description */}
        <p className="mt-7 max-w-lg text-[15px] leading-8 text-white/55 sm:text-xl">
          {isArabic
            ? "من باقات الورد الأنيقة إلى الهدايا والتنسيقات الخاصة، نصنع في لوزيانا تفاصيل تعبّر عنك وتبقى في الذاكرة."
            : "From elegant flower bouquets to thoughtful gifts and special arrangements, Louisiana creates details made to be remembered."}
        </p>

        {/* Buttons */}
        <div className="mt-9 flex flex-wrap gap-3">

          <a
            href="#collections"
            className="bg-[#D6B36A] px-7 py-4 text-sm font-semibold text-[#0A0A0A] transition duration-300 hover:bg-[#E8CB8B]"
          >
            {isArabic ? "اكتشف تشكيلاتنا" : "Explore Collections"}
          </a>

          <a
            href="https://wa.me/963991603130"
            target="_blank"
            rel="noreferrer"
            className="border border-white/20 px-7 py-4 text-sm text-white transition duration-300 hover:border-[#E7B8C3] hover:bg-[#E7B8C3] hover:text-black"
          >
            {isArabic ? "اطلب عبر واتساب" : "Order via WhatsApp"}
          </a>

        </div>

        {/* Mini info */}
        <div className="mt-12 flex items-center gap-5 border-t border-white/10 pt-6 text-lg text-white/35">

          <span>
            {isArabic ? "تنسيق حسب الطلب" : "Custom Arrangements"}
          </span>

          <span className="h-1 w-1 rounded-full bg-[#D6B36A]" />

          <span>
            {isArabic ? "لكل المناسبات" : "For Every Occasion"}
          </span>

        </div>

      </div>
    </div>


    {/* ================= IMAGE ================= */}
    <div className="relative min-h-[600px] overflow-hidden lg:min-h-screen">

      <Image
        src="/images/louisiana/white-tulips1.jpg"
        alt="Louisiana flower arrangement"
        fill
        priority
        className="object-cover object-[center_110%]"
        sizes="(max-width: 1024px) 100vw, 55vw"
      />

      {/* Dark blend toward text */}
      <div
        className={`absolute inset-0 ${
          isArabic
            ? "bg-gradient-to-l from-transparent via-transparent to-[#0A0A0A]"
            : "bg-gradient-to-r from-transparent via-transparent to-[#0A0A0A]"
        }`}
      />

      {/* Mobile overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-black/20 lg:hidden" />


    </div>

  </div>

  {/* Bottom gold line */}
  <div className="absolute bottom-0 left-0 right-0 z-30 h-px bg-gradient-to-r from-transparent via-[#D6B36A]/50 to-transparent" />
</section>
{/* ================= COLLECTIONS ================= */}
<section
  id="collections"
  className="bg-[#F7F2ED] px-6 py-24 lg:px-8 lg:py-32"
>
  <div className="mx-auto max-w-7xl">

    {/* Section Header */}
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs tracking-[0.35em] text-[#B99045]">
        {isArabic ? "تشكيلات لوزيانا" : "LOUISIANA COLLECTIONS"}
      </p>

      <h2 className="mt-5 text-4xl font-light leading-tight text-[#260812] md:text-5xl">
        {isArabic
          ? "تشكيلات صُممت لكل مناسبة."
          : "Collections made for every occasion."}
      </h2>

      <p className="mt-6 text-sm leading-8 text-[#6F6265] md:text-base">
        {isArabic
          ? "من باقات الورد الأنيقة إلى الهدايا والتنسيقات الخاصة، اختر ما يعبّر عن مناسبتك بأجمل التفاصيل."
          : "From elegant flower bouquets to gifts and custom arrangements, discover details created for every special moment."}
      </p>
    </div>
{/* Collections Grid */}
<div className="mt-16 grid gap-5 md:grid-cols-3 lg:mt-20">
  {[
    {
      image: "/images/louisiana/bouquets.jpg",
      ar: "باقات الورد",
      en: "Flower Bouquets",
      number: "01",
    },
    {
      image: "/images/louisiana/gifts.jpg",
      ar: "الهدايا",
      en: "Gifts",
      number: "02",
    },
    {
      image: "/images/louisiana/occasions.jpg",
      ar: "المناسبات",
      en: "Occasions",
      number: "03",
    },
  ].map((item) => (
    <div
      key={item.number}
      className="group relative h-[520px] overflow-hidden"
    >
      <Image
        src={item.image}
        alt={isArabic ? item.ar : item.en}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#260812]/90 via-[#260812]/10 to-transparent" />

      {/* Number */}
      <span className="absolute left-6 top-6 text-xs tracking-[0.25em] text-white/70">
        {item.number}
      </span>

      {/* Content */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-7 ${
          isArabic ? "text-right" : "text-left"
        }`}
      >
        <p className="mb-3 text-[10px] tracking-[0.3em] text-[#DDB866]">
          LOUISIANA
        </p>

        <div className="flex items-end justify-between gap-4">
          <h3 className="text-3xl font-light text-white">
            {isArabic ? item.ar : item.en}
          </h3>

          <span className="text-2xl text-[#DDB866] transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </div>
  ))}
</div>
  </div>
</section>
{/* ================= OCCASIONS ================= */}
<section
  id="occasions"
  className="bg-[#210711] px-6 py-24 text-white lg:px-8 lg:py-32"
>
  <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">

    {/* Text */}
    <div className={isArabic ? "text-right" : "text-left"}>
      <p className="mb-6 text-xl tracking-[0.3em] text-[#DDB866]">
        {isArabic ? "لكل لحظة حكاية" : "FOR EVERY MOMENT"}
      </p>

      <h2 className="max-w-xl text-4xl font-light leading-[1.35] md:text-5xl lg:text-6xl">
        {isArabic ? (
          <>
            مناسبات تستحق
            <br />
            <span className="text-[#E8B7C3]">أن تبقى في الذاكرة.</span>
          </>
        ) : (
          <>
            Moments worth
            <br />
            <span className="text-[#E8B7C3]">remembering.</span>
          </>
        )}
      </h2>

      <p className="mt-8 max-w-lg text-sm leading-8 text-white/60 md:text-xl">
        {isArabic
          ? "نصنع لكل مناسبة تفاصيلها الخاصة، من تنسيقات الزفاف والتخرج إلى المواليد وأعياد الميلاد."
          : "Thoughtful arrangements for weddings, graduations, newborn celebrations and birthdays — created for moments that matter."}
      </p>
    </div>

    {/* Occasion List */}
    <div className="border-t border-white/15">
      {[
        { number: "01", ar: "حفلات الزفاف", en: "Weddings" },
        { number: "02", ar: "حفلات التخرج", en: "Graduations" },
        { number: "03", ar: "استقبال المواليد", en: "Newborn Celebrations" },
        { number: "04", ar: "أعياد الميلاد", en: "Birthdays" },
      ].map((occasion) => (
        <div
          key={occasion.number}
          className="group flex items-center justify-between border-b border-white/15 py-7 transition-all duration-300 hover:px-3"
        >
          <span className="text-xs tracking-[0.25em] text-[#DDB866]">
            {occasion.number}
          </span>

          <h3 className="text-2xl font-light md:text-3xl">
            {isArabic ? occasion.ar : occasion.en}
          </h3>

          <span className="text-xl text-[#DDB866] transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      ))}
    </div>

  </div>
</section>
{/* ================= ABOUT ================= */}
<section
  id="about"
  className="bg-[#F7F2EC] px-6 py-24 lg:px-8 lg:py-32"
>
  <div className="mx-auto max-w-7xl">

    <div
      className={`grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 ${
        isArabic ? "text-right" : "text-left"
      }`}
    >

      {/* Small title */}
      <div>
        <p className="text-xl tracking-[0.25em] text-[#B88A3B]">
          {isArabic ? "عن لوزيانا" : "ABOUT LOUISIANA"}
        </p>

        <div className="mt-6 h-px w-16 bg-[#B88A3B]" />
      </div>

      {/* Main content */}
      <div>
        <h2 className="max-w-3xl text-4xl font-light leading-[1.5] text-[#2A0813] md:text-5xl">
          {isArabic ? (
            <>
              نصنع التفاصيل التي
              <br />
              <span className="text-[#B76E7D]">
                تجعل اللحظة أكثر جمالًا.
              </span>
            </>
          ) : (
            <>
              We create the details
              <br />
              <span className="text-[#B76E7D]">
                that make moments beautiful.
              </span>
            </>
          )}
        </h2>

        <p className="mt-8 max-w-2xl text-lg leading-9 text-[#2A0813]/65">
          {isArabic
            ? "في لوزيانا، نؤمن أن الهدية ليست مجرد شيء يُقدَّم، بل طريقة للتعبير عن المشاعر. لذلك نهتم بكل تفصيل، من اختيار الزهور وتنسيق الألوان إلى اللمسة الأخيرة التي تجعل كل مناسبة مميزة."
            : "At Louisiana, we believe a gift is more than something you give — it is a way to express how you feel. Every detail is thoughtfully considered, from the flowers and colors to the final touch that makes each occasion special."}
        </p>

        {/* Signature */}
        <div className="mt-12 flex items-center gap-5">
          <span className="h-px w-14 bg-[#B88A3B]" />
          <span className="text-sm tracking-[0.3em] text-[#2A0813]/60">
            LOUISIANA · FLOWERS & GIFTS
          </span>
        </div>
      </div>

    </div>
  </div>
</section>
{/* ================= CONTACT / CTA ================= */}
<section
  id="contact"
  className="bg-[#210711] px-6 py-24 text-white lg:px-8 lg:py-28"
>
  <div className="mx-auto max-w-7xl">

    <div className="border border-white/15 px-8 py-16 md:px-14 lg:px-20 lg:py-20">

      <div
        className={`grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end ${
          isArabic ? "text-right" : "text-left"
        }`}
      >

        {/* Text */}
        <div>
          <p className="mb-6 text-xl tracking-[0.2em] text-[#DDB866]">
            {isArabic ? "اطلب من لوزيانا" : "ORDER FROM LOUISIANA"}
          </p>

          <h2 className="max-w-3xl text-4xl font-light leading-[1.45] md:text-5xl lg:text-6xl">
            {isArabic ? (
              <>
                أخبرنا بالمناسبة،
                <br />
                <span className="text-[#E8B7C3]">
                  ونحن نهتم بالتفاصيل.
                </span>
              </>
            ) : (
              <>
                Tell us the occasion,
                <br />
                <span className="text-[#E8B7C3]">
                  we’ll handle the details.
                </span>
              </>
            )}
          </h2>

          <p className="mt-7 max-w-2xl text-lg leading-9 text-white/65">
            {isArabic
              ? "تواصل معنا لاختيار باقة الورد أو الهدية أو التنسيق المناسب، وسنساعدك في تجهيز طلبك بما يناسب مناسبتك."
              : "Contact us to choose the flowers, gift or arrangement that fits your occasion, and we’ll help prepare every detail."}
          </p>
        </div>

        {/* Action */}
        <div
          className={`flex ${
            isArabic
              ? "lg:justify-start"
              : "lg:justify-end"
          }`}
        >
          <a
            href="https://wa.me/963991603130"
target="_blank"
rel="noreferrer"
            className="inline-flex min-w-[220px] items-center justify-center bg-[#DDB866] px-8 py-5 text-sm font-medium text-[#210711] transition-all duration-300 hover:bg-[#E8C982]"
          >
            {isArabic ? "اطلب عبر واتساب" : "Order via WhatsApp"}
          </a>
        </div>

      </div>

      {/* Bottom line */}
      <div className="mt-16 flex items-center gap-5 border-t border-white/15 pt-7">
        <span className="h-px w-10 bg-[#DDB866]" />
        <span className="text-xs tracking-[0.3em] text-white/45">
          LOUISIANA · FLOWERS & GIFTS
        </span>
      </div>

    </div>
  </div>
</section>
{/* ================= FOOTER ================= */}
<footer className="bg-[#16040B] px-6 text-white lg:px-8">
  <div className="mx-auto max-w-7xl">

    {/* Main Footer */}
    <div className="grid gap-8 border-b border-white/10 py-10 md:grid-cols-2 md:gap-12 md:py-12 lg:grid-cols-3 lg:py-14">
      {/* Brand */}
      <div>
        <h2 className="text-3xl tracking-[0.15em] text-[#DDB866]">
          LOUISIANA
        </h2>

        <p className="mt-2 text-xs tracking-[0.35em] text-white/55">
          FLOWERS & GIFTS
        </p>

        <p className="mt-7 max-w-sm text-base leading-8 text-white/50">
          {isArabic
            ? "ورد، هدايا وتنسيقات نصنعها بعناية لترافق أجمل لحظاتكم."
            : "Flowers, gifts and thoughtful arrangements created for your most beautiful moments."}
        </p>
        <div className="mt-6 flex items-center gap-6">
  <a
    href="https://www.instagram.com/louisiana_100?stkn=NndyYXdpdDYwZzhy"
    target="_blank"
    rel="noreferrer"
    className="text-sm tracking-[0.12em] text-white/55 transition hover:text-[#DDB866]"
  >
    Instagram
  </a>

  <span className="h-3 w-px bg-white/20" />

  <a
    href="https://www.facebook.com/share/1Bxu5xVzsu/"
    target="_blank"
    rel="noreferrer"
    className="text-sm tracking-[0.12em] text-white/55 transition hover:text-[#DDB866]"
  >
    Facebook
  </a>
</div>
      </div>

      {/* Navigation */}
      <div>
        <p className="mb-6 text-sm tracking-[0.2em] text-[#DDB866]">
          {isArabic ? "روابط سريعة" : "QUICK LINKS"}
        </p>

        <div className="flex flex-col gap-4 text-base text-white/65">
          <a href="#" className="transition hover:text-[#DDB866]">
            {isArabic ? "الرئيسية" : "Home"}
          </a>

          <a href="#collections" className="transition hover:text-[#DDB866]">
            {isArabic ? "تشكيلاتنا" : "Collections"}
          </a>

          <a href="#occasions" className="transition hover:text-[#DDB866]">
            {isArabic ? "المناسبات" : "Occasions"}
          </a>

          <a href="#about" className="transition hover:text-[#DDB866]">
            {isArabic ? "عن لوزيانا" : "About"}
          </a>

          <a href="#contact" className="transition hover:text-[#DDB866]">
            {isArabic ? "تواصل معنا" : "Contact"}
          </a>
        </div>
      </div>

      {/* Order */}
      <div>
        <p className="mb-6 text-sm tracking-[0.2em] text-[#DDB866]">
          {isArabic ? "اطلب الآن" : "ORDER NOW"}
        </p>

        <p className="max-w-sm text-base leading-8 text-white/55">
          {isArabic
            ? "للطلب والاستفسار عن التشكيلات والتنسيقات، تواصل معنا مباشرة عبر واتساب."
            : "For orders and inquiries about our flowers, gifts and arrangements, contact us directly via WhatsApp."}
        </p>

        <a
  href="https://wa.me/963991603130"
  target="_blank"
  rel="noreferrer"
  className="mt-7 inline-flex border border-white/20 px-7 py-4 text-sm transition-all duration-300 hover:border-[#DDB866] hover:text-[#DDB866]"
>
          {isArabic ? "تواصل عبر واتساب" : "Contact via WhatsApp"}
        </a>
      </div>

    </div>

    {/* Bottom */}
    <div className="flex flex-col gap-2 py-5 text-xs tracking-[0.15em] text-white/35 md:flex-row md:items-center md:justify-between md:gap-4 md:py-7">
      <p>
        © 2026 LOUISIANA FLOWERS & GIFTS
      </p>

      <p>
        {isArabic ? "جميع الحقوق محفوظة" : "ALL RIGHTS RESERVED"}
      </p>
    </div>

  </div>
</footer>
    </main>
  );
}