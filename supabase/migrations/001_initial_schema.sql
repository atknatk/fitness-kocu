-- Weight Logs
CREATE TABLE IF NOT EXISTS weight_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_key TEXT NOT NULL,
  date DATE NOT NULL,
  weight_kg NUMERIC(5,1) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_key, date)
);

-- Body Measurements
CREATE TABLE IF NOT EXISTS body_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_key TEXT NOT NULL,
  date DATE NOT NULL,
  waist_cm NUMERIC(5,1),
  chest_cm NUMERIC(5,1),
  arm_cm NUMERIC(5,1),
  hip_cm NUMERIC(5,1),
  thigh_cm NUMERIC(5,1),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_key, date)
);

-- Workout Logs
CREATE TABLE IF NOT EXISTS workout_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_key TEXT NOT NULL,
  date DATE NOT NULL,
  week_number INTEGER NOT NULL,
  day_index INTEGER NOT NULL,
  exercise_id TEXT NOT NULL,
  exercise_index INTEGER NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  weight_used_kg NUMERIC(5,1),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_key, date, week_number, day_index, exercise_index)
);

-- Water Intake
CREATE TABLE IF NOT EXISTS water_intake (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_key TEXT NOT NULL,
  date DATE NOT NULL,
  glasses INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_key, date)
);

-- Daily Checklist
CREATE TABLE IF NOT EXISTS daily_checklist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_key TEXT NOT NULL,
  date DATE NOT NULL,
  item_index INTEGER NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_key, date, item_index)
);

-- Streaks
CREATE TABLE IF NOT EXISTS streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_key TEXT NOT NULL,
  streak_type TEXT NOT NULL,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_active_date DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_key, streak_type)
);

-- Allow public access (no auth, personal app)
ALTER TABLE weight_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON weight_logs FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE body_measurements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON body_measurements FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE workout_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON workout_logs FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE water_intake ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON water_intake FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE daily_checklist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON daily_checklist FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON streaks FOR ALL USING (true) WITH CHECK (true);
