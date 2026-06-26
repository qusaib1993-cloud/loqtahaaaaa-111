import React from "react";
import { CheckCircle2, PhoneCall, Ruler, PackageCheck, Calendar, ArrowLeft, Heart, Sparkles, AlertCircle } from "lucide-react";
import { OrderDetails } from "../types";
import { BRAND_NAME, BRAND_NAME_ARABIC, PRICE_SPECIAL_JOD } from "../data";

interface ThankYouPageProps {
  order: OrderDetails | null;
  onBackToHome: () => void;
}

export default function ThankYouPage({ order, onBackToHome }: ThankYouPageProps) {
  // Generate beautiful fallback order if none exists (e.g. if page is deep-linked directly)
  const fallbackOrder: OrderDetails = {
    id: "LOQ-582910",
    name: "Customer (عميلة لوقطة العزيزة)",
    phone: "079XXXXXXX",
    color: "Classic Aswad (Midnight Onyx)",
    height: 162,
    weight: 68,
    notes: "Elegant wide sleeve drape",
    createdAt: new Date().toISOString(),
  };

  const activeOrder = order || fallbackOrder;

  // Real-time Abaya Size Engine
  let abayaSize = 54;
  const h = activeOrder.height;
  if (h < 152) abayaSize = 50;
  else if (h >= 152 && h < 157) abayaSize = 52;
  else if (h >= 157 && h < 162) abayaSize = 54;
  else if (h >= 162 && h < 167) abayaSize = 56;
  else if (h >= 167 && h < 172) abayaSize = 58;
  else abayaSize = 60;

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-gray-300 pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Abstract luxury ambient circles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full pointer-events-none overflow-hidden opacity-30">
        <div className="absolute -top-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#E5D3B3]/5 blur-3xl animate-pulse duration-1000" />
        <div className="absolute top-[30%] right-[10%] w-[300px] h-[300px] rounded-full bg-white/2 blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto space-y-10">
        
        {/* Main Success Greeting Box */}
        <div className="bg-[#111111] rounded-3xl p-8 sm:p-12 border border-[#222] shadow-2xl text-center space-y-6">
          
          {/* Centered Golden Check Success Badge */}
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-[#1c1c1c] border border-green-950/40 relative shadow-inner">
            <CheckCircle2 className="w-8 h-8 text-[#E5D3B3] animate-bounce" />
            <div className="absolute -inset-1 border border-dashed border-[#E5D3B3]/20 rounded-full animate-spin duration-[4000ms] pointer-events-none" />
          </div>

          <div className="space-y-3">
            <span className="text-xxs uppercase tracking-[0.2em] font-mono text-[#E5D3B3] font-bold">
              تأكيد فوري للطلب • كاش عند الاستلام
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#F5F2ED] font-medium tracking-tight">
              شكراً جزيلاً لثقتكِ بنا!
            </h1>
            <p className="font-serif italic text-base sm:text-lg text-[#E5D3B3] mt-1">
              مبارك، تم تسجيل وحجز طلب تفصيل عبايتكِ بنجاح في الأتيليه
            </p>
            <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed font-light max-w-md mx-auto">
              أهلاً بكِ في عائلة علامة {BRAND_NAME}. حجزنا لكِ مقعداً مميزاً لقص القماشة الفاخرة، وهذا ملخص بتفصيل ومقاسات فاتورتكِ:
            </p>
          </div>

          <div className="h-px bg-gray-800 w-24 mx-auto" />

          {/* Luxury Receipt Card layout */}
          <div className="bg-[#181818] rounded-2xl p-6 border border-gray-800 text-right space-y-4">
            <div className="flex justify-between items-center border-b border-gray-850 pb-3 font-mono text-[10px] text-gray-400 uppercase tracking-wider flex-row-reverse">
              <span>رقم الفاتورة: <strong className="text-white font-semibold">{activeOrder.id}</strong></span>
              <span>{new Date(activeOrder.createdAt || "").toLocaleDateString("ar-JO", { month: "short", day: "numeric", year: "numeric" })}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="space-y-1 bg-white/5 p-3 rounded-xl border border-dashed border-gray-800 text-right">
                <span className="block text-[10px] text-gray-400 uppercase tracking-widest leading-none">اسم العميلة</span>
                <span className="text-[#F5F2ED] font-semibold">{activeOrder.name}</span>
              </div>
              
              <div className="space-y-1 bg-white/5 p-3 rounded-xl border border-dashed border-gray-800 text-right col-start-1 sm:col-start-2">
                <span className="block text-[10px] text-gray-400 uppercase tracking-widest leading-none">رقم الهاتف</span>
                <span className="text-[#F5F2ED] font-mono">{activeOrder.phone}</span>
              </div>

              <div className="space-y-1 bg-white/5 p-3 rounded-xl border border-dashed border-gray-800 text-right">
                <span className="block text-[10px] text-gray-400 uppercase tracking-widest leading-none">اللون المختار</span>
                <span className="text-[#F5F2ED] font-medium">{activeOrder.color}</span>
              </div>

              <div className="space-y-1 bg-white/5 p-3 rounded-xl border border-dashed border-gray-800 text-right">
                <span className="block text-[10px] text-gray-400 uppercase tracking-widest leading-none">المقاسات الطول والوزن</span>
                <span className="text-[#F5F2ED] font-medium">الطول: {activeOrder.height} سم • الوزن: {activeOrder.weight} كغم</span>
              </div>
            </div>

            {/* Custom sizing prediction highlighted on receipt */}
            <div className="bg-white/5 p-3 rounded-xl border border-gray-800 flex justify-between items-center flex-row-reverse">
              <div className="flex items-center gap-x-2 text-xs text-gray-300 font-medium font-sans">
                <Ruler className="w-4 h-4 text-[#E5D3B3]" />
                <span>طول العباية الموصى به لقص القماش:</span>
              </div>
              <span className="text-sm font-mono font-bold text-[#E5D3B3] bg-[#111111] px-2.5 py-1 rounded border border-gray-800 shadow-3xs">
                {abayaSize} إنش (بوصة)
              </span>
            </div>

            {activeOrder.notes && (
              <div className="bg-white/5 p-3 rounded-xl border border-gray-800/60 text-xs text-right">
                <span className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-sans">ملاحظات التعديل والتوصيل:</span>
                <p className="text-gray-300 italic">"{activeOrder.notes}"</p>
              </div>
            )}

            <div className="h-px bg-gray-850 w-full" />

            <div className="flex justify-between items-baseline pt-1 flex-row-reverse">
              <span className="text-xs text-gray-400 font-sans uppercase tracking-wider">المبلغ المطلوب عند التوصيل لباب بيتكِ:</span>
              <span className="text-2xl font-serif text-[#E5D3B3] font-bold">١٧ دينار أردني</span>
            </div>
          </div>

          {/* Quick interactive note */}
          <div className="bg-red-950/20 p-4 rounded-xl border border-red-900/30 flex items-start gap-x-3 text-right flex-row-reverse">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-red-400">تحذير: لا يتطلب دفع أي عربون مسبق!</h4>
              <p className="text-xxs sm:text-xs text-red-300 leading-relaxed font-light font-sans text-right">
                لا تقومي بالدفع لأي رابط دفع إلكتروني إطلاقاً. جهزي فقط مبلغ ١٧ دينار كاش لتسليمه للمندوب عند استلام العباية. لكِ كامل الصلاحية والحق في فتح الطرد ولمس القماش وتجربته قبل دفع أي قرش واحد للمندوب.
              </p>
            </div>
          </div>

        </div>

        {/* Clear Step-by-Step Fulfillment Progress Tracker */}
        <div className="bg-[#111111] rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-sm space-y-6">
          <h3 className="font-serif text-lg text-[#F5F2ED] font-medium text-center border-b border-gray-850 pb-3">
            خطوات تفصيل وتوصيل طلبكِ في الأتيليه
          </h3>

          <div className="relative pr-8 space-y-6 sm:space-y-8 before:absolute before:inset-y-2 before:right-3 before:w-0.5 before:bg-gray-800">
            
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -right-[29px] top-1.5 w-4 h-4 rounded-full bg-[#E5D3B3] border-4 border-[#111]" />
              <div className="space-y-1 text-right">
                <div className="flex items-center gap-x-2 text-xs font-sans font-bold text-[#F5F2ED] uppercase tracking-wider justify-end flex-row-reverse">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>الخطوة ١: تدوين المقاسات وحجز التوفير</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-light pr-6">
                  تم إدراج بيانات التفصيل الخاصة بكِ بنجاح في كشف الحياكة الفورية، وتم تثبيت سعر العرض الخاص بكِ (١٧ ديناراً فقط للتفصيل والشحن الشامل).
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -right-[29px] top-1.5 w-4 h-4 rounded-full bg-[#E5D3B3] border-4 border-[#111] animate-pulse" />
              <div className="space-y-1 text-right">
                <div className="flex items-center gap-x-2 text-xs font-sans font-bold text-[#F5F2ED] uppercase tracking-wider justify-end flex-row-reverse">
                  <PhoneCall className="w-4 h-4 text-[#E5D3B3]" />
                  <span>الخطوة ٢: مكالمة خامات الطول والأبعاد لشركائنا</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-light pr-6">
                  سيتواصل معكِ خياط الأتيليه عبر <strong>واتساب أو من خلال اتصال هاتفي مباشر خلال ١٢ إلى ٢٤ ساعة</strong> لتأكيد رغبتك في القص أو أي اتساع إضافي في الأكتاف لضمان مقاس مريح.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -right-[29px] top-1.5 w-4 h-4 rounded-full bg-gray-800 border-4 border-[#111]" />
              <div className="space-y-1 text-right">
                <div className="flex items-center gap-x-2 text-xs font-sans font-bold text-gray-400 uppercase tracking-wider justify-end flex-row-reverse">
                  <Ruler className="w-4 h-4 text-gray-500" />
                  <span>الخطوة ٣: البدء في التفصيل الفردي والقص اليدوي</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-light pr-6">
                  بمجرد تأكيد الطول المعتمد، نبدأ فوراً برسم وحياكة عبايتكِ يدوياً من قماش الكريب الحريري المقاوم للتجعد والغسيل باهتمام تام بالتفاصيل الصغيرة.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="absolute -right-[29px] top-1.5 w-4 h-4 rounded-full bg-gray-800 border-4 border-[#111]" />
              <div className="space-y-1 text-right">
                <div className="flex items-center gap-x-2 text-xs font-sans font-bold text-gray-400 uppercase tracking-wider justify-end flex-row-reverse">
                  <PackageCheck className="w-4 h-4 text-gray-500" />
                  <span>الخطوة ٤: الكي بالبخار والتسليم كاش عند الاستلام</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-light pr-6">
                  يتم كي عبايتكِ بالبخار، وتعطيرها برائحة عود فخمة وراقية، وتعبئتها داخل العلب المخملية الفاخرة، ثم شحنها لباب منزلكِ في غضون ٢ إلى ٣ أيام عمل فقط.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Back navigation option */}
        <div className="text-center pt-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-x-2.5 text-xs text-[#E5D3B3] hover:text-white font-sans font-semibold uppercase tracking-widest border-b border-[#E5D3B3]/20 hover:border-white py-1 pb-1.5 transition-all cursor-pointer flex-row-reverse"
          >
            <ArrowLeft className="w-4 h-4 rotate-180" />
            <span>العودة لمتجر لوقطة الرئيسي</span>
          </button>
        </div>

      </div>
    </main>
  );
}
