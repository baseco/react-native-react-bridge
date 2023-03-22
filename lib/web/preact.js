'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var compat = require('preact/compat');
var preact = require('preact');

const EVENT_KEY = "rn-web-bridge";
const ROOT_ID = "root";

var buildRender = function (render) {
    return function (root) {
        render(root, document.getElementById(ROOT_ID));
        return ""; // dummy
    };
};
var emit = function (message) {
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
};
var buildUseNativeMessage = function (useEffect) {
    return function (onSubscribe) {
        useEffect(function () {
            var listener = function (e) {
                if (!isMessageEvent(e))
                    return;
                onSubscribe({ type: e.detail.type, data: e.detail.data });
            };
            window.addEventListener(EVENT_KEY, listener);
            return function () {
                window.removeEventListener(EVENT_KEY, listener);
            };
        }, [onSubscribe]);
    };
};
var isMessageEvent = function (e) {
    return e && e.detail;
};

var webViewRender = buildRender(preact.render);
var useNativeMessage = buildUseNativeMessage(compat.useEffect);

exports.emit = emit;
exports.useNativeMessage = useNativeMessage;
exports.webViewRender = webViewRender;
