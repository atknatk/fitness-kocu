export interface WorkoutExercise {
  exerciseId: string;
  sets: number;
  reps: string;
  rest: string;
  duration?: string;
}

export interface DayPlan {
  name: string;
  type: "workout" | "cardio" | "rest";
  label: string;
  warmup?: string;
  cooldown?: string;
  note?: string;
  exercises: WorkoutExercise[];
}

export interface WeekPlan {
  week: number;
  phase: number;
  phaseLabel: string;
  days: DayPlan[];
}

function generateWeeks(): WeekPlan[] {
  const weeks: WeekPlan[] = [];

  // FAZ 1: Hafta 1-4
  for (let w = 0; w < 4; w++) {
    const reps = w < 3 ? "12" : "12-15";
    const cardioMin = 25 + w * 5;
    const plankSec = 20 + w * 5;
    const warmupMin = 5 + w;

    weeks.push({
      week: w + 1,
      phase: 1,
      phaseLabel: "Faz 1: Temelleri Atma",
      days: [
        {
          name: "Pazartesi",
          type: "workout",
          label: "Tüm Vücut A",
          warmup: `${warmupMin} dk yürüyüş bandı (eğim %3, hız 5 km/sa)`,
          cooldown: "5 dk esneme: quadriceps, hamstring, omuz, göğüs germe",
          exercises: [
            { exerciseId: "squat_m", sets: 3, reps, rest: "90 sn" },
            { exerciseId: "chest_press", sets: 3, reps, rest: "60-90 sn" },
            { exerciseId: "lat_pulldown", sets: 3, reps, rest: "60-90 sn" },
            { exerciseId: "shoulder_press", sets: 3, reps, rest: "60-90 sn" },
            { exerciseId: "plank", sets: 3, reps: `${plankSec} saniye`, rest: "45 sn" },
          ],
        },
        {
          name: "Salı",
          type: "cardio",
          label: "Kardiyo Hafif",
          warmup: "3 dk yavaş yürüyüş",
          cooldown: "5 dk esneme: baldır, kalça, sırt germe",
          exercises: [
            { exerciseId: "treadmill", sets: 1, reps: `${cardioMin} dk`, rest: "-", duration: `${cardioMin} dk — Eğim %3-5, Hız 5-6 km/sa` },
          ],
        },
        {
          name: "Çarşamba",
          type: "rest",
          label: "DİNLENME",
          note: "Hafif yürüyüş veya esneme yapabilirsin. Vücudun bugün onarım yapıyor.",
          exercises: [],
        },
        {
          name: "Perşembe",
          type: "workout",
          label: "Tüm Vücut B",
          warmup: `${warmupMin} dk bisiklet (hafif tempo)`,
          cooldown: "5 dk esneme: tüm vücut germe rutini",
          exercises: [
            { exerciseId: "leg_press", sets: 3, reps, rest: "90 sn" },
            { exerciseId: "seated_row", sets: 3, reps, rest: "60-90 sn" },
            { exerciseId: "dumbbell_press", sets: 3, reps, rest: "60-90 sn" },
            { exerciseId: "bicep_curl", sets: 3, reps, rest: "60-90 sn" },
            { exerciseId: "crunch", sets: 3, reps: "15", rest: "45 sn" },
          ],
        },
        {
          name: "Cuma",
          type: "cardio",
          label: "Kardiyo + Core",
          warmup: "3 dk hafif bisiklet",
          cooldown: "5 dk esneme",
          exercises: [
            { exerciseId: "bike", sets: 1, reps: `${20 + w * 2} dk`, rest: "-", duration: `${20 + w * 2} dk — Orta tempo` },
            { exerciseId: "plank", sets: 3, reps: `${plankSec} saniye`, rest: "30 sn" },
            { exerciseId: "bicycle_crunch", sets: 3, reps: "12 (her taraf)", rest: "30 sn" },
            { exerciseId: "leg_raise", sets: 3, reps: "10", rest: "30 sn" },
          ],
        },
        {
          name: "Cumartesi",
          type: "rest",
          label: "DİNLENME",
          note: "Aktif dinlenme: 30 dk tempolu yürüyüş.",
          exercises: [],
        },
        {
          name: "Pazar",
          type: "rest",
          label: "DİNLENME",
          note: "Tam dinlenme günü. Bol su iç, erken yat.",
          exercises: [],
        },
      ],
    });
  }

  // FAZ 2: Hafta 5-8
  for (let w = 0; w < 4; w++) {
    const reps = w < 2 ? "10" : "10-12";
    const cardioMin = 20 + w * 3;

    weeks.push({
      week: w + 5,
      phase: 2,
      phaseLabel: "Faz 2: Güç ve Dayanıklılık",
      days: [
        {
          name: "Pazartesi",
          type: "workout",
          label: "Üst Vücut",
          warmup: "7 dk yürüyüş bandı + 10 tekrar hafif shoulder press ısınma",
          cooldown: "5 dk üst vücut esneme",
          exercises: [
            { exerciseId: "bench_press", sets: 4, reps, rest: "90 sn" },
            { exerciseId: "lat_pulldown", sets: 4, reps, rest: "75 sn" },
            { exerciseId: "shoulder_press", sets: 4, reps, rest: "75 sn" },
            { exerciseId: "tricep_pushdown", sets: 3, reps: "12", rest: "60 sn" },
            { exerciseId: "bicep_curl", sets: 3, reps: "12", rest: "60 sn" },
          ],
        },
        {
          name: "Salı",
          type: "workout",
          label: "Alt Vücut + Kardiyo",
          warmup: "7 dk bisiklet + 10 tekrar hafif squat ısınma",
          cooldown: "5 dk alt vücut esneme",
          exercises: [
            { exerciseId: "squat_m", sets: 4, reps, rest: "2 dk" },
            { exerciseId: "leg_press", sets: 4, reps, rest: "90 sn" },
            { exerciseId: "leg_curl", sets: 3, reps: "12", rest: "60 sn" },
            { exerciseId: "calf_raise", sets: 3, reps: "15", rest: "45 sn" },
            { exerciseId: "treadmill", sets: 1, reps: `${cardioMin} dk`, rest: "-", duration: `${cardioMin} dk koşu — Hız 7-8 km/sa` },
          ],
        },
        {
          name: "Çarşamba",
          type: "rest",
          label: "DİNLENME",
          note: "Aktif dinlenme: 30 dk tempolu yürüyüş veya hafif esneme.",
          exercises: [],
        },
        {
          name: "Perşembe",
          type: "workout",
          label: "Üst Vücut + Core",
          warmup: "7 dk yürüyüş bandı",
          cooldown: "5 dk esneme",
          exercises: [
            { exerciseId: "dumbbell_row", sets: 4, reps, rest: "75 sn" },
            { exerciseId: "incline_press", sets: 4, reps, rest: "75 sn" },
            { exerciseId: "lateral_raise", sets: 3, reps: "12", rest: "60 sn" },
            { exerciseId: "plank", sets: 3, reps: `${35 + w * 5} saniye`, rest: "45 sn" },
            { exerciseId: "russian_twist", sets: 3, reps: "15 (her taraf)", rest: "45 sn" },
          ],
        },
        {
          name: "Cuma",
          type: "workout",
          label: "Alt Vücut + HIIT",
          warmup: "5 dk bisiklet",
          cooldown: "5 dk esneme + foam roller",
          exercises: [
            { exerciseId: "lunge", sets: 4, reps: "10 (her bacak)", rest: "75 sn" },
            { exerciseId: "leg_extension", sets: 3, reps: "12", rest: "60 sn" },
            { exerciseId: "deadlift_light", sets: 4, reps, rest: "90 sn" },
            { exerciseId: "bike", sets: 1, reps: `${15 + w * 2} dk HIIT`, rest: "-", duration: `${15 + w * 2} dk HIIT: 30sn sprint / 60sn yavaş` },
          ],
        },
        {
          name: "Cumartesi",
          type: "cardio",
          label: "Kardiyo Seçenekli",
          note: `${40 + w * 5} dk yürüyüş, yüzme veya açık hava bisiklet. Keyifli bir aktivite seç!`,
          exercises: [],
        },
        {
          name: "Pazar",
          type: "rest",
          label: "DİNLENME",
          note: "Tam dinlenme. Haftanın yorgunluğunu at.",
          exercises: [],
        },
      ],
    });
  }

  // FAZ 3: Hafta 9-12
  for (let w = 0; w < 4; w++) {
    const reps = "8-10";

    weeks.push({
      week: w + 9,
      phase: 3,
      phaseLabel: "Faz 3: İleri Seviye",
      days: [
        {
          name: "Pazartesi",
          type: "workout",
          label: "Göğüs + Triceps",
          warmup: "7 dk yürüyüş bandı + 2 set hafif bench press ısınma",
          cooldown: "5 dk göğüs ve kol esneme",
          exercises: [
            { exerciseId: "bench_press", sets: 4, reps, rest: "90 sn" },
            { exerciseId: "incline_press", sets: 4, reps, rest: "75 sn" },
            { exerciseId: "cable_fly", sets: 3, reps: "12", rest: "60 sn" },
            { exerciseId: "tricep_dip", sets: 3, reps: "10-12", rest: "60 sn" },
            { exerciseId: "tricep_pushdown", sets: 3, reps: "12", rest: "60 sn" },
          ],
        },
        {
          name: "Salı",
          type: "workout",
          label: "Sırt + Biceps",
          warmup: "7 dk kürek + hafif lat pulldown",
          cooldown: "5 dk sırt ve kol esneme",
          exercises: [
            { exerciseId: "deadlift_light", sets: 4, reps, rest: "2 dk" },
            { exerciseId: "barbell_row", sets: 4, reps, rest: "90 sn" },
            { exerciseId: "lat_pulldown", sets: 3, reps: "10-12", rest: "60 sn" },
            { exerciseId: "face_pull", sets: 3, reps: "15", rest: "60 sn" },
            { exerciseId: "barbell_curl", sets: 3, reps: "10-12", rest: "60 sn" },
          ],
        },
        {
          name: "Çarşamba",
          type: "cardio",
          label: "Kardiyo + Core",
          warmup: "3 dk hafif koşu",
          cooldown: "5 dk esneme",
          exercises: [
            { exerciseId: "treadmill", sets: 1, reps: `${25 + w * 2} dk HIIT`, rest: "-", duration: `${25 + w * 2} dk: 1dk hızlı / 1dk yavaş` },
            { exerciseId: "plank", sets: 3, reps: `${45 + w * 5} saniye`, rest: "45 sn" },
            { exerciseId: "russian_twist", sets: 3, reps: "20 (her taraf)", rest: "30 sn" },
            { exerciseId: "leg_raise", sets: 3, reps: "15", rest: "30 sn" },
            { exerciseId: "bicycle_crunch", sets: 3, reps: "20 (her taraf)", rest: "30 sn" },
          ],
        },
        {
          name: "Perşembe",
          type: "workout",
          label: "Bacak + Omuz",
          warmup: "7 dk bisiklet + hafif squat ısınma",
          cooldown: "5 dk alt vücut esneme",
          exercises: [
            { exerciseId: "squat_m", sets: 4, reps, rest: "2 dk" },
            { exerciseId: "leg_press", sets: 4, reps, rest: "90 sn" },
            { exerciseId: "deadlift_light", sets: 3, reps: "10-12", rest: "75 sn" },
            { exerciseId: "ohp", sets: 4, reps, rest: "75 sn" },
            { exerciseId: "lateral_raise", sets: 3, reps: "12-15", rest: "60 sn" },
          ],
        },
        {
          name: "Cuma",
          type: "workout",
          label: "Tüm Vücut + Kardiyo",
          warmup: "7 dk yürüyüş bandı",
          cooldown: "10 dk kapsamlı esneme",
          exercises: [
            { exerciseId: "bench_press", sets: 3, reps: "10", rest: "75 sn" },
            { exerciseId: "barbell_row", sets: 3, reps: "10", rest: "75 sn" },
            { exerciseId: "squat_m", sets: 3, reps: "10", rest: "90 sn" },
            { exerciseId: "shoulder_press", sets: 3, reps: "10", rest: "60 sn" },
            { exerciseId: "treadmill", sets: 1, reps: `${20 + w * 2} dk`, rest: "-", duration: `${20 + w * 2} dk tempolu koşu — Hız 8-9 km/sa` },
          ],
        },
        {
          name: "Cumartesi",
          type: "cardio",
          label: "Aktif Dinlenme",
          note: "45-60 dk yürüyüş, yüzme veya bisiklet. Keyifli aktivite!",
          exercises: [],
        },
        {
          name: "Pazar",
          type: "rest",
          label: "DİNLENME",
          note: "Tam dinlenme. Gelecek haftaya hazırlan!",
          exercises: [],
        },
      ],
    });
  }

  return weeks;
}

