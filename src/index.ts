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

const getPopularRepositories = async ({
  date,
  language,
  per_page = RepositoryPerPage.TEN,
}: GetPopularRepositories): Promise<RepositoryItems[]> => {
  const queryParams = getRepositoriesQueryParams(date, per_page, language);
  return await handlePopularRepositoriesApiCall(queryParams);
};

// Run npm start. Uncomment and/or update object values and run command again
(async function () {
  const repositories = await getPopularRepositories({
    date: "2019-01-10",
    // language: "Python",
    // per_page: RepositoryPerPage.FIFTY,
  });
  console.log(repositories);
})();
