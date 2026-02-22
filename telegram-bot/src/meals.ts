import { UserKey } from "./users";

// =====================================================================
// Types
// =====================================================================

type IngredientCategory =
  | "protein"
  | "sebze_meyve"
  | "sut_urunleri"
  | "tahil"
  | "diger";

interface Ingredient {
  name: string;
  amount: string;
  category: IngredientCategory;
}

interface MealItem {
  title: string;
  description: string;
  cal: string;
  protein: string;
  ingredients: Ingredient[];
}

interface DailyMealPlan {
  breakfast: MealItem;
  lunch?: MealItem;
  dinner: MealItem;
}

// =====================================================================
// Day names
// =====================================================================

const DAY_NAMES = [
  "Pazartesi",
  "Sali",
  "Carsamba",
  "Persembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
];

// =====================================================================
// ATAKAN - 7 Gunluk Beslenme (Kahvalti + Aksam, ~1800-2000 kcal)
// =====================================================================

const ATAKAN_MEALS: DailyMealPlan[] = [
  // Pazartesi
  {
    breakfast: {
      title: "Menemen Kahvalti",
      description:
        "3 yumurtali menemen + 2 dilim tam bugday ekmek + beyaz peynir (30g) + cay",
      cal: "~650 kcal",
      protein: "~40g",
      ingredients: [
        { name: "Yumurta", amount: "3 adet", category: "protein" },
        { name: "Domates", amount: "2 adet", category: "sebze_meyve" },
        { name: "Biber", amount: "1 adet", category: "sebze_meyve" },
        { name: "Beyaz peynir", amount: "30g", category: "sut_urunleri" },
        {
          name: "Tam bugday ekmek",
          amount: "2 dilim",
          category: "tahil",
        },
        { name: "Zeytinyagi", amount: "1 yk", category: "diger" },
      ],
    },
    dinner: {
      title: "Izgara Tavuk + Bulgur",
      description:
        "300g izgara tavuk gogsu + bulgur pilavi (100g kuru) + karisik salata + 200g suzme yogurt + 1 elma",
      cal: "~1250 kcal",
      protein: "~110g",
      ingredients: [
        { name: "Tavuk gogsu", amount: "300g", category: "protein" },
        { name: "Bulgur", amount: "100g", category: "tahil" },
        { name: "Marul", amount: "100g", category: "sebze_meyve" },
        { name: "Domates", amount: "1 adet", category: "sebze_meyve" },
        { name: "Salatalik", amount: "1 adet", category: "sebze_meyve" },
        {
          name: "Suzme yogurt",
          amount: "200g",
          category: "sut_urunleri",
        },
        { name: "Elma", amount: "1 adet", category: "sebze_meyve" },
        { name: "Zeytinyagi", amount: "1 yk", category: "diger" },
        { name: "Limon", amount: "1/2 adet", category: "sebze_meyve" },
      ],
    },
  },
  // Sali
  {
    breakfast: {
      title: "Yulaf + Yumurta",
      description:
        "50g yulaf + 200ml sut + 1 muz + 2 yk fistik ezmesi + 2 haslanmis yumurta + cay",
      cal: "~680 kcal",
      protein: "~35g",
      ingredients: [
        { name: "Yulaf", amount: "50g", category: "tahil" },
        { name: "Sut", amount: "200ml", category: "sut_urunleri" },
        { name: "Muz", amount: "1 adet", category: "sebze_meyve" },
        { name: "Fistik ezmesi", amount: "2 yk", category: "diger" },
        { name: "Yumurta", amount: "2 adet", category: "protein" },
      ],
    },
    dinner: {
      title: "Kofte + Makarna",
      description:
        "200g izgara kofte (az yagli) + tam bugday makarna (80g kuru) + haslanmis brokoli + 200ml ayran + 100g lor peyniri",
      cal: "~1200 kcal",
      protein: "~98g",
      ingredients: [
        {
          name: "Dana kiyma (az yagli)",
          amount: "200g",
          category: "protein",
        },
        {
          name: "Tam bugday makarna",
          amount: "80g",
          category: "tahil",
        },
        { name: "Brokoli", amount: "200g", category: "sebze_meyve" },
        { name: "Ayran", amount: "200ml", category: "sut_urunleri" },
        {
          name: "Lor peyniri",
          amount: "100g",
          category: "sut_urunleri",
        },
      ],
    },
  },
  // Carsamba
  {
    breakfast: {
      title: "Lor Peynirli Kahvalti",
      description:
        "200g lor peyniri + 1 dilim ekmek + domates + salatalik + 5 zeytin + 20g ceviz + cay",
      cal: "~550 kcal",
      protein: "~38g",
      ingredients: [
        {
          name: "Lor peyniri",
          amount: "200g",
          category: "sut_urunleri",
        },
        {
          name: "Tam bugday ekmek",
          amount: "1 dilim",
          category: "tahil",
        },
        { name: "Domates", amount: "1 adet", category: "sebze_meyve" },
        { name: "Salatalik", amount: "1 adet", category: "sebze_meyve" },
        { name: "Zeytin", amount: "5 adet", category: "diger" },
        { name: "Ceviz", amount: "20g", category: "diger" },
      ],
    },
    dinner: {
      title: "Firinda Somon + Pilav",
      description:
        "250g firinda somon + pirinc pilavi (80g kuru) + mevsim salatasi + 200g yogurt + 1 portakal",
      cal: "~1250 kcal",
      protein: "~95g",
      ingredients: [
        { name: "Somon fileto", amount: "250g", category: "protein" },
        { name: "Pirinc", amount: "80g", category: "tahil" },
        { name: "Marul", amount: "100g", category: "sebze_meyve" },
        { name: "Domates", amount: "1 adet", category: "sebze_meyve" },
        { name: "Yogurt", amount: "200g", category: "sut_urunleri" },
        { name: "Portakal", amount: "1 adet", category: "sebze_meyve" },
        { name: "Zeytinyagi", amount: "1 yk", category: "diger" },
      ],
    },
  },
  // Persembe
  {
    breakfast: {
      title: "Peynirli Omlet",
      description:
        "3 yumurtali peynirli omlet + 2 dilim ekmek + yesillik + cay",
      cal: "~620 kcal",
      protein: "~40g",
      ingredients: [
        { name: "Yumurta", amount: "3 adet", category: "protein" },
        { name: "Beyaz peynir", amount: "30g", category: "sut_urunleri" },
        {
          name: "Tam bugday ekmek",
          amount: "2 dilim",
          category: "tahil",
        },
        { name: "Maydanoz", amount: "1 tutam", category: "sebze_meyve" },
      ],
    },
    dinner: {
      title: "Tavuk Sote + Bulgur",
      description:
        "300g tavuk sote (kabak, biber, mantar) + bulgur pilavi (100g kuru) + cacik (200g yogurt + salatalik) + 1 dilim ekmek",
      cal: "~1250 kcal",
      protein: "~105g",
      ingredients: [
        { name: "Tavuk gogsu", amount: "300g", category: "protein" },
        { name: "Kabak", amount: "1 adet", category: "sebze_meyve" },
        { name: "Biber", amount: "2 adet", category: "sebze_meyve" },
        { name: "Mantar", amount: "100g", category: "sebze_meyve" },
        { name: "Bulgur", amount: "100g", category: "tahil" },
        { name: "Yogurt", amount: "200g", category: "sut_urunleri" },
        { name: "Salatalik", amount: "1 adet", category: "sebze_meyve" },
        {
          name: "Tam bugday ekmek",
          amount: "1 dilim",
          category: "tahil",
        },
      ],
    },
  },
  // Cuma
  {
    breakfast: {
      title: "Yulaf Pankek",
      description:
        "Yulaf pankek (2 yumurta + 40g yulaf) + 100g suzme yogurt + bal + 1 muz + cay",
      cal: "~600 kcal",
      protein: "~32g",
      ingredients: [
        { name: "Yumurta", amount: "2 adet", category: "protein" },
        { name: "Yulaf", amount: "40g", category: "tahil" },
        {
          name: "Suzme yogurt",
          amount: "100g",
          category: "sut_urunleri",
        },
        { name: "Bal", amount: "1 yk", category: "diger" },
        { name: "Muz", amount: "1 adet", category: "sebze_meyve" },
      ],
    },
    dinner: {
      title: "Izgara Levrek + Sebze",
      description:
        "250g izgara levrek + firinda sebze (patates, havuc, kabak) + mercimek corbasi + 200g yogurt",
      cal: "~1200 kcal",
      protein: "~90g",
      ingredients: [
        { name: "Levrek", amount: "250g", category: "protein" },
        { name: "Patates", amount: "2 adet", category: "sebze_meyve" },
        { name: "Havuc", amount: "2 adet", category: "sebze_meyve" },
        { name: "Kabak", amount: "1 adet", category: "sebze_meyve" },
        {
          name: "Kirmizi mercimek",
          amount: "100g",
          category: "tahil",
        },
        { name: "Yogurt", amount: "200g", category: "sut_urunleri" },
        { name: "Sogan", amount: "1 adet", category: "sebze_meyve" },
        { name: "Zeytinyagi", amount: "1 yk", category: "diger" },
      ],
    },
  },
  // Cumartesi
  {
    breakfast: {
      title: "Tost + Yumurta",
      description:
        "2 dilim tam tahilli tost (beyaz peynir + domates) + 2 haslanmis yumurta + cay",
      cal: "~580 kcal",
      protein: "~35g",
      ingredients: [
        { name: "Yumurta", amount: "2 adet", category: "protein" },
        { name: "Beyaz peynir", amount: "40g", category: "sut_urunleri" },
        {
          name: "Tam bugday ekmek",
          amount: "2 dilim",
          category: "tahil",
        },
        { name: "Domates", amount: "1 adet", category: "sebze_meyve" },
      ],
    },
    dinner: {
      title: "Biftek + Patates",
      description:
        "250g biftek (izgara) + firinda patates + yesil salata + 200g yogurt + 1 elma",
      cal: "~1300 kcal",
      protein: "~95g",
      ingredients: [
        { name: "Biftek", amount: "250g", category: "protein" },
        { name: "Patates", amount: "2 adet", category: "sebze_meyve" },
        { name: "Marul", amount: "100g", category: "sebze_meyve" },
        { name: "Yogurt", amount: "200g", category: "sut_urunleri" },
        { name: "Elma", amount: "1 adet", category: "sebze_meyve" },
        { name: "Zeytinyagi", amount: "1 yk", category: "diger" },
      ],
    },
  },
  // Pazar
  {
    breakfast: {
      title: "Kasarli Tost + Sahanda Yumurta",
      description:
        "Kasarli tost (2 dilim ekmek + 40g kasar) + sahanda yumurta (2 yumurta) + domates + cay",
      cal: "~600 kcal",
      protein: "~33g",
      ingredients: [
        { name: "Yumurta", amount: "2 adet", category: "protein" },
        { name: "Kasar peyniri", amount: "40g", category: "sut_urunleri" },
        {
          name: "Tam bugday ekmek",
          amount: "2 dilim",
          category: "tahil",
        },
        { name: "Domates", amount: "1 adet", category: "sebze_meyve" },
        { name: "Zeytinyagi", amount: "1 ck", category: "diger" },
      ],
    },
    dinner: {
      title: "Firinda Tavuk But + Corba",
      description:
        "250g firinda tavuk but + sebze corbasi + pirinc pilavi (80g kuru) + 200g yogurt",
      cal: "~1250 kcal",
      protein: "~95g",
      ingredients: [
        { name: "Tavuk but", amount: "250g", category: "protein" },
        { name: "Pirinc", amount: "80g", category: "tahil" },
        { name: "Havuc", amount: "1 adet", category: "sebze_meyve" },
        { name: "Patates", amount: "1 adet", category: "sebze_meyve" },
        { name: "Kabak", amount: "1 adet", category: "sebze_meyve" },
        { name: "Sogan", amount: "1 adet", category: "sebze_meyve" },
        { name: "Yogurt", amount: "200g", category: "sut_urunleri" },
      ],
    },
  },
];

