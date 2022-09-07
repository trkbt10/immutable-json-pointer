import { toPointer } from "../src";

describe("toPointer", () => {
  it("Basic", () => {
    expect(toPointer(["a", "b", "c"])).toBe("/a/b/c");
  });
  it("With number", () => {
    expect(toPointer(["a", 0, "c"])).toBe("/a/0/c");
  });
  it("With tilde", () => {
    expect(toPointer(["a", "~", "c"])).toBe("/a/~0/c");
  });
  it("With slash", () => {
    expect(toPointer(["a", "/", "c"])).toBe("/a/~1/c");
  });
});
