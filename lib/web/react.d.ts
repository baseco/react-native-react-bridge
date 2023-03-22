import { ReactNode } from "react";
import { emit } from "./core";
export declare const webViewRender: (root: ReactNode) => string;
export declare const useNativeMessage: <T>(onSubscribe: (message: import("..").Message<T>) => void) => void;
export { emit };
