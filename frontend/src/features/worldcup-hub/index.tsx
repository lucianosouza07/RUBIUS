import { useEffect, useState } from "react";
import { Link } from "react-router";
import { rubius_api } from "../../api/rubius";
import type { Game, Group, Team } from "./types";
import { MatchCard } from "./components/MatchCard";
import { MatchModal } from "./components/MatchModal";
import { GroupStageView } from "./components/GroupStageView";
import { KnockoutView } from "./components/KnockoutView";
import { translateTeamName } from "../../utils/translations";
import { calculateTopScorers, type Scorer } from "../../utils/scorers";

type TabType = 'overview' | 'groups' | 'knockouts';

export default function WorldCupHubFeature() {
  const [games, setGames] = useState<Game[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [teamsMap, setTeamsMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [topScorers, setTopScorers] = useState<Scorer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [gamesRes, groupsRes, teamsRes] = await Promise.all([
          rubius_api.get("/ext/games"),
          rubius_api.get("/ext/groups"),
          rubius_api.get("/ext/teams")
        ]);
        
        if (teamsRes.data && Array.isArray(teamsRes.data)) {
          const tMap: Record<string, string> = {};
          teamsRes.data.forEach((t: Team) => {
            tMap[t.id] = t.name_en;
          });
          setTeamsMap(tMap);
        }

        if (gamesRes.data && Array.isArray(gamesRes.data) && gamesRes.data.length > 0) {
          setGames(gamesRes.data);
          setTopScorers(calculateTopScorers(gamesRes.data));
        } else {
          throw new Error("No games data");
        }
        
        if (groupsRes.data && Array.isArray(groupsRes.data)) {
          setGroups(groupsRes.data);
        }
        
        setError(false);
      } catch (err) {
        console.error("Failed to fetch world cup data:", err);
        setError(true);
        setGames([]);
        setGroups([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const topLiveGames = games.filter(g => g.type === 'group').slice(0, 2); // Show a couple games in overview

  return (
    <main className="flex-1 flex flex-col bg-background overflow-y-auto">
      <div className="w-full max-w-7xl px-xl py-xl mx-auto flex flex-col gap-xl relative">
        {/* Header & Tabs */}
        <div className="flex flex-col gap-lg border-b border-border pb-2 sticky top-0 bg-background/95 backdrop-blur-sm z-10 pt-4 md:pt-0">
          <header className="flex flex-col gap-xs">
            <h2 className="font-headline text-headline-lg text-on-surface">Central Copa</h2>
            <p className="font-body text-body-md text-on-surface-variant">Visão geral analítica do torneio, atualizada em tempo real.</p>
            {error && <span className="text-label-sm text-error mt-2">Não foi possível carregar os dados. Verifique a conexão com a API.</span>}
          </header>

          <nav className="flex items-center gap-md">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 font-body text-label-md font-semibold transition-colors rounded-t-lg border-b-2 ${activeTab === 'overview' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50'}`}
            >
              Visão Geral
            </button>
            <button 
              onClick={() => setActiveTab('groups')}
              className={`px-4 py-2 font-body text-label-md font-semibold transition-colors rounded-t-lg border-b-2 ${activeTab === 'groups' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50'}`}
            >
              Fase de Grupos
            </button>
            <button 
              onClick={() => setActiveTab('knockouts')}
              className={`px-4 py-2 font-body text-label-md font-semibold transition-colors rounded-t-lg border-b-2 ${activeTab === 'knockouts' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50'}`}
            >
              Mata-Mata
            </button>
          </nav>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-64 w-full">
            <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <div className="w-full">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
                {/* Live Matches Preview */}
                {topLiveGames.length > 0 && (
                  <div className="flex flex-col gap-md lg:col-span-2 xl:col-span-1">
                    <h3 className="font-headline text-headline-sm">Partidas em Destaque</h3>
                    {topLiveGames.map((game, idx) => (
                      <MatchCard key={idx} game={game} onClick={setSelectedGame} />
                    ))}
                  </div>
                )}
                
                <div className="flex flex-col gap-lg">
                  {/* Group Table Preview */}
                  <article className="bg-surface rounded-lg border border-border p-md flex flex-col gap-md">
                    <div className="flex items-center justify-between border-b border-border pb-sm">
                      <h3 className="font-headline text-headline-md">Tabela - Grupo G</h3>
                      <button className="text-primary font-body text-label-md hover:underline" onClick={() => setActiveTab('groups')}>Ver Todos</button>
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
                        {(() => {
                          const groupG = groups.find(g => g.name === "G");
                          if (!groupG || !groupG.teams || groupG.teams.length === 0) {
                            return (
                              <tr>
                                <td colSpan={4} className="py-xl text-center text-text-muted">
                                  <div className="flex flex-col items-center justify-center gap-xs">
                                    <span className="material-symbols-outlined opacity-50">table_chart_off</span>
                                    <span className="font-body text-body-sm">Sem dados disponíveis</span>
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                          return groupG.teams.map((row, i) => {
                            const rawTeamName = teamsMap[row.team_id] || "Unknown";
                            const teamName = translateTeamName(rawTeamName);
                            return (
                              <tr key={i} className={`border-b border-border ${i >= 2 ? 'bg-surface-variant/30 opacity-70' : ''}`}>
                                <td className="py-2 flex items-center gap-xs">
                                  <span className="text-on-surface-variant">{i + 1}</span>
                                  <div className="w-4 h-4 rounded-full bg-surface-variant border border-border/50 text-[6px] flex items-center justify-center overflow-hidden">{teamName.substring(0, 3).toUpperCase()}</div>
                                  <span className="font-body font-semibold">{teamName}</span>
                                </td>
                                <td className={`text-center font-bold ${i === 0 ? 'text-primary' : ''}`}>{row.pts}</td>
                                <td className="text-center">{row.mp}</td>
                                <td className={`text-center ${Number(row.gd) < 0 ? 'text-error' : ''}`}>{Number(row.gd) > 0 ? `+${row.gd}` : row.gd}</td>
                              </tr>
                            );
                          });
                        })()}
                      </tbody>
                    </table>
                  </article>
                  
                  {/* Top Scorers List */}
                  <article className="bg-surface rounded-lg border border-border p-md flex flex-col gap-md">
                    <div className="flex items-center justify-between border-b border-border pb-sm">
                      <h3 className="font-headline text-headline-md">Artilharia</h3>
                      <Link className="text-primary font-body text-label-md hover:underline" to="/chat?q=Tabela%20de%20Artilharia">Perguntar IA</Link>
                    </div>
                    
                    {topScorers.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-md text-text-muted text-center h-full min-h-[120px]">
                        <span className="material-symbols-outlined text-3xl mb-xs opacity-50">sports_soccer</span>
                        <p className="text-body-sm">Sem dados de artilharia no momento.</p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-sm">
                        {topScorers.slice(0, 5).map((scorer, idx) => (
                          <div key={idx} className="flex items-center justify-between py-sm border-b border-border/50 last:border-0">
                            <div className="flex items-center gap-md">
                              <span className={`font-stat-mono text-label-md w-4 text-center ${idx === 0 ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>{idx + 1}</span>
                              <span className="font-body text-body-md font-semibold">{scorer.name}</span>
                            </div>
                            <div className="flex items-center gap-xs bg-surface-variant/50 px-2 py-1 rounded-md">
                              <span className="font-stat-mono text-label-md font-bold">{scorer.goals}</span>
                              <span className="material-symbols-outlined text-[14px] text-text-muted">sports_soccer</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                </div>
              </div>
            )}

            {activeTab === 'groups' && (
              <GroupStageView groups={groups} teamsMap={teamsMap} />
            )}

            {activeTab === 'knockouts' && (
              <KnockoutView games={games} onMatchClick={setSelectedGame} />
            )}
          </div>
        )}
      </div>

      <MatchModal game={selectedGame} onClose={() => setSelectedGame(null)} />
    </main>
  );
}
