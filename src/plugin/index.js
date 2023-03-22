import svgTransformer from 'react-native-svg-transformer'
import metroTransformer from "metro-react-native-babel-transformer";
import { isEntryFile } from "./babel";
import { bundle } from "./metro";
import { createContent } from "./html";

export const transform = async (args) => {
  const { filename, src, options } = args;
  const isEntry = isEntryFile(src, filename);
  if (isEntry) {
    const res = await bundle(filename);
    return metroTransformer.transform({
      ...args,
      src: createContent(res),
    });
  }

  return svgTransformer.transform(args);
};
