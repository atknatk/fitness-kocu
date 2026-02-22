import { differenceInWeeks, differenceInDays } from "date-fns";

// =====================================================================
// Types
// =====================================================================

export type UserKey = "atakan" | "tuvik";
export type ProgramType = "male_recomp" | "female_recomp";

export interface BotUser {
  key: UserKey;
  name: string;
  chatId: string;
  programType: ProgramType;
  programStartDate: string;
  gymTime: string;
  startingWeightKg: number;
  goalWeightKg: number;
  calorieTarget: { min: number; max: number };
  proteinTarget: number;
  carbTarget: number;
  fatTarget: number;
  totalWeeks: number;
}

export interface DayPlan {
  name: string;
  type: "workout" | "cardio" | "rest";
  label: string;
  exercises: { name: string; sets: number; reps: string }[];
  note?: string;
}

// =====================================================================
// Exercise ID -> Name mapping
// =====================================================================

const EXERCISE_NAMES: Record<string, string> = {
  squat_m: "Squat (Smith)",
  chest_press: "Chest Press",
  lat_pulldown: "Lat Pulldown",
  shoulder_press: "Shoulder Press",
  plank: "Plank",
  leg_press: "Leg Press",
  seated_row: "Seated Row",
  dumbbell_press: "Dumbbell Press",
  bicep_curl: "Bicep Curl",
  crunch: "Crunch",
  treadmill: "Kosu Bandi",
  bike: "Bisiklet",
  bicycle_crunch: "Bicycle Crunch",
  leg_raise: "Leg Raise",
  bench_press: "Bench Press",
  tricep_pushdown: "Tricep Pushdown",
  dumbbell_row: "Dumbbell Row",
  incline_press: "Incline Press",
  lateral_raise: "Lateral Raise",
  russian_twist: "Russian Twist",
  lunge: "Lunge",
  leg_extension: "Leg Extension",
  deadlift_light: "Deadlift",
  leg_curl: "Leg Curl",
  calf_raise: "Calf Raise",
  cable_fly: "Cable Fly",
  tricep_dip: "Tricep Dip",
  barbell_row: "Barbell Row",
  face_pull: "Face Pull",
  barbell_curl: "Barbell Curl",
  ohp: "Overhead Press",
  arnold_press: "Arnold Press",
  skull_crusher: "Skull Crusher",
  push_up: "Push-up",
  bulgarian_split_squat: "Bulgarian Split Squat",
  rear_delt_fly: "Rear Delt Fly",
  hammer_curl: "Hammer Curl",
  dumbbell_chest_fly: "Dumbbell Chest Fly",
  dead_bug: "Dead Bug",
  goblet_squat: "Goblet Squat",
  sumo_squat: "Sumo Squat",
  hip_thrust: "Hip Thrust",
  tricep_kickback: "Tricep Kickback",
  seated_calf_raise: "Seated Calf Raise",
};

// =====================================================================
// User Profiles
// =====================================================================

export function getUsers(): BotUser[] {
  return [
    {
      key: "atakan",
      name: "Atakan",
      chatId: process.env.TELEGRAM_CHAT_ID_ATAKAN || "",
      programType: "male_recomp",
      programStartDate: "2026-02-23",
      gymTime: "12:00",
      startingWeightKg: 93,
      goalWeightKg: 75,
      calorieTarget: { min: 1800, max: 2000 },
      proteinTarget: 150,
      carbTarget: 185,
      fatTarget: 65,
      totalWeeks: 24,
    },
    {
      key: "tuvik",
      name: "Tuvik",
      chatId: process.env.TELEGRAM_CHAT_ID_TUVIK || "",
      programType: "female_recomp",
      programStartDate: "2026-02-23",
      gymTime: "06:00",
      startingWeightKg: 53,
      goalWeightKg: 50,
      calorieTarget: { min: 1500, max: 1650 },
      proteinTarget: 100,
      carbTarget: 180,
      fatTarget: 45,
      totalWeeks: 12,
    },
  ];
}

