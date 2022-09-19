const path = require("path");

/** @type {import('jest').Config} */
const config = {
  rootDir: path.resolve(__dirname, "../"),
  testMatch: ["<rootDir>/_test/**/*.[jt]s?(x)"],
};

module.exports = config;
