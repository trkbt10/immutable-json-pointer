type JSONPointerReplacer = (
  value: any,
  key: string,
  parent: any,
  paths: string[]
) => void;
function sliceLast<T extends unknown[]>(arr: T) {
  type R = T extends [...infer U, infer L] ? [U, L] : [T[number][], T[number]];
  const paths = arr.slice(0, -1) as R[0];
  const key = arr.at(-1) as R[1];
  return [paths, key] as const;
}
function isObject(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === "object" && obj !== null;
}
export function escape(str: string) {
  return str.replace(/~/g, "~0").replace(/\//g, "~1");
}
export function unescape(str: string): string {
  return str.replace(/\~1/g, "/").replace(/\~0/g, "~");
}
export function parse(pointer: string): string[] {
  if (pointer.startsWith("#")) {
    const unescapedPointer = decodeURIComponent(pointer).replace(/^#/, "");
    return parse(unescapedPointer);
  }
  return pointer.split("/").map(unescape);
}
export function has<T extends {}>(obj: T, pointer: string): boolean {
  const data = resolve(obj, pointer, () => {});
  return typeof data !== "undefined";
}
export function compile(paths: (string | number)[], encoding?: "uri"): string {
  const pathString = paths.map((path) => {
    if (typeof path === "number") {
      return path;
    }
    return escape(path);
  });
  if (encoding === "uri") {
    return `#/${pathString.map(encodeURIComponent).join("/")}`;
  }
  return "/" + pathString.join("/");
}
export function resolve<T extends {}, V extends unknown, P extends string>(
  doc: T,
  pointer: P,
  callback?: JSONPointerReplacer
): V {
  const [mode, ...rest] = parse(pointer);
  if (mode === "" && rest.length === 0) {
    return doc as any;
  }

  let result: any = doc;
  let parent: any;
  for (const part of rest) {
    if (
      part === "__proto__" ||
      part === "constructor" ||
      part === "prototype"
    ) {
      throw new Error("Prototype pollution attempt");
    }
    if (!(part in result)) {
      if (callback) {
        result = undefined;
        break;
      }
      throw new Error(`Cannot find ${part} in ${JSON.stringify(result)}`);
    }
    parent = result;
    result = result[part];
  }
  if (callback) {
    const [paths, key] = sliceLast(rest);
    callback(result, key, parent, paths);
  }
  return result;
}
export function get<T extends {}, R extends unknown>(
  json: T,
  pointer: string
): R {
  return resolve(json, pointer);
}

export function remove<T extends {}>(json: T, pointer: string) {
  const next = { ...json };
  resolve(json, pointer, (value, key, parent) => {
    if (Array.isArray(parent)) {
      parent.splice(Number(key), 1);
    } else {
      delete parent[key];
    }
  });
  return next;
}
export function dict<T extends {}>(json: T): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const walker = (obj: any, paths: string[]) => {
    for (const key in obj) {
      const value = obj[key];
      if (isObject(value)) {
        const nextPaths = [...paths, key];
        walker(value, nextPaths);
        continue;
      }
      result[compile([...paths, key])] = value;
    }
  };
  walker(json, []);
  return result;
}
export function set<T extends {}>(doc: T, pointer: string, nextValue: any): T {
  const next: T = clone(doc);
  const replacer: JSONPointerReplacer = (value, key, parent, paths) => {
    if (value === nextValue) {
      return;
    }
    // Recursively update parent
    const pathSize = paths.length;
    let i = 0;
    let prev: any = next;
    do {
      const path = paths[i];
      const isLast = i >= pathSize;
      if (isLast && Array.isArray(prev)) {
        if (key === "-") {
          prev.push(nextValue);
        } else {
          prev[+key] = nextValue;
        }
        return;
      }
      if (isLast) {
        prev[key] = nextValue;
        return;
      }
      const current = prev[path] ?? {};
      prev[path] = clone(current);
      prev = prev[path];
    } while (++i <= pathSize);
  };

  resolve(doc, pointer, replacer);
  return next;
}
export function read<T extends {}>(json: T, pointer: string) {
  if (has(json, pointer)) {
    return get(json, pointer);
  }
  return;
}

export function transform<
  T extends {},
  Fn extends (params: unknown) => unknown
>(doc: T, pointer: string, fn: Fn): T {
  const result: Parameters<Fn>[0] = read(doc, pointer);
  const next = fn(result) as ReturnType<Fn>;
  return set<T>(doc, pointer, next);
}

function clone<T extends any>(item: T) {
  if (Array.isArray(item)) {
    return [...item] as T;
  }
  if (isObject(item)) {
    return { ...item } as T;
  }
  return item;
}
