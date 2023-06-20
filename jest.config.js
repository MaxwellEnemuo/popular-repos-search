/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  coveragePathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/src/types*", "<rootDir>/src/app*"],
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/", "./src/types/"],
  moduleFileExtensions: ["js", "ts"],
  modulePaths: ["<rootDir>/src/"],
  collectCoverageFrom: ["./src/**"],
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
};
