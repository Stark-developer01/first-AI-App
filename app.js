const hiringData = {
  roles: {
    labels: ["Backend", "Frontend", "Data Engineer", "AI/ML", "DevOps", "Cybersecurity"],
    global: [420, 360, 290, 380, 260, 210],
    india: [340, 300, 250, 270, 220, 160]
  },
  experience: {
    labels: ["0-2 Years", "3-5 Years", "6-9 Years", "10+ Years"],
    global: [220, 420, 260, 150],
    india: [310, 360, 180, 90]
  },
  salary: {
    labels: ["Entry", "Mid", "Senior", "Lead"],
    global: [30, 40, 20, 10],
    india: [45, 35, 15, 5]
  },
  stack: {
    labels: ["JavaScript", "Python", "Java", "Go", "Cloud", "SQL"],
    global: [78, 72, 58, 35, 69, 61],
    india: [74, 67, 64, 28, 57, 65]
  }
};

const marketKPIs = [
  { title: "Global Active Listings", value: "1.9M" },
  { title: "India Active Listings", value: "410K" },
  { title: "Remote Role Share (Global)", value: "44%" },
  { title: "Remote Role Share (India)", value: "31%" }
];

const renderKPIs = () => {
  const grid = document.getElementById("kpiGrid");
  marketKPIs.forEach((kpi) => {
    const el = document.createElement("article");
    el.className = "kpi";
    el.innerHTML = `<h4>${kpi.title}</h4><strong>${kpi.value}</strong>`;
    grid.appendChild(el);
  });
};

// 1. Updated dataset helper using explicit fallback colors Chart.js supports natively
const commonDataset = (label, data, color) => {
  // Translate your colors to clean RGBA string equivalents
  const rgbaColor = color === "#395cff" ? "rgba(57, 92, 255, 0.4)" : "rgba(0, 166, 166, 0.4)";
  return {
    label,
    data,
    borderColor: color,
    backgroundColor: rgbaColor,
    borderWidth: 2
  };
};

/* Keep all your renderKPIs, renderCharts, and renderComparisonTable functions exactly as they are */

// 2. Wrap execution calls to guarantee canvas nodes exist when rendering starts

const renderCharts = () => {
  new Chart(document.getElementById("roleChart"), {
    type: "bar",
    data: {
      labels: hiringData.roles.labels,
      datasets: [
        commonDataset("Global", hiringData.roles.global, "#395cff"),
        commonDataset("India", hiringData.roles.india, "#00a6a6")
      ]
    },
    options: { responsive: true }
  });

  new Chart(document.getElementById("experienceChart"), {
    type: "bar",
    data: {
      labels: hiringData.experience.labels,
      datasets: [
        commonDataset("Global", hiringData.experience.global, "#395cff"),
        commonDataset("India", hiringData.experience.india, "#00a6a6")
      ]
    },
    options: { responsive: true }
  });

  new Chart(document.getElementById("salaryChart"), {
    type: "line",
    data: {
      labels: hiringData.salary.labels,
      datasets: [
        commonDataset("Global (%)", hiringData.salary.global, "#395cff"),
        commonDataset("India (%)", hiringData.salary.india, "#00a6a6")
      ]
    },
    options: { responsive: true }
  });

  new Chart(document.getElementById("stackChart"), {
    type: "radar",
    data: {
      labels: hiringData.stack.labels,
      datasets: [
        commonDataset("Global Demand Score", hiringData.stack.global, "#395cff"),
        commonDataset("India Demand Score", hiringData.stack.india, "#00a6a6")
      ]
    },
    options: { responsive: true }
  });
};

const renderComparisonTable = () => {
  const rows = [
    ["AI/ML Openings", 380, 270],
    ["Avg Mid-level Salary Index", 40, 35],
    ["Cloud Skill Demand", 69, 57],
    ["3-5 Years Experience Share", 420, 360],
    ["Remote Opportunity Share", 44, 31]
  ];

  const tableBody = document.getElementById("comparisonTable");
  rows.forEach(([segment, global, india]) => {
    const diff = global - india;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${segment}</td>
      <td>${global}</td>
      <td>${india}</td>
      <td>${diff > 0 ? "+" : ""}${diff}</td>
    `;
    tableBody.appendChild(tr);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  renderKPIs();
  renderCharts();
  renderComparisonTable();
});

