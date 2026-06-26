"use client";
import { motion } from "framer-motion";
import { Star, Quote, BadgeCheck, Heart } from "lucide-react";
import { TESTIMONIALS } from "../app/data";
import Reveal from "./Reveal";
import Image from "next/image";

function Stars({ n }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={15} className={i < n ? "text-gold" : "text-earth/30"} fill={i < n ? "currentColor" : "none"} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-12 bg-sand/60">
      <div className="max-w-3xl mx-auto px-4">
        <Reveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-royal text-goldLight text-xs px-4 py-1.5">
              <Heart size={14} fill="currentColor" /> آراء عميلاتنا
            </span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl text-balance tracking-tight font-bold text-royal mt-3">
              صبايا الأردن <span className="gold-text">وقعوا بحبها</span>
            </h2>
          </div>
        </Reveal>

        {/* ملخص التقييم */}
        <Reveal delay={0.08}>
          <div className="mt-5 flex items-center justify-center gap-4 rounded-2xl bg-cream ring-1 ring-gold/20 shadow-soft px-5 py-4 max-w-sm mx-auto">
            <div className="text-center">
              <p className="font-display text-3xl font-bold gold-text leading-none">4.9</p>
              <div className="mt-1 flex justify-center"><Stars n={5} /></div>
            </div>
            <div className="w-px h-10 bg-gold/20" />
            <div className="text-right">
              <p className="flex items-center gap-1 text-royal font-bold text-sm"><BadgeCheck size={16} className="text-gold" /> أكثر من 1200 طلب</p>
              <p className="text-earth text-xs mt-0.5">رضا وثقة عميلاتنا في كل المحافظات</p>
            </div>
          </div>
        </Reveal>

        {/* سكرين شوتس لآراء العملاء */}
        <Reveal delay={0.1}>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="relative w-full rounded-2xl overflow-hidden bg-white ring-2 ring-gold/20 shadow-lg p-1.5 group">
              <Image 
                src="/media/image_6.webp" 
                alt="رأي عميلة 1" 
                width={600}
                height={874}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded-xl object-contain shadow-inner group-hover:scale-[1.02] transition-transform duration-500" 
              />
            </div>
            <div className="relative w-full rounded-2xl overflow-hidden bg-white ring-2 ring-gold/20 shadow-lg p-1.5 group">
              <Image 
                src="/media/image_7.webp" 
                alt="رأي عميلة 2" 
                width={600}
                height={450}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded-xl object-contain shadow-inner group-hover:scale-[1.02] transition-transform duration-500" 
              />
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="font-display text-lg sm:text-xl md:text-2xl font-bold text-[#6e1f2b] leading-relaxed">
              فخامةٌ تعكسُ رضا عميلاتنا.. وانضمي أنتِ أيضاً لقائمة المتألقات!
            </p>
          </div>
        </Reveal>

        {/* شريط آراء متحرك */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -3 }}
                className="relative rounded-2xl bg-cream ring-1 ring-gold/15 shadow-soft p-4 h-full"
              >
                <Quote size={28} className="absolute -top-2 left-3 text-gold/20" />
                <Stars n={t.stars} />
                <p className="text-sm text-royal/90 mt-2 leading-relaxed">{t.text}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full gold-gradient grid place-items-center text-royalDark font-bold text-sm">
                    {t.name.charAt(0)}
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-bold text-royal flex items-center gap-1">
                      {t.name} <BadgeCheck size={13} className="text-gold" />
                    </p>
                    <p className="text-[11px] text-earth">{t.city} · عميلة موثّقة</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
