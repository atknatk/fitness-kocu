export type MessageType =
  | "morning"
  | "pre_workout"
  | "lunch"
  | "snack"
  | "evening"
  | "weekly"
  | "meal_plan"
  | "shopping_list";

export interface UserContext {
  name: string;
  programType: "male_recomp" | "female_recomp";
  currentWeek: number;
  totalWeeks: number;
  phaseLabel: string;
  todayPlan: {
    name: string;
    type: "workout" | "cardio" | "rest";
    label: string;
    exercises: string[];
  };
  tomorrowPlan: {
    type: "workout" | "cardio" | "rest";
    label: string;
  };
  weekGoal: string;
  motivationalQuote: string;
  macroSummary: string;
  progress: {
    currentWeightKg: number | null;
    startingWeightKg: number;
    goalWeightKg: number;
    weightChange: number;
    progressPercent: number;
    workoutStreak: number;
    waterYesterday: number;
    waterTarget: number;
    checklistCompleted: number;
    checklistTotal: number;
    weeklyWorkoutsCompleted: number;
    weeklyWorkoutsTotal: number;
  };
}

const SYSTEM_PROMPT = `Sen samimi bir Turkce yasam kocu, motivasyon antrenoru ve fitness rehberisin. Adin "Kocun".

KARAKTER:
- Samimi, sicak, arkadas gibi konusuyorsun (abi/abla degil, sen-ben arasi)
- Gercekci ama hep umut veren bir tondakin
- Kullanicinin gercek ilerleme verilerini kullanarak somut, kisisel mesajlar yaziyorsun
- Klise motivasyon sozleri YAZMA. Gercek verilere dayan.

ILERLEME VERISI KULLANIMI (COK ONEMLI):
- Kilo degisimi varsa mutlaka kullan: "X kg vermissin, bu muhtesem!" veya "Hedefe Y kg kaldi, neredeyse oradasin!"
- Streak varsa vurgula: "Ust uste X gun! Bu seri bozulmaz!"
- Ilerleme yuzdesi varsa kullan: "%X tamamladin, yaridan fazlasi geride kaldi!"
- Su tuketimi dusukse nazikce hatrlat
- Hep somut rakamlara referans ver, bos motivasyon yapma

FORMAT:
- Telegram Markdown: *bold*, _italic_
- 1-3 emoji (abartma)
- Mesajin sonuna ilham verici kisa bir cumle ekle (kendi urettigin, klise olmayan)
- Mesajlar 350 karakteri gecmesin (haftalik ozet haric)
- Kullaniciya ismiyle hitap et`;

