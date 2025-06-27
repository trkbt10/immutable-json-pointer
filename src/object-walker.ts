import { compile } from ".";
export class Circular<T> {
  constructor(public value: T) {}
}
type WalkerContainer = {
  callback: (paths: string, object: any) => any;
  options: {
    escape?: boolean;
  };
  memo: WeakMap<object, any>;
  results: any[];
};
export const objectWalker = <T extends any>(
  source: T,
  callback: WalkerContainer["callback"],
  options: WalkerContainer["options"]
) => {
  const container: WalkerContainer = {
    callback,
    options,
    memo: new WeakMap(),
    results: [],
  };
  walker(container, source, []);
  return container.results;
};

const walker = (
  container: WalkerContainer,
  obj: any,
  paths: (string | number)[]
) => {
  const isCircular = container.memo.has(obj);
  const compiledPath = compile(
    paths,
    container.options.escape ? "uri" : undefined
  );
  container.results.push(
    container.callback(compiledPath, isCircular ? new Circular(obj) : obj)
  );

  if (isCircular) {
    return;
  }
  if (Array.isArray(obj)) {
    container.memo.set(obj, paths);
    for (let i = 0; i < obj.length; i++) {
      walker(container, obj[i], [...paths, i]);
    }
    return;
  }
  if (typeof obj === "object" && obj !== null) {
    container.memo.set(obj, paths);
    for (const key in obj) {
      const value = obj[key];
      const nextPaths = [...paths, key];
      walker(container, value, nextPaths);
    }
  }
};
