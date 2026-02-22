export interface Meal {
  title: string;
  items: string;
  cal: string;
  protein: string;
}

export interface MealSection {
  key: string;
  icon: string;
  time: string;
  title: string;
  meals: Meal[];
}

export const MEAL_SECTIONS: MealSection[] = [
  {
    key: "breakfast",
    icon: "🌅",
    time: "08:30",
    title: "Kahvaltı",
    meals: [
      { title: "Proteinli Kahvaltı", items: "2 yumurta (haşlanmış veya menemen) + 1 dilim tam buğday ekmek + domates, salatalık + az peynir + çay", cal: "~400 kcal", protein: "~25g" },
      { title: "Yulaf Kahvaltısı", items: "50g yulaf + süt + 1 muz + 1 tatlı kaşığı bal + tarçın + çay/kahve", cal: "~420 kcal", protein: "~15g" },
      { title: "Lor Peynirli", items: "Lor peyniri (100g) + ceviz + bal + 1 dilim ekmek + domates + çay", cal: "~400 kcal", protein: "~28g" },
    ],
  },
  {
    key: "lunch",
    icon: "🍽",
    time: "13:30",
    title: "Öğle Yemeği (Antrenman Sonrası)",
    meals: [
      { title: "Izgara Tavuk", items: "150g ızgara tavuk göğsü + 1 porsiyon bulgur pilavı + büyük karışık salata (zeytinyağı-limon sos)", cal: "~550 kcal", protein: "~45g" },
      { title: "Köfte Tabağı", items: "150g ızgara köfte (az yağlı) + 1 porsiyon tam buğday makarna + haşlanmış brokoli", cal: "~570 kcal", protein: "~40g" },
      { title: "Balık Öğle", items: "150g ızgara balık + pirinç pilavı (küçük porsiyon) + mevsim salatası", cal: "~520 kcal", protein: "~42g" },
    ],
  },
  {
    key: "snack",
    icon: "🍎",
    time: "16:30",
    title: "Ara Öğün",
    meals: [
      { title: "Kuruyemiş Mix", items: "1 avuç badem (30g) + 1 elma", cal: "~200 kcal", protein: "~7g" },
      { title: "Yoğurt + Meyve", items: "1 kase yoğurt + 1 tatlı kaşığı bal + çilek/muz", cal: "~220 kcal", protein: "~10g" },
      { title: "Protein Atıştırma", items: "2 yemek kaşığı fıstık ezmesi + 1 dilim tam buğday ekmek", cal: "~230 kcal", protein: "~12g" },
    ],
  },
  {
    key: "dinner",
    icon: "🌙",
    time: "19:30",
    title: "Akşam Yemeği",
    meals: [
      { title: "Balık Akşam", items: "150g somon/levrek (fırında) + sebze çorbası + yeşil salata", cal: "~450 kcal", protein: "~38g" },
      { title: "Omlet Akşam", items: "3 yumurtalı sebzeli omlet + mercimek çorbası + 1 dilim ekmek", cal: "~470 kcal", protein: "~32g" },
      { title: "Tavuk Sote", items: "130g tavuk sote + bol sebze (kabak, biber, mantar) + 1 kase yoğurt", cal: "~430 kcal", protein: "~35g" },
    ],
  },
];
