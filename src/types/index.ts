// ===== User Types =====
export type UserKey = "atakan" | "tuvik";
export type ProgramType = "male_recomp" | "female_recomp";

export interface UserProfile {
  key: UserKey;
  name: string;
  birthYear: number;
  heightCm: number;
  startingWeightKg: number;
  goalWeightKg: number;
  programType: ProgramType;
  programStartDate: string;
  gymTime: string;
  calorieTarget: { min: number; max: number };
  proteinTarget: number;
  carbTarget: number;
  fatTarget: number;
}

// ===== Exercise Types =====
export interface Exercise {
  id: string;
  name: string;
  muscle: string;
  tip: string;
  images: [string, string];
  youtubeUrl: string;
}

// ===== Week / Program Types =====
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

// ===== Meal Types =====
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

// ===== Database Types =====
export interface WeightLog {
  id?: string;
  user_key: UserKey;
  date: string;
  weight_kg: number;
  notes?: string;
}

export interface BodyMeasurement {
  id?: string;
  user_key: UserKey;
  date: string;
  waist_cm?: number;
  chest_cm?: number;
  arm_cm?: number;
  hip_cm?: number;
  thigh_cm?: number;
}

export interface WorkoutLog {
  id?: string;
  user_key: UserKey;
  date: string;
  week_number: number;
  day_index: number;
  exercise_id: string;
  exercise_index: number;
  completed: boolean;
  weight_used_kg?: number;
}

export interface WaterIntake {
  id?: string;
  user_key: UserKey;
  date: string;
  glasses: number;
}

export interface DailyChecklistItem {
  id?: string;
  user_key: UserKey;
  date: string;
  item_index: number;
  completed: boolean;
}

export interface Streak {
  id?: string;
  user_key: UserKey;
  streak_type: "workout" | "water" | "checklist";
  current_streak: number;
  longest_streak: number;
  last_active_date?: string;
}

// ===== Tip Types =====
export interface CoachTip {
  icon: string;
  title: string;
  content: string;
}
