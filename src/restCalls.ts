import axios from "axios";
import { QueryParams, RepositoryItems } from "./types";

const GITHUB_SEARCH_URL = "https://api.github.com/search/repositories";

export const handlePopularRepositoriesApiCall = async (queryParams: QueryParams): Promise<RepositoryItems[]> => {
  try {
    const { data } = await axios.get(GITHUB_SEARCH_URL, {
      params: queryParams,
    });
    return data.items.map(({ html_url, stargazers_count, language, created_at }: RepositoryItems) => ({
      repository: html_url,
      stars: stargazers_count,
      language,
      created_at,
    }));
  } catch (error) {
    throw error;
  }
};