export const WEEKS = generateWeeks();

export const WEEK_GOALS = [
  "Bu hafta spor salonuyla tanış, formu öğren, alış. Ağırlık önemli değil!",
  "Geçen hafta öğrendiğin formları pekiştir. Hafif ağırlık artışı dene.",
  "Artık rutin oturmaya başladı. Kardiyo süresini 5 dk uzat.",
  "Faz 1 bitişi! Vücudundaki değişimi hissetmeye başladın mı?",
  "Faz 2 başlıyor: Üst/Alt split. Yeni hareketler, yeni heyecan!",
  "Ağırlıklarda küçük artışlar yap. Formu asla bozma.",
  "HIIT'e alıştın mı? Bu hafta tempoyu hafif artır.",
  "Faz 2 sonu! Aynada farkı görmeye başlamış olmalısın.",
  "Faz 3: İleri seviye. Sen artık spor salonunun müdavimi!",
  "Push-Pull-Legs ile kaslarını izole çalışmaya başla.",
  "Compound hareketlerde PR kırmayı dene!",
  "12. hafta! Başlangıçtan bugüne ne kadar yol geldiğine bak.",
];

export const MOTIVATIONAL_QUOTES = [
  { q: "Bugün yapamadığını yarın da yapamazsın. Başla, gerisini vücudun halledecek.", a: "Koçun" },
  { q: "Disiplin, motivasyon bittiğinde devam etmektir.", a: "Koçun" },
  { q: "95 kilodan 75 kiloya: her damla ter, hedefe bir adım daha yakın.", a: "Koçun" },
  { q: "Vücudun sana teşekkür edecek. Sabret.", a: "Koçun" },
  { q: "Bir ay sonra keşke bugün başlasaydım diyeceksin. O gün bugün.", a: "Koçun" },
  { q: "Mükemmel plan yoktur; olan planı uygulamak vardır.", a: "Koçun" },
  { q: "Kilo verme bir sprint değil, maratondur. Her hafta bir zafer.", a: "Koçun" },
  { q: "Kendine yatırım yapıyorsun. Getirisi sağlık, enerji ve özgüven.", a: "Koçun" },
  { q: "Aynaya bak. 12 hafta sonra o adam sana teşekkür edecek.", a: "Koçun" },
  { q: "Sıkıldığında hatırla: Neden başladığını düşün.", a: "Koçun" },
  { q: "Her antrenmandan sonra dünkü halinden daha güçlüsün.", a: "Koçun" },
  { q: "20 kilo sadece bir rakam. Asıl kazanç kendine güvenmek.", a: "Koçun" },
];
