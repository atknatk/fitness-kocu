import {
  BotUser,
  getCurrentWeek,
  getTodayDayIndex,
  getTodayPlan,
  getPhaseInfo,
  getWeekGoal,
  getMotivationalQuote,
  getMealSummary,
} from "./users";
import { UserProgress } from "./supabase";
import { UserContext } from "./prompts";

export function buildContext(
  user: BotUser,
  progress: UserProgress
): UserContext {
  const currentWeek = getCurrentWeek(user);
  const dayIndex = getTodayDayIndex();
  const todayPlan = getTodayPlan(user, currentWeek, dayIndex);
  const tomorrowDayIndex = (dayIndex + 1) % 7;
  const tomorrowPlan = getTodayPlan(user, currentWeek, tomorrowDayIndex);
  const { label: phaseLabel } = getPhaseInfo(user, currentWeek + 1);

  const goalDiff = Math.abs(user.startingWeightKg - user.goalWeightKg);
  const actualChange = Math.abs(progress.weightChange);
  const progressPercent =
    goalDiff > 0 ? Math.min(100, Math.round((actualChange / goalDiff) * 100)) : 0;

  const waterTarget = user.programType === "female_recomp" ? 8 : 10;

  return {
    name: user.name,
    programType: user.programType,
    currentWeek,
    totalWeeks: user.totalWeeks,
    phaseLabel,
    todayPlan: {
      name: todayPlan.name,
      type: todayPlan.type,
      label: todayPlan.label,
      exercises: todayPlan.exercises.map((e) => `${e.name} ${e.sets}x${e.reps}`),
    },
    tomorrowPlan: {
      type: tomorrowPlan.type,
      label: tomorrowPlan.label,
    },
    weekGoal: getWeekGoal(user, currentWeek),
    motivationalQuote: getMotivationalQuote(user, currentWeek),
    macroSummary: getMealSummary(user),
    progress: {
      currentWeightKg: progress.currentWeightKg,
      startingWeightKg: user.startingWeightKg,
      goalWeightKg: user.goalWeightKg,
      weightChange: progress.weightChange,
      progressPercent,
      workoutStreak: progress.workoutStreak,
      waterYesterday: progress.waterYesterday,
      waterTarget,
      checklistCompleted: progress.checklistYesterday.completed,
      checklistTotal: progress.checklistYesterday.total,
      weeklyWorkoutsCompleted: progress.weeklyWorkoutsCompleted,
      weeklyWorkoutsTotal: progress.weeklyWorkoutsTotal,
    },
  };
}
