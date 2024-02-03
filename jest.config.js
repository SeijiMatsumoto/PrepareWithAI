const nextJest = require("next/jest");

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  coverageProvider: "v8",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  testEnvironment: "jest-environment-jsdom",
  preset: "ts-jest",
};

module.exports = createJestConfig(config);
