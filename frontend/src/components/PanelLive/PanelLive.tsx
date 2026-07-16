interface PanelLiveProps {
  time: string;
  team1: string;
  score1: number;
  team2: string;
  score2: number;
  scorers: string;
}

function PanelLive({ time, team1, score1, team2, score2, scorers }: PanelLiveProps) {
  return (
    <div className="bg-surface rounded-lg border border-border p-md flex flex-col gap-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></div>
          <span className="font-body text-[11px] font-semibold text-tertiary uppercase tracking-wider">AO VIVO</span>
        </div>
        <span className="font-stat text-xs text-on-surface-variant uppercase">{time}</span>
      </div>
      <div className="flex flex-col gap-md my-xs">
        <div className="flex items-center justify-between">
          <span className="font-body text-lg font-semibold text-text-primary">{team1}</span>
          <span className="font-stat text-xl font-bold text-primary">{score1}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-body text-lg font-semibold text-text-primary">{team2}</span>
          <span className="font-stat text-xl font-bold text-primary">{score2}</span>
        </div>
      </div>
      {scorers && (
        <div className="border-t border-border pt-sm text-xs text-text-muted font-body">
          {scorers}
        </div>
      )}
    </div>
  );
}

export default PanelLive;
