import { dict } from "../src";

describe("dict", () => {
  it("should return a dict", () => {
    expect(
      dict({
        hello: { bla: "example" },
      })
    ).toEqual({ "/hello/bla": "example" });
  });
  it("should return a dict", () => {
    const result = dict({
      a: { a0: "a0", a1: "a1" },
      b: { b0: "b0", obj: { a: 1 } },
      c: { c0: "c0", arr: ["a", "b", "c"] },
    });
    expect(result).toEqual({
      "/a/a0": "a0",
      "/a/a1": "a1",
      "/b/b0": "b0",
      "/b/obj/a": 1,
      "/c/c0": "c0",
      "/c/arr/0": "a",
      "/c/arr/1": "b",
      "/c/arr/2": "c",
    });
  });
});
