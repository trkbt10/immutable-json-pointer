import { has } from "../src";

describe("has", () => {
  it("Basic", () => {
    expect(has({ a: 1 }, "/a")).toBe(true);
    expect(has({ a: 1 }, "/n")).toBeFalsy();
    expect(has({ arr: [0, 1] }, "/arr/1")).toBeTruthy();
    expect(has({ arr: [0, 1] }, "/arr/2")).toBeFalsy();
  });
});
