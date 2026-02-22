import { CoachTip, ProgramType } from "@/types";

export function getTips(programType: ProgramType): CoachTip[] {
  const common = COMMON_TIPS;
  const specific = programType === "female_recomp" ? FEMALE_TIPS : MALE_TIPS;
  return [...common, ...specific];
}

// =============================================
// ORTAK İPUÇLARI — Herkes İçin Geçerli (8 adet)
// =============================================
const COMMON_TIPS: CoachTip[] = [
  {
    icon: "💧",
    title: "Suyun Gücü",
    content:
      "Günde en az 2.5L su iç. Su metabolizmayı hızlandırır, toksinleri atar ve kas performansını artırır. Antrenman sırasında her 15-20 dakikada birkaç yudum al. Susadığını hissettiğinde zaten hafif dehidre olmuşsun demektir, bu yüzden gün boyunca düzenli aralıklarla su içmeyi alışkanlık haline getir. Sabah kalkar kalkmaz 1 bardak ılık su ile güne başlamak metabolizmayı uyandırır.",
  },
  {
    icon: "🥩",
    title: "Neden Protein Bu Kadar Önemli?",
    content:
      "Kasları onarmak ve büyütmek için protein şart. Her öğünde 20-30g protein almayı hedefle. Tavuk, balık, yumurta, yoğurt ve baklagiller en iyi kaynaklarındır. Antrenman sonrası ilk 1-2 saat içinde protein almak kas onarımını hızlandırır. Günlük toplam protein hedefini vücut ağırlığının kilogramı başına 1.6-2.2g olarak belirle.",
  },
  {
    icon: "📈",
    title: "Ağırlık Artışı Nasıl Olmalı?",
    content:
      "Her hafta küçük artışlar yap. %5-10 ağırlık artışı idealdir ve progressive overload prensibinin temelidir. Eğer bir ağırlıkta tüm setleri ve tekrarları rahatça tamamlayabiliyorsan, bir sonraki antrenmanda ağırlığı hafifçe artır. Aynı ağırlıkta kalıp tekrar sayısını artırmak da bir ilerleme yöntemidir. Sabırlı ol — tutarlı küçük artışlar uzun vadede büyük kazanımlar sağlar.",
  },
  {
    icon: "⚡",
    title: "HIIT Nedir ve Neden Etkili?",
    content:
      "Yüksek yoğunluklu aralıklı antrenman (HIIT), yağ yakmada çok etkili bir yöntemdir. Kısa süreli yoğun efor ve dinlenme periyotlarından oluşur. 20-30 dakikalık bir HIIT seansı, 1 saatlik düşük tempolu kardiyo kadar kalori yakabilir. Ayrıca antrenman sonrası metabolizmayı saatlerce yüksek tutar (afterburn etkisi). Haftada 2-3 seans yeterlidir, her gün yapmak overtraining'e yol açabilir.",
  },
  {
    icon: "🍕",
    title: "Cheat Meal Stratejisi",
    content:
      "Haftada 1 serbest öğün motivasyonu artırır ama kontrolü elden bırakma. Cheat meal demek bütün gün boyunca sınırsız yemek değil, tek bir öğünde sevdiğin yiyecekleri makul porsiyonlarda yemek demektir. Serbest öğününü antrenman gününe denk getirirsen, ekstra kaloriler kas yapımında kullanılabilir. Bu öğünü suçluluk duymadan ye — psikolojik olarak sürdürülebilir bir diyet için gerekli.",
  },
  {
    icon: "🎯",
    title: "Form Her Şeyden Önemli",
    content:
      "Ağır kaldırmak yerine doğru formu öğren. Sakatlanma riskini azaltır ve hedef kas grubunu çok daha iyi çalıştırır. Aynanın önünde hafif ağırlıkla pratik yap, gerekirse telefona çekerek formunu kontrol et. Ego lifting (gösteriş için ağır kaldırma) en sık yapılan hatadır. Doğru formla yapılan 10 tekrar, yanlış formla yapılan 20 tekrardan çok daha etkilidir.",
  },
  {
    icon: "😴",
    title: "Uyku ve Toparlanma",
    content:
      "7-8 saat uyku kas onarımı ve yağ yakımı için kritik öneme sahiptir. Uyku sırasında büyüme hormonu salgılanır ve kaslar onarılır. Yetersiz uyku kortizol seviyesini artırır, bu da yağ depolanmasına ve kas kaybına neden olur. Yatmadan 1 saat önce ekranlardan uzak dur, karanlık ve serin bir odada uyu. Düzenli uyku saati vücudunun biyolojik saatini düzenler.",
  },
  {
    icon: "🧘",
    title: "Stres Yönetimi",
    content:
      "Kortizol (stres hormonu) yağ depolanmasını artırır, özellikle karın bölgesinde. Kronik stres ayrıca kas yapımını engeller ve iştahı artırır. Nefes egzersizleri, meditasyon ve doğada yürüyüşlerle stresi azalt. Günde 10 dakika derin nefes egzersizi bile kortizol seviyesini düşürür. Antrenmanın kendisi de doğal bir stres gidericidir — düzenli spor yap ve farkı hisset.",
  },
];

