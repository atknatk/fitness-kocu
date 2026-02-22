import { ProgramType } from "@/types";

export function getChecklist(programType: ProgramType): string[] {
  return programType === "female_recomp" ? FEMALE_CHECKLIST : MALE_CHECKLIST;
}

// =============================================
// ERKEK — Günlük Kontrol Listesi (7 madde)
// =============================================
const MALE_CHECKLIST: string[] = [
  "Sabah 1 bardak ılık su içtim",
  "Kahvaltıda protein aldım",
  "Antrenman öncesi atıştırmalık yedim",
  "Antrenmandan sonra 30 dk içinde yedim",
  "Bugün şekerli içecek içmedim",
  "En az 2.5L su içtim",
  "Akşam yemeğini 20:00'den önce yedim",
];

// =============================================
// KADIN — Günlük Kontrol Listesi (8 madde)
// =============================================
const FEMALE_CHECKLIST: string[] = [
  "Sabah kalkar kalkmaz 1 bardak ılık su içtim",
  "Kahvaltıda en az 20g protein aldım",
  "Kuşluk atıştırmalığımı yaptım",
  "Antrenman öncesi hafif atıştırdım (16:30)",
  "Antrenman sonrası protein ağırlıklı yedim",
  "Bugün şekerli içecek içmedim",
  "En az 2L su içtim",
  "Akşam 21:00'den sonra yemek yemedim",
];
