/* eslint-disable unicorn/prefer-module */
/** @type {import("ts-jest").JestConfigWithTsJest}  */
module.exports = {
  projects: [
    {
      displayName: "packages/crypto",
      preset: "ts-jest",
      testEnvironment: "node",
      testMatch: ["!**/node_modules", "<rootDir>/packages/crypto/*.spec.ts"],
    },
  ],
};
