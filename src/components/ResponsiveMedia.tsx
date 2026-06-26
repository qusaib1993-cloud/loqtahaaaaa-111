import React, { useState } from "react";
import { Image, Video, HelpCircle, AlertCircle, Sparkles } from "lucide-react";

interface ResponsiveMediaProps {
  id: string;
  type: "image" | "video" | "either";
  aspectRatio: "3:4" | "16:9" | "square" | "free";
  label: string;
  description: string;
  className?: string;
  customSrc?: string;
}

export default function ResponsiveMedia({
  id,
  type = "image",
  aspectRatio = "3:4",
  label,
  description,
  className = "",
  customSrc,
}: ResponsiveMediaProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [useCustomFile, setUseCustomFile] = useState<string | null>(() => {
    // Try to retrieve custom files from localStorage for convenient client testing if they uploaded elements
    return localStorage.getItem(`loqtah_media_${id}`);
  });

  // Calculate Aspect ratio classes
  const aspectClass = {
    "3:4": "aspect-[3/4]",
    "16:9": "aspect-[16/9]",
    "square": "aspect-square",
    "free": "h-auto min-h-[300px]",
  }[aspectRatio];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUseCustomFile(url);
      localStorage.setItem(`loqtah_media_${id}_name`, file.name);
      // For persistent demo, we can store base64 or just keep object url during session
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUseCustomFile(null);
    localStorage.removeItem(`loqtah_media_${id}`);
    localStorage.removeItem(`loqtah_media_${id}_name`);
  };

  const savedFileName = localStorage.getItem(`loqtah_media_${id}_name`);

  return (
    <div
      id={`media-container-${id}`}
      className={`relative group overflow-hidden rounded-2xl bg-gradient-to-br from-[#121212] via-[#1A1A1A] to-[#151515] border border-[#E5D3B3]/15 transition-all duration-500 shadow-xl ${aspectClass} ${className}`}
    >
      {/* Dynamic Render: If a file or custom source is provided */}
      {useCustomFile || customSrc ? (
        <div className="relative w-full h-full flex items-center justify-center">
          {type === "video" ? (
            <video
              src={useCustomFile || customSrc}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain bg-[#111] max-w-full max-h-full transition-all duration-300"
            />
          ) : (
            <img
              src={useCustomFile || customSrc}
              alt={label}
              className="w-full h-full object-contain max-w-full max-h-full transition-all duration-300"
              referrerPolicy="no-referrer"
            />
          )}

          {/* Quick Clear Floating Button */}
          <button
            onClick={handleClear}
            className="absolute top-3 right-3 bg-black/95 hover:bg-[#E5D3B3] hover:text-[#0A0A0A] text-[#F5F2ED] text-xxs px-3 py-1.5 rounded-full font-mono tracking-wider transition-all backdrop-blur-md border border-[#E5D3B3]/20 z-10 cursor-pointer"
            title="إزالة الملف المرفوع والعودة للplaceholder الفاخر"
          >
            إزالة الملف المرفوع
          </button>

          {/* Label Indicator inside image wrapper */}
          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-[#E5D3B3] text-[10px] px-2.5 py-1 rounded font-mono border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {savedFileName ? `الملف: ${savedFileName}` : `الملف النشط: ${label}`}
          </div>
        </div>
      ) : (
        /* Luxury, Minimalist Placeholder View - Looks stunning right from the start */
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 text-right">
          {/* Top Info Header */}
          <div className="flex justify-between items-start flex-row-reverse">
            <div className="flex items-center gap-x-2 bg-[#E5D3B3]/10 hover:bg-[#E5D3B3]/20 text-[#E5D3B3] px-3.5 py-1.5 rounded-full border border-[#E5D3B3]/20 transition-all duration-300">
              <Sparkles className="w-3.5 h-3.5 text-[#E5D3B3] animate-pulse" />
              <span className="text-[10px] font-medium uppercase tracking-wider font-sans">
                {type === "video" ? "إطار فيديو تفاعلي" : type === "image" ? "إطار صورة للمنتج" : "إطار متكيف للعباية"}
              </span>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="p-1.5 text-gray-500 hover:text-[#E5D3B3] rounded-full hover:bg-white/5 transition-all duration-300"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
              {showTooltip && (
                <div className="absolute right-0 top-8 w-60 p-3 bg-black text-[#F5F2ED] text-[11px] leading-relaxed rounded-xl shadow-2xl z-20 border border-white/10 transition-all duration-300 text-right">
                  <p className="font-sans font-medium mb-1">كيف يمكنني تغيير هذه الصورة؟</p>
                  <p className="font-sans opacity-95">
                    بإمكانكِ رفع أي صورة أو فيديو من الاستوديو لمشاهدتها بدقة عالية فوراً على الموقع، أو استبدال مسار الملف مباشرة في محرر الأكواد React.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Middle Decorative Abstract Line & Logo Overlay */}
          <div className="flex flex-col items-center justify-center my-4 py-6">
            <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-[#181818] border border-[#E5D3B3]/15 shadow-xs mb-3 group-hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-2 rounded-full border border-dashed border-[#E5D3B3]/20"></div>
              {type === "video" ? (
                <Video className="w-6 h-6 text-[#E5D3B3]" />
              ) : (
                <Image className="w-6 h-6 text-[#E5D3B3]" />
              )}
            </div>
            
            <h4 className="font-serif text-sm italic font-medium text-[#F5F2ED] text-center tracking-wide">
              {label}
            </h4>
            <p className="font-sans text-[11px] text-gray-400 text-center max-w-[200px] mt-1 line-clamp-2">
              {description}
            </p>
          </div>

          {/* Bottom Custom File Uploader Widget */}
          <div className="w-full flex flex-col gap-y-2">
            <label className="w-full flex items-center justify-center gap-x-2 py-2 px-3 bg-[#151515] hover:bg-[#1E1E1E] text-[#F5F2ED] text-xs font-medium rounded-xl border border-[#2A2A2A] transition-all tracking-wide cursor-pointer shadow-sm active:scale-[0.98] flex-row-reverse">
              <AlertCircle className="w-3.5 h-3.5 text-[#E5D3B3]" />
              <span>ارفعي صورة أو فيديو لشاشة العرض الفوري</span>
              <input
                type="file"
                accept={type === "video" ? "video/*" : type === "image" ? "image/*" : "image/*,video/*"}
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <div className="text-center font-mono text-[9px] text-[#E5D3B3]/60 uppercase tracking-widest leading-none">
              تثبيت الأبعاد التلقائي • نسبة المقاس {aspectRatio}
            </div>
          </div>
        </div>
      )}

      {/* Elegant visual ambient background mesh */}
      {!useCustomFile && !customSrc && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,211,179,0.06),transparent_50%)] pointer-events-none" />
      )}
    </div>
  );
}
