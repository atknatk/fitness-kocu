const fs = require("fs");
const path = require("path");
const https = require("https");

const BASE = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises";
const OUT = path.join(__dirname, "..", "public", "exercises");

// Our exercise ID -> free-exercise-db folder ID mapping
const MAPPING = {
  squat_m: "Barbell_Full_Squat",
  chest_press: "Machine_Bench_Press",
  lat_pulldown: "Wide-Grip_Lat_Pulldown",
  shoulder_press: "Machine_Shoulder_Military_Press",
  plank: "Plank",
  leg_press: "Leg_Press",
  seated_row: "Seated_Cable_Rows",
  dumbbell_press: "Dumbbell_Bench_Press",
  bicep_curl: "Dumbbell_Bicep_Curl",
  crunch: "Crunches",
  treadmill: "Jogging_Treadmill",
  bike: "Bicycling_Stationary",
  bench_press: "Barbell_Bench_Press_-_Medium_Grip",
  tricep_dip: "Bench_Dips",
  leg_curl: "Lying_Leg_Curls",
  calf_raise: "Standing_Calf_Raises",
  deadlift_light: "Romanian_Deadlift",
  lunge: "Dumbbell_Lunges",
  incline_press: "Incline_Dumbbell_Press",
  lateral_raise: "Side_Lateral_Raise",
  russian_twist: "Russian_Twist",
  leg_raise: "Flat_Bench_Lying_Leg_Raise",
  barbell_row: "Bent_Over_Barbell_Row",
  face_pull: "Face_Pull",
  barbell_curl: "Barbell_Curl",
  tricep_pushdown: "Triceps_Pushdown",
  ohp: "Standing_Military_Press",
  cable_fly: "Cable_Crossover",
  leg_extension: "Leg_Extensions",
  bicycle_crunch: "Air_Bike",
  dumbbell_row: "One-Arm_Dumbbell_Row",
  hip_thrust: "Barbell_Hip_Thrust",
  glute_bridge: "Butt_Lift_Bridge",
  sumo_squat: "Sumo_Deadlift",
  bulgarian_split_squat: "Smith_Single-Leg_Split_Squat",
  cable_kickback: "Glute_Kickback",
  hip_abduction: "Thigh_Abductor",
  donkey_kick: "Donkey_Calf_Raises",
  step_up: "Dumbbell_Step_Ups",
  goblet_squat: "Goblet_Squat",
  cable_pull_through: "Pull_Through",
  good_morning: "Good_Morning",
  band_walk: "Monster_Walk",
  fire_hydrant: "Kneeling_Hip_Flexor",
  curtsy_lunge: "Dumbbell_Lunges",
  single_leg_rdl: "Stiff-Legged_Dumbbell_Deadlift",
  seated_calf_raise: "Seated_Calf_Raise",
  skull_crusher: "EZ-Bar_Skullcrusher",
  rear_delt_fly: "Reverse_Flyes",
  hammer_curl: "Hammer_Curls",
  tricep_kickback: "Tricep_Dumbbell_Kickback",
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        fs.unlinkSync(dest);
        reject(new Error(`${res.statusCode} for ${url}`));
        return;
      }
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (e) => { fs.unlinkSync(dest); reject(e); });
  });
}

async function main() {
  const entries = Object.entries(MAPPING);
  let done = 0;
  const failed = [];

  for (const [ourId, dbId] of entries) {
    const dir = path.join(OUT, ourId);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    for (const idx of [0, 1]) {
      const url = `${BASE}/${dbId}/${idx}.jpg`;
      const dest = path.join(dir, `${idx}.jpg`);
      if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
        continue; // Already downloaded
      }
      try {
        await download(url, dest);
      } catch (e) {
        failed.push(`${ourId}/${idx}.jpg: ${e.message}`);
      }
    }
    done++;
    if (done % 10 === 0) console.log(`${done}/${entries.length} done...`);
  }

  console.log(`\nDone! ${done} exercises processed.`);
  if (failed.length) {
    console.log(`\nFailed downloads:`);
    failed.forEach(f => console.log(`  - ${f}`));
  }
}

main();