export function buildPrompt(
  context: UserContext,
  messageType: MessageType
): { system: string; user: string } {
  const contextBlock = buildContextBlock(context);
  const progressNarrative = buildProgressNarrative(context);

  switch (messageType) {
    case "morning":
      return {
        system: SYSTEM_PROMPT,
        user: `${contextBlock}

${progressNarrative}

Gorev: Sabah motivasyon mesaji yaz.
- MUTLAKA gercek ilerleme verisini kullan (kilo degisimi, streak, yuzde)
- Bugun ${context.todayPlan.type === "rest" ? "dinlenme gunu - vucudun onarim yapiyor, bunu pozitif anlat" : context.todayPlan.label + " var - heyecanlandir"}
- Ilham verici, gune baslatici bir cumle ile bitir (klise olmasin, ozgun olsun)
- Bu haftanin hedefine degin: "${context.weekGoal}"`,
      };

    case "pre_workout":
      return {
        system: SYSTEM_PROMPT,
        user: `${contextBlock}

${progressNarrative}

Gorev: Antrenman oncesi ates yakici mesaj yaz.
- Bugunun programi: *${context.todayPlan.label}*
- Egzersizler: ${context.todayPlan.exercises.join(", ")}
- Ilerleme verisini kullanarak motive et (ornek: "X kg verdin, bugun de Y egzersizinde PR kirabilirsin!")
- Antrenman serisini vurgula: ${context.progress.workoutStreak} gun ust uste - bu seri bozulmasin!
- Enerjik, heyecanlandirici, "haydi kopar!" tonunda
- Sonuna kisa ilham verici cumle ekle`,
      };

    case "lunch":
      return {
        system: SYSTEM_PROMPT,
        user: `${contextBlock}

${progressNarrative}

Gorev: Beslenme hatirlatmasi yaz.
- Makro hedefler: ${context.macroSummary}
- Ilerlemeyi beslenmeye bagla: "X kg verdin, bu beslenme disiplininle geldi!" veya "Hedefe Y kg kaldi, her ogun onemli!"
- Protein hedefini somut rakamla vurgula: ${context.progress.startingWeightKg > context.progress.goalWeightKg ? "Kas kaybetmeden yag yakmak icin protein sart!" : "Kas yapimi icin her gram protein onemli!"}
- Su icmeyi hatrlat
- Sonuna beslenmeyle ilgili ilham verici cumle ekle`,
      };

    case "snack":
      return {
        system: SYSTEM_PROMPT,
        user: `${contextBlock}

${progressNarrative}

Gorev: Ara ogun hatirlatmasi yaz.
- Kisa ve samimi ol (250 karakter)
- Ilerlemeye referans ver: "X kg verdikten sonra bu disiplini bozma!"
- Saglikli atistirmalik oner (yogurt, meyve, badem, lor peyniri)
- Su hatirlatmasi ekle
- Kisa ilham verici cumle ile bitir`,
      };

    case "evening":
      return {
        system: SYSTEM_PROMPT,
        user: `${contextBlock}

${progressNarrative}

Gorev: Aksam degerlendirme mesaji yaz.
- Sakin, gurur veren, "aferin sana" tonunda
- MUTLAKA ilerleme verisini kullan:
  * Kilo degisimi: ${context.progress.weightChange !== 0 ? Math.abs(context.progress.weightChange) + " kg " + (context.progress.weightChange < 0 ? "verdin" : "aldin") + ", hedefe " + Math.abs((context.progress.currentWeightKg || context.progress.startingWeightKg) - context.progress.goalWeightKg).toFixed(1) + " kg kaldi" : "Henuz kilo verisi yok, yarina tartilin!"}
  * Su durumu dun: ${context.progress.waterYesterday}/${context.progress.waterTarget} bardak
  * Streak: ${context.progress.workoutStreak} gun
- Yarin: ${context.tomorrowPlan.type === "rest" ? "Dinlenme gunu, vucudun tesekkur edecek" : context.tomorrowPlan.label + " var, erken yat"}
- Sonuna gece ilham verici cumle ekle (sakin tonlu, umut veren)`,
      };

    case "weekly":
      return {
        system: SYSTEM_PROMPT,
        user: `${contextBlock}

${progressNarrative}

Gorev: Haftalik ilerleme raporu yaz (500 karaktere kadar olabilir).
- Bu bir RAPOR + MOTIVASYON mesaji. Somut verilerle dolu olmali:

*Haftalik Karne:*
- Kilo: ${context.progress.currentWeightKg ? context.progress.currentWeightKg + " kg (baslangic: " + context.progress.startingWeightKg + " kg, degisim: " + context.progress.weightChange + " kg)" : "Kilo verisi yok - bu hafta tartil!"}
- Hedefe kalan: ${context.progress.currentWeightKg ? Math.abs(context.progress.currentWeightKg - context.progress.goalWeightKg).toFixed(1) + " kg" : "?"}
- Ilerleme: %${context.progress.progressPercent}
- Antrenman serisi: ${context.progress.workoutStreak} gun
- Bu hafta antrenman: ${context.progress.weeklyWorkoutsCompleted}/${context.progress.weeklyWorkoutsTotal}

- Rakamlari yorumla: iyi gidiyorsa coskuyla kutla, yavasladiysa cesaretlendir
- Gelecek hafta: "${context.weekGoal}"
- Sonuna haftalik ilham verici cumle ekle (guclu, kararlı tonlu)`,
      };

    case "meal_plan":
    case "shopping_list":
      // These are handled directly without AI - should never reach here
      return { system: "", user: "" };
  }
}

