import axios from "axios";
import { fetchPopularRepositories } from "../api/restCalls";

jest.mock("axios");

const mockData = {
  items: [
    {
      html_url: "https://github.com/repo1",
      stargazers_count: 100,
      language: "JavaScript",
      created_at: "2022-01-01T00:00:00Z",
    },
    {
      html_url: "https://github.com/repo2",
      stargazers_count: 200,
      language: "Python",
      created_at: "2022-02-01T00:00:00Z",
    },
  ],
};

const expectedResult = [
  {
    repository: "https://github.com/repo1",
    stars: 100,
    language: "JavaScript",
    created_at: "2022-01-01T00:00:00Z",
  },
  {
    repository: "https://github.com/repo2",
    stars: 200,
    language: "Python",
    created_at: "2022-02-01T00:00:00Z",
  },
];

const queryParams = { q: "stars:%3E1", sort: "stars", order: "desc" };

describe("fetchPopularRepositories", () => {
  it("should return an array of repository items", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });
    const result = await fetchPopularRepositories(queryParams);
    expect(result).toEqual(expectedResult);
  });

  it("should handle errors", async () => {
    const errorMessage = "Request failed with status code 404";
    (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));
    try {
      await fetchPopularRepositories(queryParams);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });
});
