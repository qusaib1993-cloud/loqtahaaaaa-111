import React, { useState } from "react";
import { ChevronRight, Sparkles, Check } from "lucide-react";
import { ABAYA_COLORS } from "../data";
import { AbayaColor } from "../types";
import ResponsiveMedia from "./ResponsiveMedia";

interface ColorsSectionProps {
  onSelectedColor: (colorName: string) => void;
}

export default function ColorsSection({ onSelectedColor }: ColorsSectionProps) {
  const [selectedColor, setSelectedColor] = useState<AbayaColor>(ABAYA_COLORS[0]);

  const handleSelectColorAndRoute = (color: AbayaColor) => {
    setSelectedColor(color);
    onSelectedColor(color.name); // Tells parent to update form option & scroll
  };

  return (
    <section id="colors-preview" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D] border-y border-[#1A1A1A] transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-x-1 bg-white/5 text-[#E5D3B3] px-3.5 py-1.5 rounded-full text-[10px] uppercase font-sans tracking-widest border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#E5D3B3]" />
            <span>باليت الألوان الملكية</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F2ED] font-medium tracking-tight">
            أربعة ألوان ملكية مذهلة
          </h2>
          <p className="font-serif italic text-base text-[#E5D3B3] mt-1">
            تم انتقاؤها بعناية فائقة لتناسب ذوقكِ الرفيع في كافة المناسبات والأوقات
          </p>
          <p className="font-sans text-gray-400 text-sm leading-relaxed max-w-xl mx-auto font-light">
            كل درجة لونية في تشكيلة لقطة تم اختيارها وتجهيزها يدوياً لتمنحكِ حضوراً ينبض بالهيبة والأناقة المطلقة. اضغطي على أي لون بالأسفل لمعاينة تفاصيل النسيج والانسدال.
          </p>
        </div>

        {/* Swatches Controls - Minimalist Circular Swatches with Gold Borders */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
          {ABAYA_COLORS.map((color) => {
            const isActive = selectedColor.id === color.id;
            return (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color)}
                className={`flex items-center gap-x-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 text-right cursor-pointer active:scale-95 ${
                  isActive
                    ? "bg-[#E5D3B3] text-[#0A0A0A] border-[#E5D3B3] shadow-lg scale-102 font-bold"
                    : "bg-[#121212] text-gray-300 border-gray-800 hover:border-[#E5D3B3]/40 hover:text-white"
                }`}
              >
                {/* Visual Circle */}
                <span
                  className="w-4 h-4 rounded-full border border-white/20 inline-block shadow-inner shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-xs font-sans tracking-wide">
                  {color.arabicName}
                </span>
                {isActive && <Check className="w-3.5 h-3.5 text-[#0A0A0A] shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Color details Showcase Board - Active Showcase Grid with Media placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#111111] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#222] shadow-inner">
          
          {/* Active Color Image Container (Takes 5 cols on desktop) */}
          <div className="lg:col-span-5 relative">
            <ResponsiveMedia
              id={`color-preview-${selectedColor.id}`}
              type="image"
              aspectRatio="3:4"
              label={`${selectedColor.name} Perspective`}
              description={selectedColor.mediaPlaceholder}
              className="w-full bg-transparent shadow-lg rounded-2xl"
            />
          </div>

          {/* Active Color Details & Quick Select Option (Takes 7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#E5D3B3]">
                {selectedColor.tagline}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F2ED] font-medium leading-tight">
                {selectedColor.arabicName}
              </h3>
              <span className="block text-sm tracking-wide text-[#E5D3B3]/80 italic mt-0.5 font-sans">
                {selectedColor.name} • كريب حرير ملكي فاخر
              </span>
            </div>

            <div className="h-px bg-[#2A2A2A] w-24 mx-auto lg:mr-0 lg:ml-auto" />

            <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed font-light text-right">
              {selectedColor.description}
            </p>

            {/* Color-specific bullet features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-right max-w-md mx-auto lg:mr-0 lg:ml-auto">
              <div className="flex items-start gap-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5D3B3] mt-1.5 shrink-0" />
                <span className="text-gray-400">قصّة منسدلة ومريحة تمنحكِ طولاً وثباتاً مميزاً</span>
              </div>
              <div className="flex items-start gap-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5D3B3] mt-1.5 shrink-0" />
                <span className="text-gray-400">١٠٠٪ غير شفاف، بارد ومقاوم تماماً للتجعد</span>
              </div>
              <div className="flex items-start gap-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5D3B3] mt-1.5 shrink-0" />
                <span className="text-gray-400">دقة خياطة متناهية بقوة ١٢ غرزة في الإنش الواحد</span>
              </div>
              <div className="flex items-start gap-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5D3B3] mt-1.5 shrink-0" />
                <span className="text-gray-400">حواشٍ مخفية عريضة بوزن كلاسيكي مدهل</span>
              </div>
            </div>

            {/* Actions for this specific color */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => handleSelectColorAndRoute(selectedColor)}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#E5D3B3] hover:bg-white text-[#0A0A0A] text-xs uppercase tracking-widest font-sans font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-x-2"
              >
                <span>اختيار لون {selectedColor.arabicName} والتفصيل الآن</span>
                <ChevronRight className="w-4 h-4 text-[#0A0A0A] rotate-180" />
              </button>
              
              <div className="text-[11px] font-mono text-gray-500 uppercase tracking-widest">
                سيقوم هذا الخيار بتحديد اللون لكي تلقائياً بالأسفل
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
