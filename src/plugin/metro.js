import Metro from "metro";

export const bundle = async (filename) => {
  const config = await Metro.loadConfig()
  console.log("Config from bundler: ", config)
  const { code, map } = await Metro.runBuild(config, {
    entry: filename,
    platform: "rnrb",
    minify: true,
  });
  return code;
};
