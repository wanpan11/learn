module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "> 0.25%, not dead",
        // modules: "amd",
        // useBuiltIns: "usage",
        // corejs: "3.8",
      },
    ],
  ],
  // plugins: ["@babel/plugin-transform-runtime"],
};
