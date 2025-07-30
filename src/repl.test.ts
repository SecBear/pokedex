import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";
import { Cache } from "./pokecache";

describe.each([
  {
    input: "  hello world  ",
    expected: ["hello", "world"],
  },
  // TODO add more test cases
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected ${expected}`, () => {
    const actual = cleanInput(input);

    // The 'expect' and 'toHaveLength' functions are from vitest
    // they will fail the test if the condition is not met
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      // likewise, the "toBe" function will fail the test if
      // the condition is not met
      expect(actual[i]).toBe(expected[i]);
    }
  });
});

test.concurrent.each([
  {
    key: "https://example.com ",
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
])("Test caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval + 100));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});

// could add test cases for testing location / locations caching
