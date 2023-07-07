import { compose } from "../src";

describe("compose", () => {
  it("should compose a json from entries", () => {
    const json = compose(
      [
        ["/a", 1],
        ["/b", 2],
        ["/c", 3],
      ],
      {}
    );
    expect(json).toEqual({
      a: 1,
      b: 2,
      c: 3,
    });
  });
  it("should compose a json from record", () => {
    const json = compose(
      {
        "/a": 1,
        "/b": 2,
        "/c": 3,
      },
      {}
    );
    expect(json).toEqual({
      a: 1,
      b: 2,
      c: 3,
    });
  });
  it("should compose a json from entries with initial", () => {
    const json = compose(
      [
        ["/a", 1],
        ["/b", 2],
        ["/c", 3],
      ],
      {
        d: 4,
      }
    );
    expect(json).toEqual({
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    });
  });
  it("should compose a json from record with initial", () => {
    const json = compose(
      {
        "/a": 1,
        "/b": 2,
        "/c": 3,
      },
      {
        d: 4,
      }
    );
    expect(json).toEqual({
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    });
  });
  it("should compose a json, nested", () => {
    const json = compose(
      {
        "/a/b/c": 1,
        "/a/b/d": 2,
        "/a/b/e": 3,
      },
      {}
    );
    expect(json).toEqual({
      a: {
        b: {
          c: 1,
          d: 2,
          e: 3,
        },
      },
    });
  });
});
