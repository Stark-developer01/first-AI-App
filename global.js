const trendData = {
  quarterLabels: ["Q1", "Q2", "Q3", "Q4"],
  hiringIndexGlobal: [92, 101, 108, 116],
  hiringIndexIndia: [88, 94, 100, 109],
  remoteGlobal: [41, 43, 45, 44],
  remoteIndia: [25, 28, 30, 31],
  skillLabels: ["GenAI", "Data Engineering", "Cybersecurity", "Platform", "Product Analytics"],
  skillMomentumGlobal: [82, 67, 58, 54, 49],
  skillMomentumIndia: [70, 63, 50, 47, 45]
};

new Chart(document.getElementById("hiringIndexChart"), {
  type: "line",
  data: {
    labels: trendData.quarterLabels,
    datasets: [
      { label: "Global", data: trendData.hiringIndexGlobal, borderColor: "#395cff", backgroundColor: "#395cff66" },
      { label: "India", data: trendData.hiringIndexIndia, borderColor: "#00a6a6", backgroundColor: "#00a6a666" }
    ]
  },
  options: { responsive: true }
});

new Chart(document.getElementById("remoteShareChart"), {
  type: "bar",
  data: {
    labels: trendData.quarterLabels,
    datasets: [
      { label: "Global Remote/Hybrid %", data: trendData.remoteGlobal, backgroundColor: "#395cffaa" },
      { label: "India Remote/Hybrid %", data: trendData.remoteIndia, backgroundColor: "#00a6a6aa" }
    ]
  },
  options: { responsive: true }
});

new Chart(document.getElementById("skillMomentumChart"), {
  type: "bar",
  data: {
    labels: trendData.skillLabels,
    datasets: [
      { label: "Global", data: trendData.skillMomentumGlobal, backgroundColor: "#395cffaa" },
      { label: "India", data: trendData.skillMomentumIndia, backgroundColor: "#00a6a6aa" }
    ]
  },
  options: { responsive: true, indexAxis: "y" }
});

const highlights = [
  "Global AI/ML demand remains the strongest growth driver across all tracked categories.",
  "India shows faster growth in junior and mid-level hiring, reflecting expanding tech services demand.",
  "Remote share is consistently higher in global markets, while India trends toward hybrid-first hiring.",
  "Cloud, Python, and data engineering stay among the top cross-market skill requirements.",
  "Salary ranges are broadening globally for senior specialists, with India seeing strongest growth in mid-level compensation."
];

const list = document.getElementById("patternHighlights");
highlights.forEach((point) => {
  const li = document.createElement("li");
  li.textContent = point;
  list.appendChild(li);
});
