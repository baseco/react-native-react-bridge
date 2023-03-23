const babelTransformerPath = require.resolve("./transformer");
// const codeExts = ["js", "ts", "jsx", "tsx", "mjs", "cjs"];
// const htmlExts = ["htm", "html", "css"];
// const imageExts = ["bmp", "gif", "png", "jpg", "jpeg", "webp", "svg"];
// const textExts = ["txt", "md"];
// const sourceExts = [
//   ...codeExts,
//   ...htmlExts,
//   ...imageExts,
//   ...textExts,
//   "json",
//   "wasm",
// ];


export const bundle = async (filename) => {
  const { getDefaultConfig } = require('@expo/metro-config')
  const projectRoot = __dirname
  const config = getDefaultConfig(projectRoot)

  const { code, map } = await Metro.runBuild(config, {
    entry: filename,
    platform: "rnrb",
    minify: true,
  });
  return code;
};
