const babelTransformerPath = require.resolve("./transformer");
const codeExts = ["js", "ts", "jsx", "tsx", "mjs", "cjs"];
const htmlExts = ["htm", "html", "css"];
const imageExts = ["bmp", "gif", "png", "jpg", "jpeg", "webp", "svg"];
const textExts = ["txt", "md"];
const sourceExts = [
  ...codeExts,
  ...htmlExts,
  ...imageExts,
  ...textExts,
  "json",
  "wasm",
];


export const bundle = async (filename) => {
  const { getDefaultConfig } = require('@expo/metro-config')
  const path = require('path')

  const workspaceRoot = path.resolve(__dirname, '../..')
  const projectRoot = __dirname
  const config = getDefaultConfig(projectRoot)

  const watchFolders = [workspaceRoot]

  config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules')]

  // config.resolver.sourceExts.push('cjs', 'svg')
  // // config.resolver.sourceExts.push('cjs')
  // config.resolver.assetExts = config.resolver.assetExts.filter(
  //   (ext) => ext !== 'svg'
  // )

  // config.transformer.babelTransformerPath = require.resolve(
  //   'react-native-react-bridge/lib/plugin'
  // )
  config.transformer.babelTransformerPath = babelTransformerPath;
  config.transformer.getTransformOptions = async () => ({
    ...config.transformer,
    transform: {
      experimentalImportSupport: false,
      inlineRequires: false,
    },
  })
  config.transformer.plugins = [
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-transform-literals',
  ]
  config.watchFolders = watchFolders
  config.resolver.sourceExts = sourceExts;
  config.resolver.assetExts = config.resolver.assetExts.filter(
    (ext) => !sourceExts.includes(ext)
  );

  const { code, map } = await Metro.runBuild(config, {
    entry: filename,
    platform: "rnrb",
    minify: true,
  });
  return code;
};
