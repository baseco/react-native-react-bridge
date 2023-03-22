import { useRef, useCallback } from 'react';

const EVENT_KEY = "rn-web-bridge";

var useWebViewMessage = function (onSubscribe) {
    var ref = useRef(null);
    var onMessage = useCallback(function (event) {
        try {
            var res = JSON.parse(event.nativeEvent.data);
            onSubscribe({ type: res.type, data: res.data });
        }
        catch (e) {
            // NOP
        }
    }, [onSubscribe]);
    var emit = useCallback(function (message) {
        var _a;
        (_a = ref.current) === null || _a === void 0 ? void 0 : _a.injectJavaScript("\n(function() {\ntry { \n  window.dispatchEvent(\n    new CustomEvent(\"".concat(EVENT_KEY, "\",{detail:").concat(JSON.stringify(message), "})\n  );\n} catch(e) {\n  // NOP\n}\nreturn true;\n})()\n"));
    }, [ref]);
    return { ref: ref, onMessage: onMessage, emit: emit };
};

export { useWebViewMessage };
