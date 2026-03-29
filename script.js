const fixturesDiv = document.getElementById("fixtures");
const liveDiv = document.getElementById("live");

// Replace with your RapidAPI key
const API_KEY = "ddb454e5eemsh5e8cca78c94e261p1db49ejsnea8fc3db7a5f";

const headers = {
  "X-RapidAPI-Key": API_KEY,
  "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com"
};

// Load upcoming fixtures
async function loadFixtures() {
  const url = "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming";
  const response = await fetch(url, { headers });
  const data = await response.json();

  fixturesDiv.innerHTML = "";

  const srhMatches = data.matches.filter(m =>
    m.team1.name.includes("Sunrisers Hyderabad") ||
    m.team2.name.includes("Sunrisers Hyderabad")
  );

  srhMatches.forEach(match => {
    const card = document.createElement("div");
    card.className = "match-card";
    card.innerHTML = `
      <h3>${match.team1.name} vs ${match.team2.name}</h3>
      <p>Date: ${new Date(match.startDate).toLocaleString()}</p>
      <p>Venue: ${match.venue}</p>
      <p>Status: ${match.status}</p>
    `;
    fixturesDiv.appendChild(card);
  });
}

// Load live score
async function loadLive() {
  const url = "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live";
  const response = await fetch(url, { headers });
  const data = await response.json();

  liveDiv.innerHTML = "";

  const srhLive = data.matches.filter(m =>
    m.team1.name.includes("Sunrisers Hyderabad") ||
    m.team2.name.includes("Sunrisers Hyderabad")
  );

  if(srhLive.length === 0) {
    liveDiv.innerHTML = "<p>No live SRH match right now.</p>";
    return;
  }

  srhLive.forEach(match => {
    const card = document.createElement("div");
    card.className = "live-card";
    card.innerHTML = `
      <h3>${match.team1.name} vs ${match.team2.name}</h3>
      <p>Score: ${match.score}</p>
      <p>Status: ${match.status}</p>
    `;
    liveDiv.appendChild(card);
  });
}

// Initial load
loadFixtures();
loadLive();

// Refresh live scores every 30 seconds
setInterval(loadLive, 30000);
