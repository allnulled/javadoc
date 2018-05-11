 

# javadoc


![](https://img.shields.io/badge/javadoc-v1.0.1-green.svg) ![](https://img.shields.io/badge/tests-passing-green.svg) ![](https://img.shields.io/badge/statements--coverage-100%25-green.svg) ![](https://img.shields.io/badge/branches--coverage-100%25-green.svg) ![](https://img.shields.io/badge/functions--coverage-100%25-green.svg) ![](https://img.shields.io/badge/lines--coverage-100%25-green.svg) 

![](https://img.shields.io/badge/full--coverage-yes-green.svg)


Simple tool to generate JSON or Markdown text from Javadoc comments.

## 1. Installation

`~$ npm install -s javadoc`

To use the CLI anywhere, install it globally:

`~$ npm install -g javadoc`

## 2. Javadoc in a wide sense

[Javadoc](https://en.wikipedia.org/wiki/Javadoc) is simply a way to document code from the comments of it, spliting the information in tags (**`@thisIsAnExampleOfTag`**).

This tool understands that **any word** can be a tag (not only a set of them), and you can follow *camel-case*, *snake-case* (or, in fact, any letter, number, `_`, `-` or `$` will be a valid character) for them, and they will split the comment data into a new piece of data of that comment.

As we are using usually Markdown to document our projects, this tool is thought to embed Markdown code in the comments of our code. It can be JavaScript, Java, Python, C/C++,... or even plain text, it does not matter, the file will be parsed the same way, not considering the language or the format of the file.

If you have not seen a Javadoc comment before, this is it:

```js
/**
* 
* Default context for the current Javadoc comment.
* Default context for the current Javadoc comment.
* Default context for the current Javadoc comment.
* 
* @name Some name
* 
* @property Property name. Property explanation
* 
* @class Class name.
* 
* @method Method name.
* 
* @description This is a description.
* Any tag can be multiline, not only description.
* Take into account that the order of them is respected when generating JSON or Markdown.
* 
* @parameter Parameter one.
* 
* @parameter Parameter two.
* 
* @parameter Parameter three.
* 
* @NewInventedTag This is a new invented tag. 
* The first letter is uppercased, but in Markdown output, all the tags will be capitalized.
*
*
*
*/
```

This example would output a JSON file (when `-f json` is provided, or by default) like:

```js
{
   "test/examples/sample-7.js": [
       [
           {
               "name": "default",
               "text": "\n\nDefault context for the current Javadoc comment.\nDefault context for the current Javadoc comment.\nDefault context for the current Javadoc comment.\n"
           },
           {
               "name": "@name",
               "text": "Some name\n"
           },
           {
               "name": "@property",
               "text": "Property name. \nProperty explanation\n"
           },
           {
               "name": "@class",
               "text": "Class name.\n"
           },
           {
               "name": "@method",
               "text": "Method name.\n"
           },
           {
               "name": "@description",
               "text": "This is a description.\nAny tag can be multiline, not only description.\nTake into account that the order of them is respected when generating JSON or Markdown.\n"
           },
           {
               "name": "@parameter",
               "text": "Parameter one.\n"
           },
           {
               "name": "@parameter",
               "text": "Parameter two.\n"
           },
           {
               "name": "@parameter",
               "text": "Parameter three.\n"
           },
           {
               "name": "@NewInventedTag",
               "text": "This is a new invented tag. \nThe first letter is uppercased, but in Markdown output, all the tags will be capitalized.\n\n\n"
           }
       ]
   ]
}
```

And a Markdown file (when `-f markdown` is provided) like:

```js
Default context for the current Javadoc comment.
Default context for the current Javadoc comment.
Default context for the current Javadoc comment.

**Name:** Some name

**Property:** Property name. 

Property explanation

**Class:** Class name.

**Method:** Method name.

**Description:** This is a description.
Any tag can be multiline, not only description.
Take into account that the order of them is respected when generating JSON or Markdown.

**Parameter:** Parameter one.

**Parameter:** Parameter two.

**Parameter:** Parameter three.

**NewInventedTag:** This is a new invented tag. 
The first letter is uppercased, but in Markdown output, all the tags will be capitalized.
```

Which results, seen by a browser, into: 

-----

Default context for the current Javadoc comment.
Default context for the current Javadoc comment.
Default context for the current Javadoc comment.

**Name:** Some name

**Property:** Property name. 

Property explanation

**Class:** Class name.

**Method:** Method name.

**Description:** This is a description.
Any tag can be multiline, not only description.
Take into account that the order of them is respected when generating JSON or Markdown.

**Parameter:** Parameter one.

**Parameter:** Parameter two.

**Parameter:** Parameter three.

**NewInventedTag:** This is a new invented tag. 
The first letter is uppercased, but in Markdown output, all the tags will be capitalized.

-----

As you can see:

- each tag name is capitalized, and the **`@`** is removed.

- the first **&#42;** is removed too, with the previous space or tabulation, and the first space, if any.

- the name of the tag is inserted in bold, followed by **`:`** and then the next content.

- the other content is just markdown, and it is up to the developer what to show and how.


Finally, in any case, if you have another necessities or you want to manage the data extracted from the 
Javadoc comments in other ways, you can take the JSON output, and play with it. In the end, this is how 
the markdown code is generated.






 



## 3. CLI usage


#### 3.1. CLI examples


***Note**: if you have installed the tool only locally (and not globaly), you can reproduce the examples changing `javadoc` by `node_modules/.bin/javadoc`.*


##### Example 1: in JSON format

This example taskes all `*.js` and `*.ts` files under the current directory, excluding the ones found under the tipycal NPM and Bower modules folders, extracts the Javadoc comments as JSON and creates (if not exists already) the `docs` folder, and writes the results at `docs.json`:

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



#### 3.2. CLI reference

```
Options:
--help         Show help                                                                  [boolean]
--version      Show version number                                                        [boolean]
--include, -i  Include a new glob pattern (as input).               [array] [default: ["**/*.js"]]
--exclude, -e  Exclude a new glob pattern (as input). [array] [default: ["**/node_modules/**/*"]]
--format, -f   Format of the output. Options: 'markdown' | 'json'.       [string] [default: "json"]
--output, -o   File to output the generated contents.                                      [string]
```





 

## 4. API usage


#### 4.1. API examples


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





 




#### 4.2. API reference

-------------------

### **`javadoc`**


**Type:** *`{Object}`*

**Description:** This object holds the whole API of this module, which has only 1 method.


**Example:** 

```js
var javadoc = require("javadoc");
```

-------------------



 

### **`javadoc.generate(options)`**


**Type:** *`{Function}`*

**Parameter:** *`{Object} options`*. By default, its value is:

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

**Description:** This method will take the files we want to include, the files we want to exclude, the file into which dump the results, and the format we want for them (`'json'` or `'markdown'`). 
Then, it will retrieve the files matched (included) and not excluded. 
Then, it will retrieve the Javadoc comments found in them. 
Then, it will format the results (as JSON or Markdown). 
And finally, it will write the results into the specified file (output), or if we do not specify the output, it will print the result by console.


**Example:** 

```js
javadoc.generate({
  include: ["**/*.js"],
  exclude: ["**node_modules**"],
  output: undefined,
  format: "json"
});
```
-------------------


#### 4.3. Special notes about Markdown format


As the `--format markdown` option (in CLI or API) expects that we embed Markdwon code in JavaScript multiline comments */&#42;&#42;* ... *&#42;/*,
we need to know a few things.


1. All the lines inside the Javadoc comments must start with *&#42;* (even the ones that embed code). Otherwise, they will not be considered.


2. The first *&#42;* of each line of the Javadoc comment will be removed.


3. When the format selected is *markdown*, the name of the parameters will be in printed in bold, capitalized and without the first *@*.


4. The *&#42;/* string can be commonly required, and it can be simulated puting a space in the middle: *&#42; /*. Consider also to use the HTML entity in order to escape special characters.


5. Tip: you can take a look how this project generates the documentation (`~$ npm run docs`) to see how to document a project .




 


## 5. Run tests and coverage reports

To generate the coverage and see the tests by console:

##### 1. Go to the directory of the module:

`~$ cd node_modules/javadoc`

##### 2. Install the dependencies of the module:

`~$ npm run install`

##### 3. Run the tests:

`~$ npm run test`

Or the tests and coverage reports:

`~$ npm run coverage`

The test reporting will appear by console.

The coverage reporting will appear under the folder `coverage`. Open the `index.html` file with a browser.


## 6. Conclusion

Simple but useful tool that aims to simplify the task of maintaining the documentation of your projects.





