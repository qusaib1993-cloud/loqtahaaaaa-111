import React, { useState, useEffect } from "react";
import { Clock, TrendingUp, Sparkles, ChevronRight, CornerDownRight, Gift } from "lucide-react";
import { PRICE_ORIGINAL_JOD, PRICE_SPECIAL_JOD, BENEFIT_ITEMS } from "../data";

interface OfferSectionProps {
  onCtaclick: () => void;
}

export default function OfferSection({ onCtaclick }: OfferSectionProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 48, seconds: 32 });
  const [slotsLeft, setSlotsLeft] = useState(9);

  // Dynamic countdown timer targeting a rolling 2-hour window securely stored in session or ticking dynamically
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset countdown Urgency securely
          return { hours: 2, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Soft random mock slots deduction for conversion boost (between 5 and 9)
  useEffect(() => {
    const slotInterval = setInterval(() => {
      setSlotsLeft((prev) => (prev > 4 ? prev - 1 : 9));
    }, 45000);

    return () => clearInterval(slotInterval);
  }, []);

  const discountPercent = Math.round(((PRICE_ORIGINAL_JOD - PRICE_SPECIAL_JOD) / PRICE_ORIGINAL_JOD) * 100);

  return (
    <section id="exclusive-offer" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0D0D0D] via-[#0A0A0A] to-[#121212] relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Irresistible Direct Offer Box */}
        <div className="relative bg-[#111] text-[#F5F2ED] rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-white/5">
          {/* Subtle gold luxury background mesh glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(229,211,179,0.06),transparent_60%)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Portion of Offer Box: Pricing and Counter (Takes 7 columns) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
              <div className="inline-flex items-center gap-x-2 bg-white/5 text-[#E5D3B3] px-3.5 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-all text-xs uppercase tracking-widest font-sans font-semibold">
                <Gift className="w-4 h-4 text-[#E5D3B3]" />
                <span>عرض الإطلاق الخاص والمعدود</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-medium leading-[1.12]">
                فخامة الأتيليه بمبلغ{" "}
                <span className="text-[#E5D3B3] underline decoration-dashed decoration-1 underline-offset-8">
                  ١٧ ديناراً فقط
                </span>
              </h2>
              
              <p className="font-serif italic text-lg text-[#E5D3B3]/90">
                شامل التوصيل المجني لباب بيتكِ بدلاً من السعر الأصلي ٢٥ دينار
              </p>

              <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed font-light max-w-xl text-right">
                لفترة محدودة للغاية، نلغي جميع الهوامش المرتفعة لمصممي العبايات. احصلي على عباية كريب الحرير الياباني الفاخرة، والمخيطة خصيصاً لتناسب طولكِ ووزنكِ، بمبلغ <strong>١٧ دينار شامل التوصيل بالكامل</strong>. بدون دفع مسبق، ومع حق المعاينة والفحص الكامل عند الاستلام قبل دفع قرش واحد.
              </p>

              {/* Scarcity depletion badge and live countdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 shrink-0">
                
                {/* Visual Countdown boxes */}
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col justify-center items-center sm:items-start gap-y-2">
                  <div className="flex items-center gap-x-2 text-xs text-gray-400 uppercase tracking-widest font-mono">
                    <Clock className="w-4 h-4 text-[#E5D3B3]" />
                    <span>ينتهي عرض التوفير خلال:</span>
                  </div>
                  
                  <div className="flex items-baseline gap-x-1">
                    <span className="text-2xl font-mono font-medium tracking-tight text-[#F5F2ED]">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="text-gray-500 font-mono text-xs mr-1 ml-2">ساعة</span>
                    <span className="text-2xl font-mono font-medium tracking-tight text-[#F5F2ED]">
                      :
                    </span>
                    <span className="text-2xl font-mono font-medium tracking-tight text-[#F5F2ED]">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="text-gray-500 font-mono text-xs mr-1 ml-2">دقيقة</span>
                    <span className="text-2xl font-mono font-medium tracking-tight text-[#F5F2ED]">
                      :
                    </span>
                    <span className="text-2xl font-mono font-medium tracking-tight text-red-500 animate-pulse">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                    <span className="text-gray-500 font-mono text-xs mr-1 ml-2">ثانية</span>
                  </div>
                </div>

                {/* Slots depletion tracker */}
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col justify-center items-center sm:items-start gap-y-2">
                  <div className="flex items-center gap-x-2 text-xs text-gray-400 uppercase tracking-widest font-mono">
                    <TrendingUp className="w-4 h-4 text-red-400" />
                    <span>المقاعد الشاغرة للحياكة اليوم:</span>
                  </div>
                  <div>
                    <span className="text-2xl font-sans font-bold text-[#F5F2ED]">{slotsLeft}</span>
                    <span className="text-gray-400 font-sans text-xs mr-1.5">طلبات تفصيل متبقية لليوم فقط</span>
                  </div>
                  {/* Small capacity bar gold-sand indicator */}
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 to-[#E5D3B3] rounded-full transition-all duration-[1000ms]"
                      style={{ width: `${(slotsLeft / 15) * 100}%` }}
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Right Portion: Summary Card and Action Link (Takes 5 columns) */}
            <div className="lg:col-span-5 bg-[#171717] p-6 sm:p-8 rounded-2xl border border-white/5 space-y-6 text-right">
              <div className="space-y-4">
                <h4 className="font-serif text-lg text-white font-medium border-b border-white/5 pb-2">تفاصيل فاتورة التفصيل</h4>
                
                <div className="space-y-2.5 text-xs text-gray-300 font-sans font-light">
                  <div className="flex justify-between">
                    <span>حياكة عباية كريب الحرير الفاخرة</span>
                    <span className="line-through text-gray-400">٢٥ دينار</span>
                  </div>
                  <div className="flex justify-between items-center text-[#E5D3B3] font-medium">
                    <span>أخذ القياسات الفردية وتصميم البترون أونلاين</span>
                    <span>مجاناً بالكامل</span>
                  </div>
                  <div className="flex justify-between items-center text-[#E5D3B3] font-medium">
                    <span>التعبئة والعلبة المخملية الفخمة كهدية</span>
                    <span>مجاناً بالكامل</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3 text-[#E5D3B3] font-medium">
                    <span>توصيل سريع مجاني بجميع محافظات الأردن</span>
                    <span>مجاناً بالكامل</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="font-medium text-[#F5F2ED] text-sm">الإجمالي المطلوب كاش عند الاستلام:</span>
                    <span className="text-2xl font-serif text-[#E5D3B3] font-bold">١٧ دينار أردني</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#111] p-3.5 rounded-xl border border-white/5 text-center text-[10px] text-[#E5D3B3] uppercase tracking-widest font-mono font-medium">
                <span>وفرتِ اليوم ٨ دنانير (خصم ٣٢٪ من السعر الأصلي)</span>
              </div>

              <button
                id="offer-cta-button"
                onClick={onCtaclick}
                className="w-full py-4 bg-[#E5D3B3] hover:bg-white text-[#0A0A0A] font-sans font-bold rounded-xl text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-md flex items-center justify-center gap-x-2 cursor-pointer"
              >
                <span>احصلي على العرض وفصلي عبايتكِ الآن</span>
                <ChevronRight className="w-4 h-4 shrink-0 text-[#0A0A0A] rotate-180" />
              </button>
            </div>

          </div>
        </div>

        {/* Organized Handcrafted benefits in elegant cards (Bento Row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          {BENEFIT_ITEMS.map((benefit, idx) => (
            <div
              key={idx}
              className="group bg-[#111111] rounded-2xl p-6 sm:p-8 border border-gray-800/60 transition-all duration-300 hover:shadow-2xl relative overflow-hidden hover:border-[#E5D3B3]/25"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1A1A1A] group-hover:bg-[#E5D3B3] transition-colors duration-400" />
              <div className="space-y-3.5">
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <span className="font-serif text-lg font-medium text-[#F5F2ED] group-hover:text-[#E5D3B3] transition-colors duration-200">
                    {benefit.title}
                  </span>
                  <span className="font-serif text-base italic text-[#E5D3B3]/95">
                    {benefit.arabicTitle}
                  </span>
                </div>
                <div className="h-[1px] bg-[#1C1C1C] w-16" />
                <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
                  {benefit.description}
                </p>
                <p className="font-serif italic text-xs sm:text-sm text-[#E5D3B3]/80 leading-relaxed">
                  {benefit.arabicDescription}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