export function getUser(key: UserKey): BotUser {
  const users = getUsers();
  const user = users.find((u) => u.key === key);
  if (!user) throw new Error(`User not found: ${key}`);
  return user;
}

// =====================================================================
// Week & Day Computation
// =====================================================================

export function getCurrentWeek(user: BotUser): number {
  const start = new Date(user.programStartDate);
  const now = new Date();
  const weeks = differenceInWeeks(now, start);
  return Math.max(0, Math.min(weeks, user.totalWeeks - 1));
}

export function getTodayDayIndex(): number {
  const day = new Date().getDay(); // 0=Sun, 1=Mon...
  // Our program: 0=Mon, 1=Tue, ..., 6=Sun
  return day === 0 ? 6 : day - 1;
}

export function getDaysSinceStart(user: BotUser): number {
  const start = new Date(user.programStartDate);
  return differenceInDays(new Date(), start);
}

// =====================================================================
// Phase Info
// =====================================================================

const MALE_PHASES: Record<number, string> = {
  1: "Faz 1: Temelleri Atma",
  2: "Faz 2: Guc ve Dayaniklilik",
  3: "Faz 3: Ileri Seviye",
  4: "Faz 4: Hacim ve Dayaniklilik",
  5: "Faz 5: Ileri Guc",
  6: "Faz 6: Zirve",
};

const FEMALE_PHASES: Record<number, string> = {
  1: "Faz 1: Temelleri Atma",
  2: "Faz 2: Guc ve Sekillendirme",
  3: "Faz 3: Sekillendirme",
};

export function getPhaseInfo(user: BotUser, weekNum: number): { phase: number; label: string } {
  if (user.programType === "female_recomp") {
    const phase = Math.min(3, Math.ceil(weekNum / 4));
    return { phase, label: FEMALE_PHASES[phase] || "" };
  }
  const phase = Math.min(6, Math.ceil(weekNum / 4));
  return { phase, label: MALE_PHASES[phase] || "" };
}

// =====================================================================
// Today's Workout Plan (simplified for bot messages)
// =====================================================================

// Day labels by program type, phase, and day index
// This is a simplified version - we generate the label and type
// based on the same logic as the main app

interface SimpleDayPlan {
  name: string;
  type: "workout" | "cardio" | "rest";
  label: string;
  exercises: { name: string; sets: number; reps: string }[];
  note?: string;
}

const DAY_NAMES = [
  "Pazartesi",
  "Sali",
  "Carsamba",
  "Persembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
];

// Male program day templates by phase
const MALE_DAY_TEMPLATES: Record<
  number,
  { type: "workout" | "cardio" | "rest"; label: string; exerciseIds: string[] }[]
