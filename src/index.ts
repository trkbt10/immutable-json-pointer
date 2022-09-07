type JSONPointerReplacer = (
  value: any,
  key: string,
  parent: any,
  paths: string[]
) => void;

export function resolver<T extends {}, V extends unknown, P extends string>(
  doc: T,
  pointer: P,
  callback?: JSONPointerReplacer
): V {
  if (pointer.startsWith("#")) {
    const unescapedPointer = decodeURIComponent(pointer).replace(/^#/, "");
    return resolver(doc, unescapedPointer, callback);
  }
  const [mode, ...rest] = pointer.split("/").map(untilde);
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
    const paths = rest.slice(0, -1);
    const key = rest.at(-1) ?? "";
    callback(result, key, parent, paths);
  }
  return result;
}
export function toPointer(paths: (string | number)[]): string {
  const pathString = paths
    .map((path) => {
      if (typeof path === "number") {
        return path;
      }
      return path.replace(/~/g, "~0").replace(/\//g, "~1");
    })
    .join("/");
  return "/" + pathString;
}
export function get<T extends {}, R extends unknown>(
  json: T,
  pointer: string
): R {
  return resolver(json, pointer);
}

export function set<T extends {}>(doc: T, pointer: string, nextValue: any): T {
  const next: T = { ...doc };
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
      const current = prev[path];
      if (Array.isArray(current)) {
        prev[path] = [...current];
      } else {
        prev[path] = { ...current };
      }
      prev = prev[path];
    } while (++i <= pathSize);
  };

  resolver(doc, pointer, replacer);
  return next;
}
export function compile<T extends {}, R extends unknown>(pointer: string) {
  return {
    get: (doc: T) => get<T, R>(doc, pointer),
    set: (doc: T, nextValue: any) => set<T>(doc, pointer, nextValue),
  };
}
function untilde(str: string): string {
  return str.replace(/\~1/g, "/").replace(/\~0/g, "~");
}
