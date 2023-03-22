'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

const EVENT_KEY = "rn-web-bridge";

var useWebViewMessage = function (onSubscribe) {
    var ref = react.useRef(null);
    var onMessage = react.useCallback(function (event) {
        try {
            var res = JSON.parse(event.nativeEvent.data);
            onSubscribe({ type: res.type, data: res.data });
        }
        catch (e) {
            // NOP
        }
    }, [onSubscribe]);
    var emit = react.useCallback(function (message) {
        var _a;
        (_a = ref.current) === null || _a === void 0 ? void 0 : _a.injectJavaScript("\n(function() {\ntry { \n  window.dispatchEvent(\n    new CustomEvent(\"".concat(EVENT_KEY, "\",{detail:").concat(JSON.stringify(message), "})\n  );\n} catch(e) {\n  // NOP\n}\nreturn true;\n})()\n"));
    }, [ref]);
    return { ref: ref, onMessage: onMessage, emit: emit };
};

exports.useWebViewMessage = useWebViewMessage;
