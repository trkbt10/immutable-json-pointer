export declare class Circular<T> {
    value: T;
    constructor(value: T);
}
declare type WalkerContainer = {
    callback: (paths: string, object: any) => any;
    options: {
        escape?: boolean;
    };
    memo: WeakMap<object, any>;
    results: any[];
};
export declare function objectWalker<T extends any>(source: T, callback: WalkerContainer["callback"], options: WalkerContainer["options"]): any[];
export {};
