const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from test.env
dotenv.config({ path: path.dirname(__filename) + "/test.env" });

module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testEnvironment: "node",
  globals: {
    "babel-jest": {
      useESM: true,
    },
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!supertest)", // Add any other module you want to transform here
  ],
};
