import { parse } from "../src";

describe("Parse", () => {
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
    expect(parse("")).toEqual([""]); // the whole document
    expect(parse("/foo")).toEqual(["", "foo"]);
    expect(parse("/foo/0")).toEqual(["", "foo", "0"]);
    expect(parse("/")).toEqual(["", ""]);
    expect(parse("/a~1b")).toEqual(["", "a/b"]);
    expect(parse("/c%d")).toEqual(["", "c%d"]);
    expect(parse("/e^f")).toEqual(["", "e^f"]);
    expect(parse("/g|h")).toEqual(["", "g|h"]);
    expect(parse("/i\\j")).toEqual(["", "i\\j"]);
    expect(parse('/k"l')).toEqual(["", 'k"l']);
    expect(parse("/ ")).toEqual(["", " "]);
    expect(parse("/m~0n")).toEqual(["", "m~n"]);
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
    expect(parse("#")).toEqual([""]); // the whole document
    expect(parse("#/foo")).toEqual(["", "foo"]);
    expect(parse("#/foo/0")).toEqual(["", "foo", "0"]);
    expect(parse("#/")).toEqual(["", ""]);
    expect(parse("#/a~1b")).toEqual(["", "a/b"]);
    expect(parse("#/c%25d")).toEqual(["", "c%d"]);
    expect(parse("#/e%5Ef")).toEqual(["", "e^f"]);
    expect(parse("#/g%7Ch")).toEqual(["", "g|h"]);
    expect(parse("#/i%5Cj")).toEqual(["", "i\\j"]);
    expect(parse("#/k%22l")).toEqual(["", 'k"l']);
    expect(parse("#/ ")).toEqual(["", " "]);
    expect(parse("#/m~0n")).toEqual(["", "m~n"]);
  });
});
