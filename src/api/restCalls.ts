import axios from "axios";

import { QueryParams, RepositoryItems } from "../types";
import { GITHUB_SEARCH_URL } from "./externalUrls";

/**
 * Popular repositories fetch with error handling
 * @param queryParams
 * @returns
 */
export const fetchPopularRepositories = async (queryParams: QueryParams): Promise<RepositoryItems[]> => {
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
    //Todo: add logger
    return error;
  }
};
