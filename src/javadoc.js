const fs = require("fs-extra");
const glob = require("glob");
const path = require("path");
const { EOL } = require("os");

const capitalizeString = (s) => {
    return s.substr(0, 1).toUpperCase() + s.substr(1);
};

/**
 * -----------------
 * 
 * ### `Javadoc`
 * @type *Class. Function.*
 * @description Master class of the `javadoc` package.
 */
class Javadoc {

    /**
     * 
     * -------------------
     * 
     * ### `Javadoc.REGEX_PATTERNS`
     * @type *Static property. Object.*
     * @description Regular expression patterns used by the class.
     */
    static get REGEX_PATTERNS() {
        return {
            JAVADOC_COMMENT: /\/\*\*[\t ]*((\r?\n)([\t ]*\*[\t ]*).*)*/g,
            JAVADOC_ENTRY: /^\/\*\*[\t ]?/g,
            JAVADOC_LINE_ENTRY: /^\r?\n[\t ]*\*[\t ]?/g,
            JAVADOC_PROPERTY: /^[\t ]*\@[^\n\r\t ]*/g,
            JAVADOC_VALUE: /^.*/g,
        }
    }

    /**
     * 
     * -------------------------
     * 
     * ### `Javadoc.DEFAULT_GLOB_OPTIONS`
     * @type *Static property. Object.*
     * @property 
     * @property - `cwd`. Defaults to `process.cwd()`. Allowed options at [glob package](https://www.npmjs.com/package/glob#options)
     * @property - `dot`. Defaults to `true`. Allowed options at [glob package](https://www.npmjs.com/package/glob#options)
     * @description Default options used by the `glob` package.
     */
    static get DEFAULT_GLOB_OPTIONS() {
        return {
            cwd: process.cwd(),
            dot: true,
        }
    }

    /**
     * 
     * ---------------------------
     * 
     * ### `Javadoc.DEFAULT_OPTIONS`
     * @type *Static property. Object.*
     * @property 
     * @property - `include:Array<String>`. Defaults to `["** /*.js"]`. Allowed rules at [glob package](https://www.npmjs.com/package/glob).
     * @property - `exclude:Array<String>`. Defaults to `["** /node_modules/**.js"]`. Allowed rules at [glob package](https://www.npmjs.com/package/glob).
     * @property - `format:String`. Defaults to `"markdown"`. Allowed values:
     *     - `"md"`
     *     - `"json"`
     * @property - `output:String`. Defaults to `undefined`. File into which dump the results. **Required value**.
     * @description General options of the `Javadoc.generate` main method.
     */
    static get DEFAULT_OPTIONS() {
        return {
            include: ["**/*.js"],
            exclude: ["**/node_modules/**"],
            format: "markdown",
            output: undefined
        }
    }

    /**
     * 
     * ------------------------
     * 
     * ### `Javadoc.findFiles`
     * @type *Static method. Function.*
     * @parameter 
     * @parameter - `parameterIncludes:Array<String>`. Replaces `DEFAULT_OPTIONS.include` as value.
     * @parameter - `parameterExcludes:Array<String>`. Replaces `DEFAULT_OPTIONS.exclude` as value.
     * @parameter - `parameterOptions:Object`. Overrides `DEFAULT_GLOB_OPTIONS` as object.
     * @returns files:Promise<Array<String>>. Asynchronously, returns an array of matched files (as Strings).
     * @description Finds files based on glob patterns ([more info](https://www.npmjs.com/package/glob#usage)) included, excluded and glob options ([more info](https://www.npmjs.com/package/glob#options)).
     */
    static findFiles(parameterIncludes, parameterExcludes = [], parameterOptions = {}) {
        return new Promise((success, failure) => {
            const options = Object.assign({}, this.DEFAULT_GLOB_OPTIONS, parameterOptions);
            const excludes = [].concat(parameterExcludes).map(f => {
                return path.resolve(options.cwd, f);
            });
            options.ignore = excludes;
            const includez = [].concat(parameterIncludes).map(f => {
                return path.resolve(options.cwd, f);
            });
            console.log("[javadoc] Patterns:");
            includez.forEach(includezItem => {
                console.log("[javadoc]   - (include) " + includezItem);
            });
            excludes.forEach(excluded => {
                console.log("[javadoc]   - (exclude) " + excluded);
            });
            // @TODO: match all included glob patterns in a loop...
            const files = [];
            let counterIncluded = 0;
            const finalize = () => {
                counterIncluded++;
                if (counterIncluded >= includez.length) {
                    return success(files);
                }
            }
            if (includez.length === 0) {
                return finalize();
            }
            for (let includeIndex = 0; includeIndex < includez.length; includeIndex++) {
                const includePattern = includez[includeIndex];
                glob(includePattern, options, (error, filesMatched) => {
                    if (error) {
                        return finalize();
                    }
                    for (let indexMatched = 0; indexMatched < filesMatched.length; indexMatched++) {
                        const fileMatched = filesMatched[indexMatched];
                        if (files.indexOf(fileMatched) === -1) {
                            files.push(fileMatched);
                        }
                    }
                    return finalize();
                });
            }
        });
    }

