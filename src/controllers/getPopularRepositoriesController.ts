import { Response, Request } from "express";
import { GetPopularRepositories } from "../types";
import { getPopularRepositories } from "../service/getPopularRepositories";

export const getPopularRepositoriesController = async (req: Request, res: Response) => {
  const { date, language, perPage } = req.body as GetPopularRepositories;
  try {
    const repositories = await getPopularRepositories({
      date,
      language,
      perPage,
    });
    res.send({ repositories });
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch repositories" });
  }
};
