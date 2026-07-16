import type { Game } from "../features/worldcup-hub/types";

export interface Scorer {
  name: string;
  goals: number;
}

export function calculateTopScorers(games: Game[]): Scorer[] {
  const goalMap: Record<string, number> = {};

  const processScorersStr = (scorersStr: string | null) => {
    if (!scorersStr || scorersStr === "null") return;
    
    // Format is like: {"J. Quiñones 9'","R. Jiménez 67'"}
    // Remove { } and split by comma
    const cleanStr = scorersStr.replace(/^\{|\}$/g, '');
    if (!cleanStr) return;
    
    // Match anything between quotes
    const regex = /"([^"]+)"|“([^”]+)”/g;
    let match;
    while ((match = regex.exec(cleanStr)) !== null) {
      const goalStr = match[1] || match[2]; // e.g. "J. Quiñones 9'" or "D. Bobadilla 7'(OG)"
      if (!goalStr) continue;
      
      // Ignore own goals
      if (goalStr.includes('(OG)')) continue;
      
      // Remove minutes (usually at the end, containing ')
      // e.g. "J. Quiñones 9'" -> "J. Quiñones"
      // e.g. "F. Balogun 45'+5'" -> "F. Balogun"
      const nameMatch = goalStr.match(/^(.*?)\s+\d+'/);
      const name = nameMatch ? nameMatch[1].trim() : goalStr.trim();
      
      if (name) {
        goalMap[name] = (goalMap[name] || 0) + 1;
      }
    }
  };

  games.forEach(game => {
    processScorersStr(game.home_scorers);
    processScorersStr(game.away_scorers);
  });

  const topScorers = Object.entries(goalMap)
    .map(([name, goals]) => ({ name, goals }))
    .sort((a, b) => b.goals - a.goals);

  return topScorers;
}
