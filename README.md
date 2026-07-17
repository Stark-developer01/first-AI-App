# first-AI-App

A working web dashboard to track and compare **global** vs **Indian** technology hiring trends.

## Features
- Market comparison across roles, packages, experience bands, and tech stack demand
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

## Run Locally
Since this is a static web app, just serve the repo root:

```bash
cd /home/runner/work/first-AI-App/first-AI-App
python3 -m http.server 8080
```

Then open `http://localhost:8080`.
