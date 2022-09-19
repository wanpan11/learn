import { expect, test } from "@jest/globals";
import { sum } from "../utils/index";

test("two", () => {
  expect(sum(1, 1)).toBe(2);
});
