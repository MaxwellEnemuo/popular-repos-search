export interface GetPopularRepositories {
  date: string;
  language?: string;
  per_page?: RepositoryPerPage;
}

export enum RepositoryPerPage {
  Top10 = 10,
  Top50 = 50,
  Top100 = 100,
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
