import express from "express";
import { Response, Request, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { getPopularRepositoriesController } from "./controllers/getPopularRepositoriesController";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use(
  [
    body("date")
      .not()
      .isEmpty()
      .withMessage("Date is required")
      .bail()
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .withMessage("Date must be in YYYY-MM-DD format."),
    body("per_page")
      .isInt()
      .withMessage("It must be an integer.")
      .bail()
      .isIn([10, 50, 100])
      .withMessage("Limit must be either 10, 50 or 100.")
      .optional({ nullable: true }),
    body("language")
      .isString()
      .withMessage("Language must be a string.")
      .optional({ nullable: true }),
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
