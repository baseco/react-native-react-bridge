/// <reference types="react" />
import type WebView from "react-native-webview";
import type { Message } from "./types";
export declare const useWebViewMessage: <T>(onSubscribe: (message: Message<T>) => void) => {
    ref: import("react").RefObject<WebView<{}>>;
    onMessage: (event: NativeSyntheticEvent<import("react-native-webview/lib/WebViewTypes").WebViewMessage>) => void;
    emit: (message: Message<T>) => void;
};
