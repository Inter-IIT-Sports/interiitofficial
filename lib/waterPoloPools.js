// lib/waterPoloPools.js
export const waterPoloPools = {
  A: ["IIT Delhi", "IIT Varanasi"],
  B: ["IIT Bombay", "IIT Gandhinagar", "IIT Guwahati"],
  C: ["IIT Madras", "IIT Indore", "IIT Roorkee"],
  D: ["IIT Kanpur", "IIT Kharagpur", "IIT Dhanbad"]
};

// Helper to find pool for a given team
export const getPool = (teamName) => {
  for (const [pool, teams] of Object.entries(waterPoloPools)) {
    if (teams.includes(teamName)) return pool;
  }
  return null;
};
