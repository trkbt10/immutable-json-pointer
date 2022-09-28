import { transform } from "../src";

describe("transform", () => {
  it("Basic", () => {
    const source = { a: 1 };
    expect(transform(source, "/a", String)).toEqual({ a: "1" });
    expect(transform(source, "/a", (prev) => prev === 1)).toEqual({
      a: true,
    });
    expect(source).toEqual({ a: 1 });
  });
});
