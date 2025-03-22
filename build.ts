import { $ } from "bun";

await Bun.build({
  entrypoints: ["index.ts"],
  outdir: "dist",
  target: "browser",
  format: "esm",
  splitting: true,
  sourcemap: "inline",
  minify: true,
});

try {
  await $`bun node_modules/typescript/bin/tsc index.ts --declaration --emitDeclarationOnly --outDir ./dist --module nodenext --moduleResolution nodenext --allowImportingTsExtensions`.quiet();
} catch (error) {}

await Bun.write("dist/LICENSE", await Bun.file("LICENSE").text());
await Bun.write(
  "dist/package.json",
  JSON.stringify({
    name: "milkid",
    version: await prompt("Version: "),
    type: "module",
    module: "./index.js",
    types: "./index.d.ts",
    dependencies: {},
  }),
);
