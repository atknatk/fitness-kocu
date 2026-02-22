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
  protein: "~150g",
  carbs: "~185g",
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
          "180g ızgara tavuk göğsü + 1 porsiyon bulgur pilavı + büyük karışık salata (zeytinyağı-limon sos)",
        cal: "~600 kcal",
        protein: "~52g",
      },
      {
        title: "Köfte Tabağı",
        items:
          "180g ızgara köfte (az yağlı) + 1 porsiyon tam buğday makarna + haşlanmış brokoli",
        cal: "~620 kcal",
        protein: "~46g",
      },
      {
        title: "Balık Öğle",
        items:
          "180g ızgara balık + pirinç pilavı (küçük porsiyon) + mevsim salatası",
        cal: "~560 kcal",
        protein: "~48g",
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
        title: "Süzme Yoğurt",
        items: "200g süzme yoğurt + 1 elma + 5 badem",
        cal: "~220 kcal",
        protein: "~20g",
      },
      {
        title: "Lor Peynirli Atıştırma",
        items: "100g lor peyniri + 1 dilim tam buğday ekmek + salatalık",
        cal: "~200 kcal",
        protein: "~18g",
      },
      {
        title: "Fıstık Ezmeli",
        items: "2 yemek kaşığı fıstık ezmesi + 1 dilim tam buğday ekmek + 1 bardak süt",
        cal: "~280 kcal",
        protein: "~17g",
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
          "180g somon/levrek (fırında) + sebze çorbası + yeşil salata",
        cal: "~500 kcal",
        protein: "~44g",
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
          "160g tavuk sote + bol sebze (kabak, biber, mantar) + 1 kase yoğurt",
        cal: "~480 kcal",
        protein: "~42g",
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
  carbs: "~180g",
  fat: "~45g",
};

// =============================================
// KADIN — Beslenme Planı (7 öğün — Body Recomp)
// =============================================
const FEMALE_MEALS: MealSection[] = [
  {
    key: "breakfast",
    icon: "🌅",
    time: "06:00",
    title: "Kahvaltı",
    meals: [
      {
        title: "Seçenek A",
        items:
          "2 yumurta (haşlanmış) + 1 dilim tam buğday ekmek + salatalık-biber + 1 çay kaşığı zeytinyağı + yeşillik",
        cal: "~370 kcal",
        protein: "~18g",
      },
      {
        title: "Seçenek B",
        items:
          "1 kase yulaf (40g) + 150ml süt + 1 yemek kaşığı bal + 5-6 badem + muz yarısı",
        cal: "~350 kcal",
        protein: "~12g",
      },
      {
        title: "Seçenek C",
        items:
          "200g yoğurt + 2 yemek kaşığı yulaf + 1 avuç yaban mersini + 1 tatlı kaşığı bal",
        cal: "~350 kcal",
        protein: "~14g",
      },
    ],
  },
  {
    key: "snack1",
    icon: "🍎",
    time: "09:30",
    title: "Ara Öğün 1",
    meals: [
      {
        title: "Seçenek A",
        items: "1 avuç badem (15g) + 1 küçük elma",
        cal: "~150 kcal",
        protein: "~4g",
      },
      {
        title: "Seçenek B",
        items: "150g yoğurt + 1 tatlı kaşığı bal",
        cal: "~150 kcal",
        protein: "~8g",
      },
      {
        title: "Seçenek C",
        items: "1 dilim tam buğday ekmek + 2 dilim beyaz peynir",
        cal: "~150 kcal",
        protein: "~8g",
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
        title: "Seçenek A",
        items:
          "150g ızgara tavuk göğsü + 1 kase bulgur pilavı (80g kuru) + bol yeşil salata + 1 tatlı kaşığı zeytinyağı",
        cal: "~450 kcal",
        protein: "~40g",
      },
      {
        title: "Seçenek B",
        items:
          "150g levrek (fırında/ızgara) + haşlanmış sebze (brokoli, havuç) + 100g esmer pirinç",
        cal: "~450 kcal",
        protein: "~38g",
      },
      {
        title: "Seçenek C",
        items:
          "150g somon + kinoa (80g kuru) + roka-salatalık salatası",
        cal: "~450 kcal",
        protein: "~38g",
      },
    ],
  },
  {
    key: "snack2",
    icon: "💪",
    time: "15:30",
    title: "Ara Öğün 2 / Antrenman Öncesi",
    meals: [
      {
        title: "Seçenek A",
        items: "1 muz + 1 yemek kaşığı fıstık ezmesi",
        cal: "~200 kcal",
        protein: "~5g",
      },
      {
        title: "Seçenek B",
        items: "150g süzme yoğurt + 1 yemek kaşığı yulaf + 5 badem",
        cal: "~200 kcal",
        protein: "~15g",
      },
      {
        title: "Seçenek C",
        items:
          "Protein smoothie: 200ml süt + 1 muz + 1 yemek kaşığı yulaf",
        cal: "~200 kcal",
        protein: "~10g",
      },
    ],
  },
  {
    key: "pre_workout",
    icon: "☕",
    time: "17:30",
    title: "Antrenman Öncesi",
    meals: [
      {
        title: "Yeşil Çay / Kahve + Hurma",
        items: "1 fincan yeşil çay veya siyah kahve + 3-4 hurma",
        cal: "~50 kcal",
        protein: "~1g",
      },
    ],
  },
  {
    key: "dinner",
    icon: "🌙",
    time: "19:30",
    title: "Akşam Yemeği / Antrenman Sonrası",
    meals: [
      {
        title: "Seçenek A",
        items:
          "150g antrikot (ızgara) + bol yeşil salata + 1 dilim ekmek",
        cal: "~400 kcal",
        protein: "~35g",
      },
      {
        title: "Seçenek B",
        items:
          "150g tavuk göğsü + fırında sebze (kabak, biber, patlıcan) + 80g makarna",
        cal: "~400 kcal",
        protein: "~38g",
      },
      {
        title: "Seçenek C",
        items:
          "150g somon/levrek + haşlanmış patates (1 orta boy) + salata",
        cal: "~400 kcal",
        protein: "~35g",
      },
    ],
  },
  {
    key: "evening_snack",
    icon: "🌜",
    time: "21:30",
    title: "Gece Atıştırma (İsteğe Bağlı)",
    meals: [
      {
        title: "Seçenek A",
        items: "150g yoğurt",
        cal: "~100 kcal",
        protein: "~6g",
      },
      {
        title: "Seçenek B",
        items: "200ml ılık süt + tarçın",
        cal: "~100 kcal",
        protein: "~7g",
      },
      {
        title: "Seçenek C",
        items: "10 badem",
        cal: "~100 kcal",
        protein: "~4g",
      },
    ],
  },
];
