import clear from "rollup-plugin-clear";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import screeps from "rollup-plugin-screeps";


export default {
  input: "src/main.js",
  output: {
    file: "dist/main.js",
    format: "cjs",
    exports: "named",
    //preserveModules: true, // Keep directory structure and files
  },
  plugins: [
    clear({ targets: ["dist"] }),
    resolve({ rootDir: "src" }),
    commonjs(),
    resolve({ rootDir: "./src"}),
    screeps({ configFile: "./screeps.json"})
  ]
}