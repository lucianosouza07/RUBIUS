import type { Game } from "../types";
import { translateTeamName } from "../../../utils/translations";

interface MatchCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

const decodeText = (str: string | null) => {
  if (!str || str === "null") return "";
  let decoded = str;
    decoded = decoded.replace(/\\u([\dA-Fa-f]{4})/g, (_match, grp) => String.fromCharCode(parseInt(grp, 16)));
  return decoded.replace(/[{}"']/g, '').replace(/,/g, ', ');
};

export function MatchCard({ game, onClick }: MatchCardProps) {
  const homeScorers = decodeText(game.home_scorers);
  const awayScorers = decodeText(game.away_scorers);
  const allScorers = [homeScorers, awayScorers].filter(Boolean).join(" | ");

  const homeScoreNum = parseInt(game.home_score) || 0;
  const awayScoreNum = parseInt(game.away_score) || 0;
  
  const isFinished = game.finished === "TRUE" || game.time_elapsed === "finished";
  const homeAdvanced = isFinished && homeScoreNum > awayScoreNum;
  const awayAdvanced = isFinished && awayScoreNum > homeScoreNum;

  return (
    <article 
      onClick={() => onClick(game)}
      className="bg-surface rounded-lg border border-border p-md flex flex-col gap-md cursor-pointer hover:border-primary/50 hover:bg-surface-variant/20 transition-colors"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {game.finished !== "TRUE" && game.time_elapsed !== "notstarted" && <div className="w-2 h-2 rounded-full bg-tertiary live-pulse"></div>}
          <span className="font-body text-label-sm text-tertiary uppercase tracking-wider">
            {game.finished === "TRUE" ? "Terminado" : (game.time_elapsed === 'notstarted' ? 'Agendado' : game.time_elapsed)}
          </span>
        </div>
        <span className="font-stat-mono text-stat-mono text-on-surface-variant">
          {game.time_elapsed === "finished" ? "Terminado" : (game.time_elapsed === 'notstarted' ? '' : game.time_elapsed)}
        </span>
      </div>
      
      <div className="flex flex-col gap-md my-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-sm">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold overflow-hidden border ${homeAdvanced ? 'bg-green-500/20 text-green-500 border-green-500/50' : 'bg-surface-variant text-text-primary border-border/50'}`}>
              {translateTeamName(game.home_team_name_en).substring(0, 3).toUpperCase()}
            </div>
            <span className={`font-body text-body-lg font-semibold truncate max-w-[120px] sm:max-w-[180px] ${homeAdvanced ? 'text-green-500' : ''}`}>
              {translateTeamName(game.home_team_name_en)}
            </span>
          </div>
          <span className="font-stat-mono text-headline-md text-white">{game.time_elapsed !== 'notstarted' ? game.home_score : '-'}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-sm">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold overflow-hidden border ${awayAdvanced ? 'bg-green-500/20 text-green-500 border-green-500/50' : 'bg-surface-variant text-text-primary border-border/50'}`}>
              {translateTeamName(game.away_team_name_en).substring(0, 3).toUpperCase()}
            </div>
            <span className={`font-body text-body-lg font-semibold truncate max-w-[120px] sm:max-w-[180px] ${awayAdvanced ? 'text-green-500' : ''}`}>
              {translateTeamName(game.away_team_name_en)}
            </span>
          </div>
          <span className="font-stat-mono text-headline-md text-white">{game.time_elapsed !== 'notstarted' ? game.away_score : '-'}</span>
        </div>
      </div>
      
      <div className="pt-sm border-t border-border">
        <p className="font-body text-label-sm text-on-surface-variant truncate">
          {allScorers || "Nenhum gol registrado"}
        </p>
      </div>
    </article>
  );
}
