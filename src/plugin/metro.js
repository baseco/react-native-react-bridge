import Metro from "metro";
const babelTransformerPath = require.resolve("./transformer");

export const bundle = async (filename) => {
  const config = await Metro.loadConfig()
  config.transformer.babelTransformerPath = babelTransformerPath;

  const { code, map } = await Metro.runBuild(config, {
    entry: filename,
    platform: "rnrb",
    minify: true,
  });
  return code;
};
