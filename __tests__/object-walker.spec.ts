import { objectWalker } from "../src/object-walker";

describe("objectWalker", () => {
  it("Basic", () => {
    const recursive: { [key: string]: any } = {
      a: 1,
      b: 2,
    };
    const root = {
      name: "root",
      child: recursive,
    };
    recursive.root = root;
    const results = objectWalker(
      root,
      (paths, object) => {
        return paths;
      },
      {
        escape: true,
      }
    );
  });
});
