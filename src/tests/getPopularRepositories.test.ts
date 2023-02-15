import { fetchPopularRepositories } from "../api/restCalls";
import { RepositoryItems, RepositoryPerPage } from "../types";
import { getPopularRepositories } from "../service/getPopularRepositories";

jest.mock("../api/restCalls", () => ({
  fetchPopularRepositories: jest.fn(),
}));

const mockResponse = [
  {
    repository: "https://github.com/crater-invoice/crater",
    stars: 6804,
    language: "PHP",
    created_at: "2019-11-20T07:09:02Z",
  },
  {
    repository: "https://github.com/pestphp/pest",
    stars: 6228,
    language: "PHP",
    created_at: "2020-03-11T20:36:55Z",
  },
  {
    repository: "https://github.com/filamentphp/filament",
    stars: 5727,
    language: "PHP",
    created_at: "2020-03-19T00:19:18Z",
  },
];

describe("getPopularRepositories", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call fetchPopularRepositories with correct queryParams", () => {
    const date = "2022-01-01";
    const language = "JavaScript";
    const perPage = RepositoryPerPage.FIFTY;

    getPopularRepositories({ date, language, perPage });
    expect(fetchPopularRepositories).toHaveBeenCalledWith({
      q: `created:>${date} language:${language}`,
      per_page: perPage,
      sort: "stars",
      order: "desc",
    });
  });

  it("should call fetchPopularRepositories with default perPage when not provided", () => {
    const date = "2022-01-01";
    const language = "JavaScript";

    getPopularRepositories({ date, language });
    expect(fetchPopularRepositories).toHaveBeenCalledWith({
      q: `created:>${date} language:${language}`,
      per_page: RepositoryPerPage.TEN,
      sort: "stars",
      order: "desc",
    });
  });

  it("should call fetchPopularRepositories without language when not provided", () => {
    const date = "2022-01-01";

    getPopularRepositories({ date });
    expect(fetchPopularRepositories).toHaveBeenCalledWith({
      q: `created:>${date}`,
      per_page: RepositoryPerPage.TEN,
      sort: "stars",
      order: "desc",
    });
  });

  it("should return a list of popular repositories sorted by stars", async () => {
    const getPopularRepositories = jest.fn().mockResolvedValue(mockResponse);
    const response = await getPopularRepositories({
      date: "2019-01-10",
      language: "PHP",
      perPage: RepositoryPerPage.TEN,
    });

    expect(getPopularRepositories).toHaveBeenCalled();
    expect(response).toBeDefined();
    expect(Array.isArray(response)).toBe(true);
    expect(response[0].repository).toMatch(/https:\/\/github.com\/.*/);
  });

  const queryParams = {
    date: "2019-01-10",
    language: "PHP",
  };
  it("should return popular repositories created from 2020-01-01 onwards", async () => {
    const getPopularRepositories = jest.fn().mockResolvedValue(mockResponse);
    const response = await getPopularRepositories({
      ...queryParams,
      perPage: RepositoryPerPage.TEN,
    });

    expect(getPopularRepositories).toHaveBeenCalled();

    response.forEach(({ created_at }: RepositoryItems) => {
      const createdAt = new Date(created_at).getTime();
      const givenDate = new Date("2019-01-01").getTime();
      expect(createdAt).toBeGreaterThanOrEqual(givenDate);
    });
  });
});

describe("Test for a list of the most popular repositories, sorted by number of stars", () => {
  it("should return a list of popular repositories sorted by stars", async () => {
    const getPopularRepositories = jest.fn().mockResolvedValue(mockResponse);
    const response = await getPopularRepositories({
      date: "2019-01-10",
      language: "PHP",
      perPage: RepositoryPerPage.TEN,
    });

    expect(getPopularRepositories).toHaveBeenCalled();
    expect(response).toBeDefined();
    expect(Array.isArray(response)).toBe(true);
    expect(response[0].repository).toMatch(/https:\/\/github.com\/.*/);
  });
});

describe("Test for an option to view the top 10, 50, 100 repositories", () => {
  const queryParams = {
    date: "2019-01-10",
    language: "PHP",
  };
  it("should return 10 popular repositories sorted by stars", async () => {
    const mockResponse = new Array(10).fill({
      repository: "https://github.com/repo",
      language: "PHP",
      created_at: "2019-10-03T15:24:53Z",
    });
    const getPopularRepositories = jest.fn().mockResolvedValue(mockResponse);

    const response = await getPopularRepositories({
      ...queryParams,
      perPage: RepositoryPerPage.TEN,
    });
    expect(getPopularRepositories).toHaveBeenCalled();
    expect(response.length).toBe(10);
  });

  it("should return 50 popular repositories sorted by stars", async () => {
    const mockResponse = new Array(50).fill({
      repository: "https://github.com/repo",
      language: "PHP",
      created_at: "2019-10-03T15:24:53Z",
    });
    const getPopularRepositories = jest.fn().mockResolvedValue(mockResponse);

    const response = await getPopularRepositories({
      ...queryParams,
      perPage: RepositoryPerPage.FIFTY,
    });
    expect(getPopularRepositories).toHaveBeenCalled();
    expect(response.length).toBe(50);
  });

  it("should return 100 popular repositories sorted by stars", async () => {
    const mockResponse = new Array(100).fill({
      repository: "https://github.com/repo",
      language: "PHP",
      created_at: "2019-10-03T15:24:53Z",
    });
    const getPopularRepositories = jest.fn().mockResolvedValue(mockResponse);

    const response = await getPopularRepositories({
      ...queryParams,
      perPage: RepositoryPerPage.HUNDERED,
    });
    expect(getPopularRepositories).toHaveBeenCalled();
    expect(response.length).toBe(100);
  });
});