> = {
  1: [
    { type: "workout", label: "Tum Vucut A", exerciseIds: ["squat_m", "chest_press", "lat_pulldown", "shoulder_press", "plank"] },
    { type: "cardio", label: "Kardiyo Hafif", exerciseIds: ["treadmill"] },
    { type: "rest", label: "DINLENME", exerciseIds: [] },
    { type: "workout", label: "Tum Vucut B", exerciseIds: ["leg_press", "seated_row", "dumbbell_press", "bicep_curl", "crunch"] },
    { type: "cardio", label: "Kardiyo + Core", exerciseIds: ["bike", "plank", "bicycle_crunch", "leg_raise"] },
    { type: "rest", label: "DINLENME", exerciseIds: [] },
    { type: "rest", label: "DINLENME", exerciseIds: [] },
  ],
  2: [
    { type: "workout", label: "Ust Vucut", exerciseIds: ["bench_press", "lat_pulldown", "shoulder_press", "tricep_pushdown", "bicep_curl"] },
    { type: "workout", label: "Alt Vucut + Kardiyo", exerciseIds: ["squat_m", "leg_press", "leg_curl", "calf_raise", "treadmill"] },
    { type: "rest", label: "DINLENME", exerciseIds: [] },
    { type: "workout", label: "Ust Vucut + Core", exerciseIds: ["dumbbell_row", "incline_press", "lateral_raise", "plank", "russian_twist"] },
    { type: "workout", label: "Alt Vucut + HIIT", exerciseIds: ["lunge", "leg_extension", "deadlift_light", "bike"] },
    { type: "cardio", label: "Kardiyo Secenekli", exerciseIds: [] },
    { type: "rest", label: "DINLENME", exerciseIds: [] },
  ],
  3: [
    { type: "workout", label: "Gogus + Triceps", exerciseIds: ["bench_press", "incline_press", "cable_fly", "tricep_dip", "tricep_pushdown"] },
    { type: "workout", label: "Sirt + Biceps", exerciseIds: ["deadlift_light", "barbell_row", "lat_pulldown", "face_pull", "barbell_curl"] },
    { type: "cardio", label: "Kardiyo + Core", exerciseIds: ["treadmill", "plank", "russian_twist", "leg_raise", "bicycle_crunch"] },
    { type: "workout", label: "Bacak + Omuz", exerciseIds: ["squat_m", "leg_press", "deadlift_light", "ohp", "lateral_raise"] },
    { type: "workout", label: "Tum Vucut + Kardiyo", exerciseIds: ["bench_press", "barbell_row", "squat_m", "shoulder_press", "treadmill"] },
    { type: "cardio", label: "Aktif Dinlenme", exerciseIds: [] },
    { type: "rest", label: "DINLENME", exerciseIds: [] },
  ],
  4: [
    { type: "workout", label: "PUSH - Gogus + Omuz + Triceps", exerciseIds: ["bench_press", "incline_press", "arnold_press", "lateral_raise", "tricep_pushdown", "dumbbell_chest_fly"] },
    { type: "workout", label: "PULL - Sirt + Biceps", exerciseIds: ["deadlift_light", "barbell_row", "lat_pulldown", "face_pull", "barbell_curl", "hammer_curl"] },
    { type: "rest", label: "DINLENME", exerciseIds: [] },
    { type: "workout", label: "Bacak + Core", exerciseIds: ["squat_m", "leg_press", "lunge", "leg_curl", "calf_raise", "plank"] },
    { type: "cardio", label: "HIIT + Core", exerciseIds: ["treadmill", "russian_twist", "bicycle_crunch", "dead_bug"] },
    { type: "cardio", label: "Aktif Dinlenme", exerciseIds: [] },
    { type: "rest", label: "DINLENME", exerciseIds: [] },
  ],
  5: [
    { type: "workout", label: "Ust Vucut Push (Agir)", exerciseIds: ["bench_press", "ohp", "incline_press", "cable_fly", "skull_crusher", "push_up"] },
    { type: "workout", label: "Bacak (Agir)", exerciseIds: ["squat_m", "deadlift_light", "bulgarian_split_squat", "leg_extension", "leg_curl", "calf_raise"] },
    { type: "cardio", label: "HIIT + Core", exerciseIds: ["treadmill", "plank", "bicycle_crunch", "russian_twist", "leg_raise", "dead_bug"] },
    { type: "workout", label: "Ust Vucut Pull (Agir)", exerciseIds: ["barbell_row", "lat_pulldown", "dumbbell_row", "face_pull", "barbell_curl", "rear_delt_fly"] },
    { type: "workout", label: "Tum Vucut Compound", exerciseIds: ["squat_m", "bench_press", "barbell_row", "ohp", "treadmill"] },
    { type: "cardio", label: "Aktif Dinlenme", exerciseIds: [] },
    { type: "rest", label: "DINLENME", exerciseIds: [] },
  ],
  6: [
    { type: "workout", label: "Push Agir", exerciseIds: ["bench_press", "ohp", "incline_press", "dumbbell_chest_fly", "tricep_pushdown", "lateral_raise"] },
    { type: "workout", label: "Pull Agir", exerciseIds: ["deadlift_light", "barbell_row", "lat_pulldown", "face_pull", "barbell_curl", "rear_delt_fly"] },
    { type: "cardio", label: "HIIT + Core", exerciseIds: ["treadmill", "plank", "russian_twist", "bicycle_crunch", "leg_raise", "dead_bug"] },
    { type: "workout", label: "Bacak Agir", exerciseIds: ["squat_m", "leg_press", "bulgarian_split_squat", "leg_curl", "leg_extension", "calf_raise"] },
    { type: "workout", label: "Tum Vucut + Kardiyo", exerciseIds: ["bench_press", "barbell_row", "squat_m", "ohp", "treadmill"] },
    { type: "cardio", label: "Aktif Dinlenme", exerciseIds: [] },
    { type: "rest", label: "DINLENME", exerciseIds: [] },
  ],
};

