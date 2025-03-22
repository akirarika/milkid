import { expect, test } from "vitest";
import { defineIdGenerator } from ".";

test("basic", () => {
  const idGenerator = defineIdGenerator({
    length: 24,
    timestamp: true,
    sequential: true,
  });

  const data = new Set();
  for (let index = 0; index < 16; index++) {
    const id = idGenerator.createId();
    data.add(id);
  }

  console.log(data);
  expect(data.size === 16).toBe(true);
});

test(
  "one million",
  () => {
    const idGenerator = defineIdGenerator({
      length: 16,
      timestamp: false,
      sequential: false,
    });

    console.time();
    const count = 1000000;
    const data = new Set();
    for (let i = 0; i < count; i++) {
      const id = idGenerator.createId();
      data.add(id);
    }
    console.timeEnd();

    expect(data.size === count).toBe(true);
  },
  { timeout: 10000 },
);
