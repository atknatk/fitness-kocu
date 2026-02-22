import { MealSection, ProgramType } from "@/types";

export function getMeals(programType: ProgramType): MealSection[] {
  return programType === "female_recomp" ? FEMALE_MEALS : MALE_MEALS;
}

export function getMacroTargets(programType: ProgramType) {
  return programType === "female_recomp" ? FEMALE_MACROS : MALE_MACROS;
}

// =============================================
// ERKEK — Günlük Makro Hedefleri
// =============================================
const MALE_MACROS = {
  calories: "1800-2000",
  protein: "~135g",
  carbs: "~200g",
  fat: "~65g",
};

// =============================================
// ERKEK — Beslenme Planı (4 öğün)
// =============================================
const MALE_MEALS: MealSection[] = [
  {
    key: "breakfast",
    icon: "🌅",
    time: "08:30",
    title: "Kahvaltı",
    meals: [
      {
        title: "Proteinli Kahvaltı",
        items:
          "2 yumurta (haşlanmış veya menemen) + 1 dilim tam buğday ekmek + domates, salatalık + az peynir + çay",
        cal: "~400 kcal",
        protein: "~25g",
      },
      {
        title: "Yulaf Kahvaltısı",
        items:
          "50g yulaf + süt + 1 muz + 1 tatlı kaşığı bal + tarçın + çay/kahve",
        cal: "~420 kcal",
        protein: "~15g",
      },
      {
        title: "Lor Peynirli",
        items:
          "Lor peyniri (100g) + ceviz + bal + 1 dilim ekmek + domates + çay",
        cal: "~400 kcal",
        protein: "~28g",
      },
    ],
  },
  {
    key: "lunch",
    icon: "🍽",
    time: "13:30",
    title: "Öğle Yemeği (Antrenman Sonrası)",
    meals: [
      {
        title: "Izgara Tavuk",
        items:
          "150g ızgara tavuk göğsü + 1 porsiyon bulgur pilavı + büyük karışık salata (zeytinyağı-limon sos)",
        cal: "~550 kcal",
        protein: "~45g",
      },
      {
        title: "Köfte Tabağı",
        items:
          "150g ızgara köfte (az yağlı) + 1 porsiyon tam buğday makarna + haşlanmış brokoli",
        cal: "~570 kcal",
        protein: "~40g",
      },
      {
        title: "Balık Öğle",
        items:
          "150g ızgara balık + pirinç pilavı (küçük porsiyon) + mevsim salatası",
        cal: "~520 kcal",
        protein: "~42g",
      },
    ],
  },
  {
    key: "snack",
    icon: "🍎",
    time: "16:30",
    title: "Ara Öğün",
    meals: [
      {
        title: "Kuruyemiş Mix",
        items: "1 avuç badem (30g) + 1 elma",
        cal: "~200 kcal",
        protein: "~7g",
      },
      {
        title: "Yoğurt + Meyve",
        items: "1 kase yoğurt + 1 tatlı kaşığı bal + çilek/muz",
        cal: "~220 kcal",
        protein: "~10g",
      },
      {
        title: "Protein Atıştırma",
        items: "2 yemek kaşığı fıstık ezmesi + 1 dilim tam buğday ekmek",
        cal: "~230 kcal",
        protein: "~12g",
      },
    ],
  },
  {
    key: "dinner",
    icon: "🌙",
    time: "19:30",
    title: "Akşam Yemeği",
    meals: [
      {
        title: "Balık Akşam",
        items:
          "150g somon/levrek (fırında) + sebze çorbası + yeşil salata",
        cal: "~450 kcal",
        protein: "~38g",
      },
      {
        title: "Omlet Akşam",
        items:
          "3 yumurtalı sebzeli omlet + mercimek çorbası + 1 dilim ekmek",
        cal: "~470 kcal",
        protein: "~32g",
      },
      {
        title: "Tavuk Sote",
        items:
          "130g tavuk sote + bol sebze (kabak, biber, mantar) + 1 kase yoğurt",
        cal: "~430 kcal",
        protein: "~35g",
      },
    ],
  },
];

// =============================================
// KADIN — Günlük Makro Hedefleri (Body Recomp)
// =============================================
const FEMALE_MACROS = {
  calories: "1500-1650",
  protein: "~100g",
  carbs: "~140g",
  fat: "~45g",
};

