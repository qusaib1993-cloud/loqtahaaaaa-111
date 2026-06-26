"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, MapPin, Home, Ruler, Weight, ShoppingBag, CheckCircle2, Truck, Gift, PhoneCall, Loader2 } from "lucide-react";
import { COLORS, GOVERNORATES, PRICE_ONE, PRICE_TWO, SIZE_GUIDE_VIDEO } from "../app/data";
import InlineVideo from "./InlineVideo";

function Field({ icon: Icon, children }) {
  return (
    <div className="relative">
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gold pointer-events-none">
        <Icon size={18} />
      </span>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-gold/30 bg-cream pr-10 pl-3 py-3 text-royal placeholder-earth/50 focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none transition";

export default function OrderForm({ quantity, setQuantity, color, setColor, formRef }) {
  const [form, setForm] = useState({ name: "", phone: "", gov: "عمان", address: "", height: "", weight: "" });
  const [color2, setColor2] = useState("maroon");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const total = quantity === 2 ? PRICE_TWO : PRICE_ONE;
  const colorName = (id) => COLORS.find((c) => c.id === id)?.name || "";

  // تنظيف ذكي للهاتف لتحويل الأرقام العربية والهندية لإنجليزية فورياً
  const cleanPhoneInput = (val) => {
    const map = { 
      "٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9",
      "۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9"
    };
    let cleaned = String(val).replace(/[٠-٩۰-۹]/g, (d) => map[d] || d);
    // إبقاء الأرقام فقط
    cleaned = cleaned.replace(/[^\d+]/g, "");
    return cleaned;
  };

  const set = (k) => (e) => {
    let val = e.target.value;
    if (k === "phone") {
      val = cleanPhoneInput(val);
    }
    setForm((f) => ({ ...f, [k]: val }));
  };

  const normalizePhone = (raw) => {
    let v = cleanPhoneInput(raw);
    v = v.replace(/[^\d]/g, "");
    if (v.startsWith("00962")) v = v.slice(5);
    else if (v.startsWith("962")) v = v.slice(3);
    if (/^7\d{8}$/.test(v)) v = "0" + v;
    return v;
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "الاسم الكامل مطلوب";
    const normalized = normalizePhone(form.phone);
    if (!/^07[789]\d{7}$/.test(normalized)) e.phone = "أدخلي رقم هاتف أردني صحيح يبدأ بـ 07 (مثل 079XXXXXXX)";
    if (!form.gov) e.gov = "الرجاء اختيار المحافظة لتسهيل الشحن";
    if (!form.address.trim() || form.address.trim().length < 5) e.address = "الرجاء كتابة العنوان التفصيلي ليتمكن المندوب من الوصول";
    if (!form.height || +form.height < 120 || +form.height > 210) e.height = "أدخلي الطول بالسم (مثال: 160)";
    if (!form.weight || +form.weight < 30 || +form.weight > 180) e.weight = "أدخلي الوزن بالكيلو (مثال: 70)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      const first = document.querySelector("[data-err='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const payload = {
      name: form.name.trim(),
      phone: normalizePhone(form.phone),
      gov: form.gov,
      address: form.address.trim(),
      height: form.height,
      weight: form.weight,
      quantity,
      color: colorName(color),
      color2: quantity === 2 ? colorName(color2) : null,
      total,
    };
    setSubmitting(true);
    
    // إرسال الطلب للإيميل (Formspree)
    try {
      await fetch("https://formspree.io/f/mojoegno", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("فشل إرسال الإيميل:", err);
    }

    // إرسال نسخة احتياطية للخادم
    try {
      await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error(err);
    }

    // التحويل إلى صفحة الشكر (tanko) مع جميع البيانات
    const params = new URLSearchParams({
      name: payload.name,
      phone: payload.phone,
      gov: payload.gov,
      address: payload.address,
      quantity: String(payload.quantity),
      total: String(payload.total),
      color: payload.color,
      color2: payload.color2 || "",
      height: String(payload.height),
      weight: String(payload.weight)
    });
    window.location.href = `/thank-you?${params.toString()}`;
  };

  return (
    <section ref={formRef} className="py-10 scroll-mt-20">
      <div className="max-w-xl mx-auto px-4">
        {/* بنر الاستعجال والندرة الفخم */}
        <div className="mb-6 bg-red-950/90 border border-gold/40 text-cream p-4 rounded-2xl text-center shadow-md animate-pulse">
          <p className="font-display font-bold text-xs sm:text-sm text-goldLight flex items-center justify-center gap-1.5">
            ⚠️ تنبيه محدود للغاية
          </p>
          <p className="text-xs sm:text-sm mt-1 leading-relaxed">
            بسبب ضغط التفصيل اليدوي، <span className="font-bold text-goldLight">استمارة الحجز ستغلق فور اكتمال 50 طلباً</span> لهذا الأسبوع!
          </p>
        </div>

        <div className="text-center" data-form-top>
          <span className="inline-flex items-center gap-2 rounded-full bg-royal text-goldLight text-xs px-4 py-1.5">
            <ShoppingBag size={15} /> حجز العباية وتفصيلها خلال دقيقة
          </span>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl text-balance tracking-tight font-bold text-royal mt-3">استمارة الطلب السريع</h2>
          <p className="text-earth text-sm mt-1">تفصيل خصوصي مخصّص لوزنكِ وطولكِ بدقة متناهية</p>
        </div>

        <form
          onSubmit={submit}
          className="mt-6 rounded-3xl bg-cream p-5 sm:p-6 ring-1 ring-gold/20 shadow-soft space-y-4"
        >
          {/* الكمية */}
          <div className="grid grid-cols-2 gap-3">
            {[{ q: 1, p: PRICE_ONE, l: "قطعة واحدة" }, { q: 2, p: PRICE_TWO, l: "قطعتين (عرض التوفير)" }].map((o) => (
              <button
                type="button" key={o.q} onClick={() => setQuantity(o.q)}
                className={`rounded-xl py-3 text-sm font-bold border-2 transition ${
                  quantity === o.q ? "border-gold bg-royal text-goldLight" : "border-gold/25 text-earth"
                }`}
              >
                {o.l} · {o.p} دينار
              </button>
            ))}
          </div>

          {/* اختيار اللون بتصميم كبير */}
          <div className="mt-6 mb-8 text-center bg-sand p-4 sm:p-6 rounded-2xl ring-1 ring-gold/20">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-royal mb-2">اختاري لونكِ المفضّل</h3>
            <p className="text-earth text-xs sm:text-sm mb-5">الألوان المتوفرة حالياً — كلها من نفس الخامة الفاخرة</p>
            <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
              {COLORS.map((c) => {
                const on = color === c.id;
                return (
                  <button
                    type="button" key={c.id} onClick={() => setColor(c.id)}
                    className="flex flex-col items-center gap-2 active:scale-95 transition"
                  >
                    <span
                      className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-soft flex items-center justify-center"
                      style={{ background: c.hex, boxShadow: on ? `0 0 0 3px #fbf7ee, 0 0 0 6px ${c.ring}` : undefined }}
                    >
                      {on && <CheckCircle2 size={22} className="text-cream" />}
                    </span>
                    <span className={`text-xs font-bold ${on ? "text-royal" : "text-earth"}`}>{c.name}</span>
                  </button>
                );
              })}
            </div>

            {quantity === 2 && (
              <div className="mt-6 pt-6 border-t border-gold/15">
                <h3 className="font-display text-lg sm:text-xl font-bold text-royal mb-4">اللون الثاني</h3>
                <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
                  {COLORS.map((c) => {
                    const on = color2 === c.id;
                    return (
                      <button
                        type="button" key={c.id} onClick={() => setColor2(c.id)}
                        className="flex flex-col items-center gap-2 active:scale-95 transition"
                      >
                        <span
                          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-soft flex items-center justify-center"
                          style={{ background: c.hex, boxShadow: on ? `0 0 0 3px #fbf7ee, 0 0 0 6px ${c.ring}` : undefined }}
                        >
                          {on && <CheckCircle2 size={20} className="text-cream" />}
                        </span>
                        <span className={`text-xs font-bold ${on ? "text-royal" : "text-earth"}`}>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* الفيديو والصور للتغذية الراجعة */}
            <div className="mt-8">
              <h3 className="font-display text-lg font-bold text-royal mb-4 bg-cream inline-block px-4 py-1.5 rounded-full ring-1 ring-gold/20 shadow-sm">
                - خياراتكم المفضلة الجديدة -
              </h3>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <figure className="rounded-2xl overflow-hidden shadow-soft ring-1 ring-gold/15 relative aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/media/image_6.webp" alt="تغذية راجعة" className="w-full h-full object-cover" />
                </figure>
                <figure className="rounded-2xl overflow-hidden shadow-soft ring-1 ring-gold/15 relative aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/media/image_7.webp" alt="تغذية راجعة" className="w-full h-full object-cover" />
                </figure>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-soft ring-1 ring-gold/15 relative bg-cream">
                <InlineVideo src="/media/video-1.mp4" poster="/media/look-maroon-hall.webp" />
              </div>
            </div>
          </div>

          <hr className="border-gold/15" />

          {/* بيانات العميل - الاسم الكامل */}
          <div data-err={!!errors.name}>
            <label className="block text-xs font-bold text-royal mb-1">الاسم الكامل للزبونة</label>
            <Field icon={User}>
              <input className={inputCls} placeholder="اكتب الاسم هنا" value={form.name} onChange={set("name")} />
            </Field>
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* رقم الهاتف */}
          <div data-err={!!errors.phone}>
            <label className="block text-xs font-bold text-royal mb-1">رقم الهاتف (سيتم الاتصال بك لتأكيد القياس)</label>
            <Field icon={Phone}>
              <input className={inputCls} inputMode="numeric" placeholder="مثال: 079XXXXXXX" value={form.phone} onChange={set("phone")} />
            </Field>
            {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* المحافظة */}
          <div data-err={!!errors.gov}>
            <label className="block text-xs font-bold text-royal mb-1">المحافظة</label>
            <Field icon={MapPin}>
              <select className={`${inputCls} appearance-none`} value={form.gov} onChange={set("gov")}>
                <option value="">اختاري المحافظة</option>
                {GOVERNORATES.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </Field>
            {errors.gov && <p className="text-red-600 text-xs mt-1">{errors.gov}</p>}
          </div>

          {/* العنوان التفصيلي */}
          <div data-err={!!errors.address}>
            <label className="block text-xs font-bold text-royal mb-1">العنوان التفصيلي</label>
            <Field icon={Home}>
              <input className={inputCls} placeholder="المنطقة، الشارع، أقرب معلم دال لسهولة التوصيل" value={form.address} onChange={set("address")} />
            </Field>
            {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
          </div>

          {/* دليل مقاسات الفيديو والطول والوزن */}
          <div className="rounded-2xl bg-sand/70 p-4 ring-1 ring-gold/15 space-y-3">
            <p className="text-sm font-bold text-royal flex items-center gap-1.5">
              <Ruler size={16} className="text-gold" /> دليل القياس المعتمد لضمان دقة الانسدال:
            </p>
            
            {/* تضمين مشغل فيديو المقاسات مباشرة فوق حقول الطول والوزن ليوجه العميلات لطريقة القياس الصحيحة */}
            <div className="mx-auto w-full max-w-[260px] bg-cream rounded-xl p-1.5 ring-1 ring-gold/15">
              <InlineVideo src="/media/size-guide.mp4" poster="/media/look-green.webp" />
              <p className="text-center text-[11px] text-earth/80 mt-1.5 font-bold">▶️ شاهدي طريقة التفصيل لوزنكِ وطولكِ بالفيديو</p>
            </div>

            <p className="text-xs text-earth/80 leading-relaxed text-center">أدخلي طولكِ ووزنكِ الحاليين بدقة متناهية لنقوم بقص وتفصيل العباية على مقاسكِ الفريد لتنسدل بانسيابية تامة.</p>
            
            <div className="grid grid-cols-2 gap-3">
              <div data-err={!!errors.height}>
                <label className="block text-[11px] font-bold text-royal mb-1">الطول (بالسنتيمتر)</label>
                <Field icon={Ruler}>
                  <input className={inputCls} inputMode="numeric" placeholder="مثلاً: 165" value={form.height} onChange={set("height")} />
                </Field>
                {errors.height && <p className="text-red-600 text-xs mt-1">{errors.height}</p>}
              </div>
              <div data-err={!!errors.weight}>
                <label className="block text-[11px] font-bold text-royal mb-1">الوزن (بالكيلوغرام)</label>
                <Field icon={Weight}>
                  <input className={inputCls} inputMode="numeric" placeholder="مثلاً: 65" value={form.weight} onChange={set("weight")} />
                </Field>
                {errors.weight && <p className="text-red-600 text-xs mt-1">{errors.weight}</p>}
              </div>
            </div>
          </div>

          {/* ملخص السعر */}
          <div className="rounded-2xl royal-gradient text-cream p-4 shadow-sm border border-gold/20">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="flex items-center gap-1.5 text-goldLight font-bold"><Gift size={15} /> الشال والحزام هدية مجانية</span>
              <span className="flex items-center gap-1.5 text-goldLight font-bold"><Truck size={15} /> شحن وتوصيل مجاني</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-cream/10 pt-3">
              <span className="text-cream/85">الإجمالي المستحق عند الاستلام:</span>
              <span className="font-display text-3xl font-extrabold gold-text">{total} دينار</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full gold-gradient text-royalDark font-extrabold text-lg py-4 rounded-2xl shadow-gold active:scale-[0.98] transition relative overflow-hidden disabled:opacity-70"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {submitting && <Loader2 size={18} className="animate-spin" />}
              {submitting ? "جاري حجز طلبكِ وتفصيله..." : "تأكيد الحجز الفوري — الدفع عند الاستلام"}
            </span>
            {!submitting && <span className="shimmer absolute inset-0" />}
          </button>
          
          <p className="text-center text-earth/80 text-xs leading-relaxed">
            * اضغطي على الزر للتأكيد الفوري؛ عبايتكِ تدخل مرحلة التفصيل والقص الخصوصي يدوياً فوراً. سنقوم بالاتصال بكِ هاتفياً لتأكيد القياس وموعد التسليم.
          </p>
        </form>
      </div>
    </section>
  );
}
