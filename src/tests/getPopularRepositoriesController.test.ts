import { getPopularRepositoriesController } from "../controllers/getPopularRepositoriesController";
import { Response, Request } from "express";
import { getPopularRepositories } from "../service/getPopularRepositories";

jest.mock("../service/getPopularRepositories", () => ({
  getPopularRepositories: jest.fn(),
}));

describe("getPopularRepositoriesController", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      body: { date: "2022-12-01", language: "JavaScript", perPage: 25 },
    } as Request;
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return a list of popular repositories", async () => {
    const repositories = [
      {
        html_url: "https://github.com/Qinti/nazca",
        stargazers_count: 300,
        language: "JavaScript",
        created_at: "2020-06-18T07:25:01Z",
      },
      {
        html_url: "https://github.com/seanlaff/simple-streaming-datasource",
        stargazers_count: 294,
        language: "JavaScript",
        created_at: "2019-02-26T22:06:52Z",
      },
    ];
    (
      getPopularRepositories as jest.MockedFunction<
        typeof getPopularRepositories
      >
    ).mockResolvedValue(repositories);

    await getPopularRepositoriesController(req, res);

    expect(res.send).toHaveBeenCalledWith({ repositories });
  });

  it("should return a 500 error if the service fails", async () => {
    (
      getPopularRepositories as jest.MockedFunction<
        typeof getPopularRepositories
      >
    ).mockRejectedValue(new Error("Failed to fetch data"));

    await getPopularRepositoriesController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status(500).send).toHaveBeenCalledWith({
      error: "Failed to fetch repositories",
    });
  });
});
