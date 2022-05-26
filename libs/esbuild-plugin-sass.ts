import { Plugin } from "esbuild";
import sass from "sass";

export const sassPlugin = (options?: any): Plugin => ({
  name: 'esbuild-plugin-sass',
  setup(build) {
   build.onLoad({ filter: /\.s[ac]ss$/ }, ({ path }) => {
     return new Promise((resolve) => {
      sass.render({ ...options, file: path }, (err,result) => {
        resolve({
          contents: result?.css,
          loader: 'css',
          errors: err ? [{ text: err.message }] : undefined
        })
       })
     })
   })
  }
})
