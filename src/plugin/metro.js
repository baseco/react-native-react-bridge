import Metro from "metro";

const babelTransformerPath = require.resolve("./transformer");

export const bundle = async (filename) => {
  const path = require('path')
  const { getDefaultConfig } = require('@expo/metro-config');
  const projectRoot = path.resolve(__dirname, '../../../..');
  const workspaceRoot = path.resolve(__dirname, '../../../../..')
  const config = getDefaultConfig(projectRoot);

  const watchFolders = [workspaceRoot]
  config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules')]

  config.resolver.sourceExts.push('cjs', 'svg')
  config.resolver.assetExts = config.resolver.assetExts.filter(
    (ext) => ext !== 'svg'
  )

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

  const { code, map } = await Metro.runBuild(config, {
    entry: filename,
    platform: "rnrb",
    minify: true,
  });
  return code;
};
