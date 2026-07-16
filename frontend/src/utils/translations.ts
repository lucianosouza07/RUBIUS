export const TEAM_TRANSLATIONS: Record<string, string> = {
  "South Africa": "África do Sul",
  "Brazil": "Brasil",
  "Scotland": "Escócia",
  "Turkey": "Turquia",
  "Ivory Coast": "Costa do Marfim",
  "Netherlands": "Holanda",
  "Cape Verde": "Cabo Verde",
  "France": "França",
  "Tunisia": "Tunísia",
  "Egypt": "Egito",
  "Iraq": "Iraque",
  "Portugal": "Portugal",
  "Uzbekistan": "Uzbequistão",
  "Colombia": "Colômbia",
  "Ecuador": "Equador",
  "Japan": "Japão",
  "New Zealand": "Nova Zelândia",
  "Saudi Arabia": "Arábia Saudita",
  "Austria": "Áustria",
  "Ghana": "Gana",
  "South Korea": "Coreia do Sul",
  "Spain": "Espanha",
  "Norway": "Noruega",
  "Argentina": "Argentina",
  "Democratic Republic of the Congo": "Rep. Democrática do Congo",
  "England": "Inglaterra",
  "Czech Republic": "República Tcheca",
  "Canada": "Canadá",
  "Qatar": "Catar",
  "Switzerland": "Suíça",
  "Morocco": "Marrocos",
  "Paraguay": "Paraguai",
  "Curaçao": "Curaçao",
  "Sweden": "Suécia",
  "Algeria": "Argélia",
  "Jordan": "Jordânia",
  "Haiti": "Haiti",
  "Germany": "Alemanha",
  "Uruguay": "Uruguai",
  "Senegal": "Senegal",
  "Panama": "Panamá",
  "Mexico": "México",
  "Bosnia and Herzegovina": "Bósnia e Herzegovina",
  "United States": "Estados Unidos",
  "Australia": "Austrália",
  "Belgium": "Bélgica",
  "Iran": "Irã",
  "Croatia": "Croácia"
};

/**
 * Translates a team name from English to Brazilian Portuguese.
 * If translation is not found, returns the original name.
 */
export function translateTeamName(englishName: string | undefined | null): string {
  if (!englishName) return "A Definir";
  return TEAM_TRANSLATIONS[englishName] || englishName;
}
