interface Team {
  team_id: string;
  name_en: string;
  pts: number;
  mp: number;
  gd: number;
}

interface PanelGroupProps {
  group: string;
  selectionTeams: Team[];
}

function PanelGroup({ group, selectionTeams }: PanelGroupProps) {
  return (
    <div className="bg-surface rounded-lg border border-border p-md flex flex-col gap-md">
      <h3 className="font-headline text-[18px] font-semibold text-text-primary">Tabela - Grupo {group}</h3>

      <div className="grid grid-cols-[1fr_repeat(3,40px)] gap-sm border-b border-border pb-xs text-xs font-semibold text-text-muted">
        <span>Seleção</span>
        <span className="text-center">P</span>
        <span className="text-center">J</span>
        <span className="text-center">SG</span>
      </div>

      <div className="flex flex-col gap-sm">
        {selectionTeams.map((s, index) => (
          <div key={s.team_id} className="grid grid-cols-[1fr_repeat(3,40px)] gap-sm text-sm text-text-primary items-center">
            <span className="truncate">{index + 1}. {s.name_en}</span>
            <span className="text-center font-stat font-bold text-primary">{s.pts}</span>
            <span className="text-center font-stat text-text-muted">{s.mp}</span>
            <span className="text-center font-stat text-text-muted">{s.gd}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PanelGroup;
