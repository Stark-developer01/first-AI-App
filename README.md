# first-AI-App

A working web dashboard to track and compare **global** vs **Indian** technology hiring trends.

## Features
- Market comparison across roles, packages, experience bands, and tech stack demand
- India live hourly hiring tracker on homepage (posted vs deleted jobs)
- Role/category classification in live tracker with net hourly openings
- Visual analytics using charts (bar, line, doughnut, radar)
- Hiring activity map for global and Indian hiring hubs
- Detailed comparison table for each role and market metrics
- Automatic pattern detection for similar hiring trends and market differences
- Clean and responsive UI

## Data Scope
The dashboard uses aggregated snapshot-style data inspired by popular hiring sources:
- LinkedIn Jobs
- Indeed
- Naukri
- Wellfound
- Hirect

For the India hourly live tracker, the app attempts live fetches from public JSON feeds and computes posted/deleted counts by comparing snapshots within the current IST hour. If live fetch fails, it gracefully falls back to built-in sample hourly snapshots so the homepage remains functional.

## Run Locally
Since this is a static web app, just serve the repo root:

```bash
cd /home/runner/work/first-AI-App/first-AI-App
python3 -m http.server 8080
```

Then open `http://localhost:8080`.
