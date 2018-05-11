#! /usr/bin/env node

/**
 *
 *
 * ## 3. CLI usage
 *
 *
 * #### 3.1. CLI examples
 *
 *
 * ***Note**: if you have installed the tool only locally (and not globaly), you can reproduce the examples changing `javadoc` by `node_modules/.bin/javadoc`.*
 *
 * 
 * ##### Example 1: in JSON format
 *
 * This example taskes all `*.js` and `*.ts` files under the current directory, excluding the ones found under the tipycal NPM and Bower modules folders, extracts the Javadoc comments as JSON and creates (if not exists already) the `docs` folder, and writes the results at `docs.json`:
 *
 * ```bash
 * ~$ javadoc 
 *     --include "** /*.js" "** /*.ts" 
 *     --exclude "** /node_modules/**" "** /bower_components/**" 
 *     --output "docs/docs.json" 
 *     --format "json"
 * ```
 * 
 * Or the same:
 * 
 * ```bash
 * ~$ javadoc 
 *     -i "** /*.js" "** /*.ts" 
 *     -e "** /node_modules/**" "** /bower_components/**" 
 *     -o "docs/docs.json" 
 *     -f "json"
 * ```
 *
 *
 * ##### Example 2: in Markdown format
 *
 * If we wanted to have the same previous example, but to output a `README.md` Markdown file, we can (in one line):
 *
 * ```bash
 * ~$ javadoc 
 *     --include "** /*.js" "** /*.ts" 
 *     --exclude "** /node_modules/**" "** /bower_components/**" 
 *     --output "README.md" 
 *     --format "markdown"
 * ```
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
 *    --include "** /*.js"
 *    --exclude "** /node_modules/**"
 *    --format "json"
 * ```
 *
 * Omitting the `output` parameter implies to print the results by console instead of dumping them into a file. 
 *
 *
 * 
 * #### 3.2. CLI reference
 * 
 * ```
 * Options:
 *  --help         Show help                                                                  [boolean]
 *  --version      Show version number                                                        [boolean]
 *  --include, -i  Include a new glob pattern (as input).               [array] [default: ["** /*.js"]]
 *  --exclude, -e  Exclude a new glob pattern (as input). [array] [default: ["** /node_modules/** /*"]]
 *  --format, -f   Format of the output. Options: 'markdown' | 'json'.       [string] [default: "json"]
 *  --output, -o   File to output the generated contents.                                      [string]
 * ```
 *
 *
 */
const args = require("yargs")
	.version("1.0.3")
	.option("include", {
		type: "array",
		alias: "i",
		default: ["**/*.js"],
		describe: "Include a new glob pattern (as input).",
		help: "help"
	})
	.option("exclude", {
		type: "array",
		alias: "e",
		default: ["**/node_modules/**/*"],
		describe: "Exclude a new glob pattern (as input).",
		help: "help"
	})
	.option("format", {
		type: "string",
		alias: "f",
		default: "json",
		describe: "Format of the output. Options: 'markdown' | 'json'.",
		help: "help"
	})
	.option("output", {
		type: "string",
		alias: "o",
		demmandOption: true,
		describe: "File to output the generated contents.",
		help: "help"
	}).argv;

require(__dirname + "/../src/javadoc.js").generate(args);
