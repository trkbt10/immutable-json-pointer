import { read } from "../src";

describe("Read", () => {
  // For example, given the JSON document
  const json = {
    foo: ["bar", "baz"],
  };
  it("JSON String Representation", () => {
    //   The following JSON strings evaluate to the accompanying values:
    expect(read(json, "")).toBe(json); // the whole document
    expect(read(json, "/foo")).toStrictEqual(["bar", "baz"]);
    expect(read(json, "/unknown")).toBe(undefined);
  });
});
