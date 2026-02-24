// Mock job data
let jobs = [
  {
    id: 1,
    companyName: "Mobile First Corp",
    position: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
    status: "All"
  },
  {
    id: 2,
    companyName: "WebFlow Agency",
    position: "Web Designer & Developer",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$80,000 - $120,000",
    description: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.",
    status: "All"
  },
  {
    id: 3,
    companyName: "DataViz Solutions",
    position: "Data Visualization Specialist",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000 - $165,000",
    description: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.",
    status: "All"
  },
  {
    id: 4,
    companyName: "CloudFirst Inc",
    position: "Backend Developer",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140,000 - $190,000",
    description: "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices.",
    status: "All"
  },
  {
    id: 5,
    companyName: "Innovation Labs",
    position: "UI/UX Engineer",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $150,000",
    description: "Create beautiful and functional user interfaces for our product suite. Strong design and frontend skills required.",
    status: "All"
  },
  {
    id: 6,
    companyName: "MegaCorp Solutions",
    position: "JavaScript Developer",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130,000 - $170,000",
    description: "Build enterprise applications using JavaScript and modern frameworks. Competitive compensation and benefits included.",
    status: "All"
  },
  {
    id: 7,
    companyName: "StartupXYZ",
    position: "Full Stack Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    description: "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required.",
    status: "All"
  },
  {
    id: 8,
    companyName: "TechCorp Industries",
    position: "Senior Frontend Developer",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description: "Build scalable web applications using React and TypeScript. Work with a talented team on cutting-edge projects.",
    status: "All"
  }
];
// details page data
let currentTab = "All";

function renderJobs(tab) {

  const container = document.getElementById("job-container");
  container.innerHTML = "";

  let filteredJobs;

  if (tab === "All") {
    filteredJobs = jobs;
  } else {
    filteredJobs = jobs.filter(job => job.status === tab);
  }

  document.getElementById("section-count").innerText =
    filteredJobs.length + " jobs";
//no jobs state
if (filteredJobs.length === 0) {
  container.innerHTML = `
    <div class="empty-state">
      <img src="document-xl.png" alt="No jobs" />
      <h3>No jobs available</h3>
      <p>Check back soon for new job opportunities</p>
    </div>
  `;
  return;
}

  filteredJobs.forEach(job => {
    container.innerHTML += `
      <div class="job-card">
        <h3>${job.companyName}</h3>
        <p>${job.position}</p>
        <p>${job.location} • ${job.type} • ${job.salary}</p>

        <span class="status-badge">
          ${job.status === "All" ? "NOT APPLIED" : job.status}
        </span>

        <p>${job.description}</p>

        <div class="btn-group">
          <button class="interview-btn"
            onclick="handleInterview(${job.id})">INTERVIEW</button>

          <button class="reject-btn"
            onclick="handleRejected(${job.id})">REJECTED</button>

          <button class="delete-btn"
            onclick="deleteJob(${job.id})">🗑</button>
        </div>
      </div>
    `;
  });
}
function handleInterview(id) {
  const job = jobs.find(j => j.id === id);

  if (job.status === "Interview") {
    job.status = "All";
  } else {
    job.status = "Interview";
  }

  updateDashboard();
  renderJobs(currentTab);
}
function handleRejected(id) {
  const job = jobs.find(j => j.id === id);

  if (job.status === "Rejected") {
    job.status = "All";
  } else {
    job.status = "Rejected";
  }

  updateDashboard();
  renderJobs(currentTab);
}
function deleteJob(id) {
  jobs = jobs.filter(job => job.id !== id);
  updateDashboard();
  renderJobs(currentTab);
}
function updateDashboard() {

  document.getElementById("total-count").innerText =
    jobs.length;

  document.getElementById("interview-count").innerText =
    jobs.filter(j => j.status === "Interview").length;

  document.getElementById("rejected-count").innerText =
    jobs.filter(j => j.status === "Rejected").length;
}
function switchTab(event, tab) {
  currentTab = tab;

  document.querySelectorAll(".tabs button")
    .forEach(btn => btn.classList.remove("active"));

  event.target.classList.add("active");

  renderJobs(tab);
}
updateDashboard();
renderJobs("All");
