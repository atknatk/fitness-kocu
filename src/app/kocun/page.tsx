"use client";
import { useState } from "react";
import { BookOpen, ChevronDown, Lightbulb, MessageCircle } from "lucide-react";
import { WEEK_GOALS, MOTIVATIONAL_QUOTES } from "@/data/weeks";

const TIPS = [
  {
    title: "Neden Protein Bu Kadar Önemli?",
    icon: "🥩",
    text: "Protein kas yapımının temel taşıdır. Kilo verirken kas kaybını önlemek için her öğünde protein al. Günde vücut ağırlığının kg başına 1.5g protein hedefle. Tavuk, yumurta, balık, yoğurt, baklagil en iyi kaynakların.",
  },
  {
    title: "Ağırlık Artışı Nasıl Olmalı?",
    icon: "📈",
    text: "Her hafta toplam ağırlığı %5-10 artırmayı hedefle. Mesela 20 kg squat yapıyorsan, gelecek hafta 22 kg dene. Formu bozuyorsa aynı ağırlıkta kal. Progresif yüklenme kas gelişiminin anahtarıdır.",
  },
  {
    title: "HIIT Nedir ve Neden Etkili?",
    icon: "⚡",
    text: "High Intensity Interval Training: Kısa süreli yüksek yoğunluklu egzersiz + kısa dinlenme. Metabolizmayı hızlandırır ve 'afterburn effect' sayesinde antrenman sonrası bile saatlerce kalori yakmaya devam edersin.",
  },
  {
    title: "Plato (Duraksama) Yaşarsan?",
    icon: "🏔",
    text: "Kilo vermede duraksama çok normal! 1-2 hafta aynı kiloda kalırsan panik yapma. Kalori alımını 100 kcal azalt, kardiyo süresini 5 dk uzat, uyku düzenini kontrol et. Vücut yeni ağırlığına alışıyor.",
  },
  {
    title: "Cheat Meal Stratejisi",
    icon: "🍕",
    text: "Her 2 haftada bir sevdiğin bir yemeği ye. Ama 'cheat day' değil 'cheat meal' olsun. Pizza, burger, lahmacun... bir öğün kendini ödüllendir. Bu hem motivasyonu artırır hem metabolizmayı canlandırır.",
  },
  {
    title: "Form Her Şeyden Önemli",
    icon: "🎯",
    text: "Ağır kaldırmak değil, doğru kaldırmak önemli. Kötü form = sakatlık riski. İlk 4 hafta formu mükemmelleştirmeye odaklan. Aynada kendini izle veya telefona çek. Utanma, herkes böyle başladı.",
  },
  {
    title: "Uyku ve Kilo Verme İlişkisi",
    icon: "😴",
    text: "7-8 saat uyku hormonal dengeyi sağlar. Uyku eksikliğinde açlık hormonu (ghrelin) artar, tokluk hormonu (leptin) azalır. Gece 23:00'te yatmayı hedefle. Uyku öncesi ekran kullanımını azalt.",
  },
  {
    title: "Stres Yönetimi",
    icon: "🧘",
    text: "Stres kortizol salgılatır, özellikle karın bölgesinde yağ depolanmasına neden olur. Spor zaten harika bir stres çözücü! Ek olarak günde 5 dk derin nefes egzersizi yap. 4 saniye nefes al, 4 tut, 4 ver.",
  },
  {
    title: "Su İçmenin Sırları",
    icon: "💧",
    text: "Günde 2.5-3 litre su iç. Öğünlerden 30 dk önce su içersen daha az yersin. Antrenman sırasında her 15 dk'da birkaç yudum al. Susadığını hissettiğinde zaten %2 dehidre olmuşsundur!",
  },
  {
    title: "Sabah Rutini",
    icon: "🌅",
    text: "Uyanır uyanmaz 1 bardak ılık su iç. Kahvaltını 30 dk içinde yap. Protein ağırlıklı kahvaltı gün boyu tok tutar ve metabolizmayı hızlandırır. Kahvaltıyı atlama!",
  },
];

export default function KocunPage() {
  const [openTip, setOpenTip] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {/* Coach banner */}
      <div className="bg-gradient-to-br from-dark to-primary-dark text-white rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-5%] w-48 h-48 bg-white/5 rounded-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center text-2xl">🏋️</div>
            <div>
              <h1 className="text-xl font-bold">Koçun Konuşuyor</h1>
              <p className="text-xs text-blue-200">Bilgi + Motivasyon = Başarı</p>
            </div>
          </div>
          <p className="italic text-sm text-blue-100">&ldquo;Sana en iyi yaşam koçu kendini geliştirme isteğindir. Ben sadece yol gösteriyorum.&rdquo;</p>
        </div>
      </div>

      {/* Knowledge base */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-primary" /> Bilgi Bankası
        </h2>
        <div className="space-y-2">
          {TIPS.map((tip, i) => (
            <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
              <button onClick={() => setOpenTip(openTip === i ? null : i)}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition text-left">
                <span className="text-2xl">{tip.icon}</span>
                <span className="flex-1 font-semibold text-sm">{tip.title}</span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${openTip === i ? "rotate-180" : ""}`} />
              </button>
              {openTip === i && (
                <div className="px-4 pb-4 pt-0">
                  <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                    <p className="text-sm text-gray-600 leading-relaxed">{tip.text}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Weekly motivation messages */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <MessageCircle size={20} className="text-accent" /> Haftalık Motivasyon
        </h2>
        <div className="space-y-2">
          {WEEK_GOALS.map((goal, i) => (
            <div key={i} className={`p-3 rounded-xl text-sm ${
              i === 0 ? "bg-accent/10 border border-accent/20 font-semibold" : "bg-gray-50"
            }`}>
              <span className="text-primary font-bold">Hafta {i + 1}:</span> {goal}
            </div>
          ))}
        </div>
      </div>

      {/* All quotes */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Lightbulb size={20} className="text-warning" /> Motivasyon Sözleri
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {MOTIVATIONAL_QUOTES.map((q, i) => (
            <div key={i} className="bg-gradient-to-br from-gray-50 to-primary/5 rounded-xl p-4 border border-gray-100">
              <p className="italic text-sm text-gray-700">&ldquo;{q.q}&rdquo;</p>
              <p className="text-xs text-gray-400 mt-2">— {q.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
