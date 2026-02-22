import { WeekPlan, ProgramType } from "@/types";

// =====================================================================
// MALE PROGRAM  (Atakan - 93 kg -> 75 kg, 24 hafta)
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

  // FAZ 4: Hafta 13-16 — PPL Split, Hacim Artışı
  for (let w = 0; w < 4; w++) {
    const isDeload = w === 3;
    const compoundSets = isDeload ? 3 : (w === 2 ? 5 : 4);
    const compoundReps = isDeload ? "10-12" : "8-10";
    const isolationReps = isDeload ? "12" : "10-12";

    weeks.push({
      week: w + 13,
      phase: 4,
      phaseLabel: isDeload
        ? "Faz 4: Hacim ve Dayanıklılık (Deload)"
        : "Faz 4: Hacim ve Dayanıklılık",
      days: [
        {
          name: "Pazartesi",
          type: "workout",
          label: "PUSH - Göğüs + Omuz + Triceps",
          warmup: "7 dk yürüyüş bandı + 2 set hafif bench press ısınma",
          cooldown: "5 dk üst vücut esneme",
          exercises: [
            { exerciseId: "bench_press", sets: compoundSets, reps: compoundReps, rest: "90 sn" },
            { exerciseId: "incline_press", sets: compoundSets, reps: compoundReps, rest: "75 sn" },
            { exerciseId: "arnold_press", sets: 3, reps: isolationReps, rest: "60 sn" },
            { exerciseId: "lateral_raise", sets: 3, reps: "12-15", rest: "60 sn" },
            { exerciseId: "tricep_pushdown", sets: 3, reps: isolationReps, rest: "60 sn" },
            { exerciseId: "dumbbell_chest_fly", sets: 3, reps: isolationReps, rest: "60 sn" },
          ],
        },
        {
          name: "Salı",
          type: "workout",
          label: "PULL - Sırt + Biceps",
          warmup: "7 dk kürek + hafif lat pulldown ısınma",
          cooldown: "5 dk sırt ve kol esneme",
          exercises: [
            { exerciseId: "deadlift_light", sets: compoundSets, reps: compoundReps, rest: "2 dk" },
            { exerciseId: "barbell_row", sets: compoundSets, reps: compoundReps, rest: "90 sn" },
            { exerciseId: "lat_pulldown", sets: 3, reps: "10-12", rest: "60 sn" },
            { exerciseId: "face_pull", sets: 3, reps: "15", rest: "60 sn" },
            { exerciseId: "barbell_curl", sets: 3, reps: "10-12", rest: "60 sn" },
            { exerciseId: "hammer_curl", sets: 3, reps: isolationReps, rest: "60 sn" },
          ],
        },
        {
          name: "Çarşamba",
          type: "rest",
          label: "DİNLENME",
          note: "Aktif dinlenme: 30 dk tempolu yürüyüş veya foam roller.",
          exercises: [],
        },
        {
          name: "Perşembe",
          type: "workout",
          label: "Bacak + Core",
          warmup: "7 dk bisiklet + hafif squat ısınma",
          cooldown: "5 dk alt vücut esneme + foam roller",
          exercises: [
            { exerciseId: "squat_m", sets: compoundSets, reps: compoundReps, rest: "2 dk" },
            { exerciseId: "leg_press", sets: compoundSets, reps: compoundReps, rest: "90 sn" },
            { exerciseId: "lunge", sets: 3, reps: "10 (her bacak)", rest: "75 sn" },
            { exerciseId: "leg_curl", sets: 3, reps: isolationReps, rest: "60 sn" },
            { exerciseId: "calf_raise", sets: 4, reps: "15", rest: "45 sn" },
            { exerciseId: "plank", sets: 3, reps: `${50 + w * 5} saniye`, rest: "45 sn" },
          ],
        },
        {
          name: "Cuma",
          type: "cardio",
          label: "HIIT + Core",
          warmup: "5 dk hafif koşu",
          cooldown: "5 dk esneme",
          exercises: [
            { exerciseId: "treadmill", sets: 1, reps: `${25 + w * 3} dk HIIT`, rest: "-", duration: `${25 + w * 3} dk: 1dk hızlı / 1dk yavaş` },
            { exerciseId: "russian_twist", sets: 3, reps: "20 (her taraf)", rest: "30 sn" },
            { exerciseId: "bicycle_crunch", sets: 3, reps: "20 (her taraf)", rest: "30 sn" },
            { exerciseId: "dead_bug", sets: 3, reps: "10 (her taraf)", rest: "30 sn" },
          ],
        },
        {
          name: "Cumartesi",
          type: "cardio",
          label: "Aktif Dinlenme",
          note: "45-60 dk yürüyüş, yüzme veya bisiklet.",
          exercises: [],
        },
        {
          name: "Pazar",
          type: "rest",
          label: "DİNLENME",
          note: "Tam dinlenme.",
          exercises: [],
        },
      ],
    });
  }

  // FAZ 5: Hafta 17-20 — Ağır Compound, Güç Odaklı
  for (let w = 0; w < 4; w++) {
    const isDeload = w === 3;
    const isPeak = w === 2;
    const heavySets = isDeload ? 3 : 4;
    const heavyReps = isDeload ? "10" : "6-8";
    const moderateReps = isDeload ? "10-12" : "8-10";
    const dropNote = isPeak ? " (son set drop set)" : "";

    weeks.push({
      week: w + 17,
      phase: 5,
      phaseLabel: isDeload
        ? "Faz 5: İleri Güç (Deload)"
        : "Faz 5: İleri Güç",
      days: [
        {
          name: "Pazartesi",
          type: "workout",
          label: "Üst Vücut Push (Ağır)",
          warmup: "7 dk yürüyüş bandı + 2 set kademeli bench press ısınma",
          cooldown: "5 dk üst vücut esneme",
          exercises: [
            { exerciseId: "bench_press", sets: heavySets, reps: heavyReps, rest: "2 dk" },
            { exerciseId: "ohp", sets: heavySets, reps: moderateReps, rest: "90 sn" },
            { exerciseId: "incline_press", sets: 3, reps: "10", rest: "75 sn" },
            { exerciseId: "cable_fly", sets: 3, reps: `12${dropNote}`, rest: "60 sn" },
            { exerciseId: "skull_crusher", sets: 3, reps: `10${dropNote}`, rest: "60 sn" },
            { exerciseId: "push_up", sets: 3, reps: "max", rest: "60 sn" },
          ],
        },
        {
          name: "Salı",
          type: "workout",
          label: "Bacak (Ağır)",
          warmup: "7 dk bisiklet + 2 set kademeli squat ısınma",
          cooldown: "5 dk alt vücut esneme + foam roller",
          exercises: [
            { exerciseId: "squat_m", sets: heavySets, reps: heavyReps, rest: "2 dk" },
            { exerciseId: "deadlift_light", sets: heavySets, reps: moderateReps, rest: "90 sn" },
            { exerciseId: "bulgarian_split_squat", sets: 3, reps: "10 (her bacak)", rest: "75 sn" },
            { exerciseId: "leg_extension", sets: 3, reps: `12${dropNote}`, rest: "60 sn" },
            { exerciseId: "leg_curl", sets: 3, reps: `12${dropNote}`, rest: "60 sn" },
            { exerciseId: "calf_raise", sets: 4, reps: "15", rest: "45 sn" },
          ],
        },
        {
          name: "Çarşamba",
          type: "cardio",
          label: "HIIT + Core",
          warmup: "5 dk hafif koşu",
          cooldown: "5 dk esneme",
          exercises: [
            { exerciseId: "treadmill", sets: 1, reps: `${25 + w * 2} dk HIIT`, rest: "-", duration: `${25 + w * 2} dk: 1dk hızlı / 1dk yavaş` },
            { exerciseId: "plank", sets: 3, reps: `${50 + w * 5} saniye`, rest: "45 sn" },
            { exerciseId: "bicycle_crunch", sets: 3, reps: "20 (her taraf)", rest: "30 sn" },
            { exerciseId: "russian_twist", sets: 3, reps: "20 (her taraf)", rest: "30 sn" },
            { exerciseId: "leg_raise", sets: 3, reps: "15", rest: "30 sn" },
            { exerciseId: "dead_bug", sets: 3, reps: "10 (her taraf)", rest: "30 sn" },
          ],
        },
        {
          name: "Perşembe",
          type: "workout",
          label: "Üst Vücut Pull (Ağır)",
          warmup: "7 dk kürek + hafif barbell row ısınma",
          cooldown: "5 dk sırt ve kol esneme",
          exercises: [
            { exerciseId: "barbell_row", sets: heavySets, reps: heavyReps, rest: "2 dk" },
            { exerciseId: "lat_pulldown", sets: heavySets, reps: moderateReps, rest: "75 sn" },
            { exerciseId: "dumbbell_row", sets: 3, reps: "10 (her kol)", rest: "60 sn" },
            { exerciseId: "face_pull", sets: 3, reps: "15", rest: "60 sn" },
            { exerciseId: "barbell_curl", sets: 3, reps: `10${dropNote}`, rest: "60 sn" },
            { exerciseId: "rear_delt_fly", sets: 3, reps: "12", rest: "60 sn" },
          ],
        },
        {
          name: "Cuma",
          type: "workout",
          label: "Tüm Vücut Compound",
          warmup: "7 dk yürüyüş bandı",
          cooldown: "10 dk kapsamlı esneme",
          exercises: [
            { exerciseId: "squat_m", sets: 3, reps: "8", rest: "90 sn" },
            { exerciseId: "bench_press", sets: 3, reps: "8", rest: "90 sn" },
            { exerciseId: "barbell_row", sets: 3, reps: "8", rest: "90 sn" },
            { exerciseId: "ohp", sets: 3, reps: "10", rest: "60 sn" },
            { exerciseId: "treadmill", sets: 1, reps: `${20 + w * 2} dk`, rest: "-", duration: `${20 + w * 2} dk tempolu koşu — Hız 8-9 km/sa` },
          ],
        },
        {
          name: "Cumartesi",
          type: "cardio",
          label: "Aktif Dinlenme",
          note: "45-60 dk yürüyüş, yüzme veya bisiklet.",
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

  // FAZ 6: Hafta 21-24 — Zirve Performans + Final
  for (let w = 0; w < 4; w++) {
    const isDeload = w === 3;
    const isPeak = w === 2;
    const heavySets = isDeload ? 3 : 4;
    const heavyReps = isDeload ? "10-12" : isPeak ? "4-6" : "5-6";
    const moderateReps = isDeload ? "10" : "8";
    const failureNote = isPeak ? " (son set failure)" : "";
    const dropNote = isPeak ? " (drop set)" : "";

    weeks.push({
      week: w + 21,
      phase: 6,
      phaseLabel: isDeload
        ? "Faz 6: Zirve (Deload + Final)"
        : "Faz 6: Zirve",
      days: [
        {
          name: "Pazartesi",
          type: "workout",
          label: "Push Ağır",
          warmup: "7 dk yürüyüş bandı + 3 set kademeli bench press ısınma",
          cooldown: "5 dk esneme",
          exercises: [
            { exerciseId: "bench_press", sets: heavySets, reps: `${heavyReps}${failureNote}`, rest: "2-3 dk" },
            { exerciseId: "ohp", sets: heavySets, reps: moderateReps, rest: "90 sn" },
            { exerciseId: "incline_press", sets: heavySets, reps: moderateReps, rest: "75 sn" },
            { exerciseId: "dumbbell_chest_fly", sets: 3, reps: `12${dropNote}`, rest: "60 sn" },
            { exerciseId: "tricep_pushdown", sets: 3, reps: `12${dropNote}`, rest: "60 sn" },
            { exerciseId: "lateral_raise", sets: 3, reps: "15", rest: "45 sn" },
          ],
        },
        {
          name: "Salı",
          type: "workout",
          label: "Pull Ağır",
          warmup: "7 dk kürek + kademeli deadlift ısınma",
          cooldown: "5 dk esneme",
          exercises: [
            { exerciseId: "deadlift_light", sets: heavySets, reps: `${heavyReps}${failureNote}`, rest: "2-3 dk" },
            { exerciseId: "barbell_row", sets: heavySets, reps: moderateReps, rest: "90 sn" },
            { exerciseId: "lat_pulldown", sets: heavySets, reps: "8-10", rest: "75 sn" },
            { exerciseId: "face_pull", sets: 3, reps: "15", rest: "60 sn" },
            { exerciseId: "barbell_curl", sets: 3, reps: `10${dropNote}`, rest: "60 sn" },
            { exerciseId: "rear_delt_fly", sets: 3, reps: "12", rest: "60 sn" },
          ],
        },
        {
          name: "Çarşamba",
          type: "cardio",
          label: "HIIT + Core",
          warmup: "5 dk hafif koşu",
          cooldown: "5 dk esneme + nefes egzersizi",
          exercises: [
            { exerciseId: "treadmill", sets: 1, reps: `${28 + w * 2} dk HIIT`, rest: "-", duration: `${28 + w * 2} dk: 1dk sprint / 1dk yavaş` },
            { exerciseId: "plank", sets: 3, reps: `${60 + w * 5} saniye`, rest: "45 sn" },
            { exerciseId: "russian_twist", sets: 3, reps: "25 (her taraf)", rest: "30 sn" },
            { exerciseId: "bicycle_crunch", sets: 3, reps: "25 (her taraf)", rest: "30 sn" },
            { exerciseId: "leg_raise", sets: 3, reps: "15", rest: "30 sn" },
            { exerciseId: "dead_bug", sets: 3, reps: "12 (her taraf)", rest: "30 sn" },
          ],
        },
        {
          name: "Perşembe",
          type: "workout",
          label: "Bacak Ağır",
          warmup: "7 dk bisiklet + 3 set kademeli squat ısınma",
          cooldown: "5 dk esneme + foam roller",
          exercises: [
            { exerciseId: "squat_m", sets: heavySets, reps: `${heavyReps}${failureNote}`, rest: "2-3 dk" },
            { exerciseId: "leg_press", sets: heavySets, reps: moderateReps, rest: "90 sn" },
            { exerciseId: "bulgarian_split_squat", sets: 3, reps: "10 (her bacak)", rest: "75 sn" },
            { exerciseId: "leg_curl", sets: 3, reps: `12${dropNote}`, rest: "60 sn" },
            { exerciseId: "leg_extension", sets: 3, reps: `12${dropNote}`, rest: "60 sn" },
            { exerciseId: "calf_raise", sets: 4, reps: "15", rest: "45 sn" },
          ],
        },
        {
          name: "Cuma",
          type: "workout",
          label: "Tüm Vücut + Kardiyo",
          warmup: "7 dk yürüyüş bandı",
          cooldown: "10 dk kapsamlı esneme",
          exercises: [
            { exerciseId: "bench_press", sets: 3, reps: "8", rest: "90 sn" },
            { exerciseId: "barbell_row", sets: 3, reps: "8", rest: "90 sn" },
            { exerciseId: "squat_m", sets: 3, reps: "8", rest: "90 sn" },
            { exerciseId: "ohp", sets: 3, reps: "10", rest: "60 sn" },
            { exerciseId: "treadmill", sets: 1, reps: `${22 + w * 2} dk`, rest: "-", duration: `${22 + w * 2} dk tempolu koşu — Hız 9-10 km/sa` },
          ],
        },
        {
          name: "Cumartesi",
          type: "cardio",
          label: "Aktif Dinlenme",
          note: isDeload
            ? "Son hafta! Final değerlendirmesi yap. Vücudundaki değişimi ölç ve kutla!"
            : "45-60 dk yürüyüş, yüzme veya bisiklet.",
          exercises: [],
        },
        {
          name: "Pazar",
          type: "rest",
          label: "DİNLENME",
          note: isDeload
            ? "24 haftalık program tamam! Tebrikler! Yeni hedefler seni bekliyor."
            : "Tam dinlenme.",
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

  // =========================================================================
  // FAZ 1: Hafta 1-4 — Full Body, 3 gün/hafta
  // H1: 3x12 (base)
  // H2: 3x14 (+1-2kg)
  // H3: 4x12 (+10 dk cardio finisher)
  // H4: DELOAD 3x12 (-20% ağırlık)
  // =========================================================================
  for (let w = 0; w < 4; w++) {
    const weekNum = w + 1;

    // Progression helpers
    const stdSets = w === 2 ? 4 : 3;
    const stdReps = w === 1 ? "14" : "12";

    // Lunge progression: H1 3x10, H2 3x12, H3 4x10, H4 3x10
    const lungeSets = w === 2 ? 4 : 3;
    const lungeReps = w === 1 ? "12 (her bacak)" : "10 (her bacak)";

    // Plank progression: H1 30s, H2 40s, H3 45s, H4 30s
    const plankSec = w === 0 ? 30 : w === 1 ? 40 : w === 2 ? 45 : 30;

    // Bicycle crunch: H1 3x15, H2 3x18, H3 4x15 (note: sets change for H3), H4 3x15
    const bicycleSets = w === 2 ? 4 : 3; // not needed separately since stdSets handles it for most
    const bicycleReps = w === 1 ? "18 (her taraf)" : "15 (her taraf)";

    // Push-up: H1 3x10, H2 3x12, H3 4x10-12, H4 3x10
    const pushupSets = w === 2 ? 4 : 3;
    const pushupReps = w === 0 ? "10" : w === 1 ? "12" : w === 2 ? "10-12" : "10";

    // Dumbbell row: H1 3x10, H2 3x12, H3 4x10, H4 3x10
    const dbRowSets = w === 2 ? 4 : 3;
    const dbRowReps = w === 1 ? "12 (her kol)" : "10 (her kol)";

    // Phase label with deload suffix for week 4
    const phaseLabel = w === 3
      ? "Faz 1: Temelleri Atma (Deload)"
      : "Faz 1: Temelleri Atma";

    // Week 3 finisher notes
    const mondayNote = w === 2 ? "Finisher: 10 dk koşu bandı (6-7 km/h tempo)" : undefined;
    const wednesdayNote = w === 2 ? "Finisher: 10 dk eliptik (orta direnç)" : undefined;
    const fridayNote = w === 2 ? "Finisher: 10 dk kürek makinesi (orta tempo)" : undefined;

    weeks.push({
      week: weekNum,
      phase: 1,
      phaseLabel,
      days: [
        // Pazartesi — Full Body A
        {
          name: "Pazartesi",
          type: "workout",
          label: "Full Body A",
          warmup: "5 dk koşu bandı (hafif tempo) + dinamik germe",
          cooldown: "5 dk yürüyüş + statik germe",
          ...(mondayNote ? { note: mondayNote } : {}),
          exercises: [
            { exerciseId: "goblet_squat", sets: stdSets, reps: stdReps, rest: "60 sn" },
            { exerciseId: "dumbbell_press", sets: stdSets, reps: stdReps, rest: "60 sn" },
            { exerciseId: "lat_pulldown", sets: stdSets, reps: stdReps, rest: "60 sn" },
            { exerciseId: "lunge", sets: lungeSets, reps: lungeReps, rest: "60 sn" },
            { exerciseId: "shoulder_press", sets: stdSets, reps: stdReps, rest: "60 sn" },
            { exerciseId: "plank", sets: 3, reps: `${plankSec} saniye`, rest: "45 sn" },
          ],
        },
        // Salı — DİNLENME
        {
          name: "Salı",
          type: "rest",
          label: "DİNLENME",
          note: "30 dk tempolu yürüyüş veya hafif yoga. Aktif dinlenme günü.",
          exercises: [],
        },
        // Çarşamba — Full Body B
        {
          name: "Çarşamba",
          type: "workout",
          label: "Full Body B",
          warmup: "5 dk eliptik bisiklet + dinamik germe",
          cooldown: "5 dk yürüyüş + statik germe",
          ...(wednesdayNote ? { note: wednesdayNote } : {}),
          exercises: [
            { exerciseId: "leg_press", sets: stdSets, reps: stdReps, rest: "60 sn" },
            { exerciseId: "seated_row", sets: stdSets, reps: stdReps, rest: "60 sn" },
            { exerciseId: "dumbbell_chest_fly", sets: stdSets, reps: stdReps, rest: "60 sn" },
            { exerciseId: "deadlift_light", sets: stdSets, reps: stdReps, rest: "60 sn" },
            { exerciseId: "lateral_raise", sets: stdSets, reps: stdReps, rest: "60 sn" },
            { exerciseId: "bicycle_crunch", sets: w === 2 ? 4 : 3, reps: bicycleReps, rest: "45 sn" },
          ],
        },
        // Perşembe — DİNLENME
        {
          name: "Perşembe",
          type: "rest",
          label: "DİNLENME",
          note: "30 dk tempolu yürüyüş veya hafif stretching.",
          exercises: [],
        },
        // Cuma — Full Body C
        {
          name: "Cuma",
          type: "workout",
          label: "Full Body C",
          warmup: "5 dk koşu bandı + dinamik germe",
          cooldown: "5 dk yürüyüş + statik germe",
          ...(fridayNote ? { note: fridayNote } : {}),
          exercises: [
            { exerciseId: "sumo_squat", sets: stdSets, reps: stdReps, rest: "60 sn" },
            { exerciseId: "push_up", sets: pushupSets, reps: pushupReps, rest: "60 sn" },
            { exerciseId: "dumbbell_row", sets: dbRowSets, reps: dbRowReps, rest: "60 sn" },
            { exerciseId: "hip_thrust", sets: stdSets, reps: stdReps, rest: "60 sn" },
            { exerciseId: "tricep_pushdown", sets: stdSets, reps: stdReps, rest: "60 sn" },
            { exerciseId: "leg_raise", sets: stdSets, reps: stdReps, rest: "45 sn" },
          ],
        },
        // Cumartesi — DİNLENME
        {
          name: "Cumartesi",
          type: "rest",
          label: "DİNLENME",
          note: "Cumartesi: 40 dk doğa yürüyüşü veya bisiklet.",
          exercises: [],
        },
        // Pazar — DİNLENME
        {
          name: "Pazar",
          type: "rest",
          label: "DİNLENME",
          note: "Pazar: Tam dinlenme, bol uyku.",
          exercises: [],
        },
      ],
    });
  }

  // =========================================================================
  // FAZ 2: Hafta 5-8 — Upper/Lower Split, 4 gün/hafta
  // H5: Base (4x10 compound, 3x12 isolation)
  // H6: +5-10% ağırlık, -5s dinlenme, +10 dk LISS cardio, 3s negatif
  // H7: Aynı + son egzersizde DROP SET
  // H8: DELOAD -20% ağırlık
  // =========================================================================
  for (let w = 0; w < 4; w++) {
    const weekNum = w + 5;
    const isDeload = w === 3;

    const phaseLabel = isDeload
      ? "Faz 2: Güç ve Şekillendirme (Deload)"
      : "Faz 2: Güç ve Şekillendirme";

    // Rest time adjustments: H6 reduces by 5s
    const compoundRest = (w === 1 || w === 2) ? "70 sn" : "75 sn";
    const isolationRest60 = (w === 1 || w === 2) ? "55 sn" : "60 sn";
    const isolationRest45 = (w === 1 || w === 2) ? "40 sn" : "45 sn";
    const longRest = (w === 1 || w === 2) ? "85 sn" : "90 sn";

    // Slow eccentric note for H6 and H7
    const eccentricNote = (w === 1 || w === 2) ? " (3 sn negatif)" : "";

    // LISS cardio note for H6 and H7
    const lissNote = (w === 1 || w === 2) ? "Antrenman sonrası: +10 dk LISS kardiyo" : undefined;

    // Drop set notes for H7 (w===2)
    const dropSetSkullCrusher = w === 2 ? " (son set drop set)" : "";
    const dropSetLegCurl = w === 2 ? " (son set drop set)" : "";
    const dropSetLateralRaise = w === 2 ? " (son set drop set)" : "";
    const dropSetLegExtension = w === 2 ? " (son set drop set)" : "";

    // Plank notation for Phase 2
    const plankReps = "30 sn ön + 15 sn sağ + 15 sn sol";

    weeks.push({
      week: weekNum,
      phase: 2,
      phaseLabel,
      days: [
        // Pazartesi — Upper Body A
        {
          name: "Pazartesi",
          type: "workout",
          label: "Upper Body A",
          warmup: "7 dk yürüyüş bandı + hafif omuz ısınma",
          cooldown: "5 dk germe",
          ...(lissNote ? { note: lissNote } : {}),
          exercises: [
            { exerciseId: "dumbbell_press", sets: 4, reps: `10${eccentricNote}`, rest: compoundRest },
            { exerciseId: "barbell_row", sets: 4, reps: `10${eccentricNote}`, rest: compoundRest },
            { exerciseId: "shoulder_press", sets: 3, reps: `12${eccentricNote}`, rest: isolationRest60 },
            { exerciseId: "face_pull", sets: 3, reps: "15", rest: isolationRest45 },
            { exerciseId: "bicep_curl", sets: 3, reps: "12", rest: isolationRest45 },
            { exerciseId: "skull_crusher", sets: 3, reps: `12${dropSetSkullCrusher}`, rest: isolationRest45 },
          ],
        },
        // Salı — Lower Body A
        {
          name: "Salı",
          type: "workout",
          label: "Lower Body A",
          warmup: "7 dk bisiklet + hafif squat ısınma",
          cooldown: "5 dk germe",
          ...(lissNote ? { note: lissNote } : {}),
          exercises: [
            { exerciseId: "squat_m", sets: 4, reps: `10${eccentricNote}`, rest: longRest },
            { exerciseId: "deadlift_light", sets: 4, reps: `10${eccentricNote}`, rest: compoundRest },
            { exerciseId: "leg_press", sets: 3, reps: `12${eccentricNote}`, rest: compoundRest },
            { exerciseId: "leg_curl", sets: 3, reps: `12${dropSetLegCurl}`, rest: isolationRest60 },
            { exerciseId: "calf_raise", sets: 4, reps: "15", rest: isolationRest45 },
            { exerciseId: "plank", sets: 3, reps: plankReps, rest: isolationRest45 },
          ],
        },
        // Çarşamba — DİNLENME
        {
          name: "Çarşamba",
          type: "rest",
          label: "DİNLENME",
          note: "30 dk yürüyüş + foam roller ile toparlanma.",
          exercises: [],
        },
        // Perşembe — Upper Body B
        {
          name: "Perşembe",
          type: "workout",
          label: "Upper Body B",
          warmup: "7 dk yürüyüş bandı",
          cooldown: "5 dk germe",
          ...(lissNote ? { note: lissNote } : {}),
          exercises: [
            { exerciseId: "incline_press", sets: 4, reps: `10${eccentricNote}`, rest: compoundRest },
            { exerciseId: "lat_pulldown", sets: 4, reps: `10${eccentricNote}`, rest: compoundRest, duration: "dar tutuş, V-bar" },
            { exerciseId: "lateral_raise", sets: 3, reps: `15${dropSetLateralRaise}`, rest: isolationRest45 },
            { exerciseId: "rear_delt_fly", sets: 3, reps: "12", rest: isolationRest45 },
            { exerciseId: "hammer_curl", sets: 3, reps: "12", rest: isolationRest45 },
            { exerciseId: "tricep_kickback", sets: 3, reps: "12", rest: isolationRest45 },
          ],
        },
        // Cuma — Lower Body B
        {
          name: "Cuma",
          type: "workout",
          label: "Lower Body B",
          warmup: "5 dk bisiklet",
          cooldown: "5 dk germe + foam roller",
          ...(lissNote ? { note: lissNote } : {}),
          exercises: [
            { exerciseId: "hip_thrust", sets: 4, reps: `10${eccentricNote}`, rest: compoundRest },
            { exerciseId: "bulgarian_split_squat", sets: 3, reps: `10 (her bacak)${eccentricNote}`, rest: compoundRest },
            { exerciseId: "sumo_squat", sets: 4, reps: `10${eccentricNote}`, rest: compoundRest },
            { exerciseId: "leg_extension", sets: 3, reps: `12${dropSetLegExtension}`, rest: isolationRest60 },
            { exerciseId: "seated_calf_raise", sets: 4, reps: "15", rest: isolationRest45 },
            { exerciseId: "leg_raise", sets: 3, reps: "10", rest: isolationRest45 },
          ],
        },
        // Cumartesi — DİNLENME
        {
          name: "Cumartesi",
          type: "rest",
          label: "DİNLENME",
          note: "Hafta sonu dinlenme. Hafif yürüyüş veya stretching yapılabilir.",
          exercises: [],
        },
        // Pazar — DİNLENME
        {
          name: "Pazar",
          type: "rest",
          label: "DİNLENME",
          note: "Tam dinlenme. Bol uyku.",
          exercises: [],
        },
      ],
    });
  }

  // =========================================================================
  // FAZ 3: Hafta 9-12 — PPL + Upper Light + HIIT, 5-6 gün/hafta
  // H9:  Base
  // H10: +5-10% ağırlık, HIIT 40s/15s, superset rest 30s, cardio 12 dk
  // H11: PEAK - son set failure, HIIT 4 tur, drop set son 2 egzersiz, 15 dk interval
  // H12: DELOAD -25% ağırlık + final değerlendirme
  // =========================================================================
  for (let w = 0; w < 4; w++) {
    const weekNum = w + 9;
    const isDeload = w === 3;
    const isPeak = w === 2;

    const phaseLabel = isDeload
      ? "Faz 3: Şekillendirme (Deload + Final)"
      : "Faz 3: Şekillendirme";

    // HIIT parameters
    const hiitWork = (w === 1 || w === 2) ? "40 sn" : "40 sn";
    const hiitRest = w === 0 ? "20 sn" : w === 1 ? "15 sn" : w === 2 ? "15 sn" : "20 sn";
    const hiitRounds = w === 2 ? 4 : 3;

    // Cardio duration
    const cardioDuration = w === 0 ? "10" : w === 1 ? "12" : w === 2 ? "15" : "10";

    // Superset rest for H10+
    const supersetRest = (w === 1 || w === 2) ? "30 sn" : "45 sn";

    // Drop set notes for H11 (w===2) - last 2 exercises
    const dropNote = isPeak ? " (drop set)" : "";

    // Failure note for H11
    const failureNote = isPeak ? " (son set failure)" : "";

    // Interval type
    const intervalNote = isPeak ? `+${cardioDuration} dk interval kardiyo` : `+${cardioDuration} dk koşu bandı interval (1 dk hızlı / 1 dk yavaş)`;

    weeks.push({
      week: weekNum,
      phase: 3,
      phaseLabel,
      days: [
        // Pazartesi — PUSH (Chest + Shoulder + Tricep)
        {
          name: "Pazartesi",
          type: "workout",
          label: "PUSH - Göğüs + Omuz + Tricep",
          warmup: "7 dk yürüyüş bandı + hafif omuz ve göğüs ısınma",
          cooldown: "5 dk germe",
          note: `+${cardioDuration} dk koşu bandı interval (1 dk hızlı / 1 dk yavaş)`,
          exercises: [
            { exerciseId: "dumbbell_press", sets: 4, reps: `10${failureNote}`, rest: "60 sn" },
            { exerciseId: "dumbbell_chest_fly", sets: 3, reps: "12", rest: "45 sn", duration: "incline variant" },
            { exerciseId: "shoulder_press", sets: 4, reps: `10${failureNote}`, rest: "60 sn" },
            { exerciseId: "lateral_raise", sets: 3, reps: `12+12 (süperset: lateral + front raise)${dropNote}`, rest: supersetRest },
            { exerciseId: "tricep_pushdown", sets: 3, reps: `12+10 (süperset: pushdown + dip)${dropNote}`, rest: supersetRest },
          ],
        },
        // Salı — PULL (Back + Bicep)
        {
          name: "Salı",
          type: "workout",
          label: "PULL - Sırt + Bicep",
          warmup: "7 dk kürek makinesi + hafif sırt ısınma",
          cooldown: "5 dk germe",
          note: `+${cardioDuration} dk kürek makinesi interval`,
          exercises: [
            { exerciseId: "lat_pulldown", sets: 4, reps: `10${failureNote}`, rest: "60 sn", duration: "geniş tutuş" },
            { exerciseId: "seated_row", sets: 4, reps: `10${failureNote}`, rest: "60 sn" },
            { exerciseId: "dumbbell_row", sets: 3, reps: "10 (her kol)", rest: "60 sn" },
            { exerciseId: "face_pull", sets: 3, reps: `15${dropNote}`, rest: "45 sn" },
            { exerciseId: "bicep_curl", sets: 3, reps: `12+12 (süperset: bicep curl + hammer curl)${dropNote}`, rest: supersetRest },
          ],
        },
        // Çarşamba — LEGS (Legs + Glutes)
        {
          name: "Çarşamba",
          type: "workout",
          label: "LEGS - Bacak + Kalça",
          warmup: "7 dk bisiklet + dinamik bacak ısınma",
          cooldown: "5 dk germe + foam roller",
          exercises: [
            { exerciseId: "squat_m", sets: 4, reps: `10${failureNote}`, rest: "90 sn" },
            { exerciseId: "hip_thrust", sets: 4, reps: `10${failureNote}`, rest: "75 sn" },
            { exerciseId: "bulgarian_split_squat", sets: 3, reps: "10 (her bacak)", rest: "60 sn" },
            { exerciseId: "leg_curl", sets: 3, reps: `12+12 (süperset: leg curl + leg extension)${dropNote}`, rest: "60 sn" },
            { exerciseId: "calf_raise", sets: 4, reps: `15${dropNote}`, rest: "45 sn" },
          ],
        },
        // Perşembe — DİNLENME
        {
          name: "Perşembe",
          type: "rest",
          label: "DİNLENME",
          note: "Aktif toparlanma: 30 dk yürüyüş + stretching + foam roller.",
          exercises: [],
        },
        // Cuma — Upper Body Light (High Rep)
        {
          name: "Cuma",
          type: "workout",
          label: "Upper Body Light - Yüksek Tekrar",
          warmup: "5 dk yürüyüş bandı + hafif ısınma",
          cooldown: "5 dk germe",
          exercises: [
            { exerciseId: "push_up", sets: 3, reps: "max", rest: "60 sn" },
            { exerciseId: "dumbbell_row", sets: 3, reps: "15", rest: "45 sn" },
            { exerciseId: "arnold_press", sets: 3, reps: "12", rest: "45 sn" },
            { exerciseId: "cable_fly", sets: 3, reps: `15${dropNote}`, rest: "45 sn" },
            { exerciseId: "bicep_curl", sets: 3, reps: `15+15 (süperset: bicep curl + tricep pushdown)${dropNote}`, rest: supersetRest },
          ],
        },
        // Cumartesi — HIIT + Core
        {
          name: "Cumartesi",
          type: "cardio",
          label: "HIIT + Core",
          warmup: "5 dk hafif koşu ısınma",
          cooldown: "5 dk germe + nefes egzersizi",
          note: `HIIT Devresi (${hiitRounds} tur, ${hiitWork} çalış / ${hiitRest} dinlen): Jumping Jack → Mountain Climber → Squat Jump → Burpee → High Knees. Turlar arası 2 dk dinlenme.`,
          exercises: [
            { exerciseId: "plank", sets: 3, reps: "45 saniye", rest: "45 sn" },
            { exerciseId: "bicycle_crunch", sets: 3, reps: "20 (her taraf)", rest: "30 sn" },
            { exerciseId: "leg_raise", sets: 3, reps: "15", rest: "30 sn" },
            { exerciseId: "russian_twist", sets: 3, reps: "20 toplam", rest: "30 sn" },
          ],
        },
        // Pazar — DİNLENME
        {
          name: "Pazar",
          type: "rest",
          label: "DİNLENME",
          note: "Tam dinlenme. Bol uyku.",
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
  "12. hafta! Yarı yoldayız. Başlangıçtan bugüne ne kadar yol geldiğine bak.",
  "Faz 4 başlıyor! PPL split ile hacim artışına geçiyoruz. Yeni hareketler öğren.",
  "Ağırlıkları kademeli artır. Her hafta küçük bir adım, büyük bir fark.",
  "Hacim haftası: Extra set ekledik. Kasların büyümeye devam ediyor!",
  "Deload haftası. Ağırlıkları hafiflet, vücuduna dinlenme şansı ver.",
  "Faz 5: Ağır kaldırmaya başlıyoruz! Compound hareketlere odaklan.",
  "Güç artışı devam ediyor. Formunu koru, ağırlıkları artır.",
  "Peak hafta! Drop setlerle kaslarını zorla. Sınırlarını test et!",
  "Deload haftası. 5 ay geride kaldı. Sen artık bambaşka birisin.",
  "Faz 6: Son 4 hafta! PR zamanı geldi. Her şeyini ver!",
  "Ağırlıklarda kişisel rekorlarını kır. Kendini kanıtla!",
  "Peak performans haftası! Failure setleriyle tüm gücünü göster!",
  "24. HAFTA! Programı tamamladın! Aynaya bak — o adam bambaşka biri!",
];

const MALE_QUOTES = [
  { q: "Bugün yapamadığını yarın da yapamazsın. Başla, gerisini vücudun halledecek.", a: "Koçun" },
  { q: "Disiplin, motivasyon bittiğinde devam etmektir.", a: "Koçun" },
  { q: "93 kilodan 75 kiloya: her damla ter, hedefe bir adım daha yakın.", a: "Koçun" },
  { q: "Vücudun sana teşekkür edecek. Sabret.", a: "Koçun" },
  { q: "Bir ay sonra keşke bugün başlasaydım diyeceksin. O gün bugün.", a: "Koçun" },
  { q: "Mükemmel plan yoktur; olan planı uygulamak vardır.", a: "Koçun" },
  { q: "Kilo verme bir sprint değil, maratondur. Her hafta bir zafer.", a: "Koçun" },
  { q: "Kendine yatırım yapıyorsun. Getirisi sağlık, enerji ve özgüven.", a: "Koçun" },
  { q: "Aynaya bak. 24 hafta sonra o adam sana teşekkür edecek.", a: "Koçun" },
  { q: "Sıkıldığında hatırla: Neden başladığını düşün.", a: "Koçun" },
  { q: "Her antrenmandan sonra dünkü halinden daha güçlüsün.", a: "Koçun" },
  { q: "Yarı yoldayız! 12 hafta geride, 12 hafta önünde. Dur durma!", a: "Koçun" },
  { q: "Kas hafızası gerçek. Her antrenman vücuduna yeni bir ders.", a: "Koçun" },
  { q: "Bugünkü ter, yarının güveni. Devam et.", a: "Koçun" },
  { q: "Hacim arttı, güç arttı. Sonuçlar geliyor!", a: "Koçun" },
  { q: "Dinlenme de antrenmanın parçası. Akıllı çalış.", a: "Koçun" },
  { q: "Güç sadece ağırlık kaldırmak değil, vazgeçmemektir.", a: "Koçun" },
  { q: "6 ayda bir hayat değişir. Sen tam o yoldasın.", a: "Koçun" },
  { q: "Her PR bir zafer. Ama asıl zafer buraya her gün gelmen.", a: "Koçun" },
  { q: "Vücudun bir makine, beslenmen yakıtı. İkisine de özen göster.", a: "Koçun" },
  { q: "Son 4 hafta! Hedefe bu kadar yakınken bırakılır mı?", a: "Koçun" },
  { q: "Zorlandığında hatırla: Kolay olsaydı herkes yapardı.", a: "Koçun" },
  { q: "Kendine verdiğin en güzel hediye: sağlıklı bir yaşam.", a: "Koçun" },
  { q: "18 kilo sadece bir rakam. Asıl kazanç kendine güvenmek.", a: "Koçun" },
];

const FEMALE_WEEK_GOALS: string[] = [
  "Her uzun yolculuk tek bir adımla başlar. Bu hafta o ilk adımın! Hafif ağırlıklar, formu öğrenmeye odaklan.",
  "İkinci hafta en zor haftadır. Bunu aşarsan, geri dönüş yok! Ağırlıkları hafifçe artır.",
  "3 hafta geride kaldı demek, yeni bir alışkanlık doğuyor demek! 4 sete çıkıyoruz ve kardiyo ekliyoruz.",
  "1 ayı tamamladın! Vücudun değişmeye başladı, devam et! Deload haftası — ağırlıkları %20 azalt.",
  "Artık yeni birisin. Bu faz seni daha güçlü yapacak! Upper/Lower split ile 4 gün antrenman.",
  "Aynaya baktığında farkı görmeye başladın mı? Ağırlıkları %5-10 artır, tempoyu yavaşlat.",
  "Comfort zone'un dışında büyüme başlar. Bu hafta limitlerini zorla! Drop set haftası.",
  "2 ay geride kaldı! Aynaya bak — o kişi 8 hafta önceki sen değil! Deload + değerlendirme.",
  "Son 4 hafta! Burası kası tanımladığın, yağı yaktığın yer! Push/Pull/Legs + HIIT başlıyor.",
  "Son 3 hafta! Her damla ter, hedefe bir adım daha yakın! Yoğunluğu artır.",
  "Bu senden çıkacak en yoğun hafta. Sonrası zafer! Son sette failure, HIIT 4 tur.",
  "12 hafta önce hayal ettiğin kişi, şimdi aynada sana bakıyor! TEBRİKLER! Final değerlendirmesi.",
];

const FEMALE_QUOTES = [
  { q: "Bugün başla. Yarın sana teşekkür edecek olan sen, bugünkü sensin.", a: "Koçun" },
  { q: "İkinci hafta en zor haftadır. Bunu aşarsan, geri dönüş yok!", a: "Koçun" },
  { q: "3 hafta geride kaldı demek, yeni bir alışkanlık doğuyor demek!", a: "Koçun" },
  { q: "1 ayı tamamladın! Vücudun değişmeye başladı, devam et!", a: "Koçun" },
  { q: "Artık yeni birisin. Bu faz seni daha güçlü yapacak!", a: "Koçun" },
  { q: "Aynaya baktığında farkı görmeye başladın mı? Devam!", a: "Koçun" },
  { q: "Comfort zone'un dışında büyüme başlar. Limitlerini zorla!", a: "Koçun" },
  { q: "2 ay geride kaldı! O kişi 8 hafta önceki sen değil!", a: "Koçun" },
  { q: "Son 4 hafta! Burası kası tanımladığın, yağı yaktığın yer!", a: "Koçun" },
  { q: "Her damla ter, hedefe bir adım daha yakın!", a: "Koçun" },
  { q: "Bu senden çıkacak en yoğun hafta. Sonrası zafer!", a: "Koçun" },
  { q: "12 hafta önce hayal ettiğin kişi, şimdi aynada sana bakıyor! TEBRİKLER!", a: "Koçun" },
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