// =====================================================================
// TUVIK - 7 Gunluk Beslenme (Kahvalti + Ogle + Aksam, ~1500-1650 kcal)
// =====================================================================

const TUVIK_MEALS: DailyMealPlan[] = [
  // Pazartesi
  {
    breakfast: {
      title: "Yumurtali Kahvalti",
      description:
        "2 haslanmis yumurta + 1 dilim ekmek + salatalik-biber + 1 ck zeytinyagi + cay",
      cal: "~370 kcal",
      protein: "~18g",
      ingredients: [
        { name: "Yumurta", amount: "2 adet", category: "protein" },
        {
          name: "Tam bugday ekmek",
          amount: "1 dilim",
          category: "tahil",
        },
        { name: "Salatalik", amount: "1 adet", category: "sebze_meyve" },
        { name: "Biber", amount: "1 adet", category: "sebze_meyve" },
        { name: "Zeytinyagi", amount: "1 ck", category: "diger" },
      ],
    },
    lunch: {
      title: "Izgara Tavuk + Bulgur",
      description:
        "150g izgara tavuk + bulgur pilavi (80g kuru) + yesil salata + 1 ck zeytinyagi",
      cal: "~500 kcal",
      protein: "~40g",
      ingredients: [
        { name: "Tavuk gogsu", amount: "150g", category: "protein" },
        { name: "Bulgur", amount: "80g", category: "tahil" },
        { name: "Marul", amount: "80g", category: "sebze_meyve" },
        { name: "Zeytinyagi", amount: "1 ck", category: "diger" },
      ],
    },
    dinner: {
      title: "Firinda Levrek + Sebze",
      description:
        "150g firinda levrek + haslanmis sebze (brokoli, havuc) + 200g yogurt + 1 dilim ekmek",
      cal: "~550 kcal",
      protein: "~38g",
      ingredients: [
        { name: "Levrek", amount: "150g", category: "protein" },
        { name: "Brokoli", amount: "150g", category: "sebze_meyve" },
        { name: "Havuc", amount: "1 adet", category: "sebze_meyve" },
        { name: "Yogurt", amount: "200g", category: "sut_urunleri" },
        {
          name: "Tam bugday ekmek",
          amount: "1 dilim",
          category: "tahil",
        },
      ],
    },
  },
  // Sali
  {
    breakfast: {
      title: "Yulafli Kahvalti",
      description:
        "40g yulaf + 150ml sut + 1 yk bal + 5 badem + yari muz + cay",
      cal: "~350 kcal",
      protein: "~12g",
      ingredients: [
        { name: "Yulaf", amount: "40g", category: "tahil" },
        { name: "Sut", amount: "150ml", category: "sut_urunleri" },
        { name: "Bal", amount: "1 yk", category: "diger" },
        { name: "Badem", amount: "5 adet", category: "diger" },
        { name: "Muz", amount: "1/2 adet", category: "sebze_meyve" },
      ],
    },
    lunch: {
      title: "Kofte + Makarna",
      description:
        "150g izgara kofte + tam bugday makarna (60g kuru) + salata",
      cal: "~500 kcal",
      protein: "~35g",
      ingredients: [
        {
          name: "Dana kiyma (az yagli)",
          amount: "150g",
          category: "protein",
        },
        {
          name: "Tam bugday makarna",
          amount: "60g",
          category: "tahil",
        },
        { name: "Marul", amount: "80g", category: "sebze_meyve" },
        { name: "Domates", amount: "1 adet", category: "sebze_meyve" },
      ],
    },
    dinner: {
      title: "Sebzeli Omlet + Corba",
      description:
        "3 yumurtali sebzeli omlet + mercimek corbasi + 1 dilim ekmek",
      cal: "~500 kcal",
      protein: "~32g",
      ingredients: [
        { name: "Yumurta", amount: "3 adet", category: "protein" },
        { name: "Biber", amount: "1 adet", category: "sebze_meyve" },
        { name: "Domates", amount: "1 adet", category: "sebze_meyve" },
        {
          name: "Kirmizi mercimek",
          amount: "80g",
          category: "tahil",
        },
        {
          name: "Tam bugday ekmek",
          amount: "1 dilim",
          category: "tahil",
        },
        { name: "Sogan", amount: "1/2 adet", category: "sebze_meyve" },
      ],
    },
  },
  // Carsamba
  {
    breakfast: {
      title: "Yogurtlu Kahvalti",
      description:
        "200g yogurt + 2 yk yulaf + yaban mersini (1 avuc) + 1 tk bal + cay",
      cal: "~350 kcal",
      protein: "~14g",
      ingredients: [
        { name: "Yogurt", amount: "200g", category: "sut_urunleri" },
        { name: "Yulaf", amount: "20g", category: "tahil" },
        {
          name: "Yaban mersini",
          amount: "1 avuc",
          category: "sebze_meyve",
        },
        { name: "Bal", amount: "1 tk", category: "diger" },
      ],
    },
    lunch: {
      title: "Somon + Kinoa",
      description: "150g somon + kinoa (60g kuru) + roka salatasi",
      cal: "~520 kcal",
      protein: "~38g",
      ingredients: [
        { name: "Somon fileto", amount: "150g", category: "protein" },
        { name: "Kinoa", amount: "60g", category: "tahil" },
        { name: "Roka", amount: "80g", category: "sebze_meyve" },
        { name: "Zeytinyagi", amount: "1 ck", category: "diger" },
        { name: "Limon", amount: "1/2 adet", category: "sebze_meyve" },
      ],
    },
    dinner: {
      title: "Tavuk Sote + Sebze",
      description:
        "150g tavuk gogsu sote + firinda sebze (kabak, biber, patlican) + 200g yogurt",
      cal: "~500 kcal",
      protein: "~38g",
      ingredients: [
        { name: "Tavuk gogsu", amount: "150g", category: "protein" },
        { name: "Kabak", amount: "1 adet", category: "sebze_meyve" },
        { name: "Biber", amount: "1 adet", category: "sebze_meyve" },
        { name: "Patlican", amount: "1 adet", category: "sebze_meyve" },
        { name: "Yogurt", amount: "200g", category: "sut_urunleri" },
        { name: "Zeytinyagi", amount: "1 ck", category: "diger" },
      ],
    },
  },
  // Persembe
  {
    breakfast: {
      title: "Lor Peynirli Kahvalti",
      description:
        "2 haslanmis yumurta + lor peyniri (80g) + domates + 1 dilim ekmek + cay",
      cal: "~400 kcal",
      protein: "~28g",
      ingredients: [
        { name: "Yumurta", amount: "2 adet", category: "protein" },
        {
          name: "Lor peyniri",
          amount: "80g",
          category: "sut_urunleri",
        },
        { name: "Domates", amount: "1 adet", category: "sebze_meyve" },
        {
          name: "Tam bugday ekmek",
          amount: "1 dilim",
          category: "tahil",
        },
      ],
    },
    lunch: {
      title: "Mercimek Corbasi + Peynir",
      description:
        "Mercimek corbasi (buyuk kase) + 1 dilim ekmek + 100g beyaz peynir + salata",
      cal: "~500 kcal",
      protein: "~28g",
      ingredients: [
        {
          name: "Kirmizi mercimek",
          amount: "100g",
          category: "tahil",
        },
        {
          name: "Tam bugday ekmek",
          amount: "1 dilim",
          category: "tahil",
        },
        {
          name: "Beyaz peynir",
          amount: "100g",
          category: "sut_urunleri",
        },
        { name: "Marul", amount: "80g", category: "sebze_meyve" },
        { name: "Domates", amount: "1 adet", category: "sebze_meyve" },
        { name: "Sogan", amount: "1/2 adet", category: "sebze_meyve" },
      ],
    },
    dinner: {
      title: "Antrikot + Salata",
      description:
        "150g antrikot (izgara) + yesil salata + 1 dilim ekmek + 200g yogurt",
      cal: "~550 kcal",
      protein: "~40g",
      ingredients: [
        { name: "Antrikot", amount: "150g", category: "protein" },
        { name: "Marul", amount: "100g", category: "sebze_meyve" },
        {
          name: "Tam bugday ekmek",
          amount: "1 dilim",
          category: "tahil",
        },
        { name: "Yogurt", amount: "200g", category: "sut_urunleri" },
        { name: "Zeytinyagi", amount: "1 ck", category: "diger" },
      ],
    },
  },
  // Cuma
  {
    breakfast: {
      title: "Fistik Ezmeli Kahvalti",
      description:
        "1 dilim ekmek + fistik ezmesi (1 yk) + 1 muz + 150g yogurt + cay",
      cal: "~380 kcal",
      protein: "~14g",
      ingredients: [
        {
          name: "Tam bugday ekmek",
          amount: "1 dilim",
          category: "tahil",
        },
        { name: "Fistik ezmesi", amount: "1 yk", category: "diger" },
        { name: "Muz", amount: "1 adet", category: "sebze_meyve" },
        { name: "Yogurt", amount: "150g", category: "sut_urunleri" },
      ],
    },
    lunch: {
      title: "Tavuk + Pilav",
      description:
        "150g tavuk gogsu + pirinc pilavi (60g kuru) + haslanmis brokoli",
      cal: "~480 kcal",
      protein: "~38g",
      ingredients: [
        { name: "Tavuk gogsu", amount: "150g", category: "protein" },
        { name: "Pirinc", amount: "60g", category: "tahil" },
        { name: "Brokoli", amount: "150g", category: "sebze_meyve" },
      ],
    },
    dinner: {
      title: "Firinda Somon + Patates",
      description:
        "150g firinda somon + patates puresi (1 orta boy) + salata + 200g yogurt",
      cal: "~550 kcal",
      protein: "~35g",
      ingredients: [
        { name: "Somon fileto", amount: "150g", category: "protein" },
        { name: "Patates", amount: "1 adet", category: "sebze_meyve" },
        { name: "Marul", amount: "80g", category: "sebze_meyve" },
        { name: "Yogurt", amount: "200g", category: "sut_urunleri" },
        { name: "Sut", amount: "50ml", category: "sut_urunleri" },
      ],
    },
  },
  // Cumartesi
  {
    breakfast: {
      title: "Peynirli Omlet",
      description:
        "Peynirli omlet (2 yumurta + 30g peynir) + 1 dilim ekmek + yesillik + cay",
      cal: "~400 kcal",
      protein: "~22g",
      ingredients: [
        { name: "Yumurta", amount: "2 adet", category: "protein" },
        { name: "Beyaz peynir", amount: "30g", category: "sut_urunleri" },
        {
          name: "Tam bugday ekmek",
          amount: "1 dilim",
          category: "tahil",
        },
        { name: "Maydanoz", amount: "1 tutam", category: "sebze_meyve" },
      ],
    },
    lunch: {
      title: "Ton Balikli Salata",
      description:
        "Ton balikli salata (1 kutu ton + yesil salata + misir + limon) + 1 dilim ekmek",
      cal: "~450 kcal",
      protein: "~35g",
      ingredients: [
        { name: "Ton baligi (konserve)", amount: "1 kutu", category: "protein" },
        { name: "Marul", amount: "100g", category: "sebze_meyve" },
        { name: "Misir (konserve)", amount: "3 yk", category: "sebze_meyve" },
        { name: "Limon", amount: "1/2 adet", category: "sebze_meyve" },
        {
          name: "Tam bugday ekmek",
          amount: "1 dilim",
          category: "tahil",
        },
      ],
    },
    dinner: {
      title: "Tavuk Guvec + Bulgur",
      description:
        "Sebzeli tavuk guvec (150g tavuk + bol sebze) + bulgur pilavi (60g kuru) + yogurt",
      cal: "~550 kcal",
      protein: "~38g",
      ingredients: [
        { name: "Tavuk gogsu", amount: "150g", category: "protein" },
        { name: "Kabak", amount: "1 adet", category: "sebze_meyve" },
        { name: "Biber", amount: "1 adet", category: "sebze_meyve" },
        { name: "Domates", amount: "1 adet", category: "sebze_meyve" },
        { name: "Patates", amount: "1 adet", category: "sebze_meyve" },
        { name: "Bulgur", amount: "60g", category: "tahil" },
        { name: "Yogurt", amount: "200g", category: "sut_urunleri" },
      ],
    },
  },
  // Pazar
  {
    breakfast: {
      title: "Yulafli Muz Kahvalti",
      description: "40g yulaf + 150ml sut + 1 muz + bal + 5 badem + cay",
      cal: "~380 kcal",
      protein: "~12g",
      ingredients: [
        { name: "Yulaf", amount: "40g", category: "tahil" },
        { name: "Sut", amount: "150ml", category: "sut_urunleri" },
        { name: "Muz", amount: "1 adet", category: "sebze_meyve" },
        { name: "Bal", amount: "1 yk", category: "diger" },
        { name: "Badem", amount: "5 adet", category: "diger" },
      ],
    },
    lunch: {
      title: "Firinda Kofte + Patates",
      description:
        "150g firinda kofte + haslanmis patates (1 orta boy) + salata",
      cal: "~500 kcal",
      protein: "~32g",
      ingredients: [
        {
          name: "Dana kiyma (az yagli)",
          amount: "150g",
          category: "protein",
        },
        { name: "Patates", amount: "1 adet", category: "sebze_meyve" },
        { name: "Marul", amount: "80g", category: "sebze_meyve" },
        { name: "Domates", amount: "1 adet", category: "sebze_meyve" },
      ],
    },
    dinner: {
      title: "Omlet + Corba",
      description:
        "Omlet (2 yumurta + sebze) + sebze corbasi + 1 dilim ekmek + 200g yogurt",
      cal: "~450 kcal",
      protein: "~25g",
      ingredients: [
        { name: "Yumurta", amount: "2 adet", category: "protein" },
        { name: "Biber", amount: "1 adet", category: "sebze_meyve" },
        { name: "Domates", amount: "1 adet", category: "sebze_meyve" },
        { name: "Havuc", amount: "1 adet", category: "sebze_meyve" },
        { name: "Kabak", amount: "1 adet", category: "sebze_meyve" },
        {
          name: "Tam bugday ekmek",
          amount: "1 dilim",
          category: "tahil",
        },
        { name: "Yogurt", amount: "200g", category: "sut_urunleri" },
      ],
    },
  },
];

