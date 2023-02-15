/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  coveragePathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/src/types*",
    "<rootDir>/src/app*",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/node_modules/",
    "./src/types/",
  ],
  moduleFileExtensions: ["js", "ts"],
  modulePaths: ["<rootDir>/src/"],
  collectCoverageFrom: ["./src/**"],
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
};
