import { RepositoryItems, RepositoryPerPage } from "./types";

const mockResponse = [
  {
    repository: "https://github.com/repo1",
    language: "PHP",
    created_at: "2019-02-03",
  },
  {
    repository: "https://github.com/repo2",
    language: "PHP",
    created_at: "2020-10-03",
  },
  {
    repository: "https://github.com/repo3",
    language: "PHP",
    created_at: "2019-12-03",
  },
];

describe("Test for a list of the most popular repositories, sorted by number of stars", () => {
  it("should return a list of popular repositories sorted by stars", async () => {
    const getPopularRepositories = jest.fn().mockResolvedValue(mockResponse);
    const response = await getPopularRepositories({
      date: "2019-01-10",
      language: "PHP",
      per_page: RepositoryPerPage.TEN,
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
      per_page: RepositoryPerPage.TEN,
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
      per_page: RepositoryPerPage.FIFTY,
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
      per_page: RepositoryPerPage.HUNDERED,
    });
    expect(getPopularRepositories).toHaveBeenCalled();
    expect(response.length).toBe(100);
  });
});

describe("Test for the most popular repositories created from a given date onwards", () => {
  const queryParams = {
    date: "2019-01-10",
    language: "PHP",
  };
  it("should return popular repositories created from 2020-01-01 onwards", async () => {
    const getPopularRepositories = jest.fn().mockResolvedValue(mockResponse);
    const response = await getPopularRepositories({
      ...queryParams,
      per_page: RepositoryPerPage.TEN,
    });

    expect(getPopularRepositories).toHaveBeenCalled();

    response.forEach(({ created_at }: RepositoryItems) => {
      const createdAt = new Date(created_at).getTime();
      const givenDate = new Date("2019-01-01").getTime();
      expect(createdAt).toBeGreaterThanOrEqual(givenDate);
    });
  });
});

describe("Test for a filter for the programming language", () => {
  const queryParams = {
    date: "2019-01-10",
    language: "PHP",
    per_page: RepositoryPerPage.TEN,
  };
  it("should return popular repositories with the given programming language", async () => {
    const getPopularRepositories = jest.fn().mockResolvedValue(mockResponse);
    const response = await getPopularRepositories({
      ...queryParams,
      per_page: RepositoryPerPage.HUNDERED,
    });

    expect(getPopularRepositories).toHaveBeenCalled();
    expect(response).toBeDefined();
    expect(Array.isArray(response)).toBe(true);
    expect(response[0].language.toLowerCase()).toMatch(
      queryParams.language.toLowerCase()
    );
  });
});
