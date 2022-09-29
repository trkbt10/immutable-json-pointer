import { set } from "../src";

describe("Setter", () => {
  it("Basic", () => {
    const source = {
      ref: {},
      string: "STRING",
    };
    const changed = set(source, "/string", "next");
    expect(source === changed).toBeFalsy();
    expect(changed.string === source.string).toBeFalsy();
    expect(changed.ref === source.ref).toBeTruthy();
    const json = {
      foo: ["bar", "baz"],
      hoge: {
        fuga: "piyo",
      },
    };
    const newJson = set(json, "/foo/-", "boss");

    expect(newJson === json).toBeFalsy();
    expect(newJson.hoge === json.hoge).toBeTruthy();
    expect(newJson.foo === json.foo).toBeFalsy();
    expect(newJson.foo[2]).toBe("boss");
  });
  it("Array", () => {
    const source = {
      ref: {},
      items: [0, 1, 2, 3],
    };
    const changed = set(source, "/items/1", "one");
    expect(source === changed).toBeFalsy();
    expect(changed.items[1] === source.items[1]).toBeFalsy();
    expect(changed.ref === source.ref).toBeTruthy();
  });
  it("Modifying nested objects", () => {
    const source = {
      object: {
        ref: {},
        item: {
          string: "STRING",
        },
      },
    };
    const changed = set(source, "/object/item/string", "next");
    expect(source === changed).toBeFalsy();
    expect(source.object === changed.object).toBeFalsy();
    expect(source.object.ref === changed.object.ref).toBeTruthy();
    expect(source.object.item === changed.object.item).toBeFalsy();
    expect(
      changed.object.item.string === source.object.item.string
    ).toBeFalsy();
  });
  it("Modifying nested array", () => {
    const source = {
      parent: {
        ref: {},
        children: [
          {},
          {
            child: {
              name: "john",
            },
          },
        ],
      },
    };
    const changed = set(source, "/parent/children/1/child/name", "next");
    expect(source === changed).toBeFalsy();
    expect(source.parent === changed.parent).toBeFalsy();
    expect(source.parent.ref === changed.parent.ref).toBeTruthy();
    expect(source.parent.children === changed.parent.children).toBeFalsy();
    expect(
      source.parent.children[0] === changed.parent.children[0]
    ).toBeTruthy();
    expect(
      source.parent.children[1] === changed.parent.children[1]
    ).toBeFalsy();
    expect(source.parent.children[1].child).toBeDefined();
    expect(
      source.parent.children[1].child?.name ===
        changed.parent.children[1].child?.name
    ).toBeFalsy();
  });
  it("Changing deep paths data", () => {
    const source = {};
    const changed = set(source, "/root/children/0/child/name", "next");
    expect(changed).toEqual({
      root: {
        children: {
          0: {
            child: {
              name: "next",
            },
          },
        },
      },
    });
  });
});
