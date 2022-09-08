import { compile } from "../src";

describe("compile", () => {
  it("Basic", () => {
    expect(compile(["a", "b", "c"])).toBe("/a/b/c");
  });
  it("With number", () => {
    expect(compile(["a", 0, "c"])).toBe("/a/0/c");
  });
  it("With tilde", () => {
    expect(compile(["a", "~", "c"])).toBe("/a/~0/c");
  });
  it("With slash", () => {
    expect(compile(["a", "/", "c"])).toBe("/a/~1/c");
  });
});