// =============================================
// KADIN — Beslenme Planı (5 öğün — Body Recomp)
// =============================================
const FEMALE_MEALS: MealSection[] = [
  {
    key: "breakfast",
    icon: "🌅",
    time: "05:30",
    title: "Kahvaltı",
    meals: [
      {
        title: "Yulaf + Protein",
        items:
          "1 porsiyon yulaf, 1 ölçek protein tozu, 5 badem, yarım muz",
        cal: "~340 kcal",
        protein: "~28g",
      },
      {
        title: "Yumurta Kahvaltı",
        items:
          "2 yumurta (1 bütün + 1 beyaz), 1 dilim tam buğday ekmek, domates, salatalık",
        cal: "~300 kcal",
        protein: "~22g",
      },
      {
        title: "Smoothie Bowl",
        items:
          "1 avuç dondurulmuş meyve, 150ml süt, 1 ölçek protein tozu, 1 yemek kaşığı chia",
        cal: "~320 kcal",
        protein: "~25g",
      },
    ],
  },
  {
    key: "mid_morning",
    icon: "🍎",
    time: "09:00",
    title: "Kuşluk",
    meals: [
      {
        title: "Yoğurt + Meyve",
        items:
          "150g Yunan yoğurdu, 1 avuç çilek, 1 tatlı kaşığı bal",
        cal: "~180 kcal",
        protein: "~12g",
      },
      {
        title: "Peynir + Ceviz",
        items:
          "30g beyaz peynir, 3 ceviz, 1 dilim tam buğday ekmek",
        cal: "~200 kcal",
        protein: "~10g",
      },
      {
        title: "Muz + Fıstık Ezmesi",
        items: "1 küçük muz, 1 tatlı kaşığı fıstık ezmesi",
        cal: "~170 kcal",
        protein: "~5g",
      },
    ],
  },
  {
    key: "lunch",
    icon: "🍽",
    time: "12:30",
    title: "Öğle Yemeği",
    meals: [
      {
        title: "Izgara Tavuk Salatası",
        items:
          "150g ızgara tavuk göğsü, bol yeşillik, 1 yemek kaşığı zeytinyağı, limon",
        cal: "~400 kcal",
        protein: "~35g",
      },
      {
        title: "Ton Balıklı Wrap",
        items:
          "1 tam buğday lavaş, 100g ton balığı, marul, domates, yoğurt sos",
        cal: "~420 kcal",
        protein: "~30g",
      },
      {
        title: "Mercimek Çorbası + Tavuk",
        items:
          "1 kase mercimek çorbası, 100g haşlanmış tavuk, salata",
        cal: "~450 kcal",
        protein: "~32g",
      },
    ],
  },
  {
    key: "pre_workout",
    icon: "💪",
    time: "16:30",
    title: "Antrenman Öncesi",
    meals: [
      {
        title: "Pirinç Keki + Peynir",
        items: "2 pirinç keki, 30g lor peyniri, bal",
        cal: "~200 kcal",
        protein: "~15g",
      },
      {
        title: "Muz + Protein Bar",
        items: "1 küçük muz, yarım protein bar",
        cal: "~220 kcal",
        protein: "~12g",
      },
      {
        title: "Yulaf Topları",
        items:
          "2 ev yapımı yulaf topları (yulaf, bal, fıstık ezmesi)",
        cal: "~230 kcal",
        protein: "~8g",
      },
    ],
  },
  {
    key: "dinner",
    icon: "🌙",
    time: "19:30",
    title: "Akşam Yemeği (antrenman sonrası)",
    meals: [
      {
        title: "Somon + Sebze",
        items:
          "150g fırında somon, buharda brokoli ve havuç, 1/2 porsiyon bulgur",
        cal: "~400 kcal",
        protein: "~32g",
      },
      {
        title: "Tavuk Sote",
        items:
          "150g tavuk göğsü sote, bol sebze (biber, kabak, mantar), 1/2 porsiyon pirinç",
        cal: "~380 kcal",
        protein: "~30g",
      },
      {
        title: "Köfte + Salata",
        items:
          "100g ev yapımı köfte (yağsız), bol yeşil salata, 1 dilim ekmek",
        cal: "~370 kcal",
        protein: "~28g",
      },
    ],
  },
];
