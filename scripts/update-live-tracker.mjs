// Runs on a schedule via .github/workflows/update-live-tracker.yml (not in the browser).
// Fetches current India tech job listings from the JSearch API, compares them to the
// previous run's snapshot, and writes data/live-snapshot.json for the frontend to read.
//
// This is what makes the tracker "live" for real: the diff happens once, server-side,
// on a shared schedule - not separately in every visitor's browser against data that
// never changes.

import fs from "node:fs";
import path from "node:path";

const API_KEY = process.env.JOBS_API_KEY;
const DATA_FILE = path.join(process.cwd(), "data", "live-snapshot.json");

const ROLE_KEYWORDS = {
  "AI/ML Engineer": ["ml", "machine learning", "ai engineer", "data scientist", "artificial intelligence"],
  "Full Stack Developer": [
    "full stack",
    "frontend",
    "front end",
    "backend",
    "back end",
    "software engineer",
    "application developer",
  ],
  "Cloud Engineer": ["cloud", "platform engineer", "sre", "site reliability"],
  "Cybersecurity Analyst": ["security", "cyber"],
  DevOps: ["devops", "dev ops"],
};

const ROLES = Object.keys(ROLE_KEYWORDS);

function classifyRole(title = "") {
  const normalized = title.toLowerCase();
  for (const role of ROLES) {
    if (ROLE_KEYWORDS[role].some((keyword) => normalized.includes(keyword))) {
      return role;
    }
  }
  return "Full Stack Developer";
}

function buildJobId(job) {
  return job.job_id || `${job.job_title || ""}|${job.employer_name || ""}|${job.job_city || ""}`.toLowerCase();
}

function getHourBucketIST() {
  const now = new Date();
  const istString = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour12: false });
  const asIst = new Date(istString);
  return `${String(asIst.getHours()).padStart(2, "0")}:00`;
}

async function fetchCurrentJobs() {
  if (!API_KEY) {
    throw new Error("Missing JOBS_API_KEY - add it as a repository secret before running this workflow.");
  }

  const url = new URL("https://api.openwebninja.com/jsearch/search-v2");
  url.searchParams.set("query", "software developer jobs in india");
  url.searchParams.set("country", "in");
  url.searchParams.set("language", "en");

  const response = await fetch(url, { headers: { "x-api-key": API_KEY } });
  if (!response.ok) {
    throw new Error(`JSearch request failed: ${response.status} ${await response.text()}`);
  }

  const body = await response.json();
  return Array.isArray(body.data) ? body.data : [];
}

function loadPreviousState() {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return parsed._state || null;
  } catch {
    return null;
  }
}

async function main() {
  const jobs = await fetchCurrentJobs();

  const currentIds = new Set();
  const currentRoleById = {};
  jobs.forEach((job) => {
    const id = buildJobId(job);
    if (!id) return;
    currentIds.add(id);
    currentRoleById[id] = classifyRole(job.job_title);
  });

  const previous = loadPreviousState();
  const previousIds = new Set(previous ? previous.currentIds : []);
  const previousRoleById = previous ? previous.roleById || {} : {};
  const isBaseline = !previous;

  const roleCounters = Object.fromEntries(ROLES.map((role) => [role, { posted: 0, deleted: 0 }]));

  currentIds.forEach((id) => {
    if (!previousIds.has(id)) {
      roleCounters[currentRoleById[id]].posted += 1;
    }
  });

  previousIds.forEach((id) => {
    if (!currentIds.has(id)) {
      const role = previousRoleById[id] || "Full Stack Developer";
      roleCounters[role].deleted += 1;
    }
  });

  const snapshot = {
    timestamp: getHourBucketIST(),
    generatedAt: new Date().toISOString(),
    status: isBaseline ? "Baseline" : "Live",
    roles: roleCounters,
    jobsSeen: jobs.length,
    _state: {
      currentIds: Array.from(currentIds),
      roleById: currentRoleById,
    },
  };

  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(snapshot, null, 2));

  console.log(
    `Wrote ${DATA_FILE}: status=${snapshot.status}, jobsSeen=${jobs.length}, ` +
      `posted=${Object.values(roleCounters).reduce((sum, r) => sum + r.posted, 0)}, ` +
      `deleted=${Object.values(roleCounters).reduce((sum, r) => sum + r.deleted, 0)}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});