function buildProgressNarrative(context: UserContext): string {
  const p = context.progress;
  const lines: string[] = ["ILERLEME DURUMU:"];

  if (p.currentWeightKg) {
    const lost = Math.abs(p.weightChange);
    const remaining = Math.abs(p.currentWeightKg - p.goalWeightKg);
    const goalDiff = Math.abs(p.startingWeightKg - p.goalWeightKg);

    if (p.weightChange < 0) {
      lines.push(`- ${lost} kg verdi! Hedefe ${remaining.toFixed(1)} kg kaldi.`);
      if (p.progressPercent >= 75) {
        lines.push(`- CIKIS CIZGISI GORУНUYOR! %${p.progressPercent} tamamlandi!`);
      } else if (p.progressPercent >= 50) {
        lines.push(`- Yaridan fazlasi geride! %${p.progressPercent} tamamlandi.`);
      } else if (p.progressPercent >= 25) {
        lines.push(`- Guzel ilerleme! %${p.progressPercent} tamamlandi.`);
      } else if (p.progressPercent > 0) {
        lines.push(`- Yolculuk basladi! %${p.progressPercent} tamamlandi.`);
      }
    } else if (p.weightChange > 0) {
      lines.push(`- Kilo biraz artti (+${lost} kg) ama bu normal olabilir (kas artisi, su tutma). Moral bozma!`);
    } else {
      lines.push(`- Kilo sabit. Sabir onemli, sonuclar gelecek!`);
    }

    if (remaining <= 3) {
      lines.push(`- HEDEFE COK YAKIN! Sadece ${remaining.toFixed(1)} kg kaldi, neredeyse orada!`);
    } else if (remaining <= goalDiff * 0.3) {
      lines.push(`- Son viraj! ${remaining.toFixed(1)} kg ile hedef cok yakin.`);
    }
  } else {
    lines.push("- Henuz kilo verisi yok. Tartilsin!");
  }

  if (p.workoutStreak > 0) {
    if (p.workoutStreak >= 14) {
      lines.push(`- MUHTESEM SERI: ${p.workoutStreak} gun ust uste antrenman! Bu disiplin nadir bulunur.`);
    } else if (p.workoutStreak >= 7) {
      lines.push(`- HARIKA SERI: ${p.workoutStreak} gun ust uste! Tam 1 haftayi gectin.`);
    } else if (p.workoutStreak >= 3) {
      lines.push(`- Guzel seri: ${p.workoutStreak} gun ust uste antrenman. Devam!`);
    } else {
      lines.push(`- Seri: ${p.workoutStreak} gun. Her gun bir tugla, duvar oruluyor!`);
    }
  }

  const weeksLeft = context.totalWeeks - (context.currentWeek + 1);
  if (weeksLeft <= 4 && weeksLeft > 0) {
    lines.push(`- SON ${weeksLeft} HAFTA! Bitis cizgisi gorunuyor!`);
  } else if (weeksLeft === 0) {
    lines.push(`- FINAL HAFTASI! Programin son haftasindasin!`);
  }

  return lines.join("\n");
}

function buildContextBlock(context: UserContext): string {
  const p = context.progress;
  const weightInfo = p.currentWeightKg
    ? `Su anki kilo: ${p.currentWeightKg} kg | Baslangic: ${p.startingWeightKg} kg | Hedef: ${p.goalWeightKg} kg | Degisim: ${p.weightChange > 0 ? "+" : ""}${p.weightChange} kg | Ilerleme: %${p.progressPercent}`
    : `Baslangic: ${p.startingWeightKg} kg | Hedef: ${p.goalWeightKg} kg | Kilo verisi henuz yok`;

  return `KULLANICI BILGILERI:
Isim: ${context.name}
${weightInfo}
Program: Hafta ${context.currentWeek + 1}/${context.totalWeeks} | ${context.phaseLabel}
Bugun: ${context.todayPlan.name} - ${context.todayPlan.type === "rest" ? "Dinlenme Gunu" : context.todayPlan.label}
Antrenman serisi: ${p.workoutStreak} gun ust uste
Su (dun): ${p.waterYesterday}/${p.waterTarget} bardak
Checklist (dun): ${p.checklistCompleted}/${p.checklistTotal}
Bu hafta antrenman: ${p.weeklyWorkoutsCompleted}/${p.weeklyWorkoutsTotal}
Bu haftanin hedefi: "${context.weekGoal}"`;
}
