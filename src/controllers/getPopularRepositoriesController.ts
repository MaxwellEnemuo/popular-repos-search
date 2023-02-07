import { Response, Request } from "express";
import {
  GetPopularRepositories,
  QueryParams,
  RepositoryItems,
  RepositoryPerPage,
} from "../types";
import { handlePopularRepositoriesApiCall } from "../api/restCalls";

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

export const getPopularRepositoriesController = async (
  req: Request,
  res: Response
) => {
  const { date, language, per_page } = req.body as GetPopularRepositories;
  try {
    const repositories = await getPopularRepositories({
      date,
      language,
      per_page,
    });
    res.send({ repositories });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch repositories" });
  }
};
