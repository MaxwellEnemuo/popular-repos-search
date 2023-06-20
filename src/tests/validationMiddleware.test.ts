import request from "supertest";
import express from "express";
import {
  validationMiddleware,
  validationErrorHandler,
} from "../middlewares/validationMiddleware";

const app = express();

app.use(express.json());
app.use(validationMiddleware);
app.use(validationErrorHandler);

describe("Validation Middleware", () => {
  it("should return an error if date is missing", async () => {
    const response = await request(app)
      .post("/api/repositories")
      .send({ perPage: 50, language: "PHP" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toContainEqual({
      value: undefined,
      msg: "Date is required",
      param: "date",
      location: "body",
    });
  });

  it("should return an error if date is not in YYYY-MM-DD format", async () => {
    const response = await request(app)
      .post("/api/repositories")
      .send({ date: "2022/12/25", perPage: 50, language: "PHP" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toContainEqual({
      value: "2022/12/25",
      msg: "Date must be in YYYY-MM-DD format.",
      param: "date",
      location: "body",
    });
  });

  it("should return an error if perPage is not an integer", async () => {
    const response = await request(app)
      .post("/api/repositories")
      .send({ date: "2022-12-25", perPage: "50x", language: "PHP" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toContainEqual({
      value: "50x",
      msg: "It must be an integer.",
      param: "perPage",
      location: "body",
    });
  });

  it("should return an error if perPage is not 10, 50 or 100", async () => {
    const response = await request(app)
      .post("/api/repositories")
      .send({ date: "2022-12-25", perPage: 150, language: "PHP" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toContainEqual({
      value: 150,
      msg: "Limit must be either 10, 50 or 100.",
      param: "perPage",
      location: "body",
    });
  });

  it("should return error if language is not a string", async () => {
    const res = await request(app)
      .post("/api/repositories")
      .send({ date: "2022-02-12", perPage: 50, language: 20 });
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toEqual([
      {
        value: 20,
        msg: "Language must be a string.",
        param: "language",
        location: "body",
      },
    ]);
  });
});
