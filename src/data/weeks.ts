import { WeekPlan, ProgramType } from "@/types";

// =====================================================================
// MALE PROGRAM  (Atakan - 95 kg -> 75 kg)
// =====================================================================

function generateMaleWeeks(): WeekPlan[] {
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

// =====================================================================
// FEMALE PROGRAM  (Tuvik - 53 kg -> 50 kg, body recomp, gym 18:00)
// =====================================================================

function generateFemaleWeeks(): WeekPlan[] {
  const weeks: WeekPlan[] = [];

  // FAZ 1: Hafta 1-4 — Temelleri Atma
  for (let w = 0; w < 4; w++) {
    const baseReps = w < 2 ? "12" : w === 2 ? "13" : "15";
    const plankSec = 30 + w * 5;
    const walkDuration = 30 + w * 2;

    weeks.push({
      week: w + 1,
      phase: 1,
      phaseLabel: "Faz 1: Temelleri Atma",
      days: [
        {
          name: "Pazartesi",
          type: "workout",
          label: "Tam Vücut A",
          warmup: "5 dk yürüyüş bandı + dinamik ısınma",
          cooldown: "5 dk germe (quadriceps, hamstring, kalça, omuz)",
          exercises: [
            { exerciseId: "squat_m", sets: 3, reps: baseReps, rest: "60 sn" },
            { exerciseId: "hip_thrust", sets: 3, reps: baseReps, rest: "60 sn" },
            { exerciseId: "chest_press", sets: 3, reps: baseReps, rest: "60 sn" },
            { exerciseId: "lat_pulldown", sets: 3, reps: baseReps, rest: "60 sn" },
            { exerciseId: "plank", sets: 3, reps: `${plankSec} saniye`, rest: "45 sn" },
          ],
        },
        {
          name: "Salı",
          type: "cardio",
          label: "Kardiyo Hafif",
          warmup: "3 dk yavaş yürüyüş",
          exercises: [
            { exerciseId: "treadmill", sets: 1, reps: `${walkDuration} dk`, rest: "-", duration: `${walkDuration} dk — 5.5 km/h tempolu yürüyüş` },
          ],
        },
        {
          name: "Çarşamba",
          type: "rest",
          label: "DİNLENME",
          note: "Hafif yürüyüş veya yoga yapabilirsin",
          exercises: [],
        },
        {
          name: "Perşembe",
          type: "workout",
          label: "Tam Vücut B",
          warmup: "5 dk bisiklet + dinamik ısınma",
          cooldown: "5 dk germe",
          exercises: [
            { exerciseId: "sumo_squat", sets: 3, reps: baseReps, rest: "60 sn" },
            { exerciseId: "glute_bridge", sets: 3, reps: w < 2 ? "15" : w === 2 ? "17" : "20", rest: "45 sn" },
            { exerciseId: "shoulder_press", sets: 3, reps: baseReps, rest: "60 sn" },
            { exerciseId: "seated_row", sets: 3, reps: baseReps, rest: "60 sn" },
            { exerciseId: "crunch", sets: 3, reps: w < 2 ? "15" : w === 2 ? "17" : "20", rest: "45 sn" },
          ],
        },
        {
          name: "Cuma",
          type: "cardio",
          label: "Kardiyo + Core",
          warmup: "3 dk hafif bisiklet",
          exercises: [
            { exerciseId: "bike", sets: 1, reps: `${20 + w * 2} dk`, rest: "-", duration: `${20 + w * 2} dk bisiklet` },
            { exerciseId: "plank", sets: 3, reps: `${plankSec} saniye`, rest: "30 sn" },
            { exerciseId: "russian_twist", sets: 3, reps: baseReps, rest: "30 sn" },
            { exerciseId: "leg_raise", sets: 3, reps: baseReps, rest: "30 sn" },
          ],
        },
        {
          name: "Cumartesi",
          type: "rest",
          label: "Aktif Dinlenme",
          note: "30 dk tempolu yürüyüş veya pilates",
          exercises: [],
        },
        {
          name: "Pazar",
          type: "rest",
          label: "DİNLENME",
          note: "Tam dinlenme günü — bol su iç",
          exercises: [],
        },
      ],
    });
  }

  // FAZ 2: Hafta 5-8 — Güç ve Şekillendirme
  for (let w = 0; w < 4; w++) {
    const reps = w < 2 ? "10" : "12";

    weeks.push({
      week: w + 5,
      phase: 2,
      phaseLabel: "Faz 2: Güç ve Şekillendirme",
      days: [
        {
          name: "Pazartesi",
          type: "workout",
          label: "Alt Vücut + Glute",
          warmup: "5 dk yürüyüş bandı + dinamik ısınma (kalça açıcı, bacak sallama)",
          cooldown: "5 dk germe (kalça, hamstring, quadriceps)",
          exercises: [
            { exerciseId: "squat_m", sets: 4, reps, rest: "75 sn" },
            { exerciseId: "hip_thrust", sets: 4, reps: "12", rest: "60 sn" },
            { exerciseId: "leg_curl", sets: 3, reps: "12", rest: "60 sn" },
            { exerciseId: "calf_raise", sets: 3, reps: "15", rest: "45 sn" },
            { exerciseId: "cable_kickback", sets: 3, reps: "12", rest: "45 sn" },
          ],
        },
        {
          name: "Salı",
          type: "workout",
          label: "Üst Vücut",
          warmup: "5 dk yürüyüş bandı + hafif omuz ısınma",
          cooldown: "5 dk üst vücut germe",
          exercises: [
            { exerciseId: "bench_press", sets: 3, reps, rest: "75 sn" },
            { exerciseId: "lat_pulldown", sets: 3, reps, rest: "75 sn" },
            { exerciseId: "shoulder_press", sets: 3, reps, rest: "60 sn" },
            { exerciseId: "bicep_curl", sets: 3, reps: "12", rest: "45 sn" },
            { exerciseId: "tricep_pushdown", sets: 3, reps: "12", rest: "45 sn" },
          ],
        },
        {
          name: "Çarşamba",
          type: "rest",
          label: "DİNLENME",
          note: "Aktif dinlenme — 20 dk yürüyüş",
          exercises: [],
        },
        {
          name: "Perşembe",
          type: "workout",
          label: "Alt Vücut + HIIT",
          warmup: "5 dk bisiklet + dinamik ısınma",
          cooldown: "5 dk germe + foam roller",
          exercises: [
            { exerciseId: "bulgarian_split_squat", sets: 3, reps: "10 (her bacak)", rest: "60 sn" },
            { exerciseId: "deadlift_light", sets: 3, reps, rest: "75 sn" },
            { exerciseId: "leg_extension", sets: 3, reps: "12", rest: "60 sn" },
            { exerciseId: "sumo_squat", sets: 3, reps: "12", rest: "60 sn" },
            { exerciseId: "bike", sets: 1, reps: "15 dk HIIT", rest: "-", duration: "15 dk — 30sn sprint / 60sn yavaş" },
          ],
        },
        {
          name: "Cuma",
          type: "workout",
          label: "Üst Vücut + Core",
          warmup: "5 dk yürüyüş bandı + hafif ısınma",
          cooldown: "5 dk tüm vücut germe",
          exercises: [
            { exerciseId: "dumbbell_row", sets: 3, reps, rest: "60 sn" },
            { exerciseId: "incline_press", sets: 3, reps, rest: "60 sn" },
            { exerciseId: "lateral_raise", sets: 3, reps: "12", rest: "45 sn" },
            { exerciseId: "plank", sets: 3, reps: `${45 + w * 5} saniye`, rest: "45 sn" },
            { exerciseId: "russian_twist", sets: 3, reps: "15 (her taraf)", rest: "30 sn" },
          ],
        },
        {
          name: "Cumartesi",
          type: "rest",
          label: "Kardiyo Seçenekli",
          note: "40-50 dk yürüyüş, yüzme veya bisiklet",
          exercises: [],
        },
        {
          name: "Pazar",
          type: "rest",
          label: "DİNLENME",
          note: "Tam dinlenme — haftanın yorgunluğunu at",
          exercises: [],
        },
      ],
    });
  }

  // FAZ 3: Hafta 9-12 — İleri Seviye & Sıkılaşma
  for (let w = 0; w < 4; w++) {
    const repsHeavy = "8";
    const repsMedium = "10";

    weeks.push({
      week: w + 9,
      phase: 3,
      phaseLabel: "Faz 3: İleri Seviye & Sıkılaşma",
      days: [
        {
          name: "Pazartesi",
          type: "workout",
          label: "Bacak + Glute",
          warmup: "5 dk yürüyüş bandı + kalça açıcı dinamik ısınma",
          cooldown: "5 dk germe (kalça, hamstring, quadriceps, baldır)",
          exercises: [
            { exerciseId: "squat_m", sets: 4, reps: repsHeavy, rest: "90 sn" },
            { exerciseId: "hip_thrust", sets: 4, reps: repsMedium, rest: "75 sn" },
            { exerciseId: "leg_press", sets: 3, reps: repsMedium, rest: "75 sn" },
            { exerciseId: "cable_kickback", sets: 3, reps: "12", rest: "45 sn" },
            { exerciseId: "calf_raise", sets: 3, reps: "15", rest: "45 sn" },
          ],
        },
        {
          name: "Salı",
          type: "workout",
          label: "Push",
          warmup: "5 dk yürüyüş bandı + hafif göğüs ve omuz ısınma",
          cooldown: "5 dk üst vücut germe",
          exercises: [
            { exerciseId: "bench_press", sets: 4, reps: repsHeavy, rest: "90 sn" },
            { exerciseId: "incline_press", sets: 3, reps: repsMedium, rest: "75 sn" },
            { exerciseId: "shoulder_press", sets: 3, reps: repsMedium, rest: "75 sn" },
            { exerciseId: "tricep_dip", sets: 3, reps: repsMedium, rest: "60 sn" },
            { exerciseId: "lateral_raise", sets: 3, reps: "12", rest: "45 sn" },
          ],
        },
        {
          name: "Çarşamba",
          type: "cardio",
          label: "Kardiyo + Core",
          warmup: "3 dk hafif koşu",
          cooldown: "5 dk esneme",
          exercises: [
            { exerciseId: "treadmill", sets: 1, reps: `${25 + w * 2} dk HIIT`, rest: "-", duration: `${25 + w * 2} dk — 1dk koşu / 1dk yürüyüş` },
            { exerciseId: "plank", sets: 3, reps: `${60 + w * 5} saniye`, rest: "45 sn" },
            { exerciseId: "russian_twist", sets: 3, reps: "20 (her taraf)", rest: "30 sn" },
            { exerciseId: "bicycle_crunch", sets: 3, reps: "15 (her taraf)", rest: "30 sn" },
            { exerciseId: "leg_raise", sets: 3, reps: "15", rest: "30 sn" },
          ],
        },
        {
          name: "Perşembe",
          type: "workout",
          label: "Pull",
          warmup: "5 dk yürüyüş bandı + hafif sırt ısınma",
          cooldown: "5 dk sırt ve kol germe",
          exercises: [
            { exerciseId: "deadlift_light", sets: 4, reps: repsHeavy, rest: "90 sn" },
            { exerciseId: "barbell_row", sets: 3, reps: repsMedium, rest: "75 sn" },
            { exerciseId: "lat_pulldown", sets: 3, reps: repsMedium, rest: "60 sn" },
            { exerciseId: "face_pull", sets: 3, reps: "12", rest: "45 sn" },
            { exerciseId: "bicep_curl", sets: 3, reps: repsMedium, rest: "45 sn" },
          ],
        },
        {
          name: "Cuma",
          type: "workout",
          label: "Bacak + Glute v2",
          warmup: "5 dk bisiklet + kalça açıcı dinamik ısınma",
          cooldown: "5 dk germe (tüm alt vücut)",
          exercises: [
            { exerciseId: "sumo_squat", sets: 4, reps: repsMedium, rest: "75 sn" },
            { exerciseId: "bulgarian_split_squat", sets: 3, reps: "10 (her bacak)", rest: "60 sn" },
            { exerciseId: "hip_abduction", sets: 3, reps: "15", rest: "45 sn" },
            { exerciseId: "glute_bridge", sets: 3, reps: "15", rest: "45 sn" },
            { exerciseId: "single_leg_rdl", sets: 3, reps: "10 (her bacak)", rest: "60 sn" },
          ],
        },
        {
          name: "Cumartesi",
          type: "rest",
          label: "Aktif Dinlenme",
          note: "45 dk tempolu yürüyüş, yüzme veya bisiklet",
          exercises: [],
        },
        {
          name: "Pazar",
          type: "rest",
          label: "DİNLENME",
          note: "Tam dinlenme — gelecek haftaya hazırlan!",
          exercises: [],
        },
      ],
    });
  }

  return weeks;
}

// =====================================================================
// WEEK GOALS & MOTIVATIONAL QUOTES
// =====================================================================

const MALE_WEEK_GOALS: string[] = [
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

const MALE_QUOTES = [
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

const FEMALE_WEEK_GOALS: string[] = [
  "Spora merhaba! Formu öğren, alışkanlık kur. Ağırlık önemli değil!",
  "Geçen haftanın formlarını pekiştir. Hareketleri hissetmeye başla.",
  "Tekrar sayısını artırıyoruz! Kaslarınla bağlantı kurmaya odaklan.",
  "Faz 1 tamamlanıyor! Vücudun spora alıştı, harika gidiyorsun.",
  "Faz 2 başlıyor: Artık ağırlıkları artırma zamanı. Alt/Üst split ile şekillenme!",
  "Hareketlerde ağırlığı hafifçe artır. Formun mükemmel kalsın.",
  "HIIT ile yağ yakımını hızlandırıyoruz. Kendini zorlayabilirsin!",
  "Faz 2 bitti! Aynada sıkılaşmayı görmeye başladın mı?",
  "Faz 3: İleri seviye programdasın. Push/Pull/Legs ile hedeflere koş!",
  "Ağır compound hareketlerle güçleniyorsun. Her antrenman bir kazanım.",
  "Vücudun şekilleniyor, gücün artıyor. Finale az kaldı!",
  "12. hafta! Başladığın yerden ne kadar güçlü olduğuna bak. Gurur duy!",
];

const FEMALE_QUOTES = [
  { q: "Güçlü bir vücut, güçlü bir zihinle başlar.", a: "Koçun" },
  { q: "Her adım seni hedefine yaklaştırıyor. Devam et!", a: "Koçun" },
  { q: "Sıkılaşmak zaman alır ama her antrenman fark yaratır.", a: "Koçun" },
  { q: "Kilonun değil, vücudundaki değişimin peşinde ol.", a: "Koçun" },
  { q: "Bugün yapamadığını yarın yapabilirsin. Ama bugün başla.", a: "Koçun" },
  { q: "Güçlü kadın, güzel kadındır. Ağırlıklardan korkma!", a: "Koçun" },
  { q: "Sabır ve disiplin, en iyi antrenman partnerin.", a: "Koçun" },
  { q: "Vücudun sana teşekkür edecek. Her damla ter bir yatırım.", a: "Koçun" },
  { q: "Kendinle yarış. Dünden daha iyi ol, bu yeterli.", a: "Koçun" },
  { q: "Spora başlamak cesaret ister. Sen bunu çoktan yaptın!", a: "Koçun" },
  { q: "Hedefin 50 kg değil, kendini güçlü hissetmek. Sayılar gelir.", a: "Koçun" },
  { q: "12 hafta bir başlangıç. Güçlü kalma alışkanlığın olsun.", a: "Koçun" },
];

// ===== Generate arrays =====

const MALE_WEEKS: WeekPlan[] = generateMaleWeeks();
const FEMALE_WEEKS: WeekPlan[] = generateFemaleWeeks();

// ===== Public API =====

export function getWeeks(programType: ProgramType): WeekPlan[] {
  return programType === "female_recomp" ? FEMALE_WEEKS : MALE_WEEKS;
}

export function getWeekGoals(programType: ProgramType): string[] {
  return programType === "female_recomp" ? FEMALE_WEEK_GOALS : MALE_WEEK_GOALS;
}

export function getMotivationalQuotes(programType: ProgramType) {
  return programType === "female_recomp" ? FEMALE_QUOTES : MALE_QUOTES;
}

// Backward-compatible exports (default to male program)
export const WEEKS = MALE_WEEKS;
export const WEEK_GOALS = MALE_WEEK_GOALS;
export const MOTIVATIONAL_QUOTES = MALE_QUOTES;
