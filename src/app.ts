import express from "express";
import { Response, Request, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { getPopularRepositoriesController } from "./controllers/getPopularRepositoriesController";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use(
  [
    body("date").isString().trim(),
    body("language").isString().trim().optional({ nullable: true }),
    body("per_page").isInt().isIn([10, 50, 100]).optional({ nullable: true }),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
);

app.post("/repositories", getPopularRepositoriesController);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});