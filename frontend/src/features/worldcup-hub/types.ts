export interface Team {
  id: string;
  name_en: string;
  flag?: string;
}

export interface Game {
  id: string;
  home_team_name_en: string;
  away_team_name_en: string;
  home_score: string;
  away_score: string;
  finished: string;
  time_elapsed: string;
  home_scorers: string | null;
  away_scorers: string | null;
  type: string;
  group: string;
  local_date: string;
}

export interface GroupRow {
  team_id: string;
  pts: string;
  mp: string;
  gd: string;
}

export interface Group {
  name: string;
  teams: GroupRow[];
}
