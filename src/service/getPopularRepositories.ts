import { fetchPopularRepositories } from "../api/restCalls";
import { GetPopularRepositories, RepositoryItems, RepositoryPerPage } from "../types";

export const getPopularRepositories = ({
  date,
  language = "",
  perPage = RepositoryPerPage.TEN,
}: GetPopularRepositories): Promise<RepositoryItems[]> => {
  const queryParams = {
    q: `created:>${date}${language ? ` language:${language}` : ""}`,
    per_page: perPage,
    sort: "stars",
    order: "desc",
  };
  return fetchPopularRepositories(queryParams);
};
