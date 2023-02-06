import {
  GetPopularRepositories,
  QueryParams,
  RepositoryItems,
  RepositoryPerPage,
} from "./types";
import { handlePopularRepositoriesApiCall } from "./api/restCalls";

const getRepositoriesQueryParams = (
  date: string,
  per_page: RepositoryPerPage,
  language?: string
): QueryParams => ({
  q: `created:>${date}${language ? ` language:${language}` : ""}`,
  per_page,
  sort: "stars",
  order: "desc",
});

export const getPopularRepositories = async ({
  date,
  language,
  per_page = RepositoryPerPage.TEN,
}: GetPopularRepositories): Promise<RepositoryItems[]> => {
  const queryParams = getRepositoriesQueryParams(date, per_page, language);
  return await handlePopularRepositoriesApiCall(queryParams);
};
