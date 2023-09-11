import { remove } from "../src";

describe("Remove", () => {
  // For example, given the JSON document
  it("Basic", () => {
    const json = {
      foo: [0, 1, 2, 3, 4, 5],
      hoge: "fuga",
    };
    expect(remove(json, "/foo/0")).toStrictEqual({
      foo: [1, 2, 3, 4, 5],
      hoge: "fuga",
    });
    expect(remove(json, "/foo/1")).toStrictEqual({
      foo: [0, 2, 3, 4, 5],
      hoge: "fuga",
    });
    expect(remove(json, "/foo")).toEqual({
      hoge: "fuga",
    });
    expect(remove(json, "/hoge")).toEqual({
      foo: [0, 1, 2, 3, 4, 5],
    });
    expect(json).toStrictEqual({
      foo: [0, 1, 2, 3, 4, 5],
      hoge: "fuga",
    });
  });
  it("actual", () => {
    const deepObject = {
      properties: {
        columns: {
          items: {
            properties: {
              buttons: {
                items: {
                  properties: {
                    exists: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
    expect(
      remove(
        deepObject,
        "/properties/columns/items/properties/buttons/items/properties/__missing__"
      )
    ).toStrictEqual(deepObject);
    expect(
      remove(
        deepObject,
        "/properties/columns/items/properties/buttons/items/properties/exists"
      )
    ).toStrictEqual({
      properties: {
        columns: {
          items: {
            properties: {
              buttons: {
                items: {
                  properties: {},
                },
              },
            },
          },
        },
      },
    });
  });
});
