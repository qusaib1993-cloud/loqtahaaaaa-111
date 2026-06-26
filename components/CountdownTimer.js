"use client";
import { useState, useEffect } from "react";
import { Sparkles, Timer } from "lucide-react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let targetTime = localStorage.getItem("loqta_offer_end");
    
    if (!targetTime) {
      const tomorrow = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem("loqta_offer_end", tomorrow.toString());
      targetTime = tomorrow;
    } else {
      targetTime = parseInt(targetTime, 10);
      // If it already passed, reset it for realism
      if (Date.now() > targetTime) {
        const tomorrow = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem("loqta_offer_end", tomorrow.toString());
        targetTime = tomorrow;
      }
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        // Reset for the next 24 hours if expires
        const tomorrow = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem("loqta_offer_end", tomorrow.toString());
        setTimeLeft({ hours: 24, minutes: 0, seconds: 0 });
      } else {
        const h = Math.floor(difference / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ hours: h, minutes: m, seconds: s });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full bg-royalDark/40 border border-gold/25 rounded-2xl p-4 text-center mt-6 animate-pulse">
        <span className="text-cream/50 text-sm">جاري تشغيل عداد العرض الفاخر...</span>
      </div>
    );
  }

  const formatNum = (num) => String(num).padStart(2, "0");

  return (
    <div className="w-full bg-royalDark/45 border border-gold/30 rounded-2xl p-4 text-center mt-6 shadow-soft relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 blur-xl rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-royal/10 blur-xl rounded-full -z-10" />
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 mb-3">
        <div className="flex items-center gap-1.5">
          <Timer size={16} className="text-gold animate-pulse" />
          <span className="text-goldLight text-xs font-bold uppercase tracking-wider">
            ينتهي العرض الخاص وتعديل القياس المجاني خلال:
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Sparkles size={12} className="text-gold" />
          <span className="text-goldLight/80 text-[10px] sm:text-xs">سارٍ على كل محافظات الأردن</span>
        </div>
      </div>

      <div className="flex justify-center items-center gap-3" style={{ direction: "ltr" }}>
        {/* الساعات */}
        <div className="flex flex-col items-center">
          <div className="bg-cream/10 border border-gold/15 shadow-inner rounded-xl w-12 h-14 sm:w-14 sm:h-16 flex items-center justify-center">
            <span className="font-display text-2xl sm:text-3xl font-extrabold gold-text">{formatNum(timeLeft.hours)}</span>
          </div>
          <span className="text-[10px] text-cream/70 mt-1 font-bold">ساعة</span>
        </div>

        <span className="text-gold font-bold text-xl mb-5">:</span>

        {/* الدقائق */}
        <div className="flex flex-col items-center">
          <div className="bg-cream/10 border border-gold/15 shadow-inner rounded-xl w-12 h-14 sm:w-14 sm:h-16 flex items-center justify-center">
            <span className="font-display text-2xl sm:text-3xl font-extrabold gold-text">{formatNum(timeLeft.minutes)}</span>
          </div>
          <span className="text-[10px] text-cream/70 mt-1 font-bold">دقيقة</span>
        </div>

        <span className="text-gold font-bold text-xl mb-5">:</span>

        {/* الثواني */}
        <div className="flex flex-col items-center">
          <div className="bg-cream/10 border border-gold/15 shadow-inner rounded-xl w-12 h-14 sm:w-14 sm:h-16 flex items-center justify-center">
            <span className="font-display text-2xl sm:text-3xl font-extrabold gold-text">{formatNum(timeLeft.seconds)}</span>
          </div>
          <span className="text-[10px] text-cream/70 mt-1 font-bold">ثانية</span>
        </div>
      </div>
    </div>
  );
}
