import { createPortal } from "react-dom";
import type { Game } from "../types";
import { translateTeamName } from "../../../utils/translations";

interface MatchModalProps {
  game: Game | null;
  onClose: () => void;
}

export function MatchModal({ game, onClose }: MatchModalProps) {
  if (!game) return null;

  const homeScorers = game.home_scorers && game.home_scorers !== "null" ? game.home_scorers.replace(/[{}"']/g, '').replace(/,/g, ', ') : "";
  const awayScorers = game.away_scorers && game.away_scorers !== "null" ? game.away_scorers.replace(/[{}"']/g, '').replace(/,/g, ', ') : "";

  return createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-surface border border-border rounded-xl shadow-2xl w-[95vw] md:w-full max-w-lg min-w-[300px] overflow-hidden flex flex-col mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-md border-b border-border bg-surface-variant/30">
          <h3 className="font-headline text-headline-sm text-on-surface">Detalhes da Partida</h3>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
        
        <div className="p-lg flex flex-col gap-lg">
          <div className="flex flex-col items-center gap-xs">
            <span className="font-body text-label-sm uppercase tracking-widest text-primary font-bold">
              {game.type === 'group' ? `Fase de Grupos - Grupo ${game.group}` : 
               game.type === 'r32' ? '16-Avos de Final' :
               game.type === 'r16' ? 'Oitavas de Final' :
               game.type === 'qf' ? 'Quartas de Final' :
               game.type === 'sf' ? 'Semifinal' :
               game.type === 'third' ? 'Terceiro Lugar' :
               game.type === 'final' ? 'Final' : game.type}
            </span>
            <span className="font-body text-body-sm text-on-surface-variant">{game.local_date}</span>
          </div>

          <div className="flex justify-between items-center px-md py-lg bg-surface-variant/20 rounded-lg">
            <div className="flex flex-col items-center gap-sm w-1/3">
              <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-sm font-bold overflow-hidden border-2 border-border shadow-sm">
                {translateTeamName(game.home_team_name_en).substring(0, 3).toUpperCase()}
              </div>
              <span className="font-body text-body-md font-bold text-center">{translateTeamName(game.home_team_name_en)}</span>
            </div>
            
            <div className="flex flex-col items-center w-1/3">
              <div className="flex items-center gap-md">
                <span className="font-stat-mono text-3xl font-bold text-on-surface">{game.time_elapsed !== 'notstarted' ? game.home_score : '-'}</span>
                <span className="font-body text-body-sm text-on-surface-variant">X</span>
                <span className="font-stat-mono text-3xl font-bold text-on-surface">{game.time_elapsed !== 'notstarted' ? game.away_score : '-'}</span>
              </div>
              <span className="font-body text-label-sm text-tertiary mt-xs uppercase">
                {game.finished === "TRUE" ? "Terminado" : (game.time_elapsed === 'notstarted' ? 'Agendado' : game.time_elapsed)}
              </span>
            </div>

            <div className="flex flex-col items-center gap-sm w-1/3">
              <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-sm font-bold overflow-hidden border-2 border-border shadow-sm">
                {translateTeamName(game.away_team_name_en).substring(0, 3).toUpperCase()}
              </div>
              <span className="font-body text-body-md font-bold text-center">{translateTeamName(game.away_team_name_en)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-md pt-md border-t border-border">
            <div className="flex flex-col gap-xs">
              <span className="font-body text-label-sm text-on-surface-variant uppercase">Gols - Mandante</span>
              <p className="font-body text-body-sm text-on-surface">{homeScorers || "-"}</p>
            </div>
            <div className="flex flex-col gap-xs items-end text-right">
              <span className="font-body text-label-sm text-on-surface-variant uppercase">Gols - Visitante</span>
              <p className="font-body text-body-sm text-on-surface">{awayScorers || "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
