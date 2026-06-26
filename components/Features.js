"use client";
import { Ruler, Sparkles, Truck, Gift, Wind, HeartHandshake } from "lucide-react";
import Reveal from "./Reveal";

const FEATURES = [
  { icon: Ruler, title: "تفصيل مخصّص لوزنكِ وطولكِ", desc: "نصنعها بناءً على طولكِ ووزنكِ بدقة متناهية، لنضمن لكِ مظهرًا منسدلاً رائعاً وقواماً متناسقاً ومريحاً 100%." },
  { icon: Wind, title: "كسرات الأكمام الملكية", desc: "كسرات أنيقة ومتقنة تزين الأكمام بدقة متناهية، لتضفي لمسة ملكية فريدة تتكامل مع انسيابية القماش الفخم." },
  { icon: Sparkles, title: "كريب بلازما نخب أول", desc: "منسوج من خيوط فاخرة وعالية الكثافة، يمتاز بنعومة فائقة، لا يشف، ثقيل الانسياب ومريح جداً طوال اليوم." },
  { icon: Gift, title: "شال وحزام هدية راقية", desc: "تأتي كل عباية مرفقة بشال فاخر وحزام أنيق مجاناً، لتكتمل بها إطلالتكِ الفريدة دون أي تكلفة إضافية." },
  { icon: Truck, title: "شحن مجاني لكافة المحافظات", desc: "توصيل آمن وسريع لباب بيتكِ في كافة محافظات الأردن، مع ميزة الفحص والمعاينة الكاملة قبل الدفع." },
  { icon: HeartHandshake, title: "ضمان الجودة والمطابقة", desc: "نضمن لكِ مطابقة تامة للصور والفيديوهات الحقيقية المصوّرة في استوديو خاص؛ ما ترينه هو ما يصلكِ بالضبط." },
];

export default function Features() {
  return (
    <section className="py-10 bg-sand/60">
      <div className="max-w-3xl mx-auto px-4">
        <Reveal>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl text-balance tracking-tight font-bold text-center text-royal">
            ليش <span className="gold-text">عباية لقطة</span> الأكثر طلباً؟
          </h2>
        </Reveal>
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 rounded-2xl bg-cream p-4 ring-1 ring-gold/15 shadow-soft h-full">
                  <span className="flex-shrink-0 gold-gradient text-royalDark rounded-xl p-2.5">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="font-bold text-royal text-[15px]">{f.title}</h3>
                    <p className="text-sm text-earth mt-1 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
