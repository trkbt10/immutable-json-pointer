# immutable-json-pointer

JSON Pointer ([RFC6901](https://www.rfc-editor.org/rfc/rfc6901)) implementation for Node.js

Mutate a copy of data without changing the original source.

## Install

```bash
npm install git@github.com:trkbt10/immutable-json-pointer.git
```

## Usage

### Get

```typescript
import { get } from "immutable-json-pointer";
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
```

### Set

```typescript
import { set } from "immutable-json-pointer";
// For example, given the JSON document
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
```