// =====================================================================
// Public Functions
// =====================================================================

export function getTodayMeals(
  userKey: UserKey,
  dayIndex: number
): DailyMealPlan {
  const meals = userKey === "tuvik" ? TUVIK_MEALS : ATAKAN_MEALS;
  return meals[Math.min(dayIndex, 6)];
}

export function formatMealMessage(
  meals: DailyMealPlan,
  dayIndex: number,
  dayType: "workout" | "cardio" | "rest",
  userName: string,
  waterTarget: number
): string {
  const dayName = DAY_NAMES[dayIndex] || "?";
  const lines: string[] = [];

  lines.push(`🍽 *${dayName} - Beslenme Planin, ${userName}!*`);
  lines.push("");

  // Breakfast
  lines.push(`🌅 *Kahvalti*`);
  lines.push(meals.breakfast.description);
  lines.push(`📊 ${meals.breakfast.cal} | ${meals.breakfast.protein} protein`);
  lines.push("");

  // Lunch (only for Tuvik)
  if (meals.lunch) {
    lines.push(`🍽 *Ogle Yemegi*`);
    lines.push(meals.lunch.description);
    lines.push(`📊 ${meals.lunch.cal} | ${meals.lunch.protein} protein`);
    lines.push("");
  }

  // Dinner
  lines.push(`🌙 *Aksam Yemegi*`);
  lines.push(meals.dinner.description);
  lines.push(`📊 ${meals.dinner.cal} | ${meals.dinner.protein} protein`);
  lines.push("");

  // Sport day note
  if (dayType === "workout" || dayType === "cardio") {
    lines.push(
      `💪 _Spor gunu: Antrenman sonrasi 1 muz veya 200ml sut ekle._`
    );
  } else {
    lines.push(`🧘 _Dinlenme gunu: Bol su ic, lif agirlikli ye._`);
  }

  lines.push("");

  // Total
  const totalCal = sumCalories(meals);
  const totalProtein = sumProtein(meals);
  lines.push(`📊 *Toplam: ${totalCal} | ${totalProtein} protein*`);
  lines.push(`💧 Hedef: ${waterTarget} bardak su`);

  return lines.join("\n");
}

