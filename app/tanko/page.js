"use client";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Crown, Ruler, Sparkles, MapPin, Gift, Truck, ChevronLeft, ArrowRight } from "lucide-react";

function LoadingState() {
  return (
    <div className="min-h-screen bg-[#fbf7ee] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-royal font-display font-bold">جاري تحميل تفاصيل طلبكِ الملكي...</p>
      </div>
    </div>
  );
}

function ThankYouContent() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "عزيزتنا الزبونة";
  const gov = searchParams.get("gov") || "";
  const address = searchParams.get("address") || "";
  const quantity = Number(searchParams.get("quantity") || 1);
  const total = Number(searchParams.get("total") || 17);
  const color = searchParams.get("color") || "";
  const color2 = searchParams.get("color2") || "";
  const height = searchParams.get("height") || "";
  const weight = searchParams.get("weight") || "";

  // إرسال حدث الشراء الفوري والمباشر لبيكسل ميتا فور تحميل الصفحة بدقة 100%
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      console.log("🎯 Triggering Meta Pixel Purchase event:", { value: total, currency: "JOD" });
      window.fbq("track", "Purchase", {
        value: total,
        currency: "JOD"
      });
    }
  }, [total]);

  return (
    <div className="min-h-screen bg-[#fbf7ee] py-12 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* خلفيات وزخارف ملكية ناعمة */}
      <div className="absolute inset-0 -z-10 opacity-30"
        style={{ backgroundImage: "radial-gradient(circle at 10% 20%, rgba(201,160,78,0.25), transparent 40%), radial-gradient(circle at 90% 80%, rgba(31,61,54,0.15), transparent 40%)" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-soft ring-1 ring-gold/25 relative"
      >
        {/* شريط علوي مزخرف */}
        <div className="h-2 gold-gradient w-full" />

        {/* ترويسة الصفحة الملكية */}
        <div className="bg-gradient-to-b from-royalDark to-royal p-8 text-center text-cream relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4 shadow-gold relative"
          >
            <Crown className="text-royalDark w-8 h-8" />
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-full border border-gold/40"
            />
          </motion.div>

          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl text-balance tracking-tight font-extrabold text-goldLight mb-2 leading-tight">
            مبارك عليكِ الإطلالة الملكية! 👑
          </h1>
          <p className="text-cream/85 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            تم استلام طلبكِ الخاص بنجاح ودخل الآن <span className="font-bold text-goldLight">مرحلة القص والتفصيل اليدوي الخصوصي</span> بذكاء ليلائم تفاصيل قوامكِ تماماً.
          </p>
        </div>

        {/* مراحل إعداد الطلبية */}
        <div className="p-6 bg-[#fcf9f2] border-b border-gold/15">
          <p className="text-center font-bold text-xs text-earth mb-4">مسار معالجة طلبكِ الفوري</p>
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] sm:text-xs">
            <div className="flex flex-col items-center gap-1.5">
              <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold"><Check size={13} /></span>
              <span className="font-bold text-emerald-800">تم حجز طلبكِ</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 relative">
              <span className="w-6 h-6 rounded-full bg-gold text-royalDark flex items-center justify-center font-bold animate-pulse"><Crown size={13} /></span>
              <span className="font-bold text-royalDark">قيد التفصيل اليدوي</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 opacity-40">
              <span className="w-6 h-6 rounded-full bg-royalDark text-cream flex items-center justify-center font-bold text-[10px]">🚗</span>
              <span className="font-bold text-earth">الشحن المجاني والتسليم</span>
            </div>
          </div>
        </div>

        {/* بطاقة تفاصيل القياسات والطلب */}
        <div className="p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 border-b border-gold/10 pb-2">
            <Sparkles className="text-gold w-5 h-5" />
            <h2 className="font-display font-bold text-lg text-royal">ملخص تفصيل الطلبية المعتمد:</h2>
          </div>

          <table className="w-full text-sm text-right border-collapse">
            <tbody>
              <tr className="border-b border-gold/10">
                <td className="py-2.5 font-bold text-[#8a6d4b]">الاسم الكامل:</td>
                <td className="py-2.5 text-royal font-extrabold">{name}</td>
              </tr>
              <tr className="border-b border-gold/10">
                <td className="py-2.5 font-bold text-[#8a6d4b] flex items-center gap-1"><MapPin size={14} /> محافظة الشحن:</td>
                <td className="py-2.5 text-royal">{gov}</td>
              </tr>
              <tr className="border-b border-gold/10">
                <td className="py-2.5 font-bold text-[#8a6d4b]">العنوان بالتفصيل:</td>
                <td className="py-2.5 text-royal text-xs leading-relaxed">{address}</td>
              </tr>
              <tr className="border-b border-gold/10">
                <td className="py-2.5 font-bold text-[#8a6d4b] flex items-center gap-1"><Ruler size={14} /> الطول والوزن:</td>
                <td className="py-2.5 text-royal">
                  <span className="bg-[#f3ebd4] text-royal font-bold px-2 py-0.5 rounded text-xs">{height} سم</span>
                  {" · "}
                  <span className="bg-[#f3ebd4] text-royal font-bold px-2 py-0.5 rounded text-xs">{weight} كغ</span>
                </td>
              </tr>
              <tr className="border-b border-gold/10">
                <td className="py-2.5 font-bold text-[#8a6d4b]">الكمية المحجوزة:</td>
                <td className="py-2.5 text-royal font-bold">
                  {quantity === 2 ? (
                    <span className="text-emerald-800">قطعتين (عرض التوفير الأوفر)</span>
                  ) : (
                    <span>قطعة واحدة</span>
                  )}
                </td>
              </tr>
              <tr className="border-b border-gold/10">
                <td className="py-2.5 font-bold text-[#8a6d4b]">خيارات الألوان:</td>
                <td className="py-2.5 text-royal text-xs leading-relaxed">
                  اللون الأول: {color}
                  {color2 && ` · اللون الثاني: ${color2}`}
                </td>
              </tr>
              <tr className="border-b border-gold/10">
                <td className="py-2.5 font-bold text-[#8a6d4b] flex items-center gap-1"><Gift size={14} /> هدية ترحيبية:</td>
                <td className="py-2.5 text-emerald-800 font-bold">شال وحزام راقي مجاني 🎁</td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-royal text-base">المجموع النهائي عند الاستلام:</td>
                <td className="py-3 text-royal font-extrabold text-xl text-gold-text">{total} دينار أردني</td>
              </tr>
            </tbody>
          </table>

          {/* رسالة الطمأنينة والمصداقية */}
          <div className="bg-[#1f3d36]/5 rounded-2xl p-4 border border-gold/10 space-y-1 text-center">
            <p className="text-xs text-royal font-bold flex items-center justify-center gap-1">
              <Truck size={14} className="text-gold" /> افحصي قبل الدفع لباب البيت!
            </p>
            <p className="text-[11px] text-earth/90 leading-relaxed">
              توصيلنا آمن وسريع جداً. يحق لكِ فحص العباية، لمس الخامة الفاخرة، ومطابقة التفصيل والقياس تماماً مع مندوب التوصيل قبل الدفع له.
            </p>
          </div>
        </div>

        {/* تذييل الصفحة والأزرار */}
        <div className="p-6 bg-cream/30 text-center space-y-3">
          <Link href="/">
            <button className="w-full bg-royal text-cream hover:bg-royalDark font-bold py-3.5 rounded-2xl transition flex items-center justify-center gap-2 text-sm">
              <ArrowRight size={16} /> عودة للموقع الرئيسي
            </button>
          </Link>
          <p className="text-[11px] text-earth">فريق خدمة العملاء متواجد لمساعدتكِ طوال الوقت.</p>
        </div>
      </motion.div>

      {/* شعار الشركة المصغر */}
      <div className="mt-8 text-center text-earth/60 text-xs font-mono">
        L O Q T A &nbsp; C O L L E C T I O N
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ThankYouContent />
    </Suspense>
  );
}
