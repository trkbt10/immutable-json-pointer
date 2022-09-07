declare type JSONPointerReplacer = (value: any, key: string, parent: any, paths: string[]) => void;
export declare function resolver<T extends {}, V extends unknown, P extends string>(doc: T, pointer: P, callback?: JSONPointerReplacer): V;
export declare function toPointer(paths: (string | number)[]): string;
export declare function get<T extends {}, R extends unknown>(json: T, pointer: string): R;
export declare function set<T extends {}>(doc: T, pointer: string, nextValue: any): T;
export declare function compile<T extends {}, R extends unknown>(pointer: string): {
    get: (doc: T) => R;
    set: (doc: T, nextValue: any) => T;
};
export {};
