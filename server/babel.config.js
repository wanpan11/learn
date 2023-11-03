module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "v14.19.1",
        },
        useBuiltIns: "usage",
        corejs: "3",
      },
    ],
  ],
};
