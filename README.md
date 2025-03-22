English | [中文](./README_ZH.md)

Milkid is a highly customizable distributed unique ID generator written in TypeScript.

## Preface

JavaScript has many excellent distributed unique ID generators, but they mainly target specific scenarios and cannot be freely customized.

• For database primary keys, we need lexicographically ordered IDs to avoid database fragmentation  
• For distributed systems, we need IDs to be as uniform as possible to prevent hotspots  
• For news websites, we want completely random IDs in URLs to prevent crawler traversal  
• For short URL services, we need IDs in URLs to be as short as possible

Milkid allows high customization to meet different ID requirements across scenarios.

## See Also

[nanoid](https://github.com/ai/nanoid) - A tiny, fast unique string ID generator.  
[ulid](https://github.com/ulid/javascript) - A lexicographically sortable unique string ID generator.  
[cuid2](https://github.com/paralleldrive/cuid2) - A more security-considerate unique ID generator.

## Other Languages

[Python](https://github.com/kawaiior/milkid-for-python) - kawaiior

## Installation

```bash
npm i milkid
```

## Usage

```ts
const idGenerator = defineIdGenerator({
  length: 24,
  timestamp: true,
  sequential: true,
});

console.log(idGenerator.createId()); // 0UgBwxhJyuWVA9o1YFVxAtaL
```

## Timestamp

When using generated IDs as database primary keys, it's best to have incrementally ordered IDs. Using unordered generators like UUID could cause frequent splitting and merging of database index leaf nodes.

Placing millisecond-level timestamps at the beginning of IDs naturally ensures ordering. The millisecond precision also effectively reduces collision probability - no duplicates will occur unless two IDs are generated within the same millisecond.

Enable this feature by setting the `timestamp` option to `true`.

## Monotonic Increment

While we can't strictly guarantee insertion order like database auto-increment keys, we can approximate it. With timestamps enabled, we achieve intra-millisecond ordering. Setting `sequential: true` adds auto-increment within the same millisecond and process to further ensure sequence.

## Collision Probability

By default, Milkid generates 24-character IDs. With timestamps enabled, there's a 1% probability of collision only after generating 243 trillion IDs within the same millisecond.

## Options

| Option       | Default | Description                                                                                  |
| ------------ | ------- | -------------------------------------------------------------------------------------------- |
| `length`     | `24`    | Length of the generated ID                                                                   |
| `timestamp`  | `-`     | Whether to prepend timestamp to ID (helps avoid database fragmentation)                      |
| `sequential` | `-`     | Enables intra-millisecond auto-increment for ordered IDs (critical for database performance) |

## Use Cases

Here are recommended configurations for common scenarios:

### Database Primary Key

Enable both `timestamp` and `sequential` to ensure ordered IDs and prevent fragmentation.

Note ⚠️ Milkid uses case-sensitive characters. Ensure the database uses case-sensitive collation (e.g., `utf8mb4_bin`) for primary keys to maintain sort order during bulk inserts.

```ts
const idGenerator = defineIdGenerator({
  length: 24,
  timestamp: true,
  sequential: true,
});
```

### Distributed Systems

Disable both options to ensure uniform ID distribution and avoid hotspots.

```ts
const idGenerator = defineIdGenerator({
  length: 24,
  timestamp: false,
  sequential: false,
});
```

### Short URLs

Minimize ID length for compact URLs:

```ts
const idGenerator = defineIdGenerator({
  length: 6,
  timestamp: false,
  sequential: false,
});
```
