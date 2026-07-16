import { useState } from "react";
import type { Game } from "../types";
import { MatchCard } from "./MatchCard";

interface KnockoutViewProps {
  games: Game[];
  onMatchClick: (game: Game) => void;
}

interface TreeNode {
  game: Game;
  children: TreeNode[];
}

export function KnockoutView({ games, onMatchClick }: KnockoutViewProps) {
  const [zoom, setZoom] = useState(1);
  const knockoutGames = games.filter(g => g.type !== 'group');

  if (knockoutGames.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-text-muted">
        <span className="material-symbols-outlined text-4xl mb-2 opacity-50">emoji_events</span>
        <p className="font-body text-body-md">Nenhuma partida de mata-mata definida ainda.</p>
      </div>
    );
  }

  // Group games by stage
  const gamesByStage: Record<string, Game[]> = {};
  knockoutGames.forEach(game => {
    if (!gamesByStage[game.type]) gamesByStage[game.type] = [];
    gamesByStage[game.type].push(game);
  });

  const bracketPaths: Record<string, string[]> = {
    // Semis
    '101': ['97', '98'],
    '102': ['99', '100'],
    // QFs
    '97': ['89', '90'],
    '98': ['93', '94'],
    '99': ['91', '92'],
    '100': ['95', '96'],
    // R16
    '89': ['74', '77'],
    '90': ['73', '75'],
    '93': ['83', '84'],
    '94': ['81', '82'],
    '91': ['76', '78'],
    '92': ['79', '80'],
    '95': ['86', '88'],
    '96': ['85', '87']
  };
  
  // Recursively build tree using bracket paths
  function buildTree(gameId: string): TreeNode | null {
    const game = knockoutGames.find(g => g.id === gameId);
    if (!game) return null;

    const children: TreeNode[] = [];
    const childrenIds = bracketPaths[gameId];
    
    if (childrenIds) {
      childrenIds.forEach(childId => {
        const childNode = buildTree(childId);
        if (childNode) children.push(childNode);
      });
    }

    return { game, children };
  }

  // Find the Final
  const finalGame = gamesByStage['final']?.[0];
  // Find Semi-finals for the split bracket roots
  const sf1 = buildTree('101'); // Top half root
  const sf2 = buildTree('102'); // Bottom half root

  // Recursive render component for nodes
  const renderTree = (node: TreeNode, isLeftTree: boolean) => {
    return (
      <li key={node.game.id}>
        <div className={`inline-block w-[260px] ${isLeftTree ? 'scale-x-[-1]' : ''}`}>
          <div className="mb-1 text-center font-body text-label-sm uppercase tracking-widest text-primary/70">
            {node.game.type === 'r32' ? '16-Avos' :
             node.game.type === 'r16' ? 'Oitavas' :
             node.game.type === 'qf' ? 'Quartas' :
             node.game.type === 'sf' ? 'Semifinal' :
             node.game.type === 'final' ? 'Final' : node.game.type}
          </div>
          <MatchCard game={node.game} onClick={onMatchClick} />
        </div>
        {node.children.length > 0 && (
          <ul>
            {node.children.map(child => renderTree(child, isLeftTree))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="flex flex-col gap-2xl relative w-full">
      <style dangerouslySetInnerHTML={{__html: `
        .css-tree ul {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 20px; 
          position: relative;
        }
        .css-tree li {
          display: flex;
          flex-direction: row;
          align-items: center;
          position: relative;
          padding: 10px 0 10px 20px;
        }
        .css-tree li::before, .css-tree li::after {
          content: '';
          position: absolute; left: 0;
          border-left: 2px solid var(--border);
          height: 50%; width: 20px;
        }
        .css-tree li::before {
          top: 0; border-bottom: 2px solid var(--border);
        }
        .css-tree li::after {
          bottom: 0; border-top: 2px solid var(--border);
        }
        .css-tree li:only-child::after, .css-tree li:only-child::before {
          display: none;
        }
        .css-tree li:only-child { padding-left: 0; }
        .css-tree li:first-child::before, .css-tree li:last-child::after {
          border-left: 0 none;
        }
        .css-tree li:last-child::before {
          border-bottom: 2px solid var(--border);
          border-radius: 0 0 0 5px;
        }
        .css-tree li:first-child::after {
          border-radius: 5px 0 0 0;
        }
        .css-tree ul ul::before {
          content: '';
          position: absolute; left: 0; top: 50%;
          border-top: 2px solid var(--border);
          width: 20px; height: 0;
        }
      `}} />

      <div className="flex justify-end px-xl mb-sm z-10 sticky top-0">
        <div className="flex items-center gap-sm bg-surface/80 backdrop-blur-md p-sm rounded-lg border border-border shadow-sm">
          <span className="material-symbols-outlined text-on-surface-variant text-sm">zoom_out</span>
          <input 
            type="range" 
            min="0.3" 
            max="1.5" 
            step="0.05" 
            value={zoom} 
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-24 md:w-32 accent-primary"
          />
          <span className="material-symbols-outlined text-on-surface-variant text-sm">zoom_in</span>
          <span className="font-stat-mono text-label-sm w-10 text-right text-primary">{Math.round(zoom * 100)}%</span>
        </div>
      </div>

      <div className="w-full overflow-x-auto pb-8 custom-scrollbar">
        <div 
          className="min-w-max p-xl flex flex-row items-center justify-center"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.1s ease-out' }}
        >
          
          {/* Left Tree (Flows Right to Final) */}
          {sf1 && (
            <div className="css-tree flex items-center scale-x-[-1]">
              <ul className="!pl-0">{renderTree(sf1, true)}</ul>
            </div>
          )}

          {/* Connection Line to Final */}
          {(sf1 || sf2) && finalGame && (
            <div className="w-8 h-0 border-t-2 border-border"></div>
          )}

          {/* Center Final Match */}
          {finalGame && (
            <div className="w-[260px] z-10 relative">
               <div className="mb-1 text-center font-body text-label-sm uppercase tracking-widest text-primary/70 font-bold">
                 Grande Final
               </div>
               <div className="ring-2 ring-primary/50 rounded-xl shadow-xl">
                 <MatchCard game={finalGame} onClick={onMatchClick} />
               </div>
            </div>
          )}

          {/* Connection Line to Right Tree */}
          {(sf1 || sf2) && finalGame && (
            <div className="w-8 h-0 border-t-2 border-border"></div>
          )}

          {/* Right Tree (Flows Left to Final) */}
          {sf2 && (
            <div className="css-tree flex items-center">
              <ul className="!pl-0">{renderTree(sf2, false)}</ul>
            </div>
          )}

        </div>
      </div>

      {/* Third Place Match */}
      {gamesByStage['third'] && gamesByStage['third'].length > 0 && (
        <section className="flex flex-col gap-md w-[260px] mt-xl mx-auto">
          <div className="flex items-center gap-sm border-b border-border pb-xs">
            <span className="material-symbols-outlined text-tertiary">military_tech</span>
            <h3 className="font-headline text-headline-sm">Disputa de 3º Lugar</h3>
          </div>
          <div className="flex flex-col gap-md">
            {gamesByStage['third'].map(game => (
              <MatchCard key={game.id} game={game} onClick={onMatchClick} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