// Female program day templates by phase
const FEMALE_DAY_TEMPLATES: Record<
  number,
  { type: "workout" | "cardio" | "rest"; label: string; exerciseIds: string[] }[]
> = {
  1: [
    { type: "workout", label: "Full Body A", exerciseIds: ["goblet_squat", "dumbbell_press", "lat_pulldown", "lunge", "shoulder_press", "plank"] },
    { type: "rest", label: "DINLENME", exerciseIds: [] },
    { type: "workout", label: "Full Body B", exerciseIds: ["leg_press", "seated_row", "dumbbell_chest_fly", "deadlift_light", "lateral_raise", "bicycle_crunch"] },
    { type: "rest", label: "DINLENME", exerciseIds: [] },
    { type: "workout", label: "Full Body C", exerciseIds: ["sumo_squat", "push_up", "dumbbell_row", "hip_thrust", "tricep_pushdown", "leg_raise"] },
    { type: "rest", label: "DINLENME", exerciseIds: [] },
    { type: "rest", label: "DINLENME", exerciseIds: [] },
  ],
  2: [
    { type: "workout", label: "Upper Body A", exerciseIds: ["dumbbell_press", "barbell_row", "shoulder_press", "face_pull", "bicep_curl", "skull_crusher"] },
    { type: "workout", label: "Lower Body A", exerciseIds: ["squat_m", "deadlift_light", "leg_press", "leg_curl", "calf_raise", "plank"] },
    { type: "rest", label: "DINLENME", exerciseIds: [] },
    { type: "workout", label: "Upper Body B", exerciseIds: ["incline_press", "lat_pulldown", "lateral_raise", "rear_delt_fly", "hammer_curl", "tricep_kickback"] },
    { type: "workout", label: "Lower Body B", exerciseIds: ["hip_thrust", "bulgarian_split_squat", "sumo_squat", "leg_extension", "seated_calf_raise", "leg_raise"] },
    { type: "rest", label: "DINLENME", exerciseIds: [] },
    { type: "rest", label: "DINLENME", exerciseIds: [] },
  ],
  3: [
    { type: "workout", label: "PUSH - Gogus + Omuz + Tricep", exerciseIds: ["dumbbell_press", "dumbbell_chest_fly", "shoulder_press", "lateral_raise", "tricep_pushdown"] },
    { type: "workout", label: "PULL - Sirt + Bicep", exerciseIds: ["lat_pulldown", "seated_row", "dumbbell_row", "face_pull", "bicep_curl"] },
    { type: "workout", label: "LEGS - Bacak + Kalca", exerciseIds: ["squat_m", "hip_thrust", "bulgarian_split_squat", "leg_curl", "calf_raise"] },
    { type: "rest", label: "DINLENME", exerciseIds: [] },
    { type: "workout", label: "Upper Body Light", exerciseIds: ["push_up", "dumbbell_row", "arnold_press", "cable_fly", "bicep_curl"] },
    { type: "cardio", label: "HIIT + Core", exerciseIds: ["plank", "bicycle_crunch", "leg_raise", "russian_twist"] },
    { type: "rest", label: "DINLENME", exerciseIds: [] },
  ],
};

