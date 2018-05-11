#! /usr/bin/env node

/**
 *
 *
 * ## 2. CLI usage
 *
 *
 * #### 2.1. CLI examples
 *
 *
 * *Note: if you have installed the tool only locally (and not globaly), you can reproduce the examples changing `javadoc` by `node_modules/.bin/javadoc`.*
 *
 * 
 * ##### Example 1: in JSON format
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
 * #### 2.2. CLI reference
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
	.version("1.0.2")
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
