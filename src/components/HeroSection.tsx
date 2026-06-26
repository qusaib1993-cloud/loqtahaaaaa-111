import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Ruler, Truck } from "lucide-react";
import ResponsiveMedia from "./ResponsiveMedia";
import { PRICE_SPECIAL_JOD, PRICE_ORIGINAL_JOD, BRAND_NAME, BRAND_NAME_ARABIC } from "../data";

interface HeroSectionProps {
  onCtaclick: () => void;
}

export default function HeroSection({ onCtaclick }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A0A0A] via-[#111] to-[#0D0D0D] overflow-hidden">
      {/* Decorative ambient background curves */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
        <div className="absolute -top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-[#E5D3B3]/5 blur-3xl animate-pulse duration-[8000ms]" />
        <div className="absolute top-[40%] right-[5%] w-[350px] h-[350px] rounded-full bg-[#E5D3B3]/3 blur-3xl" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Right Side Content - Visual Premium media placeholder (Takes 5 columns on desktop) - Placed first or second for balance */}
        {/* Left Side Content - Text, USP list, badge (Takes 7 columns on desktop) */}
        <div className="lg:col-span-7 flex flex-col justify-center gap-y-6 sm:gap-y-8 text-center lg:text-right">
          {/* Subheading / Luxury Badge */}
          <div className="inline-flex self-center lg:self-start items-center gap-x-2 bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full border border-white/10 transition-colors duration-300">
            <Sparkles className="w-4 h-4 text-[#E5D3B3]" />
            <span className="text-xs uppercase tracking-[0.15em] font-sans font-semibold text-[#F5F2ED] flex items-center gap-1.5">
              <span>أتيليه لقطة الفاخر</span>
              <span className="text-gray-600 font-normal">|</span>
              <span className="font-serif italic font-medium tracking-normal text-[#E5D3B3]">{BRAND_NAME_ARABIC}</span>
            </span>
          </div>

          {/* Heading - Elegant Arabic serif typography */}
          <div className="space-y-4">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F5F2ED] leading-[1.2] tracking-tight font-medium text-right">
              عبايتكِ الفخمة المٌفصّلة خصيصاً لكِ.{" "}
              <span className="block mt-2 italic font-normal text-[#E5D3B3] font-serif">
                حياكة يدوية وقصّ دقيق يُلائم طولك ووزنكِ.
              </span>
            </h1>
            <p className="font-serif text-lg sm:text-xl text-[#E5D3B3]/80 text-center lg:text-right italic">
              تفصيل يدوي فاخر وبترونات مصممة خصيصاً لتمنحكِ الطلّة والانسدال الأكثر تميزاً
            </p>
            <p className="max-w-2xl mx-auto lg:mx-0 font-sans text-sm sm:text-base text-gray-400 leading-relaxed font-light text-right">
              اختبري روعة التهدل الانسيابي للعبايات الفاخرة المفصلة لأجلكِ خصيصاً. يقص خياط الأتيليه كل عباية بشكل فردي متناهي الدقة بناءً على طولك ووزنكِ، مستخدمين خيوط كريب الحرير الياباني البارد والمقاوم للتجعد. التوصيل متضمن بالكامل لكافة أنحاء الأردن.
            </p>
          </div>

          {/* Main Price Offer Spotlight */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl px-5 py-3 shadow-sm text-right">
              <p className="text-[10px] text-[#E5D3B3] uppercase tracking-widest font-sans font-semibold">عرض افتتاحي خاص ومحدود جداً</p>
              <div className="flex items-baseline gap-x-2 mt-0.5 justify-start">
                <span className="text-3xl font-serif font-semibold text-[#F5F2ED]">١٧ دينار</span>
                <span className="text-sm line-through text-gray-500 font-sans">٢٥ دينار</span>
              </div>
            </div>
            
            <div className="flex flex-col text-right text-xs text-gray-400 gap-y-1">
              <span className="flex items-center gap-1.5 font-sans">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <strong className="text-white">يشمل التوصيل المجاني السريع</strong> لكافة مناطق الأردن
              </span>
              <span className="font-sans opacity-95">الدفع كاش نقداً عند الاستلام فقط بعد فحص العباية بالكامل</span>
            </div>
          </div>

          {/* Interactive primary CTA button */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              id="hero-cta-button"
              onClick={onCtaclick}
              className="w-full sm:w-auto px-8 py-4 bg-[#E5D3B3] hover:bg-white text-[#0A0A0A] font-sans font-bold rounded-xl text-xs uppercase tracking-widest transition-all duration-300 transform active:scale-95 shadow-lg flex items-center justify-center gap-x-3 cursor-pointer group"
            >
              <span>صمِّمي واطلبي عبايتكِ الآن</span>
              <ArrowRight className="w-4 h-4 text-[#0A0A0A] group-hover:-translate-x-1 rotate-180 transition-transform" />
            </button>
            
            <a
              href="#colors-preview"
              className="w-full sm:w-auto text-center px-6 py-3.5 border border-[#E5D3B3]/25 hover:border-[#E5D3B3] text-[#E5D3B3] hover:bg-[#E5D3B3]/5 font-sans font-medium text-xs rounded-xl uppercase tracking-widest transition-all duration-300"
            >
              اكتشفي الألوان الأربعة
            </a>
          </div>

          {/* Minimalist Trust Badges (Horizontal Row with light dividers) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 pt-4 border-t border-[#1A1A1A] max-w-lg mx-auto lg:mx-0 text-center lg:text-right">
            <div className="flex items-center gap-x-2.5">
              <div className="p-1.5 bg-[#121212] border border-[#2A2A2A] rounded-lg">
                <Ruler className="w-4.5 h-4.5 text-[#E5D3B3]" />
              </div>
              <span className="text-xs font-sans text-gray-300 font-medium">تفصيل فردي ودقيق</span>
            </div>
            <div className="flex items-center gap-x-2.5">
              <div className="p-1.5 bg-[#121212] border border-[#2A2A2A] rounded-lg">
                <Truck className="w-4.5 h-4.5 text-[#E5D3B3]" />
              </div>
              <span className="text-xs font-sans text-gray-300 font-medium">توصيل مجاني وسريع</span>
            </div>
            <div className="flex items-center gap-x-2.5 col-span-2 sm:col-span-1 justify-center sm:justify-start">
              <div className="p-1.5 bg-[#121212] border border-[#2A2A2A] rounded-lg">
                <ShieldCheck className="w-4.5 h-4.5 text-[#E5D3B3]" />
              </div>
              <span className="text-xs font-sans text-gray-300 font-medium">الدفع بعد المعاينة عند الاستلام</span>
            </div>
          </div>
        </div>

        {/* Right Side Content - Visual Premium media placeholder (Takes 5 columns on desktop) */}
        <div className="lg:col-span-5 relative w-full flex justify-center items-center">
          {/* Subtle background decoration framing the image container */}
          <div className="absolute -inset-4 border border-dashed border-[#E5D3B3]/15 rounded-3xl opacity-60 pointer-events-none scale-[1.02] animate-pulse duration-1000" />
          
          <ResponsiveMedia
            id="hero-showcase"
            type="image"
            aspectRatio="3:4"
            label="Loqtah Elegant Silhouette"
            description="Highly structured, drape-friendly fabric showcase representing the premium crêpe flow on bespoke Abayas. Perfect vertical framing optimized to scale and preserve clarity."
            className="w-full max-w-md bg-transparent shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500 rounded-3xl"
          />

          {/* Luxury Floating tag */}
          <div className="absolute top-10 -left-6 sm:-left-10 bg-[#121212] text-white px-4 py-2 rounded-xl text-center shadow-lg transform -rotate-6 hidden sm:block border border-[#E5D3B3]/25">
            <span className="block text-[9px] uppercase tracking-widest font-sans font-bold text-[#E5D3B3]">عرض الافتتاح</span>
            <span className="block text-sm font-serif italic text-[#F5F2ED]">١٧ دينار شامل التوصيل</span>
          </div>
        </div>
      </div>
    </section>
  );
}
