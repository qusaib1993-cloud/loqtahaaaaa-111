import React, { useState, useEffect } from "react";
import { Ruler, User, Phone, CheckCircle, Package, Truck, Sparkles, ChevronRight, HelpCircle } from "lucide-react";
import { OrderDetails } from "../types";
import { ABAYA_COLORS, PRICE_SPECIAL_JOD } from "../data";

interface OrderFormProps {
  preselectedColor: string;
  onOrderSubmit: (order: OrderDetails) => void;
}

export default function OrderForm({ preselectedColor, onOrderSubmit }: OrderFormProps) {
  const [formData, setFormData] = useState<OrderDetails>({
    name: "",
    phone: "",
    color: preselectedColor,
    height: 160,
    weight: 65,
    notes: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [abayaSize, setAbayaSize] = useState<number>(54);

  // Sync with color clicks from the ColorsSection parent component
  useEffect(() => {
    if (preselectedColor) {
      setFormData((prev) => ({ ...prev, color: preselectedColor }));
    }
  }, [preselectedColor]);

  // Real-time Master Abaya Size Engine
  // Sizing standard represents lengths in inches:
  useEffect(() => {
    const h = formData.height;
    let size = 54;
    if (h < 152) size = 50;
    else if (h >= 152 && h < 157) size = 52;
    else if (h >= 157 && h < 162) size = 54;
    else if (h >= 162 && h < 167) size = 56;
    else if (h >= 167 && h < 172) size = 58;
    else size = 60;

    setAbayaSize(size);
  }, [formData.height]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = "الرجاء إدخال الاسم الكامل للتأكيد";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "يرجى كتابة الاسم الثلاثي بالكامل";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "الرجاء إدخال رقم الهاتف للتواصل";
    } else {
      // Clean up number
      const cleanPhone = formData.phone.trim().replace(/\s+/g, "");
      // Matches Jordan mobile formatting (e.g. 079, 078, 077, or 79, or +962)
      const jordanRegex = /^(07[789]\d{7}|7[789]\d{7}|\+9627[789]\d{7})$/;
      if (!jordanRegex.test(cleanPhone)) {
        newErrors.phone = "يرجى إدخال رقم هاتف أردني صحيح (مثال: 079xxxxxxx)";
      }
    }

    if (!formData.color) {
      newErrors.color = "يرجى اختيار لون العباية المطلوب";
    }

    if (formData.height < 120 || formData.height > 210) {
      newErrors.height = "يجب أن يكون الطول بين ١٢٠ و ٢١٠ سم";
    }

    if (formData.weight < 35 || formData.weight > 160) {
      newErrors.weight = "يجب أن يكون الوزن بين ٣٥ و ١٦٠ كغم";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when typing
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleColorSelect = (colorName: string) => {
    setFormData((prev) => ({ ...prev, color: colorName }));
    if (errors.color) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.color;
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll smoothly to top of form if errors
      const formElement = document.getElementById("cod-order-form");
      formElement?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury API processing, then fire submit event which triggers router transition
    setTimeout(() => {
      setIsSubmitting(false);
      onOrderSubmit({
        ...formData,
        id: `LOQ-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toISOString(),
      });
    }, 1200);
  };

  return (
    <section id="order-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] scroll-mt-6 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        
        {/* Form Title Card */}
        <div id="cod-order-form" className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-x-1 bg-white/5 text-[#E5D3B3] px-3.5 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-widest border border-white/10">
            <Package className="w-3.5 h-3.5 text-[#E5D3B3]" />
            <span>طلب تفصيل آمن - كاش عند الاستلام</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F2ED] font-medium tracking-tight">
            استمارة طلب تفصيل العباية الفورية
          </h2>
          <p className="font-serif italic text-base text-[#E5D3B3] mt-1">
            أدخلي تفاصيلك وسيتم تفصيل العباية وتوصيلها لباب منزلك مجاناً
          </p>
          <div className="h-px bg-[#2A2A2A] w-20 mx-auto mt-4" />
        </div>

        {/* Form Wrapper Container with shadow and luxury glass borders */}
        <div className="bg-[#111111] rounded-3xl p-6 sm:p-10 border border-[#222] shadow-2xl transition-all duration-300 relative text-right">
          
          <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-black via-[#E5D3B3] to-black rounded-t-3xl" />

          {/* Quick Notice */}
          <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-x-3.5">
            <Truck className="w-5 h-5 text-[#E5D3B3] shrink-0" />
            <div className="text-xs text-gray-300 leading-relaxed text-right">
              <strong className="text-[#E5D3B3]">لا يتطلب دفع أي عربون مسبقاً.</strong> ستدفعين بالضبط <strong className="text-[#E5D3B3]">١٧ ديناراً شاملاً التوصيل</strong> لمندوب التوصيل بعد فتح الطرد ومعاينة جودة القماش والقصّ بنفسكِ والتأكد التام.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="name-input" className="block text-xs font-sans uppercase tracking-widest font-semibold text-gray-300 flex justify-between">
                <span>١. الاسم الكامل الثلاثي</span>
                <span className="text-[#E5D3B3] font-normal italic tracking-normal font-serif">حقل مطلوب للتفصيل</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none">
                  <User className="h-4.5 w-4.5 text-[#E5D3B3]" />
                </div>
                <input
                  type="text"
                  id="name-input"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="مثال: منى الفايز"
                  className={`block w-full pr-11 pl-4 py-3.5 bg-[#181818] border rounded-xl text-sm transition-all focus:bg-[#1E1E1E] focus:outline-none focus:ring-1 text-white text-right ${
                    errors.name
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                      : "border-gray-800 focus:border-[#E5D3B3] focus:ring-[#1E1E1E]"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 font-sans text-xs flex items-center gap-1 justify-end">
                  {errors.name}
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                </p>
              )}
            </div>

            {/* Phone Input with Jordan area indicator */}
            <div className="space-y-2">
              <label htmlFor="phone-input" className="block text-xs font-sans uppercase tracking-widest font-semibold text-gray-300 flex justify-between">
                <span>٢. رقم هاتف لتأكيد الطلب والتوصيل</span>
                <span className="text-[#E5D3B3] font-normal italic tracking-normal font-serif">نشط على الواتس</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none">
                  <Phone className="h-4.5 w-4.5 text-[#E5D3B3]" />
                </div>
                {/* Area code decoration */}
                <div className="absolute inset-y-0 right-10 flex items-center pointer-events-none font-sans text-xs text-gray-400 font-medium font-emoji">
                  🇯🇴
                </div>
                <input
                  type="tel"
                  id="phone-input"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="مثال: 079XXXXXXX"
                  className={`block w-full pr-20 pl-4 py-3.5 bg-[#181818] border rounded-xl text-sm transition-all focus:bg-[#1E1E1E] focus:outline-none focus:ring-1 text-white text-right ${
                    errors.phone
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                      : "border-gray-800 focus:border-[#E5D3B3] focus:ring-[#1E1E1E]"
                  }`}
                />
              </div>
              <p className="text-[10px] text-gray-500 font-sans text-right">
                سيتواصل معكِ خياط الأتيليه لتأكيد المقاسات وموعد الشحن قبل قص العباية بدقائق معدودة.
              </p>
              {errors.phone && (
                <p className="text-red-500 font-sans text-xs flex items-center gap-1 justify-end">
                  {errors.phone}
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                </p>
              )}
            </div>

            {/* Custom Interactive Color Choice Radio Swatches */}
            <div className="space-y-3">
              <label className="block text-xs font-sans uppercase tracking-widest font-semibold text-gray-300 flex justify-between">
                <span>٣. درجة لون العباية المطلوب</span>
                <span className="text-[#E5D3B3] font-normal italic tracking-normal font-serif">٤ خيارات ملكية فاخرة</span>
              </label>
              
              <div className="grid grid-cols-2 gap-3 font-sans">
                {ABAYA_COLORS.map((col) => {
                  const isChecked = formData.color === col.name;
                  return (
                    <div
                      key={col.id}
                      onClick={() => handleColorSelect(col.name)}
                      className={`relative flex items-center gap-x-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all duration-300 ${
                        isChecked
                          ? "bg-[#1D1D1D] border-[#E5D3B3] ring-1 ring-[#E5D3B3]"
                          : "bg-[#141414] border-gray-800 hover:border-gray-700"
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-black/10 shadow-inner shrink-0"
                        style={{ backgroundColor: col.hex }}
                      />
                      <div className="flex flex-col text-right leading-tight">
                        <span className="text-xs font-sans font-semibold text-[#F5F2ED]">{col.name.split(" (")[0]}</span>
                        <span className="text-[10px] text-[#E5D3B3] font-serif font-light">{col.arabicName}</span>
                      </div>
                      
                      {isChecked && (
                        <div className="absolute top-2 left-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#E5D3B3]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {errors.color && (
                <p className="text-red-500 font-sans text-xs flex items-center gap-1 justify-end">
                  {errors.color}
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                </p>
              )}
            </div>

            {/* Interactive Height Slider Engine with visual sizing badge */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-baseline flex-row-reverse">
                <label className="block text-xs font-sans uppercase tracking-widest font-semibold text-gray-300">
                  ٤. الطول بالسنتيمتر (لتحديد القياس المناسب)
                </label>
                <span className="text-lg font-mono font-bold text-[#E5D3B3] bg-[#181818] px-3 py-1 rounded-xl border border-gray-800">
                  {formData.height} <span className="text-xs text-gray-400 font-normal font-sans">سم</span>
                </span>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  name="height"
                  min="135"
                  max="195"
                  step="1"
                  value={formData.height}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#E5D3B3] focus:outline-none"
                />
                
                {/* Visual guideline sliders ticks info */}
                <div className="flex justify-between text-[9px] font-mono text-gray-500 pt-1 flex-row-reverse">
                  <span>١٣٥ سم (قياس ٤٨)</span>
                  <span>١٦٠ سم (قياس ٥٤)</span>
                  <span>١٩٥ سم (قياس ٦٠)</span>
                </div>
              </div>
            </div>

            {/* Interactive Weight Slider Box */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-baseline flex-row-reverse">
                <label className="block text-xs font-sans uppercase tracking-widest font-semibold text-gray-300">
                  ٥. الوزن التقريبي بالكيلوغرام (لضبط دقة الخصر والمحيط)
                </label>
                <span className="text-lg font-mono font-bold text-[#E5D3B3] bg-[#181818] px-3 py-1 rounded-xl border border-gray-800">
                  {formData.weight} <span className="text-xs text-gray-400 font-normal font-sans">كغم</span>
                </span>
              </div>

              <div className="relative">
                <input
                  type="range"
                  name="weight"
                  min="40"
                  max="140"
                  step="1"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#E5D3B3] focus:outline-none"
                />

                <div className="flex justify-between text-[9px] font-mono text-gray-500 pt-1 flex-row-reverse">
                  <span>٤٠ كغم (نحيف)</span>
                  <span>٨٥ كغم (متوسط)</span>
                  <span>١٤٠ كغم (ممتلئ)</span>
                </div>
              </div>
            </div>

            {/* Real-time DYNAMIC ADVISOR panel - Highly polished, instills client confidence */}
            <div className="p-4 rounded-xl bg-white/5 border border-gray-800/80 space-y-3">
              <div className="flex items-center gap-x-2 text-xs text-gray-300 font-semibold justify-end flex-row-reverse">
                <Ruler className="w-4.5 h-4.5 text-[#E5D3B3]" />
                <span className="uppercase tracking-wider">تحديد القياس التلقائي الذكي</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#E5D3B3] text-[#0A0A0A] font-mono font-bold animate-pulse">تلقائي</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#151515] p-3 rounded-lg border border-gray-800 shadow-2xs text-right">
                  <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-sans">قياس العباية المتوقع</span>
                  <span className="text-xl font-serif font-bold text-[#E5D3B3]">{abayaSize}</span>
                  <span className="text-xs text-gray-400 block font-light font-medium mt-0.5">الطول الموصى به: {abayaSize} إنش (بوصة)</span>
                </div>
                
                <div className="bg-[#151515] p-3 rounded-lg border border-gray-800 shadow-2xs flex flex-col justify-center text-right">
                  <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-sans">انسيابية وتناسق القماش</span>
                  <span className="text-xs font-sans text-gray-300 font-medium pt-1">
                    {formData.weight < 60 ? "قصة انسيابية ضيقة وناعمة" : formData.weight < 85 ? "قصة كلاسيكية مريحة وأنيقة" : "قصة فضفاضة مريحة جداً"}
                  </span>
                  <span className="text-[10px] text-[#E5D3B3]/80 italic mt-0.5">تعديل يدوي دقيق من خياطي الأتيليه</span>
                </div>
              </div>
            </div>

            {/* Optional Special Tailoring requests / Delivery details */}
            <div className="space-y-2">
              <label htmlFor="notes-area" className="block text-xs font-sans uppercase tracking-widest font-semibold text-gray-300 flex justify-between">
                <span>٦. عنوان التوصيل وأي طلبات تعديل خاصة بالتفصيل</span>
                <span className="text-gray-500 font-normal italic tracking-normal font-serif">اختياري</span>
              </label>
              <textarea
                id="notes-area"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="اكتبي عنوانكِ بالتفصيل (المدينة، الحي، اسم الشارع) أو أي ملاحظات أو تعديلات ترغبين بها (مثال: تقصير الردنات، توسيع الأكمام، إضافة جيب مخفي، إلخ)"
                className="block w-full px-4 py-3 bg-[#181818] border border-gray-800 rounded-xl text-sm transition-all text-white focus:bg-[#1E1E1E] focus:outline-none focus:ring-1 focus:border-[#E5D3B3] focus:ring-[#1E1E1E] text-right"
              />
            </div>

            {/* Final Form Price summary & Submission Action */}
            <div className="pt-4 border-t border-gray-850 space-y-6">
              
              <div className="flex justify-between items-center bg-[#151515] p-4 rounded-xl border border-gray-800 flex-row-reverse">
                <div className="text-right">
                  <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-sans">المبلغ الإجمالي المطلق كاش عند الاستلام:</span>
                  <span className="text-xs text-gray-400 font-sans font-medium">شامل التفصيل الفردي والتغليف الفاخر والشحن المجاني لباب بيتكِ</span>
                </div>
                <div className="text-left">
                  <span className="text-2xl font-serif font-bold text-[#E5D3B3]">١٧ دينار أردني</span>
                  <span className="block text-[9px] text-[#E5D3B3] uppercase font-bold tracking-wider font-mono">لا توجد رسوم مخفية</span>
                </div>
              </div>

              {/* Confirm Order Button - Animating state change */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4.5 rounded-xl text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-x-3 text-[#0A0A0A] ${
                  isSubmitting
                    ? "bg-[#2A2A2A] text-gray-500 cursor-not-allowed"
                    : "bg-[#E5D3B3] hover:bg-white"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>يرجى الانتظار، جاري إرسال حجز ومقاسات الأتيليه...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#0A0A0A]" />
                    <span className="font-bold">تأكيد حجز تفصيل العباية الآن وإرسال الطلب</span>
                    <ChevronRight className="w-4.5 h-4.5 text-[#0A0A0A] rotate-180" />
                  </>
                )}
              </button>

              <p className="text-center font-sans text-[11px] text-gray-400 italic leading-relaxed">
                *بالنقر على تأكيد الطلب، نلتزم بالبدء فوراً بفصل تفاصيل قماشك في المشغل الأردني الخاص بنا. لكِ مطلق الحرية في تفحص الطرد وقياس العباية عند الاستلام قبل تسليم المبلغ للمندوب.
              </p>

            </div>

          </form>

        </div>

      </div>
    </section>
  );
}
