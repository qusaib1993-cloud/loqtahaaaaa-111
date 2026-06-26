import { Star, ShieldCheck } from "lucide-react";

export default function ReviewList() {
  const reviews = [
    {
      id: "1",
      name: "أم يوسف الخلايلة",
      rating: 5,
      date: "منذ يومين",
      comment: "بصراحة كنت متخوفة من حكاية إدخال الطول والوزن بس، لكن والله طلعت العباية كأنها مفصلة تفصيل ملكي خصيصاً لي! الطول من ورا والقدام بالملّي، والسواد يجنن فاحم وما بيجعد. بنصح كل صبية أردنية فيها بدون تردد.",
      location: "عمان، دابوق",
      verified: true
    },
    {
      id: "2",
      name: "دينا عبيدات",
      rating: 5,
      date: "منذ 4 أيام",
      comment: "سرعة التوصيل والخدمة رهيبة، طلبتها ووصلتني بعد يومين بس! المندوب محترم واستناني حتى قستها وطلعت تجنن وخامتها ثقيلة وفخمة جداً. التقييم 10/10 وخدمة الواتساب ممتازة كل مرحلة يبعتولي رسالة تتبع.",
      location: "إربد، شارع الجامعة",
      verified: true
    },
    {
      id: "3",
      name: "سارة الزعبي",
      rating: 5,
      date: "منذ أسبوع",
      comment: "القصة الملكية فخمة جداً، والتطريز الذهبي على الأطراف ناعم ومش فاقع بيعطي وقار مش طبيعي. طلبت اللون الأسود بلمسات ذهبية ومبسوطة عليها جداً لجمعات العيلة والمناسبات.",
      location: "البلقاء، السلط",
      verified: true
    },
    {
      id: "4",
      name: "روان العمري",
      rating: 5,
      date: "منذ 10 أيام",
      comment: "أنا طولي 172 سم ووزني 85 كغم ودايماً بلاقي مشكلة بالعبايات الجاهزة تكون قصيرة أو ضيقة من الأكتاف. لقطة كوليكشن حلوا المشكلة تماماً! العباية مريحة جداً وطولها مثالي وراقي.",
      location: "الزرقاء، الوسط التجاري",
      verified: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h3 className="text-xl font-bold text-[#1F1A17] flex items-center gap-2">
            آراء العميلات وتقييماتهن الموثقة
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            آراء حقيقية 100% من سيدات وصبايا اقتنين عباياتنا في كافة محافظات المملكة
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-[#ECD9B4]/30">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <span className="font-bold text-lg text-[#1F1A17]">4.9 / 5.0</span>
          <span className="text-xs text-gray-400 font-medium">| (أكثر من 850 عميلة)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-2xl border border-[#ECD9B4]/20 shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 h-1 w-20 bg-gradient-to-l from-[#C18837] to-transparent"></div>
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-[#1F1A17] text-base flex items-center gap-1.5">
                    {review.name}
                    {review.verified && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium border border-emerald-100">
                        <ShieldCheck className="w-3 h-3" />
                        مشتري مؤكد
                      </span>
                    )}
                  </h4>
                  <span className="text-xs text-gray-400 block mt-1">
                    {review.location} • {review.date}
                  </span>
                </div>
                <div className="flex text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-[#524742] text-sm leading-relaxed mb-4 font-normal">
                "{review.comment}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
