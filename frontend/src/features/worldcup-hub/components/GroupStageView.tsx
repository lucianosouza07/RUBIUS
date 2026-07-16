import type { Group } from "../types";
import { translateTeamName } from "../../../utils/translations";

interface GroupStageViewProps {
  groups: Group[];
  teamsMap: Record<string, string>;
}

export function GroupStageView({ groups, teamsMap }: GroupStageViewProps) {
  // Sort groups alphabetically A-L
  const sortedGroups = [...groups].sort((a, b) => a.name.localeCompare(b.name));

  if (sortedGroups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-text-muted">
        <span className="material-symbols-outlined text-4xl mb-2 opacity-50">table_chart_off</span>
        <p className="font-body text-body-md">Nenhum dado de grupo disponível.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg">
      {sortedGroups.map((group) => (
        <article key={group.name} className="bg-surface rounded-lg border border-border p-md flex flex-col gap-md">
          <div className="flex items-center justify-between border-b border-border pb-sm">
            <h3 className="font-headline text-headline-md">Grupo {group.name}</h3>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="font-body text-label-sm text-on-surface-variant uppercase">
                <th className="py-sm">Seleção</th>
                <th className="py-sm text-center">P</th>
                <th className="py-sm text-center">J</th>
                <th className="py-sm text-center">SG</th>
              </tr>
            </thead>
            <tbody className="font-stat-mono text-stat-mono border-t border-border">
              {group.teams.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-xl text-center text-text-muted">
                    <span className="font-body text-body-sm">Sem dados disponíveis</span>
                  </td>
                </tr>
              ) : (
                group.teams.map((row, i) => {
                  const rawTeamName = teamsMap[row.team_id] || "Unknown";
                  const teamName = translateTeamName(rawTeamName);
                  return (
                    <tr key={i} className={`border-b border-border ${i >= 2 ? 'bg-surface-variant/30 opacity-70' : ''}`}>
                      <td className="py-2 flex items-center gap-xs">
                        <span className="text-on-surface-variant w-3">{i + 1}</span>
                        <div className="w-5 h-5 rounded-full bg-surface-variant border border-border/50 text-[7px] flex items-center justify-center overflow-hidden font-bold">
                          {teamName.substring(0, 3).toUpperCase()}
                        </div>
                        <span className="font-body font-semibold truncate max-w-[100px]" title={teamName}>{teamName}</span>
                      </td>
                      <td className={`text-center font-bold ${i === 0 ? 'text-primary' : ''}`}>{row.pts}</td>
                      <td className="text-center">{row.mp}</td>
                      <td className={`text-center ${Number(row.gd) < 0 ? 'text-error' : ''}`}>
                        {Number(row.gd) > 0 ? `+${row.gd}` : row.gd}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </article>
      ))}
    </div>
  );
}
