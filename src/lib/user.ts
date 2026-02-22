import { UserKey, UserProfile } from "@/types";

export function getUserKey(): UserKey {
  if (typeof window === "undefined") return "atakan";
  const host = window.location.hostname;
  if (host === "tuvik.wodoxo.com") return "tuvik";
  return "atakan";
}

export const USER_PROFILES: Record<UserKey, UserProfile> = {
  atakan: {
    key: "atakan",
    name: "Atakan",
    birthYear: 1988,
    heightCm: 180,
    startingWeightKg: 93,
    goalWeightKg: 75,
    programType: "male_recomp",
    programStartDate: "2026-02-23",
    gymTime: "12:00",
    calorieTarget: { min: 1800, max: 2000 },
    proteinTarget: 150,
    carbTarget: 185,
    fatTarget: 65,
  },
  tuvik: {
    key: "tuvik",
    name: "Tuvik",
    birthYear: 1991,
    heightCm: 165,
    startingWeightKg: 53,
    goalWeightKg: 50,
    programType: "female_recomp",
    programStartDate: "2026-02-23",
    gymTime: "06:00",
    calorieTarget: { min: 1500, max: 1650 },
    proteinTarget: 100,
    carbTarget: 180,
    fatTarget: 45,
  },
};
