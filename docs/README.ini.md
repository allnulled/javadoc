/**
 * # javadoc
 *
 * 
 * ![](https://img.shields.io/badge/javadoc-v1.0.0-green.svg) ![](https://img.shields.io/badge/tests-passing-green.svg) ![](https://img.shields.io/badge/coverage-none%25-green.svg)
 * 
 * 
 * Simple tool to generate JSON or Markdown text from Javadoc comments.
 *
 * ## 1. Installation
 *
 * ~$ `npm install -s javadoc`
 * 
 * If you want the CLI tool easily available, install it globally:
 *
 * ~$ `npm install -g javadoc`
 * 
 *
 * ## 2. Usage
 * 
 * #### 2.1. Usage of the CLI:
 *
 * ##### Example 1: in JSON format
 *
 * ~$ `javadoc --include "**/*.js" "**/*.ts" --exclude "**/node_modules/**" "**/bower_components/**" --output "docs/docs.json" --format "json"`
 * 
 * Or the same:
 * 
 * ~$ `javadoc -i "**/*.js" "**/*.ts" -e "**/node_modules/**" "**/bower_components/**" -o "docs/docs.json" -f "json"`
 *
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
 * If we wanted to have the same previous example, but to output a `README.md` Markdown file, we can:
 *
 * ~$ `javadoc --include "**/*.js" "**/*.ts" --exclude "**/node_modules/**" "**/bower_components/**" --output "README.md" --format "markdown"`
 *
 *
 *
 * ##### Example 3: output to console
 *
 * To output the results by console, you only need to omit the `--output` (or `-o`) parameter.
 *
 * ~$ `javadoc`
 *
 * As the default value for the `include` is `["**/*.js"]`, the `exclude` is `["**/node_modules/**"]`, and the `output` is `undefined`, this command will try to find all the JavaScript files under the current directory, will avoid NPM modules typical folder, and will print the results by console, in JSON format.
 *
 * To output the results by console, we only need to omit the value for the `output` parameter.
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
 *   format: "json",
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
 *   format: "markdown",
 * });
 * ```
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * ## 3. Reference
 *
 * The `javadoc` tool is available as `CLI` and as `API`.
 *
 *
 *
 *
 *
 */