#! /usr/bin/env node

/**
 *
 * #### 3.1. CLI Reference
 *
 * If you have installed the tool only locally (and not globaly), you can reproduce the examples changing `javadoc` by `node_modules/.bin/javadoc`.
 *
 *
 *
 * @name `{javadoc CLI}`
 * @type `{Help}`
 * @help
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
 */
const args = require("yargs")
	.version("1.0.0")
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
