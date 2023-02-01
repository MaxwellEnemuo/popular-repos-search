export interface GetPopularRepositories {
  date: string;
  language?: string;
  per_page?: RepositoryPerPage;
}

export enum RepositoryPerPage {
  "TEN" = 10,
  "FIFTY" = 50,
  "HUNDERED" = 100,
}

export interface QueryParams {
  q: string;
  sort: string;
  order: string;
  per_page?: number;
}

export interface RepositoryItems {
  html_url: string;
  language: string;
  created_at: string;
  stargazers_count: number;
}
