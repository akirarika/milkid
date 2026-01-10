import { expect, test, vi } from "vitest";
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

test("A", async() => {
  const now = 176700000
  vi.setSystemTime(now);
  const idGenerator = defineIdGenerator({
    length: 24,
    timestamp: true,
    sequential: true,
  });
  console.log(now)
  const id = idGenerator.createId();
  console.log(id)
  const id1 = idGenerator.getIdTimestamp(id)
  console.log(id1)
  expect(id1).toBe(now)
})

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
