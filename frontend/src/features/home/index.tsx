import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";

export default function HomeFeature() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const pulseRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/chat?q=${encodeURIComponent(query)}`);
    }
  };

  const handlePromptClick = (q: string) => {
    navigate(`/chat?q=${encodeURIComponent(q)}`);
  };

  useEffect(() => {
    if (pulseRef.current) {
      pulseRef.current.animate(
        [
          { boxShadow: "0 0 0 0px rgba(13, 148, 136, 0)" },
          { boxShadow: "0 0 0 8px rgba(13, 148, 136, 0.1)" },
          { boxShadow: "0 0 0 0px rgba(13, 148, 136, 0)" }
        ],
        {
          duration: 2000,
          iterations: Infinity
        }
      );
    }
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-xl relative mt-16 md:mt-0 overflow-y-auto">
      <div className="w-full max-w-[960px] flex flex-col items-center">
        {/* Headline */}
        <h2 className="font-headline text-[32px] font-bold text-text-primary text-center mb-xl tracking-tight">
          Como posso ajudar com a Copa hoje?
        </h2>
        
        {/* Central Ask Input Container */}
        <form onSubmit={handleSubmit} className="w-full max-w-[672px] relative group">
          <div 
            ref={pulseRef}
            className="absolute -inset-[1px] bg-transparent rounded-2xl transition-all duration-300 pointer-events-none border border-border group-focus-within:border-primary/50 group-focus-within:ring-4 group-focus-within:ring-primary/5" 
            id="input-pulse"
          ></div>
          <div className="relative flex items-center bg-surface-variant rounded-2xl h-[64px] px-lg">
            {/* Attachment */}
            <button type="button" aria-label="Anexar arquivo" className="p-sm text-text-muted hover:text-primary transition-colors flex-shrink-0">
              <span className="material-symbols-outlined">attach_file</span>
            </button>
            {/* Text Input */}
            <input 
              name="q" 
              autoComplete="off" 
              className="flex-1 bg-transparent border-none focus:ring-0 text-[18px] text-text-primary placeholder:text-text-muted px-md outline-none" 
              placeholder="Faça uma pergunta sobre estatísticas, times ou jogadores..." 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                if (pulseRef.current) {
                  pulseRef.current.style.borderColor = 'rgba(13, 148, 136, 0.5)';
                }
              }}
            />
            {/* Microphone */}
            <button type="button" aria-label="Usar microfone" className="p-sm text-text-muted hover:text-primary transition-colors flex-shrink-0">
              <span className="material-symbols-outlined">mic</span>
            </button>
            {/* Send Button */}
            <button type="submit" aria-label="Enviar mensagem" className="p-sm text-primary hover:text-primary-hover transition-colors flex-shrink-0 ml-xs flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
            </button>
          </div>
        </form>
        
        {/* Smart Prompts */}
        <div className="w-full max-w-[672px] mt-xl flex flex-wrap justify-center gap-sm">
          <button onClick={() => handlePromptClick("Jogos de Hoje ⚽")} className="px-md py-[10px] bg-surface-variant rounded-full text-[13px] font-medium text-text-primary hover:bg-border transition-all border border-transparent hover:border-border flex items-center gap-xs whitespace-nowrap">
            Jogos de Hoje ⚽
          </button>
          <button onClick={() => handlePromptClick("Escalação Provável 📋")} className="px-md py-[10px] bg-surface-variant rounded-full text-[13px] font-medium text-text-primary hover:bg-border transition-all border border-transparent hover:border-border flex items-center gap-xs whitespace-nowrap">
            Escalação Provável 📋
          </button>
          <button onClick={() => handlePromptClick("Simulador de Classificação 🏆")} className="px-md py-[10px] bg-surface-variant rounded-full text-[13px] font-medium text-text-primary hover:bg-border transition-all border border-transparent hover:border-border flex items-center gap-xs whitespace-nowrap">
            Simulador de Classificação 🏆
          </button>
          <button onClick={() => handlePromptClick("Tabela de Artilharia 🥇")} className="px-md py-[10px] bg-surface-variant rounded-full text-[13px] font-medium text-text-primary hover:bg-border transition-all border border-transparent hover:border-border flex items-center gap-xs whitespace-nowrap">
            Tabela de Artilharia 🥇
          </button>
        </div>
      </div>
    </main>
  );
}
