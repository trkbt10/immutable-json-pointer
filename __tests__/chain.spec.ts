import { chain, set } from "../src";

describe("chain", () => {
  it("should chain operations", () => {
    const doc = {
      foo: {
        bar: {
          baz: 1,
        },
      },
    };
    const operation = chain<typeof doc>(
      (doc) => set(doc, "/foo/bar/baz", 2),
      (doc) => set(doc, "/foo/bar/baz", 3),
      (doc) => set(doc, "/foo/bar/baz", 4)
    );
    const result = operation(doc);
    expect(result).toEqual({
      foo: {
        bar: {
          baz: 4,
        },
      },
    });
  });
});
