 

# javadoc


![](https://img.shields.io/badge/javadoc-v1.0.1-green.svg) ![](https://img.shields.io/badge/tests-passing-green.svg) ![](https://img.shields.io/badge/statements--coverage-100%25-green.svg) ![](https://img.shields.io/badge/branches--coverage-100%25-green.svg) ![](https://img.shields.io/badge/functions--coverage-100%25-green.svg) ![](https://img.shields.io/badge/lines--coverage-100%25-green.svg) 

![](https://img.shields.io/badge/full--coverage-yes-green.svg)


Simple tool to generate JSON or Markdown text from Javadoc comments.

## 1. Installation

`~$ npm install -s javadoc`

To use the CLI anywhere, install it globally:

`~$ npm install -g javadoc`






 



## 2. CLI usage


#### 2.1. CLI examples


*Note: if you have installed the tool only locally (and not globaly), you can reproduce the examples changing `javadoc` by `node_modules/.bin/javadoc`.*


##### Example 1: in JSON format

```bash
~$ javadoc 
    --include "**/*.js" "**/*.ts" 
    --exclude "**/node_modules/**" "**/bower_components/**" 
    --output "docs/docs.json" 
    --format "json"
```

Or the same:

```bash
~$ javadoc 
    -i "**/*.js" "**/*.ts" 
    -e "**/node_modules/**" "**/bower_components/**" 
    -o "docs/docs.json" 
    -f "json"
```

The above examples will:

- Include any JavaScript and TypeScript files found under our current directory.

- Exclude the NPM and Bower modules typical folders.

- Format the results into a JSON file.

- Create a file at `docs/docs.json` and dump into it the results. Take into account that if the folder is not created (and the same with all the middle folders we specify), the tool will create it for us too.


##### Example 2: in Markdown format

If we wanted to have the same previous example, but to output a `README.md` Markdown file, we can (in one line):

```bash
~$ javadoc 
    --include "**/*.js" "**/*.ts" 
    --exclude "**/node_modules/**" "**/bower_components/**" 
    --output "README.md" 
    --format "markdown"
```

##### Example 3: output to console

To output the results by console, you only need to omit the `--output` (or `-o`) parameter.

`~$ javadoc`

Which would be the same as typing:

```bash
~$ javadoc
   --include "**/*.js"
   --exclude "**/node_modules/**"
   --format "json"
```

Omitting the `output` parameter implies to print the results by console instead of dumping them into a file. 



#### 2.2. CLI reference

```
Options:
 --help         Show help                                                                  [boolean]
 --version      Show version number                                                        [boolean]
 --include, -i  Include a new glob pattern (as input).               [array] [default: ["**/*.js"]]
 --exclude, -e  Exclude a new glob pattern (as input). [array] [default: ["**/node_modules/**/*"]]
 --format, -f   Format of the output. Options: 'markdown' | 'json'.       [string] [default: "json"]
 --output, -o   File to output the generated contents.                                      [string]
```





 

## 3. API usage


#### 3.1. API examples


##### Example 1: in JSON format


```js
require("javadoc").generate({
  include: ["**/*.js", "**/*.ts"],
  exclude: ["**/node_modules/**", "**/bower_components/**"],
  output: "docs/docs.json",
  format: "json"
});
```

##### Example 2: in Markdown format


```js
require("javadoc").generate({
  include: ["**/*.js", "**/*.ts"],
  exclude: ["**/node_modules/**", "**/bower_components/**"],
  output: "README.md",
  format: "markdown"
});
```





 




#### 3.2. API reference

-------------------

### **`javadoc`**


**Type:** *`{Object}`*,*`{Function}`*

**Description:** This object holds the whole API of this module, which has only 1 method.
,This method will take the files we want to include, the files we want to exclude, the file into which dump the results, and the format we want for them (`'json'` or `'markdown'`). 
Then, it will retrieve the files matched (included) and not excluded. 
Then, it will retrieve the Javadoc comments found in them. 
Then, it will format the results (as JSON or Markdown). 
And finally, it will write the results into the specified file (output), or if we do not specify the output, it will print the result by console.


**Example:** 

```js
var javadoc = require("javadoc");
```

-------------------

### **`javadoc.generate(options)`**
,

```js
javadoc.generate({
   include: ["**/*.js"],
   exclude: ["**node_modules**"],
   output: undefined,
   format: "json"
});
```
-------------------


#### 3.3. Special notes about Markdown format


As the `--format markdown` option (in CLI or API) expects that we embed Markdwon code in JavaScript multiline comments (`/**` ... `*/`),
we need to know a few things.

	1. All the lines in the Javadoc comments must start with "*" (even the ones that embed code).

 2. When the string "*/" (or any "*" + any space + "/") is found, take into account that the output will be the same, but removing 1 space. This way, we can scape the string that closes the comments (*/) by adding 1 more space.

 3. You can use directly any markup valid for Markdown inside the comments, and generate Markdown documentation directly with this tool, which was the main goal of it.

 4. Tip: you can take a look how this project generates the documentation (`~$ npm run docs`) to see how to document a project 


**Parameter:** `{Object} options`. By default, its value is:

```js
{
  include: ["**/*.js"], // will pick all the files ended with *.js under the current path.
  exclude: ["**/node_modules/**/*"], // will exclude any 'node_modules' folder.
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



 


## 4. Run tests

To generate the coverage and see the tests by console:

##### 1. Go to the directory of the module:

`~$ cd node_modules/javadoc`

##### 2. Install the dependencies of the module:

`~$ npm run install`

##### 3. Run the tests:

`~$ npm run test`

The test reporting will appear by console.

The coverage reporting will appear under the folder `coverage`. Open the `index.html` file with a browser.


## 5. Conclusion

Simple but useful tool that aims to simplify the task of maintaining the documentation of your projects.