// =============================================
// KADINLARA ÖZEL İPUÇLARI (5 adet)
// =============================================
const FEMALE_TIPS: CoachTip[] = [
  {
    icon: "🌸",
    title: "Menstrüel Döngü ve Antrenman",
    content:
      "Döngünün farklı evrelerinde antrenman yoğunluğunu ayarlayabilirsin. Foliküler fazda (adet sonrası ilk 2 hafta) östrojen yükselir, enerji ve güç artar — bu dönem ağır antrenmanlar için idealdir. Luteal fazda (son 2 hafta) enerji düşebilir, su tutulumu artabilir. Bu dönemde yoğunluğu azaltıp daha hafif antrenmanlar yapabilirsin. Adet döneminde ağrı yoksa hafif egzersiz aslında kramplara iyi gelir.",
  },
  {
    icon: "🦴",
    title: "Kemik Sağlığı ve Kuvvet Antrenmanı",
    content:
      "Kadınlarda osteoporoz riski erkeklere göre çok daha yüksektir, özellikle menopoz sonrası. Kuvvet antrenmanı kemik yoğunluğunu artırmanın en etkili yollarından biridir. Squat, deadlift ve lunge gibi yük taşıyan egzersizler kemiklere baskı uygulayarak güçlenmelerini sağlar. Ayrıca kalsiyum (süt ürünleri, yeşil yapraklı sebzeler) ve D vitamini alımına dikkat et. Genç yaşta başlanan kuvvet antrenmanı ilerideki kemik kaybını önlemede çok etkilidir.",
  },
  {
    icon: "⚖️",
    title: "Tartı vs Ayna",
    content:
      "Body recomposition'da tartı yanıltıcı olabilir. Kas kazanırken yağ kaybediyorsun — tartı aynı kalabilir ama vücudun tamamen değişir. Kas, yağa göre daha yoğundur, yani daha az yer kaplar. Bu yüzden sadece tartıya değil, aynaya, kıyafetlerin nasıl oturduğuna ve vücut ölçülerine bak. Her 2 haftada bir aynı koşullarda fotoğraf çek ve karşılaştır. İlerleme tartıda görünmese bile, fotoğraflarda ve ölçülerde mutlaka ortaya çıkar.",
  },
  {
    icon: "🍳",
    title: "Kadınlar İçin Protein",
    content:
      "Vücut ağırlığının kilogramı başına 1.6-2g protein hedefle. Yeterli protein kas kaybını önler, tokluk sağlar ve metabolizmayı hızlandırır. Her öğünde 20-30g protein almak kas protein sentezini optimize eder. Tavuk göğsü, balık, yumurta, yoğurt, lor peyniri ve baklagiller iyi kaynaklardır. Eğer yemeklerden yeterli protein alamıyorsan, bir ölçek protein tozu pratik bir takviye olabilir.",
  },
  {
    icon: "💧",
    title: "Hormonal Su Tutulumu",
    content:
      "Döngünün bazı evrelerinde su tutulumu tamamen normaldir. Özellikle luteal fazda (adet öncesi) progesteron etkisiyle 1-2 kg su tutulumu yaşanabilir — bu yağ artışı değildir. Adet başladıktan birkaç gün sonra fazla su kendiliğinden atılır. Bu dönemde tartıya çıkmamak veya sonuçları panikle yorumlamamak önemlidir. Tuz tüketimini azaltmak ve bol su içmek su tutulumunu hafifletmeye yardımcı olur.",
  },
];

// =============================================
// ERKEKLERE ÖZEL İPUÇLARI (2 adet)
// =============================================
const MALE_TIPS: CoachTip[] = [
  {
    icon: "🏋️",
    title: "Compound Hareketler",
    content:
      "Squat, deadlift, bench press ve overhead press gibi bileşik (compound) hareketler en çok kas grubunu aynı anda çalıştıran egzersizlerdir. Bu hareketler doğal testosteron ve büyüme hormonu salgısını artırır. Antrenmanına her zaman bileşik hareketlerle başla, izolasyon hareketlerini sona bırak. Haftada en az 2-3 kez bu temel hareketleri programına dahil et. Bileşik hareketlerde ilerleme sağlamak, tüm vücudunun güçlenmesi anlamına gelir.",
  },
  {
    icon: "🔥",
    title: "Plato Kırma",
    content:
      "İlerleme durduğunda panik yapma — platolar doğaldır ve herkes yaşar. Platoyu kırmak için birkaç strateji deneyebilirsin: ağırlığı artır ve tekrar sayısını düşür, aynı ağırlıkta daha fazla set yap, egzersiz sırasını değiştir veya tamamen farklı bir egzersiz varyasyonu dene. Bazen 1 hafta deload (hafif antrenman) yapmak vücudun toparlanmasını sağlar ve ardından yeni rekorlar kırabilirsin. Uyku, beslenme ve stres seviyeni de gözden geçir — bunlar da platoya neden olabilir.",
  },
];
