import type { Message } from "../types";
export declare const buildRender: <T>(render: (...args: any[]) => any) => (root: T) => string;
export declare const emit: <T>(message: Message<T>) => void;
export declare const buildUseNativeMessage: (useEffect: (cb: () => void, deps: any[]) => void) => <T>(onSubscribe: (message: Message<T>) => void) => void;
