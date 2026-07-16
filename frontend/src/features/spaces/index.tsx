import { useNavigate } from "react-router";

export default function SpacesFeature() {
  const navigate = useNavigate();

  const handleSpaceClick = (query: string) => {
    navigate(`/chat?q=${encodeURIComponent(query)}`);
  };

  return (
    <main className="flex-1 h-full overflow-y-auto">
      <div className="max-w-7xl w-full mx-auto px-xl py-2xl">
        {/* Header Section */}
        <header className="mb-xl mt-8 md:mt-0">
          <h2 className="font-headline text-headline-lg text-text-primary mb-sm">Espaços</h2>
          <p className="font-body text-body-md text-text-muted max-w-[42rem]">
            Ambientes de conhecimento focados para análises profundas e contextos específicos do futebol mundial.
          </p>
        </header>
        
        {/* Spaces Grid */}
        <div className="flex flex-col items-center justify-center mt-3xl text-center text-text-muted">
          <span className="material-symbols-outlined text-4xl mb-sm">explore_off</span>
          <p>Nenhum espaço disponível no momento.</p>
        </div>
      </div>
    </main>
  );
}