export function getTodayPlan(user: BotUser, weekNum: number, dayIndex: number): SimpleDayPlan {
  const { phase } = getPhaseInfo(user, weekNum + 1);
  const templates =
    user.programType === "female_recomp" ? FEMALE_DAY_TEMPLATES : MALE_DAY_TEMPLATES;

  const phaseTemplate = templates[phase];
  if (!phaseTemplate || dayIndex < 0 || dayIndex >= 7) {
    return {
      name: DAY_NAMES[dayIndex] || "?",
      type: "rest",
      label: "DINLENME",
      exercises: [],
    };
  }

  const day = phaseTemplate[dayIndex];
  return {
    name: DAY_NAMES[dayIndex],
    type: day.type,
    label: day.label,
    exercises: day.exerciseIds.map((id) => ({
      name: EXERCISE_NAMES[id] || id,
      sets: 3,
      reps: "10-12",
    })),
  };
}

// =====================================================================
// Week Goals & Motivational Quotes
// =====================================================================

const MALE_WEEK_GOALS: string[] = [
  "Bu hafta spor salonuyla tanis, formu ogren, alis. Agirlik onemli degil!",
  "Gecen hafta ogrendigin formlari pekistir. Hafif agirlik artisi dene.",
  "Artik rutin oturmaya basladi. Kardiyo suresini 5 dk uzat.",
  "Faz 1 bitisi! Vucudundaki degisimi hissetmeye basladn mi?",
  "Faz 2 basliyor: Ust/Alt split. Yeni hareketler, yeni heyecan!",
  "Agirliklarda kucuk artislar yap. Formu asla bozma.",
  "HIIT'e alistin mi? Bu hafta tempoyu hafif artir.",
  "Faz 2 sonu! Aynada farki gormeye baslamis olmalsin.",
  "Faz 3: Ileri seviye. Sen artik spor salonunun mudavimi!",
  "Push-Pull-Legs ile kaslarini izole calismaya basla.",
  "Compound hareketlerde PR kirmayidene!",
  "12. hafta! Yari yoldayiz. Baslangictan bugune ne kadar yol geldigine bak.",
  "Faz 4 basliyor! PPL split ile hacim artisina geciyoruz.",
  "Agirliklari kademeli artir. Her hafta kucuk bir adim, buyuk bir fark.",
  "Hacim haftasi: Extra set ekledik. Kaslarin buyumeye devam ediyor!",
  "Deload haftasi. Agirliklari hafiflet, vucuduna dinlenme sansi ver.",
  "Faz 5: Agir kaldirmaya basliyoruz! Compound hareketlere odaklan.",
  "Guc artisi devam ediyor. Formunu koru, agirliklari artir.",
  "Peak hafta! Drop setlerle kaslarini zorla. Sinirlarini test et!",
  "Deload haftasi. 5 ay geride kaldi. Sen artik bambaska birisin.",
  "Faz 6: Son 4 hafta! PR zamani geldi. Her seyini ver!",
  "Agirliklarda kisisel rekorlarini kir. Kendini kanitla!",
  "Peak performans haftasi! Failure setleriyle tum gucunu goster!",
  "24. HAFTA! Programi tamamladin! Aynaya bak — o adam bambaska biri!",
];

const FEMALE_WEEK_GOALS: string[] = [
  "Her uzun yolculuk tek bir adimla baslar. Bu hafta o ilk adimin!",
  "Ikinci hafta en zor haftadir. Bunu asarsan, geri donus yok!",
  "3 hafta geride kaldi demek, yeni bir aliskanlik doguyor demek!",
  "1 ayi tamamladin! Vucudun degismeye basladi, devam et!",
  "Artik yeni birisin. Bu faz seni daha guclu yapacak!",
  "Aynaya baktiginda farki gormeye basladin mi? Devam!",
  "Comfort zone'un disinda buyume baslar. Limitlerini zorla!",
  "2 ay geride kaldi! O kisi 8 hafta onceki sen degil!",
  "Son 4 hafta! Burasi kasi tanimladigin, yagi yaktigin yer!",
  "Son 3 hafta! Her damla ter, hedefe bir adim daha yakin!",
  "Bu senden cikacak en yogun hafta. Sonrasi zafer!",
  "12 hafta once hayal ettigin kisi, simdi aynada sana bakiyor! TEBRIKLER!",
];

