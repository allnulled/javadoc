# javadoc

Unopinionated, simple and powerful documentation generator.

## Installation

`$ npm i -g javadoc`

## Why?

This project was created to simplify the documentation of any code that accepts this kind of comments:

```js
/**
 * 
 * Some description here. It accepts (optional) **markdown typing**.
 * 
 * @some-property Some value in *markdown*
 * @some-property Some value in *markdown*
 * @some-other-property Some value in *markdown*
 * @some-more-properties Some value in *markdown*
 * The continuation of the value.
 * It can take as much lines as you need.
 * @and-more-properties
 * @and-more
 * @and-more...
 * 
 */
```

## Advantages

These are some of the advantages of this tool compared to other tools:

  - **Language unopinionated**: it can be used in any programming language project, because:
     - It uses regular expressions.
     - It does not parse any source code.
  - **Glob patterns**: it uses [glob patterns](https://www.npmjs.com/package/glob#glob-primer) to find files.
  - **Unlimited Javadoc-like tags**: it uses the Javadoc styling but you are free to use any kind of tag, not only a limited set of them.
  - **JSON or Markdown output**: it can extract Javadoc comments in:
     - **JSON**: to abstractly program the views of your own project.
     - **Markdown**: to directly use the comments in a typical *README.md* file, or similar.
  - **CLI or API**: it has a command-line interface and an abstract programming interface, and both work almost the same way.


## CLI usage

As simple as:

```sh 
$ javadoc
  --include "**/*.js" "**/*.ts"
  --exclude "**/node_modules/**" "**ignore**"
  --format markdown
  --output README.md
```

Or abbreviatedly:

```sh
$ javadoc
  -i "**/*.php" "**/*.sql"
  -e "**/node_modules/**" "**ignore**"
  -f json
  -o README.md
```

Type `javadoc --help` to see the help.

## API usage

```js
require("javadoc").generate({
    include: ["**/*.js", "**/*.ts"],
    exclude: ["**/node_modules/**"],
    format: "markdown",
    output: "README.md"
}).then(report => {
    // manage a report of success and errors...
}).catch(error => {
    // manage the error...
});
```

## API reference

Here you will find the whole API available for programmatic usage, documented.

*Note: the main interesting method is `Javadoc.generate`, which is the one called by the **CLI**.*


-----------------

### `Javadoc`


**Type**:  *Class. Function.*


**Description**:  Master class of the `javadoc` package.



-------------------

### `Javadoc.REGEX_PATTERNS`


**Type**:  *Static property. Object.*


**Description**:  Regular expression patterns used by the class.



-------------------------

### `Javadoc.DEFAULT_GLOB_OPTIONS`


**Type**:  *Static property. Object.*


**Property**:  


 - `cwd`. Defaults to `process.cwd()`. Allowed options at [glob package](https://www.npmjs.com/package/glob#options)


 - `dot`. Defaults to `true`. Allowed options at [glob package](https://www.npmjs.com/package/glob#options)


**Description**:  Default options used by the `glob` package.



---------------------------

### `Javadoc.DEFAULT_OPTIONS`


**Type**:  *Static property. Object.*


**Property**:  


 - `include:Array<String>`. Defaults to `["**/*.js"]`. Allowed rules at [glob package](https://www.npmjs.com/package/glob).


 - `exclude:Array<String>`. Defaults to `["**/node_modules/**.js"]`. Allowed rules at [glob package](https://www.npmjs.com/package/glob).


 - `format:String`. Defaults to `"markdown"`. Allowed values:
    - `"md"`
    - `"json"`


 - `output:String`. Defaults to `undefined`. File into which dump the results. **Required value**.


**Description**:  General options of the `Javadoc.generate` main method.



------------------------

### `Javadoc.findFiles`


**Type**:  *Static method. Function.*


**Parameter**:  


 - `parameterIncludes:Array<String>`. Replaces `DEFAULT_OPTIONS.include` as value.


 - `parameterExcludes:Array<String>`. Replaces `DEFAULT_OPTIONS.exclude` as value.


 - `parameterOptions:Object`. Overrides `DEFAULT_GLOB_OPTIONS` as object.


**Returns**:  files:Promise<Array<String>>. Asynchronously, returns an array of matched files (as Strings).


**Description**:  Finds files based on glob patterns ([more info](https://www.npmjs.com/package/glob#usage)) included, excluded and glob options ([more info](https://www.npmjs.com/package/glob#options)).



-------------------------------

### `Javadoc.findCommentsInFile`


**Type**:  *Static method. Function.*


**Parameter**:  `file:String`. File into which look for the javadoc-comments.


**Returns**:  `matches:Promise<Array<Object>>`. Asynchronously, returns a list of matched javadoc-comments (as Objects) found in the passed file.


**Description**:  From a file, it returns (asynchronously, by a Promise) javadoc-comments represented as Objects.



--------------------------------

### `Javadoc.findCommentsInString`


**Type**:  *Static method. Function.*


**Parameter**:  `text:String`. Text into which look for the javadoc-comments.


**Returns**:  `totalMatches:Array<Object>`. List of javadoc-comments (as Objects) found in the passed String.


**Description**:  Finds javadoc-comments (as Objects) from a String.



-----------------------------------

### `Javadoc.formatJsonToMarkdown`


**Type**:  *Static method. Function.*


**Parameter**:  `fileComments:Array<Object>`. List of javadoc-comments (as Object) to convert to markdown format.


**Returns**:  `formatted:String`. Markdown code from passed javadoc-comments.


**Description**:  Generates `markdown` code from a list of javadoc-comments.



-----------------------------------

### `Javadoc.generate`


**Type**:  *Static method. Function.*


**Parameter**:  `parameters:Object`. Overrides `Javadoc.DEFAULT_OPTIONS` as Object. To see more about properties, go to that static property of Javadoc class.


**Returns**:  `output:Promise<String|Array<Object>>`. Depending on `parameters.format` (`"json"`|`"markdown"`), it can return an Array or a String.


**Description**:  Finds included files, dismisses excluded files, extracts javadoc-comments, formats them adecuately, and dumps the results into output file, while returning the output asynchronously (as a Promise).




----------------

## Tests

To run the test, clone the repository and run `npm run test`.

## Coverage

To run the coverage test, clone the repository and run `npm run cover`.

## License

This project is licensed under [WTFPL](https://es.wikipedia.org/wiki/WTFPL), which stands for *Do What The Fuck You Want To Public License*.

## Versioning

This project adheres to [semantic versioning 2.0](https://semver.org/).

## Issues

To communicate issues [here](https://github.com/allnulled/javadoc/issues/new).
