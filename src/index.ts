import { GetPopularRepositories, RepositoryItems, RepositoryPerPage } from "./types";
import { handlePopularRepositoriesApiCall } from "./restCalls";

export const getPopularRepositories = async ({
  date,
  language,
  per_page = RepositoryPerPage.Top10,
}: GetPopularRepositories): Promise<RepositoryItems[]> => {
  const queryParams = {
    q: `created:>${date}${language ? ` language:${language}` : ""}`,
    per_page,
    sort: "stars",
    order: "desc",
  };
  try {
    return await handlePopularRepositoriesApiCall(queryParams);
  } catch (error) {
    throw error;
  }
};

// example
(async function () {
  const repositories = await getPopularRepositories({
    date: "2019-01-10",
    language: "PHP",
  });
  console.log(repositories);
})();
