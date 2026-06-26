import React, { useState, useEffect } from "react";
import { Sparkles, MessageSquare, ShieldCheck, Ruler, Menu, X, ArrowUp, ArrowRight, Star } from "lucide-react";

// Components
import HeroSection from "./components/HeroSection";
import ColorsSection from "./components/ColorsSection";
import OfferSection from "./components/OfferSection";
import OrderForm from "./components/OrderForm";
import ThankYouPage from "./components/ThankYouPage";

// Metadata / Types
import { ABAYA_COLORS, BRAND_NAME, BRAND_NAME_ARABIC, TESTIMONIALS } from "./data";
import { OrderDetails } from "./types";

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>("home"); // "home" or "thank-you"
  const [submittedOrder, setSubmittedOrder] = useState<OrderDetails | null>(null);
  const [selectedColorFromGrid, setSelectedColorFromGrid] = useState<string>(ABAYA_COLORS[0].name);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Synchronize routing with hash changes so they can reload or access deep links
  useEffect(() => {
    // Set document direction to RTL for native Arabic experience
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#/thank-you") {
        setCurrentRoute("thank-you");
      } else {
        setCurrentRoute("home");
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    // Run once on load
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Monitor scroll for CTA and Top Button float
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOrderSubmitted = (order: OrderDetails) => {
    // 1. Store order state locally (holds the dynamic stats for the receipt screen)
    setSubmittedOrder(order);
    
    // 2. Safely capture in local storage as well so they can refresh and keep their thank you state
    localStorage.setItem("loqtah_latest_order", JSON.stringify(order));
    
    // 3. Set Route by updating the hash (changes the client-side browser URL to '/#/thank-you' for unique deep linking!)
    window.location.hash = "#/thank-you";
  };

  const handleBackToHome = () => {
    setSubmittedOrder(null);
    localStorage.removeItem("loqtah_latest_order");
    window.location.hash = "#/";
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleSelectedColorFromColorsGrid = (colorName: string) => {
    setSelectedColorFromGrid(colorName);
    // Smoothly focus/scroll directly down onto the order form
    scrollToSection("order-section");
  };

  // If there's an order in localStorage on load, let's restore it for seamless UX
  useEffect(() => {
    const saved = localStorage.getItem("loqtah_latest_order");
    if (saved) {
      try {
        setSubmittedOrder(JSON.parse(saved));
      } catch (e) {
        // clear corrupted
        localStorage.removeItem("loqtah_latest_order");
      }
    }
  }, []);

  return (
    <div className="min-h-screen text-[#1A1A1A] flex flex-col antialiased">
      
      {/* Elegantly Floating Top Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F6]/85 backdrop-blur-xl border-b border-[#E3D6C8]/40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Identity / Logo */}
          <div 
            onClick={handleBackToHome}
            className="flex items-center gap-2.5 cursor-pointer select-none group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-[#E5D3B3] font-serif font-bold text-lg group-hover:scale-105 transition-all duration-300 shadow-sm border border-white/5">
              <span>ل</span>
            </div>
            <div className="flex flex-col text-right leading-none">
              <span className="font-serif text-lg tracking-widest uppercase font-semibold text-[#1A1A1A]">
                {BRAND_NAME_ARABIC}
              </span>
              <span className="font-serif text-[11px] text-[#A68F7A] tracking-wider mt-0.5">
                أتيليه العبايات الفاخرة • Loqtah
              </span>
            </div>
          </div>

          {/* Regular Desktop Navigation links */}
          {currentRoute === "home" ? (
            <nav className="hidden md:flex items-center gap-8 text-xs font-sans font-medium uppercase tracking-widest text-[#5A4E42]">
              <button onClick={() => scrollToSection("hero")} className="hover:text-black transition-colors cursor-pointer">الأتيليه والقصة</button>
              <button onClick={() => scrollToSection("colors-preview")} className="hover:text-black transition-colors cursor-pointer">الألوان الأربعة الملكية</button>
              <button onClick={() => scrollToSection("exclusive-offer")} className="hover:text-black transition-colors cursor-pointer">عرض الإطلاق الحصري</button>
              <button onClick={() => scrollToSection("order-section")} className="hover:text-black transition-colors cursor-pointer">طلب التفصيل أونلاين</button>
              <button onClick={() => scrollToSection("faqs-accordions")} className="hover:text-black transition-colors cursor-pointer">الأسئلة الشائعة</button>
            </nav>
          ) : (
            <div className="hidden md:block">
              <span className="text-xxs uppercase tracking-widest font-mono text-[#A68F7A] bg-[#FAF8F6] border border-[#E3D6C8] px-4 py-1.5 rounded-full">
                تم إرسال طلب التفصيل الخاص بكِ بنجاح
              </span>
            </div>
          )}

          {/* Floating Action Header Button */}
          <div className="hidden md:flex items-center gap-4">
            {currentRoute === "home" ? (
              <button
                onClick={() => scrollToSection("order-section")}
                className="px-5 py-2.5 bg-black hover:bg-black/95 text-white text-[11px] uppercase tracking-wider font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
              >
                صممي وفصّلي عبايتكِ الآن
              </button>
            ) : (
              <button
                onClick={handleBackToHome}
                className="px-5 py-2.5 bg-[#F5ECE2] hover:bg-black hover:text-white text-[#4A3E31] text-[11px] uppercase tracking-wider font-semibold rounded-xl transition-all cursor-pointer"
              >
                العودة للرئيسية
              </button>
            )}
          </div>

          {/* Interactive Mobile Menu Toggle */}
          <div className="flex md:hidden items-center">
            {currentRoute === "home" ? (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 text-[#4A3E31] hover:text-[#1A1A1A] hover:bg-black/5 rounded-xl transition-all"
                aria-label="Toggle navigation list"
              >
                {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
              </button>
            ) : (
              <button
                onClick={handleBackToHome}
                className="p-2 text-xs font-sans tracking-wide font-semibold uppercase text-[#A68F7A]"
              >
                الرئيسية
              </button>
            )}
          </div>

        </div>

        {/* Collapsible Mobile Menu Drawer with sleek soft background transitions */}
        {mobileMenuOpen && currentRoute === "home" && (
          <div className="md:hidden border-t border-[#E3D6C8]/40 bg-[#FAF8F6] py-4 px-4 shadow-inner space-y-3 flex flex-col justify-start">
            <button
              onClick={() => scrollToSection("hero")}
              className="w-full text-right py-2 px-3 text-xs uppercase tracking-widest font-medium text-[#4A3E31] hover:bg-black/5 rounded-lg"
            >
              الرئيسية (القصّة والأتيليه)
            </button>
            <button
              onClick={() => scrollToSection("colors-preview")}
              className="w-full text-right py-2 px-3 text-xs uppercase tracking-widest font-medium text-[#4A3E31] hover:bg-black/5 rounded-lg"
            >
              الألوان الأربعة الملكية
            </button>
            <button
              onClick={() => scrollToSection("exclusive-offer")}
              className="w-full text-right py-2 px-3 text-xs uppercase tracking-widest font-medium text-[#4A3E31] hover:bg-black/5 rounded-lg"
            >
              العرض والمميزات الحصرية
            </button>
            <button
              onClick={() => scrollToSection("order-section")}
              className="w-full text-right py-2 px-3 text-xs uppercase tracking-widest font-medium text-[#4A3E31] hover:bg-black/5 rounded-lg"
            >
              استمارة التفصيل الفوري
            </button>
            <button
              onClick={() => scrollToSection("faqs-accordions")}
              className="w-full text-right py-2 px-3 text-xs uppercase tracking-widest font-medium text-[#4A3E31] hover:bg-black/5 rounded-lg"
            >
              الأسئلة الشائعة
            </button>
            
            <button
              onClick={() => scrollToSection("order-section")}
              className="w-full text-center py-3 bg-black text-white text-xs uppercase tracking-wider font-semibold rounded-xl"
            >
              صمِّمي طلبكِ الفردي الآن • ١٧ دينار
            </button>
          </div>
        )}
      </header>

      {/* Main Content Router rendering based on Current Route state */}
      {currentRoute === "home" ? (
        <main className="flex-grow pt-8">
          
          {/* 1. HERO SECTION */}
          <HeroSection onCtaclick={() => scrollToSection("order-section")} />

          {/* 2. COLORS PREVIEW SECTION */}
          <ColorsSection onSelectedColor={handleSelectedColorFromColorsGrid} />

          {/* 3. EXCLUSIVE OFFER SECTION */}
          <OfferSection onCtaclick={() => scrollToSection("order-section")} />

          {/* TESTIMONIALS & AUTHENTIC VOICE AREA */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#EAE1D5]/30">
            <div className="max-w-7xl mx-auto space-y-12">
              
              <div className="text-center space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#E5D3B3] bg-[#121212] px-3 py-1 rounded-full font-bold">تقييمات متميزة</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1A1A1A]">نالت إعجاب سيدات الأردن بكل فخر واعتزاز</h2>
                <p className="font-serif italic text-sm text-[#A68F7A]">آراء عميلات لقطة بكل فخر واعتزاز كشهادة على تميزنا</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((t, idx) => (
                  <div key={idx} className="bg-[#FAF8F6] p-6 rounded-2xl border border-[#E9DFD3]/40 space-y-4 shadow-3xs flex flex-col justify-between">
                    <div className="space-y-3.5">
                      <div className="flex items-center gap-1">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#E5D3B3] text-[#E5D3B3]" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-[#5A4E42] leading-relaxed font-light italic text-right">
                        "{t.text}"
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-dashed border-[#E9DFD3]/30">
                      <div className="text-right">
                        <span className="block text-xs font-semibold font-sans text-black">{t.name}</span>
                        <span className="block text-[10px] text-[#A68F7A]">{t.location}</span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400">{t.date}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* 4. CASH ON DELIVERY DEEP CUSTOM ORDER FORM */}
          <OrderForm
            preselectedColor={selectedColorFromGrid}
            onOrderSubmit={handleOrderSubmitted}
          />

          {/* FAQs EXPLAINER COLLAPSIBLES - Crucial confidence details */}
          <section id="faqs-accordions" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#EAE1D5]/40">
            <div className="max-w-3xl mx-auto space-y-12">
              
              <div className="text-center space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#E5D3B3] bg-[#121212] px-3 py-1 rounded-full font-bold">تفاصيل الأتيليه</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1A1A1A]">إجابات لأبرز الأسئلة الشائعة</h2>
                <p className="font-serif italic text-sm text-[#A68F7A]">كل ما يهمكِ معرفته حول جودة عبايات لقطة والتفصيل المتقن</p>
              </div>

              <div className="space-y-4">
                
                <div className="p-5 rounded-2xl bg-[#FAF8F6] border border-[#E9DFD3]/40 space-y-2">
                  <h4 className="font-serif text-sm sm:text-base font-semibold text-[#1A1A1A] flex justify-between items-center">
                    <span>كيف يتم ضمان ملاءمة الطول والوزن الذي اخترته؟</span>
                    <span className="text-[#C4A48A] text-xs font-bold font-sans">اتصال التأكيد والتحقق</span>
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-[#5A4E42] leading-relaxed font-light text-right">
                    فور تقديم طلبك الفردي، سيقوم خياط الأتيليه المختص بمراجعة القياسات المدخلة (الطول والوزن). <strong>سنتواصل معكِ مباشرة عبر الواتساب</strong> لتأكيد تفاصيل إضافية مثل عرض الكتف والذراعين لضمان تفصيل العباية لتلائمكِ تماماً وبأعلى دقة.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F6] border border-[#E9DFD3]/40 space-y-2">
                  <h4 className="font-serif text-sm sm:text-base font-semibold text-[#1A1A1A] flex justify-between items-center">
                    <span>ما هو نوع القماش المستخدم في تفصيل عبايات لقطة؟</span>
                    <span className="text-[#C4A48A] text-xs font-bold font-sans">كريب الحرير الياباني</span>
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-[#5A4E42] leading-relaxed font-light text-right">
                    نحن نستخدم كريب الحرير الفاخر ذو الوزن المثالي والنسيج الغني غير الشفاف على الإطلاق. يتميز بملمس بارد ومريح ومقاوم للتجعد بشكل كامل مع تهدل انسيابي فاخر وثابت يدوم معك على المدى الطويل.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F6] border border-[#E9DFD3]/40 space-y-2">
                  <h4 className="font-serif text-sm sm:text-base font-semibold text-[#1A1A1A] flex justify-between items-center">
                    <span>هل يمكنني معاينة وفحص العباية عند باب البيت قبل الدفع؟</span>
                    <span className="text-[#C4A48A] text-xs font-bold font-sans">الفحص أولاً بكل ثقة</span>
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-[#5A4E42] leading-relaxed font-light text-right">
                    نعم، وبكل فخر! هذا هو معيار ثقتنا الذهبي لعميلات لقطة. عند وصول مندوب التوصيل، يحق لكِ تماماً فتح الطرد وفحص القماش والتأكد من جودة الخياطة والقياس، ولن تدفعي قرشاً واحداً للمندوب إلا إذا كنتِ راضية وسعيدة تماماً بالنتيجة.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F6] border border-[#E9DFD3]/40 space-y-2">
                  <h4 className="font-serif text-sm sm:text-base font-semibold text-[#1A1A1A] flex justify-between items-center">
                    <span>كم يستغرق تفصيل وتوصيل العباية المفصلة لي؟</span>
                    <span className="text-[#C4A48A] text-xs font-bold font-sans">توصيل سريع خلال ٢-٣ أيام</span>
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-[#5A4E42] leading-relaxed font-light text-right">
                    بعد تأكيد قياساتك عبر الهاتف أو الواتساب، يستغرق الأمر يوماً واحداً لقص وتصميم العباية وحياكتها بشكل فردي. أما التوصيل لباب بيتك بجميع محافظات الأردن فيستغرق من يوم إلى يومين فقط.
                  </p>
                </div>

              </div>

            </div>
          </section>

        </main>
      ) : (
        /* Standalone unique routing view for Thank You */
        <ThankYouPage
          order={submittedOrder}
          onBackToHome={handleBackToHome}
        />
      )}

      {/* Luxury, minimalist fashion Footer */}
      <footer className="bg-[#111111] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#E5D3B3]" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 font-sans text-xs">
          
          {/* Col 1: Brand & statement */}
          <div className="space-y-4 md:col-span-1 text-center md:text-right">
            <h4 className="font-serif text-lg tracking-widest text-[#E5D3B3] uppercase font-bold">{BRAND_NAME_ARABIC}</h4>
            <span className="block font-serif italic text-xs text-gray-400">أتيليه لقطة للعبايات الفاخرة • Loqtah</span>
            <p className="text-gray-400 font-light leading-relaxed">
              نعيد تعريف العبايات الفاخرة المفصلة خصيصاً للمرأة العربية العصرية. نقدم أجود أنواع الأقمشة الفاخرة، وحياكة يدوية مصممة لكِ بأسعار ملائمة ومدروسة كاش عند الاستلام.
            </p>
          </div>

          {/* Col 2: Useful links */}
          <div className="space-y-3.5 text-center md:text-right">
            <h5 className="font-semibold text-white uppercase tracking-wider text-xxs">روابط سريعة</h5>
            <ul className="space-y-2 text-gray-400 font-light">
              <li><button onClick={() => { handleBackToHome(); setTimeout(() => scrollToSection("hero"), 100); }} className="hover:text-white transition-colors cursor-pointer">تشكيلتنا الفاخرة</button></li>
              <li><button onClick={() => { handleBackToHome(); setTimeout(() => scrollToSection("colors-preview"), 100); }} className="hover:text-white transition-colors cursor-pointer">ألواننا الأربعة الفخمة</button></li>
              <li><button onClick={() => { handleBackToHome(); setTimeout(() => scrollToSection("exclusive-offer"), 100); }} className="hover:text-white transition-colors cursor-pointer">تفاصيل العرض المحدود</button></li>
              <li><button onClick={() => { handleBackToHome(); setTimeout(() => scrollToSection("order-section"), 100); }} className="hover:text-white transition-colors cursor-pointer">استمارة التفصيل السريعة</button></li>
            </ul>
          </div>

          {/* Col 3: Sizing charts info brief */}
          <div className="space-y-3.5 text-center md:text-right">
            <h5 className="font-semibold text-white uppercase tracking-wider text-xxs">معايير الأتيليه</h5>
            <ul className="space-y-2 text-gray-400 font-light">
              <li className="flex justify-between md:justify-start gap-3"><span>كثافة الغرز في الحياكة:</span> <strong className="text-[#E5D3B3]">دقة ١٢ غرزة/إنش</strong></li>
              <li className="flex justify-between md:justify-start gap-3"><span>تشطيب الحواف:</span> <strong className="text-[#E5D3B3]">حاشية فرنسية مخفية</strong></li>
              <li className="flex justify-between md:justify-start gap-3"><span>جودة الخيوط والنسيج:</span> <strong className="text-[#E5D3B3]">سوبر كريب ياباني</strong></li>
              <li className="flex justify-between md:justify-start gap-3"><span>معيار تهدل القماش:</span> <strong className="text-[#E5D3B3]">انسيابية كاملة ٣٦٠ درجة</strong></li>
            </ul>
          </div>

          {/* Col 4: Secured trust badges */}
          <div className="space-y-4 text-center md:text-right">
            <h5 className="font-semibold text-white uppercase tracking-wider text-xxs">التوصيل والضمان الذهبي</h5>
            <p className="text-gray-400 font-light leading-relaxed">
              يتم توصيل جميع الطلبات مجاناً داخل علبة مخملية أنيقة ومجهزة خصيصاً في الأردن. الدفع نقداً عند استلام ومعاينة العباية والتأكد التام من المظهر والقياس.
            </p>
            
            {/* Visual indicators of Jordan delivery */}
            <div className="flex justify-center md:justify-start items-center gap-3 text-[10px] text-gray-400 font-mono">
              <span className="px-2 py-1 bg-white/5 rounded border border-white/5 text-xs">🇯🇴 توصيل لكافة الأردن</span>
              <span className="px-2 py-1 bg-white/5 rounded border border-white/5 text-xs">COD الدفع كاش</span>
              <span className="px-2 py-1 bg-white/5 rounded border border-white/5 text-xs">معاينة قبل الدفع</span>
            </div>
          </div>

        </div>

        {/* Outer bottom row */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-400 font-light text-center sm:text-right gap-4">
          <p>© {new Date().getFullYear()} أتيليه {BRAND_NAME_ARABIC} للعبايات الفاخرة. حياكة وتصميم يدوي فخم. جميع الحقوق محفوظة.</p>
          <div className="flex space-x-4 space-x-reverse">
            <span className="hover:text-white transition-colors cursor-pointer">شروط التفصيل</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">سياسة الخصوصية</span>
            <span>•</span>
            <span className="hover:text-[#E5D3B3] transition-colors cursor-pointer">تواصل فعال واتساب (+962)</span>
          </div>
        </div>
      </footer>

      {/* Smart back-to-top floating circle button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-black hover:bg-black/90 text-white shadow-xl hover:shadow-2xl border border-white/10 active:scale-95 transition-all duration-300 group"
          aria-label="Scroll back to top of screen"
        >
          <ArrowUp className="w-5 h-5 text-[#C4A48A] group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

    </div>
  );
}
