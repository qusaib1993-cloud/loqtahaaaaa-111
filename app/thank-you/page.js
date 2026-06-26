"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Truck, PhoneCall, Home, ShoppingBag, Instagram, ArrowRight, Gift, Ruler, Weight, Sparkles } from "lucide-react";

// محتوى صفحة الشكر الذي يقرأ الرابط ويتابع التحويلات
function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const gov = searchParams.get("gov") || "";
  const governorate = searchParams.get("governorate") || "";
  const address = searchParams.get("address") || "";
  const quantity = searchParams.get("quantity") || "1";
  const total = searchParams.get("total") || "28";
  const color = searchParams.get("color") || "";
  const color2 = searchParams.get("color2") || "";
  const height = searchParams.get("height") || "";
  const weight = searchParams.get("weight") || "";

  useEffect(() => {
    // إرسال حدث الشراء (Purchase) إلى فيسبوك بيكسل لغايات تتبع وقياس الإعلانات بدقة
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Purchase", {
        value: parseFloat(total) || 28,
        currency: "JOD",
        content_name: "عباية لقطة كوليكشن",
        content_category: "Abayas",
        num_items: parseInt(quantity) || 1,
      });
      console.log("Meta Pixel Purchase Event Tracked Successfully:", total, "JOD");
    }
  }, [total, quantity]);

  return (
    <div className="max-w-xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center">
        {/* أيقونة نجاح متحركة */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 mb-5 animate-bounce">
          <CheckCircle2 size={56} />
        </div>
        
        <h1 className="font-display text-2xl sm:text-3.5xl font-bold text-royal">
          تم استلام طلبكِ بنجاح يا {name || "عزيزتنا"}! 🎉
        </h1>
        <p className="text-earth text-sm sm:text-base mt-2 max-w-md mx-auto leading-relaxed">
          شكراً لثقتكِ بـ <span className="font-bold text-royal">لقطة كوليكشن</span>. عبايتكِ الفخمة قيد التفصيل والتحضير الآن لتناسب قياسكِ تماماً.
        </p>
      </div>

      {/* تفاصيل الطلب لإعطاء شعور بالاحترافية وضمان دقة القياس */}
      <div className="mt-8 bg-cream border border-gold/20 rounded-3xl p-6 shadow-soft space-y-4">
        <h2 className="font-display text-lg font-bold text-royal border-b border-gold/15 pb-2 flex items-center gap-2">
          <ShoppingBag size={18} className="text-gold" /> ملخص الطلب الخاص بكِ
        </h2>

        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
          <div>
            <p className="text-earth/70 text-xs">الاسم</p>
            <p className="font-bold text-royal">{name || "-"}</p>
          </div>
          <div>
            <p className="text-earth/70 text-xs">المحافظة والعنوان</p>
            <p className="font-bold text-royal">{(gov || governorate) || "-"} - {address || "-"}</p>
          </div>
          <div>
            <p className="text-earth/70 text-xs">الكمية المطلوبة</p>
            <p className="font-bold text-royal">{quantity === "2" ? "قطعتين (عرض التوفير)" : "قطعة واحدة"}</p>
          </div>
          <div>
            <p className="text-earth/70 text-xs">خيارات الألوان</p>
            <p className="font-bold text-royal">
              {color} {color2 ? ` & ${color2}` : ""}
            </p>
          </div>
          <div>
            <p className="text-earth/70 text-xs">الطول والوزن لتعديل القياس</p>
            <p className="font-bold text-royal flex items-center gap-1.5">
              <Sparkles size={13} className="text-gold" /> {height} سم · {weight} كغ
            </p>
          </div>
          <div>
            <p className="text-earth/70 text-xs">المجموع الكلي مع التوصيل</p>
            <p className="font-display text-lg font-extrabold gold-text">{total} دينار</p>
          </div>
        </div>

        {/* حوافز إضافية لضمان ثبات الطلب وعدم الإلغاء */}
        <div className="bg-sand/60 rounded-2xl p-4 mt-2 space-y-2 text-xs text-earth">
          <div className="flex items-center gap-2 text-royal font-bold">
            <Gift size={15} className="text-gold" /> الشال والحزام هدية مجانية!
          </div>
          <p>تم إرفاق شال فاخر وحزام أنيق مجاناً مع طلبكِ بدون أي تكلفة إضافية.</p>
        </div>
      </div>

      {/* قسم تتبع خطة التوصيل وتأكيد الطلب */}
      <div className="mt-6 bg-royal text-cream rounded-3xl p-6 shadow-soft space-y-4">
        <h3 className="font-display text-md font-bold text-goldLight flex items-center gap-2">
          <Truck size={18} /> خطوتنا التالية للتسليم السريع
        </h3>
        
        <ul className="space-y-3 text-xs sm:text-sm text-cream/85">
          <li className="flex gap-2.5 items-start">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gold text-royalDark font-bold text-xs shrink-0 mt-0.5">1</span>
            <div>
              <p className="font-bold text-cream">التفصيل الفوري</p>
              <p className="text-cream/70 text-xs">نقوم بتفصيل العباية وتعديل طولها بناءً على طولكِ ووزنكِ المسجلين في طلبكِ بدقة.</p>
            </div>
          </li>
          <li className="flex gap-2.5 items-start">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gold text-royalDark font-bold text-xs shrink-0 mt-0.5">2</span>
            <div>
              <p className="font-bold text-cream">الاتصال الهاتفي للتأكيد</p>
              <p className="text-cream/70 text-xs flex items-center gap-1">
                <PhoneCall size={12} className="text-goldLight" /> يرجى إبقاء الهاتف قريباً؛ سيتصل بكِ فريق خدمة العملاء للتأكيد.
              </p>
            </div>
          </li>
          <li className="flex gap-2.5 items-start">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gold text-royalDark font-bold text-xs shrink-0 mt-0.5">3</span>
            <div>
              <p className="font-bold text-cream">التوصيل المجاني لباب بيتكِ</p>
              <p className="text-cream/70 text-xs">خلال يومين إلى ثلاثة أيام، سيتواصل معكِ المندوب لتسليم الطلب والدفع نقداً عند الاستلام.</p>
            </div>
          </li>
        </ul>
      </div>

      {/* زر الواتساب لإرسال ملخص الطلب يدوياً لسرعة التجهيز */}
      <div className="mt-8">
        <a
          href={`https://wa.me/962775347250?text=${encodeURIComponent(
            `طلب جديد - لقطة كوليكشن\n━━━━━━━━━━━━━━\n👤 الاسم: ${name}\n📍 المحافظة: ${(gov || governorate) || '-'}\n🏠 العنوان: ${address || '-'}\n📦 الكمية: ${quantity}\n🎨 اللون: ${color || 'غير محدد'}${color2 ? ` & ${color2}` : ''}\n📏 الطول: ${height || '-'} سم\n⚖️ الوزن: ${weight || '-'} كغ\n💰 المجموع: ${total} دينار\n━━━━━━━━━━━━━━`
          )}`}
          target="_blank"
          rel="noreferrer"
          className="w-full inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-2xl transition text-base active:scale-95 shadow-lg shadow-emerald-600/20 animate-pulse hover:animate-none"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.003-2.637-1.03-5.115-2.909-6.995-1.878-1.88-4.357-2.914-6.999-2.914-5.443 0-9.869 4.424-9.873 9.869-.001 1.648.43 3.254 1.248 4.667l-.98 3.57 3.66-.96c1.37.747 2.876 1.14 4.413 1.142zm9.648-6.602c-.272-.137-1.61-.795-1.86-.885-.25-.09-.432-.136-.613.137-.182.273-.705.885-.863 1.068-.158.182-.317.205-.59.069-.272-.137-1.15-.424-2.19-1.354-.808-.722-1.353-1.615-1.512-1.888-.158-.272-.017-.42.12-.556.123-.122.272-.318.408-.477.137-.16.182-.273.272-.455.09-.182.046-.341-.023-.478-.068-.137-.613-1.477-.84-2.023-.22-.53-.442-.457-.613-.466-.159-.008-.34-.01-.522-.01s-.477.068-.727.341c-.25.273-.954.932-.954 2.273s.977 2.636 1.114 2.818c.137.182 1.922 2.934 4.66 4.113 2.738 1.179 2.738.786 3.284.731.546-.054 1.61-.659 1.838-1.296.227-.636.227-1.182.159-1.296-.068-.114-.25-.205-.523-.341z" />
          </svg>
          تأكيد وإرسال تفاصيل الطلب عبر واتساب
        </a>
      </div>

      {/* أزرار الإجراءات */}
      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-cream text-royal font-bold py-3.5 px-6 rounded-2xl border border-gold/30 hover:bg-gold/10 transition text-sm active:scale-95"
        >
          <ArrowRight size={16} /> العودة للرئيسية
        </Link>
        <a
          href="https://www.instagram.com/loqta.jo"
          target="_blank"
          rel="noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3.5 px-6 rounded-2xl hover:opacity-90 transition text-sm active:scale-95 shadow-md"
        >
          <Instagram size={16} /> تواصل معنا على انستغرام
        </a>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-sand/30 py-8 sm:py-12">
      <div className="max-w-xl mx-auto text-center mb-6">
        <div className="relative w-14 h-14 mx-auto rounded-full overflow-hidden ring-2 ring-gold/40">
          <Image src="/media/logo.jpeg" alt="لقطة كوليكشن" fill className="object-cover" />
        </div>
        <p className="font-display font-bold text-royal mt-2 text-xs tracking-widest">L O Q T A</p>
      </div>

      <Suspense fallback={
        <div className="max-w-xl mx-auto px-4 py-12 text-center text-royal font-bold">
          جاري تحميل تفاصيل الطلب...
        </div>
      }>
        <ThankYouContent />
      </Suspense>
    </main>
  );
}