    /**
     * 
     * -------------------------------
     * 
     * ### `Javadoc.findCommentsInFile`
     * @type *Static method. Function.*
     * @parameter `file:String`. File into which look for the javadoc-comments.
     * @returns `matches:Promise<Array<Object>>`. Asynchronously, returns a list of matched javadoc-comments (as Objects) found in the passed file.
     * @description From a file, it returns (asynchronously, by a Promise) javadoc-comments represented as Objects.
     */
    static findCommentsInFile(file) {
        return new Promise((success, failure) => {
            return fs.readFile(file, "utf8", (error, contents) => {
                if (error) {
                    return failure(error);
                }
                const matches = this.findCommentsInString(contents);
                return success(matches);
            });
        });
    }

    /**
     * 
     * --------------------------------
     * 
     * ### `Javadoc.findCommentsInString`
     * @type *Static method. Function.*
     * @parameter `text:String`. Text into which look for the javadoc-comments.
     * @returns `totalMatches:Array<Object>`. List of javadoc-comments (as Objects) found in the passed String.
     * @description Finds javadoc-comments (as Objects) from a String.
     */
    static findCommentsInString(text) {
        const totalMatches = [];
        const {
            JAVADOC_COMMENT,
            JAVADOC_ENTRY,
            JAVADOC_LINE_ENTRY,
            JAVADOC_PROPERTY,
            JAVADOC_VALUE,
        } = this.REGEX_PATTERNS;
        // 1. Get all javadoc-comment matches.
        const allMatches = text.match(JAVADOC_COMMENT);
        if (allMatches === null) {
            return totalMatches;
        }
        // 2. For each javadoc-comment...
        for (let indexMatch = 0; indexMatch < allMatches.length; indexMatch++) {
            const matches = {};
            let lastProperty = "_";
            let wasStarted = false;
            let token = allMatches[indexMatch];
            // 3. Remove the entry
            token = token.replace(JAVADOC_ENTRY, "");
            // 4. For each line of the javadoc-comment... starts the extraction.
            Extraction:
            while (JAVADOC_LINE_ENTRY.test(token)) {
                // 5. Remove the line entry.
                token = token.replace(JAVADOC_LINE_ENTRY, "");
                // 6. Get the current property of the line (description by default)
                const isPropertyLine = JAVADOC_PROPERTY.test(token);
                const property = isPropertyLine ? token.match(JAVADOC_PROPERTY)[0] : lastProperty;
                // 7. Remove the property.
                token = token.replace(JAVADOC_PROPERTY, "");
                // 8. Get the current value. Also, replace "* /" for "*/" (in order to escape closed comments).
                const value = token.match(JAVADOC_VALUE)[0].replace(/\* \//g, "*/");
                // 9. If it is the last line of the javadoc, get out of the extraction of that javadoc-comment.
                if (value === "/") {
                    continue Extraction;
                }
                // 10. Remove the value.
                token = token.replace(JAVADOC_VALUE, "");
                // 11. If the property did not exist, create it.
                if (!(property in matches)) {
                    matches[property] = [];
                }
                // 12. Add the value to that property.
                if ((!isPropertyLine) && wasStarted) {
                    // a. Inline if it is a new-property-line
                    matches[property][matches[property].length - 1] += EOL + value;
                } else {
                    // b. Otherwise as a new entry
                    matches[property].push(value);
                }
                // 13. Assign the last property to the current property.
                lastProperty = property;
                wasStarted = true;
                // 14. Go for the next javadoc-comment line extraction.
            }
            // 15. Once all the lines were extracted, push the data for this javadoc-comment.
            totalMatches.push(matches);
        }
        return totalMatches;
    }

    /**
     * 
     * -----------------------------------
     * 
     * ### `Javadoc.formatJsonToMarkdown`
     * @type *Static method. Function.*
     * @parameter `fileComments:Array<Object>`. List of javadoc-comments (as Object) to convert to markdown format.
     * @returns `formatted:String`. Markdown code from passed javadoc-comments.
     * @description Generates `markdown` code from a list of javadoc-comments.
     */
    static formatJsonToMarkdown(filesAndComments) {
        let formatted = "";
        for (let indexFiles = 0; indexFiles < filesAndComments.length; indexFiles++) {
            const fileComments = filesAndComments[indexFiles];
            for (let indexComments = 0; indexComments < fileComments.length; indexComments++) {
                const fileComment = fileComments[indexComments];
                Object.keys(fileComment).forEach(property => {
                    const value = fileComment[property].join(EOL + EOL + EOL);
                    if (property !== "_") {
                        const propertyTransformed = capitalizeString(property.replace(/^@/g, "").replace(/\-[a-z]/g, (match) => {
                            return " " + match.substr(1).toUpperCase();
                        }));
                        formatted += `**${propertyTransformed}**`;
                    }
                    if (value) {
                        formatted += (property.startsWith("@") ? ": " : "") + value + "" + EOL + EOL + EOL;
                    } else {
                        formatted += "." + EOL + EOL + EOL;
                    }
                });
            }
        }
        return formatted;
    }

    /**
     * 
     * -----------------------------------
     * 
     * ### `Javadoc.generate`
     * @type *Static method. Function.*
     * @parameter `parameters:Object`. Overrides `Javadoc.DEFAULT_OPTIONS` as Object. To see more about properties, go to that static property of Javadoc class.
     * @returns `output:Promise<String|Array<Object>>`. Depending on `parameters.format` (`"json"`|`"markdown"`), it can return an Array or a String.
     * @description Finds included files, dismisses excluded files, extracts javadoc-comments, formats them adecuately, and dumps the results into output file, while returning the output asynchronously (as a Promise).
     */
    static generate(parameters = {}) {
        return new Promise((success, failure) => {
            const options = Object.assign({}, this.DEFAULT_OPTIONS, parameters);
            console.log("[javadoc] Start extracting javadoc comments.");
            return this.findFiles(options.include, options.exclude).then(files => {
                console.log(`[javadoc] Total of files matched: ${files.length}.`);
                let counter = 0;
                const output = {
                    success: [],
                    error: []
                };
                if (files.length === 0) {
                    return success([]);
                }
                const endExecution = (result) => {
                    console.log("[javadoc] Final javadoc report per file:");
                    console.log(`[javadoc]   - ${output.success.length} success(es).`);
                    console.log(`[javadoc]   - ${output.error.length} error(s).`);
                    if (output.error.length === 0) {
                        console.log("[javadoc] Successfully finished.");
                    }
                    return success(result);
                }
                const finalize = () => {
                    counter++;
                    if (counter >= files.length) {
                        if (["md", "markdown"].indexOf(options.format) !== -1) {
                            const formatted = this.formatJsonToMarkdown(output.success);
                            if (options.output) {
                                const outputFile = path.resolve(options.output);
                                try {
                                    fs.outputFileSync(outputFile, formatted, "utf8");
                                    console.log(`[javadoc] File output (markdown) written successfully at ${path.basename(outputFile)}.`);
                                } catch (error) {
                                    console.log("[javadoc] Error writing the (markdown) output.", error);
                                }
                            } else {
                                console.log("[javadoc] CAUTION: No output file was specified.");
                            }
                            return endExecution(formatted);
                        } else {
                            if (options.output) {
                                const outputFile = path.resolve(options.output);
                                try {
                                    fs.outputFileSync(outputFile, JSON.stringify(output, null, 2), "utf8");
                                    console.log(`[javadoc] File output (json) written successfully at ${path.basename(outputFile)}.`);
                                } catch (error) {
                                    console.log("[javadoc] Error writing the (json) output.", error);
                                }
                            } else {
                                console.log("[javadoc] CAUTION: No output file was specified.");
                            }
                            return endExecution(output);
                        }
                    }
                }
                for (let index = 0; index < files.length; index++) {
                    const file = files[index];
                    ((file) => {
                        return this.findCommentsInFile(file).then(comments => {
                            console.log(`[javadoc] File ${path.basename(file)} has ${comments.length} javadoc comments.`);
                            Agregar_fichero_en_nodo_de_comentario: {
                                comments = comments.map(comment => {
                                    comment.file = file;
                                    return comment;
                                })
                            }
                            if (comments.length) {
                                output.success.push(comments);
                            }
                            return finalize();
                        }).catch(error => {
                            console.log(`[javadoc] Error finding comments on file: ${path.basename(file)}.`);
                            output.error.push(error);
                            return finalize();
                        });
                    })(file);
                }
            }).catch(error => {
                console.log("[javadoc] Failed on finding files.", error);
                return failure(error);
            });
        });
    }

}

module.exports = Javadoc;