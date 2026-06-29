export const PRICE_ONE = 14;
export const PRICE_TWO = 22;

export const GOVERNORATES = [
  "عمّان",
  "الزرقاء",
  "إربد",
  "المفرق",
  "البلقاء",
  "مادبا",
  "الكرك",
  "الطفيلة",
  "معان",
  "العقبة",
  "جرش",
  "عجلون",
];

// الألوان السبعة الحصرية كما تظهر في صورة الخامات المرفقة
export const COLORS = [
  { id: "c1", name: "أسود ملكي", hex: "#111111", ring: "#3a3a3d" },
  { id: "c2", name: "رمادي فحمي", hex: "#4A4F54", ring: "#6B7280" },
  { id: "c3", name: "أزرق سماوي", hex: "#8CB3D9", ring: "#A3C9F0" },
  { id: "c5", name: "أخضر داكن", hex: "#1A3B2E", ring: "#2A5C48" },
  { id: "c6", name: "برغندي عميق", hex: "#4A1227", ring: "#6D203D" },
  { id: "c7", name: "وردي عتيق", hex: "#D69EA7", ring: "#ECAFC0" },
  { id: "c9", name: "بيج رمادي", hex: "#C6B2A2", ring: "#DECBBF" },
];

export const GALLERY = [
  { src: "/media/look-green.jpeg", alt: "عباية ستراتوس - أخضر داكن فخم بإطلالة كاملة" },
  { src: "/media/look-black.jpeg", alt: "عباية ستراتوس - أسود ملكي فخم" },
  { src: "/media/look-maroon-studio.jpeg", alt: "عباية ستراتوس - برغندي عميق بإطلالة كاملة" },
  { src: "/media/look-maroon-hall.jpeg", alt: "عباية ستراتوس - برغندي عميق بلمسة عصرية" },
  { src: "/media/look-maroon-mirror.jpeg", alt: "عباية ستراتوس - تفاصيل القصّة الأنيقة" },
  { src: "/media/detail-1.jpeg", alt: "تفاصيل الأكمام والكسرات الفخمة مع التطريز الفضي" },
  { src: "/media/detail-2.jpeg", alt: "قرب الخامة وانسيابية القماش الفاخر" },
];

export const VIDEOS = [
  {
    id: "v1",
    label: "حركة وتفصيل العباية",
    src: "/media/video-1.mp4",
    poster: "/media/look-maroon-hall.jpeg",
  },
  {
    id: "v2",
    label: "قرب الخامة والكسرات الأنيقة",
    src: "/media/video-4.mp4",
    poster: "/media/look-maroon-studio.jpeg",
  },
];

export const SOCIAL = {
  facebook: "https://www.facebook.com/share/1Ppfz3DdPu/?mibextid=wwXIfr",
  instagram: "https://www.instagram.com/loqtahcollection",
};

export const SIZE_GUIDE_VIDEO = {
  src: "/media/size-guide.mp4",
  poster: "/media/look-green.jpeg",
};

export const TAGLINE = "فخامة تُفصّل عليكِ";

export const TESTIMONIALS = [
  { name: "رهف", city: "عمّان", stars: 5, text: "العباية أحلى من الصور، والقماش ثقيل وفخم. فصّلوها على طولي بالضبط." },
  { name: "أسيل", city: "إربد", stars: 5, text: "أول مرة عباية تيجي على قياسي ١٠٠٪. الشال والحزام هدية وكتير حلوين." },
  { name: "دعاء", city: "الزرقاء", stars: 5, text: "وصلت بيومين والتوصيل مجاني. الكسرات بالأكمام تجنّن." },
  { name: "ميس", city: "العقبة", stars: 5, text: "طلبت قطعتين وطلعوا أوفر، والجودة تستاهل وأكثر." },
  { name: "نور", city: "الكرك", stars: 5, text: "خدمة راقية وردّوا بسرعة، والعباية فخمة كأنها تفصيل خاص." },
  { name: "لمى", city: "مادبا", stars: 5, text: "ناعمة وما بتشف، لبستها بمناسبة وكل البنات سألوني من وين." },
];
