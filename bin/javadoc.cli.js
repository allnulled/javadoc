#! /usr/bin/env node

const args = require("yargs")
	.version("1.0.6")
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
