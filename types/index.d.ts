type JSONPointerReplacer = (value: any, key: string, parent: any, paths: string[]) => void;
export declare function escape(str: string | number): string;
export declare function unescape(str: string): string;
export declare function parse(pointer: string): string[];
export declare function has<T extends {}>(obj: T, pointer: string): boolean;
export declare function compile(paths: (string | number)[], encoding?: "uri"): string;
export declare function resolve<T extends {}, V extends unknown, P extends string>(doc: T, pointer: P, callback?: JSONPointerReplacer): V;
export declare function get<T extends {}, R extends unknown>(json: T, pointer: string): R;
export declare function remove<T extends {}>(json: T, pointer: string): T;
export declare function dict<T extends {}>(json: T): Record<string, unknown>;
export declare function compose<T extends {}, Initial extends T = T, Result extends any = T>(entriesOrRecord: [string, any][] | Record<string, unknown>, initial?: Initial): Result;
export declare function set<T extends {}>(doc: T, pointer: string, nextValue: any): T;
export declare function read<T extends {}>(json: T, pointer: string): unknown;
export declare function transform<T extends {}, Fn extends (params: unknown) => unknown>(doc: T, pointer: string, fn: Fn): T;
export declare function chain<T>(...operations: ((val: T) => T)[]): (source: T) => T;
export {};
