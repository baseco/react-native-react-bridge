import Metro from "metro";

export const bundle = async (filename) => {
  const config = Metro.loadConfig()
  const { code, map } = await Metro.runBuild(config, {
    entry: filename,
    platform: "rnrb",
    minify: true,
  });
  return code;
};
