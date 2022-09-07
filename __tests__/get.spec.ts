import { get } from "../src";

describe("Getter", () => {
  // For example, given the JSON document
  const json = {
    foo: ["bar", "baz"],
    "": 0,
    "a/b": 1,
    "c%d": 2,
    "e^f": 3,
    "g|h": 4,
    "i\\j": 5,
    'k"l': 6,
    " ": 7,
    "m~n": 8,
  };
  it("JSON String Representation", () => {
    //   The following JSON strings evaluate to the accompanying values:
    expect(get(json, "")).toBe(json); // the whole document
    expect(get(json, "/foo")).toStrictEqual(["bar", "baz"]);
    expect(get(json, "/foo/0")).toBe("bar");
    expect(get(json, "/")).toBe(0);
    expect(get(json, "/a~1b")).toBe(1);
    expect(get(json, "/c%d")).toBe(2);
    expect(get(json, "/e^f")).toBe(3);
    expect(get(json, "/g|h")).toBe(4);
    expect(get(json, "/i\\j")).toBe(5);
    expect(get(json, '/k"l')).toBe(6);
    expect(get(json, "/ ")).toBe(7);
    expect(get(json, "/m~0n")).toBe(8);
  });
  it("URI Fragment Identifier Representation", () => {
    // A JSON Pointer can be represented in a URI fragment identifier by
    // encoding it into octets using UTF-8 [RFC3629], while percent-encoding
    // those characters not allowed by the fragment rule in [RFC3986].
    // Note that a given media type needs to specify JSON Pointer as its
    // fragment identifier syntax explicitly (usually, in its registration
    // [RFC6838]).  That is, just because a document is JSON does not imply
    // that JSON Pointer can be used as its fragment identifier syntax.  In
    // particular, the fragment identifier syntax for application/json is
    // not JSON Pointer.
    expect(get(json, "#")).toBe(json); // the whole document
    expect(get(json, "#/foo")).toStrictEqual(["bar", "baz"]);
    expect(get(json, "#/foo/0")).toBe("bar");
    expect(get(json, "#/")).toBe(0);
    expect(get(json, "#/a~1b")).toBe(1);
    expect(get(json, "#/c%25d")).toBe(2);
    expect(get(json, "#/e%5Ef")).toBe(3);
    expect(get(json, "#/g%7Ch")).toBe(4);
    expect(get(json, "#/i%5Cj")).toBe(5);
    expect(get(json, "#/k%22l")).toBe(6);
    expect(get(json, "#/%20")).toBe(7);
    expect(get(json, "#/m~0n")).toBe(8);
  });
});
