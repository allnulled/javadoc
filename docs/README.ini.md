/**
 * # javadoc
 *
 * 
 * ![](https://img.shields.io/badge/javadoc-v1.0.1-green.svg) ![](https://img.shields.io/badge/tests-passing-green.svg) ![](https://img.shields.io/badge/statements--coverage-100%25-green.svg) ![](https://img.shields.io/badge/branches--coverage-100%25-green.svg) ![](https://img.shields.io/badge/functions--coverage-100%25-green.svg) ![](https://img.shields.io/badge/lines--coverage-100%25-green.svg) 
 * 
 * ![](https://img.shields.io/badge/full--coverage-yes-green.svg)
 * 
 * 
 * Simple tool to generate JSON or Markdown text from Javadoc comments.
 *
 * ## 1. Installation
 *
 * `~$ npm install -s javadoc`
 * 
 * To use the CLI anywhere, install it globally:
 *
 * `~$ npm install -g javadoc`
 * 
 * ## 2. Javadoc in a wide sense
 *
 * [Javadoc](https://en.wikipedia.org/wiki/Javadoc) is simply a way to document code from the comments of it, spliting the information in tags (**`@thisIsAnExampleOfTag`**).
 *
 * This tool understands that **any word** can be a tag if starts with **@** at the begining of the (multiline) comment line (not only a set of specific, closed words), and you can follow *camel-case*, *snake-case* (or, in fact, any `letter`, `number`, `_`, `-` or `$` will be a valid character) for them, and they will split the comment data into a new piece of data of that comment.
 *
 * As we are using usually Markdown to document our projects, this tool is thought to embed Markdown code in the comments of our code. It can be JavaScript, Java, Python, C/C++,... or even plain text, it does not matter, the file will be parsed the same way, not considering the language or the format of the file.
 *
 * If you have not seen a Javadoc comment before, this is it:
 *
 * ```js
 * /**
 *  * 
 *  * Default context for the current Javadoc comment.
 *  * Default context for the current Javadoc comment.
 *  * Default context for the current Javadoc comment.
 *  * 
 *  * @name Some name
 *  * 
 *  * @property Property name. Property explanation
 *  * 
 *  * @class Class name.
 *  * 
 *  * @method Method name.
 *  * 
 *  * @description This is a description.
 *  * Any tag can be multiline, not only description.
 *  * Take into account that the order of them is respected when generating JSON or Markdown.
 *  * 
 *  * @parameter Parameter one.
 *  * 
 *  * @parameter Parameter two.
 *  * 
 *  * @parameter Parameter three.
 *  * 
 *  * @NewInventedTag This is a new invented tag. 
 *  * The first letter is uppercased, but in Markdown output, all the tags will be capitalized.
 *  *
 *  *
 *  *
 *  */
 * ```
 *
 * This example would output a JSON file (when `-f json` is provided, or by default) like:
 *
 * ```js
 * {
 *     "test/examples/sample-7.js": [
 *         [
 *             {
 *                 "name": "default",
 *                 "text": "\n\nDefault context for the current Javadoc comment.\nDefault context for the current Javadoc comment.\nDefault context for the current Javadoc comment.\n"
 *             },
 *             {
 *                 "name": "@name",
 *                 "text": "Some name\n"
 *             },
 *             {
 *                 "name": "@property",
 *                 "text": "Property name. \nProperty explanation\n"
 *             },
 *             {
 *                 "name": "@class",
 *                 "text": "Class name.\n"
 *             },
 *             {
 *                 "name": "@method",
 *                 "text": "Method name.\n"
 *             },
 *             {
 *                 "name": "@description",
 *                 "text": "This is a description.\nAny tag can be multiline, not only description.\nTake into account that the order of them is respected when generating JSON or Markdown.\n"
 *             },
 *             {
 *                 "name": "@parameter",
 *                 "text": "Parameter one.\n"
 *             },
 *             {
 *                 "name": "@parameter",
 *                 "text": "Parameter two.\n"
 *             },
 *             {
 *                 "name": "@parameter",
 *                 "text": "Parameter three.\n"
 *             },
 *             {
 *                 "name": "@NewInventedTag",
 *                 "text": "This is a new invented tag. \nThe first letter is uppercased, but in Markdown output, all the tags will be capitalized.\n\n\n"
 *             }
 *         ]
 *     ]
 * }
 * ```
 *
 * And a Markdown file (when `-f markdown` is provided) like:
 *
 * ```js
 * Default context for the current Javadoc comment.
 * Default context for the current Javadoc comment.
 * Default context for the current Javadoc comment.
 * 
 * **Name:** Some name
 * 
 * **Property:** Property name. 
 * 
 * Property explanation
 * 
 * **Class:** Class name.
 * 
 * **Method:** Method name.
 * 
 * **Description:** This is a description.
 * Any tag can be multiline, not only description.
 * Take into account that the order of them is respected when generating JSON or Markdown.
 * 
 * **Parameter:** Parameter one.
 * 
 * **Parameter:** Parameter two.
 * 
 * **Parameter:** Parameter three.
 *
 * **NewInventedTag:** This is a new invented tag. 
 * The first letter is uppercased, but in Markdown output, all the tags will be capitalized.
 * ```
 * 
 * Which results, seen by a browser, into: 
 * 
 * -----
 * 
 * Default context for the current Javadoc comment.
 * Default context for the current Javadoc comment.
 * Default context for the current Javadoc comment.
 * 
 * **Name:** Some name
 * 
 * **Property:** Property name. 
 * 
 * Property explanation
 * 
 * **Class:** Class name.
 * 
 * **Method:** Method name.
 * 
 * **Description:** This is a description.
 * Any tag can be multiline, not only description.
 * Take into account that the order of them is respected when generating JSON or Markdown.
 * 
 * **Parameter:** Parameter one.
 * 
 * **Parameter:** Parameter two.
 * 
 * **Parameter:** Parameter three.
 *
 * **NewInventedTag:** This is a new invented tag. 
 * The first letter is uppercased, but in Markdown output, all the tags will be capitalized.
 * 
 * -----
 *
 * As you can see:
 * 
 *  - each tag name is capitalized, and the **`@`** is removed.
 * 
 *  - the first **&#42;** is removed too, with the previous space or tabulation, and the first space, if any.
 *
 *  - the name of the tag is inserted in bold, followed by **`:`** and then the next content.
 *
 *  - the other content is just markdown, and it is up to the developer what to show and how.
 *
 *
 * Finally, in any case, if you have another needs or you want to manage the data extracted from the 
 * Javadoc comments in other ways, you can take the JSON output, and play with it. In the end, this is how 
 * the markdown code is generated.
 *
 *
 *
 */