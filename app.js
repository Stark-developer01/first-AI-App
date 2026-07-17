const marketData = {
  sources: ["LinkedIn Jobs", "Indeed", "Naukri", "Wellfound", "Hirect"],
  global: {
    roles: {
      "AI/ML Engineer": 86,
      "Full Stack Developer": 78,
      "Cloud Engineer": 71,
      "Cybersecurity Analyst": 64,
      DevOps: 69,
    },
    compensationUSD: {
      "AI/ML Engineer": 148000,
      "Full Stack Developer": 125000,
      "Cloud Engineer": 132000,
      "Cybersecurity Analyst": 118000,
      DevOps: 128000,
    },
    experience: {
      "0-2 yrs": 24,
      "3-5 yrs": 41,
      "6-9 yrs": 23,
      "10+ yrs": 12,
    },
    stack: {
      Python: 84,
      JavaScript: 80,
      AWS: 75,
      Kubernetes: 68,
      SQL: 71,
    },
    locations: [
      { city: "San Francisco", lat: 37.7749, lon: -122.4194, demand: 88 },
      { city: "London", lat: 51.5072, lon: -0.1276, demand: 79 },
      { city: "Berlin", lat: 52.52, lon: 13.405, demand: 71 },
      { city: "Singapore", lat: 1.3521, lon: 103.8198, demand: 74 },
    ],
  },
  india: {
    roles: {
      "AI/ML Engineer": 79,
      "Full Stack Developer": 83,
      "Cloud Engineer": 66,
      "Cybersecurity Analyst": 58,
      DevOps: 72,
    },
    compensationLPA: {
      "AI/ML Engineer": 21.6,
      "Full Stack Developer": 17.2,
      "Cloud Engineer": 18.5,
      "Cybersecurity Analyst": 15.1,
      DevOps: 18.8,
    },
    experience: {
      "0-2 yrs": 31,
      "3-5 yrs": 44,
      "6-9 yrs": 18,
      "10+ yrs": 7,
    },
    stack: {
      Python: 77,
      JavaScript: 85,
      AWS: 68,
      Kubernetes: 61,
      SQL: 73,
    },
    locations: [
      { city: "Bengaluru", lat: 12.9716, lon: 77.5946, demand: 90 },
      { city: "Hyderabad", lat: 17.385, lon: 78.4867, demand: 82 },
      { city: "Pune", lat: 18.5204, lon: 73.8567, demand: 74 },
      { city: "Gurugram", lat: 28.4595, lon: 77.0266, demand: 70 },
    ],
  },
};

const roles = Object.keys(marketData.global.roles);
const stackKeys = Object.keys(marketData.global.stack);
const experienceKeys = Object.keys(marketData.global.experience);

function renderSources() {
  document.getElementById("sources").textContent = `Data snapshots aggregated from: ${marketData.sources.join(
    ", "
  )}`;
}

function renderKpis() {
  const globalTotalRoleDemand = Object.values(marketData.global.roles).reduce((a, b) => a + b, 0);
  const indiaTotalRoleDemand = Object.values(marketData.india.roles).reduce((a, b) => a + b, 0);
  const globalTopStack = Object.entries(marketData.global.stack).sort((a, b) => b[1] - a[1])[0][0];
  const indiaTopStack = Object.entries(marketData.india.stack).sort((a, b) => b[1] - a[1])[0][0];

  const cards = [
    { label: "Global Role Demand Index", value: globalTotalRoleDemand },
    { label: "India Role Demand Index", value: indiaTotalRoleDemand },
    { label: "Top Global Skill", value: globalTopStack },
    { label: "Top India Skill", value: indiaTopStack },
  ];

  const container = document.getElementById("kpis");
  container.innerHTML = cards
    .map(
      (card) =>
        `<article class="kpi"><div class="label">${card.label}</div><div class="value">${card.value}</div></article>`
    )
    .join("");
}

