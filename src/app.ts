import express from "express";
import { getPopularRepositoriesController } from "./controllers/getPopularRepositoriesController";
import {
  validationErrorHandler,
  validationMiddleware,
} from "./middleware/validationMiddleware";

export const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.post(
  "/api/v1/repositories",
  validationMiddleware,
  validationErrorHandler,
  getPopularRepositoriesController
);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
