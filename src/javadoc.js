/**
 * ## 4. API usage
 *
 * 
 * #### 4.1. API examples
 * 
 *
 * ##### Example 1: in JSON format
 *
 *
 * ```js
 * require("javadoc").generate({
 *   include: ["** /*.js", "** /*.ts"],
 *   exclude: ["** /node_modules/**", "** /bower_components/**"],
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
 *   include: ["** /*.js", "** /*.ts"],
 *   exclude: ["** /node_modules/**", "** /bower_components/**"],
 *   output: "README.md",
 *   format: "markdown"
 * });
 * ```
 *
 * 
 */
module.exports = {
		/**
		 * 
		 * 
		 * 
		 * #### 4.2. API reference
		 * 
		 * -------------------
		 *
		 * ### **`javadoc`**
		 * 
		 * @type *`{Object}`*
		 * @description This object holds the whole API of this module, which has only 1 method.
		 * 
		 * @example 
		 * 
		 * ```js
		 * var javadoc = require("javadoc");
		 * ```
		 * 
		 * -------------------
		 */

		/**
		 * ### **`javadoc.generate(options)`**
		 * 
		 * @type *`{Function}`*
		 * @parameter *`{Object} options`*. By default, its value is:
		 * 
		 * ```js
		 * {
		 *   include: ["** /*.js"], // will pick all the files ended with *.js under the current path.
		 *   exclude: ["** /node_modules/** /*"], // will exclude any 'node_modules' folder.
		 *   output: undefined, // will print the output by console, instead of dumping it into a file
		 *   format: "json" // will format the output as a JSON object.
		 * }
		 * ```
		 * 
		 * If you set any value for any of these properties, that property will be overriden. All of them are optional.
		 * 
		 *   - `include`: `{Array|String}` it indicates the [glob patterns](https://www.npmjs.com/package/globule) for the included files.
		 *
		 *   - `exclude`: `{Array|String}` it indicates the [glob patterns](https://www.npmjs.com/package/globule) for the excluded files.
		 *
		 *   - `output`: `{String}` it indicates the file into which dump the results. If not provided, the results will be prompted by console.
		 *
		 *   - `format`: `{String}` it indicates the desired format of the output. Options: `'json'` (default) | `'markdown'`
		 * 
		 * @returns `{String}` Depending on the format, it will output a JSON or a Markdown text.
		 * @description This method will take the files we want to include, the files we want to exclude, the file into which dump the results, and the format we want for them (`'json'` or `'markdown'`). 
		 * Then, it will retrieve the files matched (included) and not excluded. 
		 * Then, it will retrieve the Javadoc comments found in them. 
		 * Then, it will format the results (as JSON or Markdown). 
		 * And finally, it will write the results into the specified file (output), or if we do not specify the output, it will print the result by console.
		 * 
		 * @example
		 * 
		 * ```js
		 * javadoc.generate({
		 *    include: ["** /*.js"],
		 *    exclude: ["**node_modules**"],
		 *    output: undefined,
		 *    format: "json"
		 * });
		 * ```
		 * -------------------
		 * 
		 * 
		 * #### 4.3. Special notes about Markdown format
		 * 
		 * 
		 * As the `--format markdown` option (in CLI or API) expects that we embed Markdwon code in JavaScript multiline comments * /&#42;&#42;* ... *&#42;/*,
		 * we need to know a few things.
		 * 
		 *
		 *  1. All the lines inside the Javadoc comments must start with *&#42;* (even the ones that embed code). Otherwise, they will not be considered.
		 *
		 *
		 *  2. The first *&#42;* of each line of the Javadoc comment will be removed.
		 *
		 *
		 *  3. When the format selected is *markdown*, the name of the parameters will be in printed in bold, capitalized and without the first *@*.
		 * 
		 * 
		 *  4. The *&#42;/* string can be commonly required, and it can be simulated puting a space in the middle: *&#42; /*. Consider also to use the HTML entity in order to escape special characters.
		 *
		 *
		 *  5. Tip: you can take a look how this project generates the documentation (`~$ npm run docs`) to see how to document a project .
		 * 
		 */
		generate: function generate(optionsArg) {
				var options = undefined;

				function normalizeOptions() {
						// Normalize arguments:
						options = Object.assign({
								include: ["**/*.js"],
								exclude: ["**/node_modules/**/*"],
								output: undefined,
								format: "json"
						}, optionsArg);
						hasOutput = options.output;
						// Negate all the excluded patterns:
						options.exclude = [].concat(options.exclude).map(function(item) {
								if (item.charAt(0) === ("!")) {
										return item;
								}
								return "!" + item;
						});
				};

				function extractJavadocData(text) {
						const REGEX_JAVADOC = /\/\*\*[^\n]*\n([\t ]*\*[\t ]*[^\n]*\n)+[\t ]*\*\//g;
						const REGEX_BEGINING_AND_ENDING = /^\/\*\*[\t ]*\n|\n[\t ]*\*+\/$/g;
						const REGEX_JAVADOC_LINE_BEGINING = /\n[\t ]*\*[\t ]?/g;
						const REGEX_JAVADOC_LINE_BEGINING_ATTRIBUTE = /^\@[a-zA-Z0-9\-\_\$]*/g;
						const REGEX_SPACES_EXTREMES = /^[\t\n ]*|[\t\n ]*$/g;
						var javadocComments = text.match(REGEX_JAVADOC);
						var javadocFileData = [];
						if (javadocComments) {
								javadocComments.forEach(function(javadocComment) {
										var javadocCommentClean = "\n" + javadocComment.replace(REGEX_BEGINING_AND_ENDING, "");
										var javadocLines = javadocCommentClean.split(REGEX_JAVADOC_LINE_BEGINING);
										var javadocCommentData = [];
										var attributeMatch = "default";
										var lastObject = {
												name: "default",
												text: ""
										};
										// __DBG__("JAVADOC", javadocLines);
										javadocLines.forEach(function(javadocLine) {
												var attrMatch = javadocLine.match(REGEX_JAVADOC_LINE_BEGINING_ATTRIBUTE);
												var isNewMatch = (!!attrMatch);
												if (isNewMatch) {
														attributeMatch = attrMatch[0];
												}
												// __DBG__("Javadoc line:", isNewMatch, attributeMatch, javadocLine);
												if (isNewMatch) {
														javadocCommentData.push(lastObject);
														lastObject = {
																name: attributeMatch,
																text: javadocLine.replace(REGEX_JAVADOC_LINE_BEGINING_ATTRIBUTE, "")
																		.replace(/^ /g, "")
																		.replace(/(\*)( )+(\/)/g, function(match) {
																				return match.substr(0, 1) + match.substr(1, match.length - 3) + match.substr(match.length - 1);
																		})
														};

												} else {
														lastObject.text += "\n" + javadocLine
																.replace(/^ /g, "")
																.replace(/(\*)( )+(\/)/g, function(match) {
																		return match.substr(0, 1) + match.substr(1, match.length - 3) + match.substr(match.length - 1);
																});
												}
										});
										javadocCommentData.push(lastObject);
										javadocFileData.push(javadocCommentData);
								});
						}
						return javadocFileData;
				};

				function __DBG__(msg) {
						/*
						return;
						var otherArgs = Array.prototype.slice.call(arguments);
						otherArgs.shift();
						console.log.apply(console, ["[DEBUGGING] " + msg].concat(otherArgs));
						//*/
				};

				function __LOG__(msg) {
						if (options.output === undefined) {
								return;
						}
						var otherArgs = Array.prototype.slice.call(arguments);
						otherArgs.shift();
						// Not needed right now, avoided for branch coverage:
						//if (typeof msg === "string") {
						console.log.apply(console, ["[javadoc] " + msg].concat(otherArgs));
						//}
						//else {
						//		console.log.apply(console, ["[javadoc]", msg].concat(otherArgs));
						//}
						//*/
				};

				function formatData(docComments) {
						const fs = require("fs");
						const path = require("path");
						const mkdirp = require('mkdirp');
						var data = undefined;
						if (options.format === "markdown") {
								data = "";
								for (var file in docComments) {
										// data += "----\n\n";
										// data += `##### File: ${file}\n\n`;
										var docCommentsFile = docComments[file];
										for (var a = 0; a < docCommentsFile.length; a++) {
												var commentData = docCommentsFile[a];
												for (var b = 0; b < commentData.length; b++) {
														(function(commentData) {
																__DBG__("Comment data:", commentData[b]);
																var name = commentData[b].name.replace(/^@/g, "");
																var text = commentData[b].text;
																if (name.length) {
																		name = name[0].toUpperCase() + name.substr(1);
																}
																__DBG__("Name: " + name);
																if (name !== "Default") {
																		data += `**${name}:**`;
																}
																data += ` ${text}\n\n`;
														})(commentData);
												}
												data += "\n\n";
										}
								}
						} else {
								data = JSON.stringify(docComments, null, 4);
						}
						if (options.output === undefined) {
								console.log(data);
						} else {
								__LOG__("Writing results to: " + options.output);
								var folder = path.dirname(options.output);
								if (fs.existsSync(folder)) {
										if (fs.lstatSync(folder).isDirectory()) {
												fs.writeFileSync(options.output, data, "utf8");
										} else {
												throw {
														name: "DumpingResultsError",
														message: "Destiny folder is already a file"
												};
										}
								} else {
										mkdirp.sync(folder);
										fs.writeFileSync(options.output, data, "utf8");
								}
						}
						return data;
				};

				function extractComments() {
						const globule = require("globule");
						const fs = require("fs");
						var docComments = {};
						__LOG__("Starting.");
						__LOG__("Options:", options.include);
						__LOG__("Excluded:", options.exclude);
						__LOG__("Output:", options.output);
						__LOG__("Format:", options.format);
						const files = globule.find([].concat(options.include).concat(options.exclude));
						__LOG__("Files found: " + files.length);
						for (var a = 0; a < files.length; a++) {
								var file = files[a];
								var contents = fs.readFileSync(file).toString();
								var javadocMatches = extractJavadocData(contents);
								__LOG__("Matches in file " + file + ": " + javadocMatches.length);
								if (javadocMatches.length !== 0) {
										docComments[file] = javadocMatches;
								}
						}
						return docComments;
				};

				return (function() {
						normalizeOptions();
						var comments = extractComments();
						var data = formatData(comments);
						return data;
				})();
		}
};