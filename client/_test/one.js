import { expect, test } from "@jest/globals";
import { sum } from "../utils/index";

test("one", () => {
  expect(sum(2, 2)).toBe(4);
});
