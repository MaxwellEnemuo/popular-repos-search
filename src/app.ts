import express from "express";
import { getPopularRepositoriesController } from "./controllers/getPopularRepositoriesController";
import {
  validationErrorHandler,
  validationMiddleware,
} from "./middlewares/validationMiddleware";
import errorHandler from "./middlewares/errorHandler";

export const app = express();

const port = process.env.PORT || 8080;

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

app.use(errorHandler);
