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


