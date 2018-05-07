 

# javadoc

Simple tool to generate JSON or Markdown text from Javadoc comments.

## 1. Installation

~$ `npm install -s javadoc`

If you want the CLI tool easily available, install it globally:

~$ `npm install -g javadoc`


## 2. Usage

#### 2.1. Usage of the CLI:

##### Example 1: in JSON format

~$ `javadoc --include "**/*.js" "**/*.ts" --exclude "**/node_modules/**" "**/bower_components/**" --output "docs/docs.json" --format "json"`

Or the same:

~$ `javadoc -i "**/*.js" "**/*.ts" -e "**/node_modules/**" "**/bower_components/**" -o "docs/docs.json" -f "json"`


The above examples will:

1. Include any JavaScript and TypeScript files found under our current directory.

2. Exclude the NPM and Bower modules typical folders.

3. Format the results into a JSON file.

4. Create a file at `docs/docs.json` and dump into it the results. Take into account that if the folder is not created (and the same with all the middle folders we specify), the tool will create it for us too.


##### Example 2: in Markdown format

If we wanted to have the same previous example, but to output a `README.md` Markdown file, we can:

~$ `javadoc --include "**/*.js" "**/*.ts" --exclude "**/node_modules/**" "**/bower_components/**" --output "README.md" --format "markdown"`



*Tip:* when I want to document my code, what I do is to create 2 files: `docs/README.ini.md` and `docs/README.end.md`, and I add them in the included files, one the first, and the other the last, and as the tool will recollect the Javadoc comments in the same order we specified, I can output the results in Markdown format, into my `README.md` final file. This way, I only have to maintain 1 documentation: the one that is in the comments of my code. It simplifies a lot the documentation task for me.


##### Example 3: output to console

To output the results by console, you only need to omit the `--output` (or `-o`) parameter.

~$ `javadoc`

As the default value for the `include` is `["**/*.js"]`, the `exclude` is `["**/node_modules/**"]`, and the `output` is `undefined`, this command will try to find all the JavaScript files under the current directory, will avoid NPM modules typical folder, and will print the results by console, in JSON format.

To output the results by console, we only need to omit the value for the `output` parameter.


#### 2.2. Usage of the API:

To use the API, you only can call the `generate(Object:options)` method, 
and pass to it the same parameters we use in the CLI.

These codes will reproduce the same behaviour of the previous (CLI) examples.


##### Example 1: in JSON format


```js
require("javadoc").generate({
  include: ["**/*.js", "**/*.ts"],
  exclude: ["**/node_modules/**", "**/bower_components/**"],
  output: "docs/docs.json",
  format: "json",
});
```

##### Example 2: in Markdown format


```js
require("javadoc").generate({
  include: ["**/*.js", "**/*.ts"],
  exclude: ["**/node_modules/**", "**/bower_components/**"],
  output: "README.md",
  format: "markdown",
});
```














## 3. Reference

The `javadoc` tool is available as `CLI` and as `API`.








 


#### 3.1. CLI Reference

*Note:* is you have installed the tool only locally (and not globaly), you can reproduce the examples changing `javadoc` by `node_modules/.bin/javadoc`.




**Name:** `{javadoc CLI}`

**Type:** `{Help}`

**Help:** 

```
Options:
  --help         Show help                                             [boolean]
  --version      Show version number                                   [boolean]
  --include, -i  Include a new glob pattern (as input)     [array] [default: []]
  --exclude, -e  Exclude a new glob pattern (as input)     [array] [default: []]
  --format, -f   Format of the output. Options: 'markdown' | 'json'.    [string]
  --output, -o   File to output the generated contents.                 [string]
```



 


## 4. Conclusion

Simple but useful tool that aims to simplify the task of maintaining the documentation of your projects.





 

#### 3.1. API Reference






**Name:** `{javadoc}`

**Type:** `{Object}`

**Description:** This object holds the whole API of this module, which has only 1 method.



 


**Name:** `{javadoc}.generate(Object:options)`

**Type:** `{Function}`

**Parameter:** `{Object} options`. By default, its value is:

```js
{
  include: ["** /*.js"], // will pick all the files ended with *.js under the current path.
  exclude: ["** /node_modules/** /*"], // will exclude any 'node_modules' folder.
  output: undefined, // will print the output by console, instead of dumping it into a file
  format: "json" // will format the output as a JSON object.
}
```

If you set any value for any of these properties, that property will be overriden. All of them are optional.

  - `include`: `{Array|String}` it indicates the [glob patterns](https://www.npmjs.com/package/globule) for the included files.

  - `exclude`: `{Array|String}` it indicates the [glob patterns](https://www.npmjs.com/package/globule) for the excluded files.

  - `output`: `{String}` it indicates the file into which dump the results. If not provided, the results will be prompted by console.

  - `format`: `{String}` it indicates the desired format of the output. Options: `'json'` (default) | `'markdown'`


**Returns:** `{String}` Depending on the format, it will output a JSON or a Markdown text.

**Description:** This method will take the files we want to include, the files we want to exclude, the file into which dump the results, and the format we want for them (`'json'` or `'markdown'`).

Then, it will retrieve the files matched (included) and not excluded.

Then, it will retrieve the Javadoc comments found in them.

Then, it will format the results (as JSON or Markdown).

And finally, it will write the results into the specified file (output), or if we do not specify the output, it will print the result by console.




# Read this file
