module.exports = function(api) {
  const presets = ["@babel/preset-env"];

  const plugins = [
    [
      "module-resolver",
      {
        alias: {
          "@": "./src"
        }
      }
    ]
  ];

  api.cache(true);

  return {
    presets,
    plugins
  };
};
