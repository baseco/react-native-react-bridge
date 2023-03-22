import { ComponentChild } from "preact";
import { emit } from "./core";
export declare const webViewRender: (root: ComponentChild) => string;
export declare const useNativeMessage: <T>(onSubscribe: (message: import("..").Message<T>) => void) => void;
export { emit };
