"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Crown, Ruler, Sparkles, MapPin, Gift, Truck, MessageCircle, ArrowRight } from "lucide-react";

function LoadingState() {
  return (
    <div className="min-h-screen bg-[#fbf7ee] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-royal font-display font-bold">جاري تحميل الفاتورة الملكية...</p>
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
  const totalRaw = searchParams.get("total") || "17";
  const total = parseFloat(totalRaw) || 17;
  const color = searchParams.get("color") || "";
  const color2 = searchParams.get("color2") || "";
  const height = searchParams.get("height") || "";
  const weight = searchParams.get("weight") || "";
  const phone = searchParams.get("phone") || "";

  const [isSent, setIsSent] = useState(false);

  // إرسال حدث الشراء الفوري والمباشر لبيكسل ميتا
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Purchase", {
        value: total,
        currency: "JOD",
        content_name: "عباية لقطة كوليكشن",
        content_type: "product",
        num_items: quantity
      });
    }
  }, [total, quantity]);

  const handleWhatsAppClick = async () => {
    const adminPhone = "962775347250";
    const message = `🔔 *طلب تفصيل جديد - لقطة كوليكشن*
• *الاسم:* ${name}
• *الهاتف:* ${phone}
• *المحافظة:* ${gov}
• *العنوان:* ${address}
• *القياسات:* الوزن: ${weight} كغ / الطول: ${height} سم
• *الكمية:* ${quantity === 2 ? "قطعتين" : "قطعة واحدة"}
• *الألوان:* ${color} ${color2 ? `/ ${color2}` : ""}`;

    const payload = {
      name, phone, gov, address, height, weight, quantity, color, color2, total
    };

    // إرسال الإيميل بنفس التوقيت عبر Formspree
    if (!isSent) {
      try {
        await fetch("https://formspree.io/f/mojoegno", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject: `طلب جديد من ${name} - عبر الواتساب`,
            ...payload,
          }),
        });
        setIsSent(true);
      } catch (err) {
        console.error("فشل إرسال الإيميل:", err);
      }
    }

    // فتح الواتساب
    const waLink = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
    window.open(waLink, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#fbf7ee] py-10 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* زخارف الخلفية */}
      <div className="absolute inset-0 -z-10 opacity-30"
        style={{ backgroundImage: "radial-gradient(circle at 10% 20%, rgba(201,160,78,0.25), transparent 40%), radial-gradient(circle at 90% 80%, rgba(31,61,54,0.15), transparent 40%)" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-soft ring-1 ring-gold/25 relative"
      >
        <div className="h-2 gold-gradient w-full" />

        <div className="bg-gradient-to-b from-[#1a332d] to-[#254940] p-8 text-center text-cream relative">
          <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4 shadow-gold">
            <Crown className="text-[#1a332d] w-8 h-8" />
          </div>

          <h1 className="font-display text-2xl sm:text-3xl tracking-tight font-extrabold text-goldLight mb-2 leading-tight">
            مبارك عليكِ الإطلالة! 👑
          </h1>
          <p className="text-cream/90 text-sm max-w-sm mx-auto">
            تم استلام طلبكِ المبدئي بنجاح يا <span className="font-bold text-goldLight">{name}</span>.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="bg-[#fcf9f2] border border-gold/20 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-gold/15 pb-3 mb-4">
              <h2 className="font-display font-bold text-lg text-royal flex items-center gap-2">
                <Sparkles className="text-gold w-5 h-5" /> ملخص الفاتورة
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-y-3 text-sm text-right">
              <div className="flex justify-between items-center border-b border-gold/5 pb-2">
                <span className="text-[#8a6d4b] font-bold">الاسم:</span>
                <span className="text-royal font-bold">{name}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gold/5 pb-2">
                <span className="text-[#8a6d4b] font-bold flex items-center gap-1"><MapPin size={14} /> العنوان:</span>
                <span className="text-royal text-xs max-w-[160px] truncate">{gov} - {address}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gold/5 pb-2">
                <span className="text-[#8a6d4b] font-bold flex items-center gap-1"><Ruler size={14} /> المقاس:</span>
                <span className="text-royal font-bold">{height} سم · {weight} كغ</span>
              </div>
              <div className="flex justify-between items-center border-b border-gold/5 pb-2">
                <span className="text-[#8a6d4b] font-bold">الألوان:</span>
                <span className="text-royal text-xs">{color} {color2 && ` + ${color2}`}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-royal font-bold text-base">الإجمالي:</span>
                <span className="text-royal font-extrabold text-xl text-gold-text">{total} دينار</span>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-xs text-red-700 font-bold bg-red-50 p-3 rounded-xl border border-red-100">
              ⚠️ مهم: يرجى إرسال الفاتورة عبر الواتساب لتأكيد البدء بالتفصيل ولضمان سرعة التوصيل.
            </p>

            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-[#25D366] hover:bg-[#1ebd5b] text-white font-extrabold text-lg py-4 rounded-2xl shadow-lg active:scale-[0.98] transition flex items-center justify-center gap-2"
            >
              <MessageCircle size={22} />
              تأكيد الطلب عبر الواتساب الآن
            </button>
            
            <p className="text-[11px] text-earth">سيتم تأكيد القياسات فوراً بعد إرسال رسالة الواتساب.</p>
          </div>
        </div>

        <div className="p-4 bg-cream/50 text-center border-t border-gold/10">
          <Link href="/">
            <button className="text-earth hover:text-royal font-bold transition flex items-center justify-center gap-1 text-xs mx-auto">
              <ArrowRight size={14} /> العودة للموقع
            </button>
          </Link>
        </div>
      </motion.div>
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
