/**
 * #### 3.2. API Reference
 *
 * 
 *
 *
 * ----
 *
 * @name `{javadoc}`
 * @type `{Object}`
 * @description This object holds the whole API of this module, which has only 1 method.
 * 
 * ----
 * 
 */
module.exports = {
		/**
		 * @name `{javadoc}.generate(Object:options)`
		 * @type `{Function}`
		 * @parameter `{Object} options`. By default, its value is:
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
		 * 
		 * Then, it will retrieve the files matched (included) and not excluded.
		 * 
		 * Then, it will retrieve the Javadoc comments found in them.
		 *
		 * Then, it will format the results (as JSON or Markdown).
		 *
		 * And finally, it will write the results into the specified file (output), or if we do not specify the output, it will print the result by console.
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
						const appendToLast = function(obj, prop, item, isNew = false) {
								if (!obj[prop]) {
										obj[prop] = [];
								}
								if (isNew || (obj[prop].length === 0)) {
										obj[prop].push("");
								}
								obj[prop][obj[prop].length - 1] += item.replace(/^ /g, "").replace(/(\*)( )+(\/)/g, function(match) {
										return match.substr(0, 1) + match.substr(1, match.length - 3) + match.substr(match.length - 1);
								});
						};
						var javadocComments = text.match(REGEX_JAVADOC);
						var javadocFileData = [];
						if (javadocComments) {
								javadocComments.forEach(function(javadocComment) {
										var javadocCommentClean = "\n" + javadocComment.replace(REGEX_BEGINING_AND_ENDING, "");
										var javadocLines = javadocCommentClean.split(REGEX_JAVADOC_LINE_BEGINING);
										var javadocCommentData = {
												default: []
										};
										var currentAttribute = "default";
										javadocLines.forEach(function(javadocLine) {
												var attributeMatch = javadocLine.match(REGEX_JAVADOC_LINE_BEGINING_ATTRIBUTE);
												if (attributeMatch) {
														currentAttribute = attributeMatch[0];
														appendToLast(javadocCommentData, currentAttribute, javadocLine.replace(REGEX_JAVADOC_LINE_BEGINING_ATTRIBUTE, ""), true);
												} else if (javadocLine === "") {
														appendToLast(javadocCommentData, currentAttribute, "\n" + javadocLine);
												} else {
														appendToLast(javadocCommentData, currentAttribute, "\n" + javadocLine);
												}
										});
										javadocFileData.push(javadocCommentData);
								});
						}
						return javadocFileData;
				};

				function __LOG__(msg) {
						if (options.output === undefined) {
								return;
						}
						var otherArgs = Array.prototype.slice.call(arguments);
						otherArgs.shift();
						if (typeof msg === "string") {
								console.log.apply(console, ["[javadoc] " + msg].concat(otherArgs));
						} else {
								console.log.apply(console, ["[javadoc]", msg].concat(otherArgs));
						}
				};

				function formatData(docComments) {
						const fs = require("fs");
						var data = undefined;
						if (options.format === "markdown") {
								data = "";
								var labelsOrder = [
										"name",
										"type",
										"parameter",
										"params",
										"param",
										"return",
										"returns",
										"description"
								];
								// @TODO: pass from JSON to Markdown:
								for (var file in docComments) {
										// data += "----\n\n";
										// data += `##### File: ${file}\n\n`;
										var docCommentsFile = docComments[file];
										for (var a = 0; a < docCommentsFile.length; a++) {
												var comment = docCommentsFile[a];
												var properties = Object.keys(comment);
												properties = properties.sort(function(a, b) {
														var orderA = labelsOrder.indexOf(a);
														var orderB = labelsOrder.indexOf(b);
														if (orderA === -1) {
																orderA = properties.length + 2;
														} else if (orderB === -1) {
																orderB = properties.length + 2;
														}
														return orderB - orderA;
												});
												for (var b = 0; b < properties.length; b++) {
														var property = properties[b];
														var prop = property.replace(/^\@/g, "");
														if (prop.length)
																prop = prop[0].toUpperCase() + prop.substr(1);
														var content = comment[property];
														if (prop !== "Default") {
																data += `**${prop}:**`;
														}
														data += ` ${content}\n\n`;
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
								fs.writeFileSync(options.output, data, "utf8");
						}
						return data;
				};

				function extractComments() {
						const globule = require("globule");
						const mkdirp = require('mkdirp');
						const fs = require("fs");
						var docComments = {};
						__LOG__("Starting.");
						__LOG__("Included:", options.include);
						__LOG__("Excluded:", options.exclude);
						__LOG__("Output:", options.output);
						__LOG__("Format:", options.format);
						// const path = require("path");
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