/**
 * # javadoc
 *
 * 
 * ![](https://img.shields.io/badge/javadoc-v1.0.0-green.svg) ![](https://img.shields.io/badge/tests-not%20yet-red.svg) ![](https://img.shields.io/badge/coverage-none%25-red.svg)
 * 
 * 
 * Simple tool to generate JSON or Markdown text from Javadoc comments.
 *
 * ## 1. Installation
 *
 * `~$ npm install -s javadoc`
 * 
 * To use the CLI anywhere, install it globally:
 *
 * `~$ npm install -g javadoc`
 * 
 *
 * ## 2. Usage
 * 
 * #### 2.1. Usage of the CLI:
 *
 * The CLI tool accepts 4 parameters, which by default value:
 *
 * ```bash
 *    --include "**/*.js"
 *    --exclude "**/node_modules/**"
 *    --output (omitted, undefined)
 *    --format "json"
 * ```
 *
 *
 * ##### Example 1: in JSON format
 *
 * ```bash
 * ~$ javadoc 
 *     --include "**/*.js" "**/*.ts" 
 *     --exclude "**/node_modules/**" "**/bower_components/**" 
 *     --output "docs/docs.json" 
 *     --format "json"
 * ```
 * 
 * Or the same:
 * 
 * ```bash
 * ~$ javadoc 
 *     -i "**/*.js" "**/*.ts" 
 *     -e "**/node_modules/**" "**/bower_components/**" 
 *     -o "docs/docs.json" 
 *     -f "json"
 * ```
 *
 * The above examples will:
 * 
 * - Include any JavaScript and TypeScript files found under our current directory.
 *
 * - Exclude the NPM and Bower modules typical folders.
 *
 * - Format the results into a JSON file.
 *
 * - Create a file at `docs/docs.json` and dump into it the results. Take into account that if the folder is not created (and the same with all the middle folders we specify), the tool will create it for us too.
 *
 *
 * ##### Example 2: in Markdown format
 *
 * If we wanted to have the same previous example, but to output a `README.md` Markdown file, we can (in one line):
 *
 * ```bash
 * ~$ javadoc 
 *     --include "**/*.js" "**/*.ts" 
 *     --exclude "**/node_modules/**" "**/bower_components/**" 
 *     --output "README.md" 
 *     --format "markdown"
 * ```
 *
 *
 *
 * ##### Example 3: output to console
 *
 * To output the results by console, you only need to omit the `--output` (or `-o`) parameter.
 *
 * `~$ javadoc`
 * 
 * Which would be the same as typing:
 * 
 * ```bash
 * ~$ javadoc
 *    --include "**/*.js"
 *    --exclude "**/node_modules/**"
 *    --format "json"
 * ```
 *
 * Omitting the `output` parameter implies to print the results by console instead of dumping them into a file. 
 *
 *
 * #### 2.2. Usage of the API:
 *
 * To use the API, you only can call the `generate(Object:options)` method, 
 * and pass to it the same parameters we use in the CLI.
 *
 * These codes will reproduce the same behaviour of the previous (CLI) examples.
 *
 *
 * ##### Example 1: in JSON format
 *
 *
 * ```js
 * require("javadoc").generate({
 *   include: ["**/*.js", "**/*.ts"],
 *   exclude: ["**/node_modules/**", "**/bower_components/**"],
 *   output: "docs/docs.json",
 *   format: "json"
 * });
 * ```
 *
 * ##### Example 2: in Markdown format
 *
 *
 * ```js
 * require("javadoc").generate({
 *   include: ["**/*.js", "**/*.ts"],
 *   exclude: ["**/node_modules/**", "**/bower_components/**"],
 *   output: "README.md",
 *   format: "markdown"
 * });
 * ```
 *
 * ## 3. Reference
 *
 * The `javadoc` tool is available as `CLI` and as `API`.
 *
 *
 */