function sumCalories(meals: DailyMealPlan): string {
  const extract = (s: string): number => {
    const match = s.match(/~?(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };
  const total =
    extract(meals.breakfast.cal) +
    (meals.lunch ? extract(meals.lunch.cal) : 0) +
    extract(meals.dinner.cal);
  return `~${total} kcal`;
}

function sumProtein(meals: DailyMealPlan): string {
  const extract = (s: string): number => {
    const match = s.match(/~?(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };
  const total =
    extract(meals.breakfast.protein) +
    (meals.lunch ? extract(meals.lunch.protein) : 0) +
    extract(meals.dinner.protein);
  return `~${total}g`;
}

// =====================================================================
// Shopping List
// =====================================================================

const CATEGORY_LABELS: Record<IngredientCategory, { emoji: string; label: string }> = {
  protein: { emoji: "🥩", label: "Protein" },
  sebze_meyve: { emoji: "🥬", label: "Sebze & Meyve" },
  sut_urunleri: { emoji: "🥛", label: "Sut Urunleri" },
  tahil: { emoji: "🌾", label: "Tahil & Baklagil" },
  diger: { emoji: "🫙", label: "Diger" },
};

interface AggregatedIngredient {
  name: string;
  amounts: string[];
  category: IngredientCategory;
}

export function generateShoppingList(userKey: UserKey): string {
  const meals = userKey === "tuvik" ? TUVIK_MEALS : ATAKAN_MEALS;
  const userName = userKey === "tuvik" ? "Tuvik" : "Atakan";

  // Collect all ingredients from all 7 days
  const aggregated = new Map<string, AggregatedIngredient>();

  for (const day of meals) {
    const allMeals = [day.breakfast, day.lunch, day.dinner].filter(
      Boolean
    ) as MealItem[];

    for (const meal of allMeals) {
      for (const ing of meal.ingredients) {
        const key = ing.name.toLowerCase();
        if (aggregated.has(key)) {
          aggregated.get(key)!.amounts.push(ing.amount);
        } else {
          aggregated.set(key, {
            name: ing.name,
            amounts: [ing.amount],
            category: ing.category,
          });
        }
      }
    }
  }

  // Merge amounts
  const merged: { name: string; amount: string; category: IngredientCategory }[] = [];
  for (const item of aggregated.values()) {
    merged.push({
      name: item.name,
      amount: mergeAmounts(item.amounts),
      category: item.category,
    });
  }

  // Group by category
  const groups: Record<IngredientCategory, typeof merged> = {
    protein: [],
    sebze_meyve: [],
    sut_urunleri: [],
    tahil: [],
    diger: [],
  };

  for (const item of merged) {
    groups[item.category].push(item);
  }

  // Format message
  const now = new Date();
  const nextMonday = new Date(now);
  nextMonday.setDate(now.getDate() + ((8 - now.getDay()) % 7 || 7));
  const nextSunday = new Date(nextMonday);
  nextSunday.setDate(nextMonday.getDate() + 6);

  const formatDate = (d: Date) =>
    `${d.getDate()} ${MONTHS[d.getMonth()]}`;

  const lines: string[] = [];
  lines.push(`🛒 *Haftalik Alisveris Listesi*`);
  lines.push(`📅 ${formatDate(nextMonday)} - ${formatDate(nextSunday)}`);
  lines.push(`👤 ${userName}`);
  lines.push("");

  const categoryOrder: IngredientCategory[] = [
    "protein",
    "sebze_meyve",
    "sut_urunleri",
    "tahil",
    "diger",
  ];

  for (const cat of categoryOrder) {
    const items = groups[cat];
    if (items.length === 0) continue;

    const { emoji, label } = CATEGORY_LABELS[cat];
    lines.push(`${emoji} *${label}:*`);
    for (const item of items) {
      lines.push(`• ${item.name} — ${item.amount}`);
    }
    lines.push("");
  }

  lines.push(`_Afiyet olsun!_ 🍴`);

  return lines.join("\n");
}

const MONTHS = [
  "Ocak",
  "Subat",
  "Mart",
  "Nisan",
  "Mayis",
  "Haziran",
  "Temmuz",
  "Agustos",
  "Eylul",
  "Ekim",
  "Kasim",
  "Aralik",
];

// =====================================================================
// Amount merging helpers
// =====================================================================

function mergeAmounts(amounts: string[]): string {
  // Try to sum numeric amounts with same unit
  const gramTotal = sumUnit(amounts, "g");
  if (gramTotal !== null) return `${gramTotal}g`;

  const mlTotal = sumUnit(amounts, "ml");
  if (mlTotal !== null) return `${mlTotal}ml`;

  const adetTotal = sumAdet(amounts);
  if (adetTotal !== null) return `${adetTotal} adet`;

  const dilimTotal = sumUnit(amounts, "dilim");
  if (dilimTotal !== null) return `${dilimTotal} dilim`;

  // If mixed or can't parse, just list unique amounts
  const unique = [...new Set(amounts)];
  if (unique.length === 1) return `${amounts.length}x ${unique[0]}`;
  return unique.join(" + ");
}

function sumUnit(amounts: string[], unit: string): number | null {
  let total = 0;
  let matched = 0;
  for (const a of amounts) {
    const match = a.match(new RegExp(`(\\d+)\\s*${unit}`, "i"));
    if (match) {
      total += parseInt(match[1], 10);
      matched++;
    }
  }
  return matched === amounts.length && matched > 0 ? total : null;
}

function sumAdet(amounts: string[]): number | null {
  let total = 0;
  let matched = 0;
  for (const a of amounts) {
    // Match "X adet" or just "X" where X is a number
    const match = a.match(/^(\d+)\s*adet$/i);
    if (match) {
      total += parseInt(match[1], 10);
      matched++;
    }
    // Also match fractions like "1/2 adet"
    const fracMatch = a.match(/^(\d+)\/(\d+)\s*adet$/i);
    if (fracMatch) {
      total += parseInt(fracMatch[1], 10) / parseInt(fracMatch[2], 10);
      matched++;
    }
  }
  return matched === amounts.length && matched > 0 ? Math.ceil(total) : null;
}