const MALE_QUOTES = [
  "Bugun yapamadigini yarin da yapamazsin. Basla, gerisini vucudun halledecek.",
  "Disiplin, motivasyon bittiginde devam etmektir.",
  "93 kilodan 75 kiloya: her damla ter, hedefe bir adim daha yakin.",
  "Vucudun sana tesekkur edecek. Sabret.",
  "Bir ay sonra keske bugun baslasaydim diyeceksin. O gun bugun.",
  "Mukemmel plan yoktur; olan plani uygulamak vardir.",
  "Kilo verme bir sprint degil, maratondur. Her hafta bir zafer.",
  "Kendine yatirim yapiyorsun. Getirisi saglik, enerji ve ozguven.",
  "Aynaya bak. 24 hafta sonra o adam sana tesekkur edecek.",
  "Sikildiginda hatirla: Neden basladigini dusun.",
  "Her antrenmandan sonra dunku halinden daha guclusun.",
  "Yari yoldayiz! 12 hafta geride, 12 hafta onunde. Dur durma!",
  "Kas hafizasi gercek. Her antrenman vucuduna yeni bir ders.",
  "Bugunku ter, yarinin guveni. Devam et.",
  "Hacim artti, guc artti. Sonuclar geliyor!",
  "Dinlenme de antrenmanin parcasi. Akilli calis.",
  "Guc sadece agirlik kaldirmak degil, vazgecmemektir.",
  "6 ayda bir hayat degisir. Sen tam o yoldasin.",
  "Her PR bir zafer. Ama asil zafer buraya her gun gelmen.",
  "Vucudun bir makine, beslenmen yakiti. Ikisine de ozen goster.",
  "Son 4 hafta! Hedefe bu kadar yakinken birakilir mi?",
  "Zorlandiginda hatirla: Kolay olsaydi herkes yapardi.",
  "Kendine verdigin en guzel hediye: saglikli bir yasam.",
  "18 kilo sadece bir rakam. Asil kazanc kendine guvenmek.",
];

const FEMALE_QUOTES = [
  "Bugun basla. Yarin sana tesekkur edecek olan sen, bugunku sensin.",
  "Ikinci hafta en zor haftadir. Bunu asarsan, geri donus yok!",
  "3 hafta geride kaldi demek, yeni bir aliskanlik doguyor demek!",
  "1 ayi tamamladin! Vucudun degismeye basladi, devam et!",
  "Artik yeni birisin. Bu faz seni daha guclu yapacak!",
  "Aynaya baktiginda farki gormeye basladin mi? Devam!",
  "Comfort zone'un disinda buyume baslar. Limitlerini zorla!",
  "2 ay geride kaldi! O kisi 8 hafta onceki sen degil!",
  "Son 4 hafta! Burasi kasi tanimladigin, yagi yaktigin yer!",
  "Her damla ter, hedefe bir adim daha yakin!",
  "Bu senden cikacak en yogun hafta. Sonrasi zafer!",
  "12 hafta once hayal ettigin kisi, simdi aynada sana bakiyor! TEBRIKLER!",
];

export function getWeekGoal(user: BotUser, weekIndex: number): string {
  const goals = user.programType === "female_recomp" ? FEMALE_WEEK_GOALS : MALE_WEEK_GOALS;
  return goals[Math.min(weekIndex, goals.length - 1)] || "";
}

export function getMotivationalQuote(user: BotUser, weekIndex: number): string {
  const quotes = user.programType === "female_recomp" ? FEMALE_QUOTES : MALE_QUOTES;
  return quotes[weekIndex % quotes.length] || "";
}

// =====================================================================
// Meal info (simplified for bot context)
// =====================================================================

export function getMealSummary(user: BotUser): string {
  if (user.programType === "female_recomp") {
    return `${user.calorieTarget.min}-${user.calorieTarget.max} kcal | Protein: ${user.proteinTarget}g | Karb: ${user.carbTarget}g | Yag: ${user.fatTarget}g`;
  }
  return `${user.calorieTarget.min}-${user.calorieTarget.max} kcal | Protein: ${user.proteinTarget}g | Karb: ${user.carbTarget}g | Yag: ${user.fatTarget}g`;
}
