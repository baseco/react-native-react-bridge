'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var svgTransformer = require('react-native-svg-transformer');
var metroTransformer = require('metro-react-native-babel-transformer');
var core = require('@babel/core');
var traverse = require('@babel/traverse');
var Metro = require('metro');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var svgTransformer__default = /*#__PURE__*/_interopDefaultLegacy(svgTransformer);
var metroTransformer__default = /*#__PURE__*/_interopDefaultLegacy(metroTransformer);
var traverse__default = /*#__PURE__*/_interopDefaultLegacy(traverse);
var Metro__default = /*#__PURE__*/_interopDefaultLegacy(Metro);

const isEntryFile = (src, filename) => {
  const ast = core.parseSync(src, { filename });
  let isEntry = false;
  traverse__default["default"](ast, {
    ExportDefaultDeclaration(path) {
      if (
        looksLike(path.node, {
          declaration: {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: "webViewRender",
            },
          },
        })
      ) {
        isEntry = true;
      }
    },
  });
  return isEntry;
};

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every((bKey) => {
      const bVal = b[bKey];
      const aVal = a[bKey];
      if (typeof bVal === "function") {
        return bVal(aVal);
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal);
    })
  );
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val);
}

const bundle = async (filename) => {
  const config = await Metro__default["default"].loadConfig();
  console.log("Config from bundler: ", config);
  const { code, map } = await Metro__default["default"].runBuild(config, {
    entry: filename,
    platform: "rnrb",
    minify: true,
  });
  return code;
};

const ROOT_ID = "root";

const escape = (src) => src.replace(/`/g, "\\`");

const createContent = (js) =>
  `export default String.raw\`${escape(wrapByHtml(js))}\`;`;

const wrapByHtml = (js) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
</head>
<body style="margin: 0 !important;padding: 0 !important;">
  <div id="${ROOT_ID}"></div>
  <script type="text/javascript">(function(){${js}})()</script>
</body>
</html>
`;

const transform = async (args) => {
  const { filename, src, options } = args;
  const isEntry = isEntryFile(src, filename);
  if (isEntry) {
    console.log("Calling custom transformer...", filename);
    const res = await bundle(filename);
    return metroTransformer__default["default"].transform({
      ...args,
      src: createContent(res),
    });
  }

  console.log("Calling svgTransformer...", filename);
  return svgTransformer__default["default"].transform(args);
};

exports.transform = transform;