function renderCharts() {
  new Chart(document.getElementById("rolesChart"), {
    type: "bar",
    data: {
      labels: roles,
      datasets: [
        {
          label: "Global Demand Index",
          data: roles.map((role) => marketData.global.roles[role]),
          backgroundColor: "rgba(47, 109, 246, 0.75)",
        },
        {
          label: "India Demand Index",
          data: roles.map((role) => marketData.india.roles[role]),
          backgroundColor: "rgba(21, 195, 154, 0.75)",
        },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false },
  });

  new Chart(document.getElementById("payChart"), {
    type: "line",
    data: {
      labels: roles,
      datasets: [
        {
          label: "Global Avg Package (USD)",
          data: roles.map((role) => marketData.global.compensationUSD[role]),
          borderColor: "#2f6df6",
          backgroundColor: "#2f6df6",
          yAxisID: "y",
        },
        {
          label: "India Avg Package (LPA INR)",
          data: roles.map((role) => marketData.india.compensationLPA[role]),
          borderColor: "#15c39a",
          backgroundColor: "#15c39a",
          yAxisID: "y1",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      scales: {
        y: { position: "left", title: { display: true, text: "USD" } },
        y1: { position: "right", title: { display: true, text: "LPA INR" }, grid: { drawOnChartArea: false } },
      },
    },
  });

  new Chart(document.getElementById("experienceChart"), {
    type: "doughnut",
    data: {
      labels: experienceKeys,
      datasets: [
        {
          label: "Global",
          data: experienceKeys.map((item) => marketData.global.experience[item]),
          backgroundColor: ["#2f6df6", "#5b89f5", "#87a8f8", "#b3c7fb"],
        },
        {
          label: "India",
          data: experienceKeys.map((item) => marketData.india.experience[item]),
          backgroundColor: ["#15c39a", "#44d2af", "#71e0c4", "#9eefda"],
        },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false },
  });

  new Chart(document.getElementById("stackChart"), {
    type: "radar",
    data: {
      labels: stackKeys,
      datasets: [
        {
          label: "Global",
          data: stackKeys.map((stack) => marketData.global.stack[stack]),
          backgroundColor: "rgba(47, 109, 246, 0.28)",
          borderColor: "#2f6df6",
        },
        {
          label: "India",
          data: stackKeys.map((stack) => marketData.india.stack[stack]),
          backgroundColor: "rgba(21, 195, 154, 0.28)",
          borderColor: "#15c39a",
        },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false },
  });
}

function renderMap() {
  const global = marketData.global.locations;
  const india = marketData.india.locations;

  Plotly.newPlot(
    "mapChart",
    [
      {
        type: "scattergeo",
        mode: "markers+text",
        name: "Global hubs",
        lon: global.map((d) => d.lon),
        lat: global.map((d) => d.lat),
        text: global.map((d) => `${d.city} (${d.demand})`),
        marker: { size: global.map((d) => d.demand / 3.4), color: "#2f6df6", opacity: 0.8 },
      },
      {
        type: "scattergeo",
        mode: "markers+text",
        name: "India hubs",
        lon: india.map((d) => d.lon),
        lat: india.map((d) => d.lat),
        text: india.map((d) => `${d.city} (${d.demand})`),
        marker: { size: india.map((d) => d.demand / 3.4), color: "#15c39a", opacity: 0.8 },
      },
    ],
    {
      margin: { t: 0, b: 0, l: 0, r: 0 },
      geo: {
        projection: { type: "natural earth" },
        showland: true,
        landcolor: "#eff6ff",
        countrycolor: "#cbd5e1",
      },
    },
    { responsive: true }
  );
}

function renderTable() {
  const body = document.querySelector("#comparisonTable tbody");
  body.innerHTML = roles
    .map(
      (role) => `<tr>
        <td>${role}</td>
        <td>${marketData.global.compensationUSD[role].toLocaleString()}</td>
        <td>${marketData.india.compensationLPA[role].toFixed(1)}</td>
        <td>${dominantExperienceBand(marketData.global.experience)}</td>
        <td>${dominantExperienceBand(marketData.india.experience)}</td>
        <td>${topSkillForRole(role, "global")}</td>
        <td>${topSkillForRole(role, "india")}</td>
      </tr>`
    )
    .join("");
}

function dominantExperienceBand(data) {
  return Object.entries(data).sort((a, b) => b[1] - a[1])[0][0];
}

function topSkillForRole(role, market) {
  const roleSkillMap = {
    "AI/ML Engineer": ["Python", "AWS"],
    "Full Stack Developer": ["JavaScript", "SQL"],
    "Cloud Engineer": ["AWS", "Kubernetes"],
    "Cybersecurity Analyst": ["Python", "SQL"],
    DevOps: ["Kubernetes", "AWS"],
  };

  const [first, second] = roleSkillMap[role];
  const pool = marketData[market].stack;
  return pool[first] >= pool[second] ? first : second;
}

function renderPatterns() {
  const output = [];
  const sharedTopRoles = roles
    .filter((role) => marketData.global.roles[role] >= 70 && marketData.india.roles[role] >= 70)
    .join(", ");
  if (sharedTopRoles) {
    output.push(`Shared high-demand roles across markets: ${sharedTopRoles}.`);
  }

  const stackSimilarity = stackKeys.filter(
    (key) => Math.abs(marketData.global.stack[key] - marketData.india.stack[key]) <= 8
  );
  output.push(`Closest skill-demand alignment appears in: ${stackSimilarity.join(", ")}.`);

  const experienceSkew = marketData.india.experience["0-2 yrs"] - marketData.global.experience["0-2 yrs"];
  if (experienceSkew > 0) {
    output.push(
      `India shows stronger entry-level hiring (+${experienceSkew} points), while global markets lean more toward experienced hiring.`
    );
  }

  const roleCorrelation = correlation(
    roles.map((role) => marketData.global.roles[role]),
    roles.map((role) => marketData.india.roles[role])
  );
  output.push(`Role-demand correlation score: ${roleCorrelation.toFixed(2)} (higher means similar trend direction).`);

  document.getElementById("patterns").innerHTML = output.map((line) => `<li>${line}</li>`).join("");
}

function correlation(a, b) {
  const avgA = a.reduce((sum, val) => sum + val, 0) / a.length;
  const avgB = b.reduce((sum, val) => sum + val, 0) / b.length;
  const numerator = a.reduce((sum, val, i) => sum + (val - avgA) * (b[i] - avgB), 0);
  const denA = Math.sqrt(a.reduce((sum, val) => sum + (val - avgA) ** 2, 0));
  const denB = Math.sqrt(b.reduce((sum, val) => sum + (val - avgB) ** 2, 0));
  return numerator / (denA * denB);
}

renderSources();
renderKpis();
renderCharts();
renderMap();
renderTable();
renderPatterns();
