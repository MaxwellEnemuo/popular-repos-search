import express from "express";
import { Response, Request, NextFunction } from "express";
import { getPopularRepositories } from ".";
import { GetPopularRepositories } from "./types";
import { body, validationResult } from "express-validator";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use(
  [
    body("date").isString().trim(),
    body("language").isString().trim().optional(),
    body("per_page").isInt().isIn([10, 50, 100]).optional(),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
);

app.post("/repositories", async (req: Request, res: Response) => {
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
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
