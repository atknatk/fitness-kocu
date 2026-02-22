"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";
import { getUserKey } from "./user";
import type {
  WeightLog,
  BodyMeasurement,
  WorkoutLog,
  WaterIntake,
  DailyChecklistItem,
  Streak,
} from "@/types";

const userKey = () => getUserKey();

// ===== Weight Logs =====
export function useWeightLogs() {
  const [logs, setLogs] = useState<WeightLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data } = await supabase
      .from("weight_logs")
      .select("*")
      .eq("user_key", userKey())
      .order("date", { ascending: true });
    setLogs((data as WeightLog[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const upsert = async (date: string, weight_kg: number, notes?: string) => {
    await supabase
      .from("weight_logs")
      .upsert({ user_key: userKey(), date, weight_kg, notes }, { onConflict: "user_key,date" });
    fetch();
  };

  return { logs, loading, upsert, refresh: fetch };
}

// ===== Workout Logs =====
export function useWorkoutLogs(weekNumber: number, dayIndex: number) {
  const [logs, setLogs] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data } = await supabase
      .from("workout_logs")
      .select("*")
      .eq("user_key", userKey())
      .eq("week_number", weekNumber)
      .eq("day_index", dayIndex);
    const map: Record<string, boolean> = {};
    (data as WorkoutLog[] | null)?.forEach((log) => {
      map[`e${log.exercise_index}`] = log.completed;
    });
    setLogs(map);
    setLoading(false);
  }, [weekNumber, dayIndex]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const toggle = async (exerciseIndex: number, exerciseId: string, completed: boolean) => {
    const key = `e${exerciseIndex}`;
    setLogs((prev) => ({ ...prev, [key]: completed }));
    const today = new Date().toISOString().split("T")[0];
    await supabase.from("workout_logs").upsert(
      {
        user_key: userKey(),
        date: today,
        week_number: weekNumber,
        day_index: dayIndex,
        exercise_id: exerciseId,
        exercise_index: exerciseIndex,
        completed,
      },
      { onConflict: "user_key,date,week_number,day_index,exercise_index" }
    );
  };

  return { logs, loading, toggle, refresh: fetch };
}

// ===== All Week Workout Logs (for overview) =====
export function useAllWorkoutLogs(weekNumber: number) {
  const [logs, setLogs] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data } = await supabase
      .from("workout_logs")
      .select("*")
      .eq("user_key", userKey())
      .eq("week_number", weekNumber);
    const map: Record<string, boolean> = {};
    (data as WorkoutLog[] | null)?.forEach((log) => {
      map[`w${log.week_number}d${log.day_index}e${log.exercise_index}`] = log.completed;
    });
    setLogs(map);
    setLoading(false);
  }, [weekNumber]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { logs, loading, refresh: fetch };
}

// ===== Water Intake =====
export function useWaterIntake(date: string) {
  const [glasses, setGlasses] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data } = await supabase
      .from("water_intake")
      .select("glasses")
      .eq("user_key", userKey())
      .eq("date", date)
      .single();
    setGlasses((data as WaterIntake | null)?.glasses || 0);
    setLoading(false);
  }, [date]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const update = async (newGlasses: number) => {
    setGlasses(newGlasses);
    await supabase
      .from("water_intake")
      .upsert({ user_key: userKey(), date, glasses: newGlasses }, { onConflict: "user_key,date" });
  };

  return { glasses, loading, update };
}

// ===== Daily Checklist =====
export function useDailyChecklist(date: string, itemCount: number) {
  const [checks, setChecks] = useState<boolean[]>(Array(itemCount).fill(false));
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data } = await supabase
      .from("daily_checklist")
      .select("*")
      .eq("user_key", userKey())
      .eq("date", date);
    const arr = Array(itemCount).fill(false);
    (data as DailyChecklistItem[] | null)?.forEach((item) => {
      if (item.item_index < itemCount) arr[item.item_index] = item.completed;
    });
    setChecks(arr);
    setLoading(false);
  }, [date, itemCount]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const toggle = async (index: number) => {
    const newVal = !checks[index];
    setChecks((prev) => {
      const next = [...prev];
      next[index] = newVal;
      return next;
    });
    await supabase.from("daily_checklist").upsert(
      { user_key: userKey(), date, item_index: index, completed: newVal },
      { onConflict: "user_key,date,item_index" }
    );
  };

  return { checks, loading, toggle };
}

// ===== Body Measurements =====
export function useBodyMeasurements() {
  const [measurements, setMeasurements] = useState<BodyMeasurement[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data } = await supabase
      .from("body_measurements")
      .select("*")
      .eq("user_key", userKey())
      .order("date", { ascending: false })
      .limit(1);
    setMeasurements((data as BodyMeasurement[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const upsert = async (measurement: Omit<BodyMeasurement, "id" | "user_key">) => {
    await supabase
      .from("body_measurements")
      .upsert({ user_key: userKey(), ...measurement }, { onConflict: "user_key,date" });
    fetch();
  };

  return { measurements, loading, upsert, refresh: fetch };
}

// ===== Streaks =====
export function useStreaks() {
  const [streaks, setStreaks] = useState<Record<string, Streak>>({});
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data } = await supabase
      .from("streaks")
      .select("*")
      .eq("user_key", userKey());
    const map: Record<string, Streak> = {};
    (data as Streak[] | null)?.forEach((s) => {
      map[s.streak_type] = s;
    });
    setStreaks(map);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const updateStreak = async (type: Streak["streak_type"], date: string) => {
    const current = streaks[type];
    const lastDate = current?.last_active_date;
    const yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    let newCurrent = 1;
    if (lastDate === yesterdayStr) {
      newCurrent = (current?.current_streak || 0) + 1;
    } else if (lastDate === date) {
      return;
    }

    const longest = Math.max(newCurrent, current?.longest_streak || 0);

    await supabase.from("streaks").upsert(
      {
        user_key: userKey(),
        streak_type: type,
        current_streak: newCurrent,
        longest_streak: longest,
        last_active_date: date,
      },
      { onConflict: "user_key,streak_type" }
    );
    fetch();
  };

  return { streaks, loading, updateStreak };
}
