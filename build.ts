import * as fs from "fs";
import * as path from "path";
import { build, BuildOptions } from "esbuild";

import { sassPlugin } from "./libs/esbuild-plugin-sass";

const NODE_ENV = process.env.NODE_ENV ?? "development";
const isDev = NODE_ENV === "development";
const watch = process.env.WATCH === "true" || false;
const metafile = process.env.META_FILE === "ture" || false;

const define: BuildOptions["define"] = {
  "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
};

build({
  define,
  entryPoints: [path.resolve(__dirname, "src/index.tsx")],
  bundle: true,
  outfile: "public/index.js",
  minify: !!process.env.MIN || !isDev,
  sourcemap: true,
  platform: "browser",
  treeShaking: true,
  watch: watch && {
    onRebuild(err, result) {
      console.log(`${err}`);
    },
  },
  plugins: [
    sassPlugin({
      quietDeps: true,
    }),
  ],
  loader: {
    ".sass": "css",
    ".png": "file",
    ".woff": "file",
    ".svg": "file",
  },
})
  .then((result) => {
    console.log();
    console.log("/////////////////////// END");
  })
  .catch(() => {
    process.exit(1);
  });
