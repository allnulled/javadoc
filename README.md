# javadoc

![](https://img.shields.io/badge/javadoc-v1.0.6-green.svg) ![](https://img.shields.io/badge/tests-passing-green.svg) ![](https://img.shields.io/badge/statements--coverage-100%25-green.svg) ![](https://img.shields.io/badge/branches--coverage-100%25-green.svg) ![](https://img.shields.io/badge/functions--coverage-100%25-green.svg) ![](https://img.shields.io/badge/lines--coverage-100%25-green.svg) 

![](https://img.shields.io/badge/full--coverage-yes-green.svg)

Simple tool to generate JSON or Markdown text from Javadoc comments.

## 1. Installation

`~$ npm install -s javadoc`

To use the CLI anywhere, install it globally:

`~$ npm install -g javadoc`

To see the help, run:

`javadoc --help`

## 2. Specify Javadoc comments

A valid Javadoc unit of information is made by any JavaScript comment that:

· Starts with tabulations or spaces or nothing, followed by `/**`.

· Each line of it starts with tabulations or spaces or nothing, followed by `*`

· Ends with tabulations or spaces or nothing, followed by `*/`.

The contents of a Javadoc unit can be split by parts.

Each part is made by ` * @Name_of_the_part Contents of that part. It can take multiple lines.`.

If no part is specified, the contents will be put in `default` label (`@` omitted). When `--format markdown` is specified, .

### Example of Javadoc comment

#### Input:

```
/**
 * 
 * Information. This line will be put in "default" label 
 * In `--format markdown`, it will not have label.
 * In `--format json`, it will be put in label `default` (notice that `@` is omitted).
 * 
 * @name someConstant
 * @type *{Number}*.
 * @First_Label Information. This can be *markdown* code.
 * @Second_Label Information.
 * Multiple lines allowed.
 * @Third_Label More information.
 * 
 */
const someConstant = 100;
```

#### Output (with the options: `--format markdown`):

```
Information. This line will be put in "default" label 
In `--format markdown`, it will not have label.
In `--format json`, it will be put in label `default` (notice that `@` is omitted).

**Name:** someConstant

**Type:** *{Number}*.

**First Label:** Information. This can be *markdown* code.

**Second Label:** Information.
Multiple lines allowed.

**Third Label:** More information.
```

## 3. Extract documentation

### Extract documentation by the CLI

Once installed globally, you can run from your terminal:

`~$ javadoc -i 1.js 2.js 3.js -o out.md -f markdown -e 2.js`

Which would mean:

`~$ javadoc --include 1.js 2.js 3.js --output out.md --format markdown --exclude 2.js`

### Extract documentation by the API

The previous command, from the API, would be written like this:

```
require("javadoc").generate({
  include: ["1.js", "2.js", "3.js"],
  exclude: ["2.js"],
  format: "markdown",
  output: "out.md"
});
```

### Other considerations

Consider to omit the `exclude` and `format` option.

The default value of `format` option is `json`, not `markdown`.

By default, the values of each option are:

```
{
	include: ["**/*.js"],
	exclude: ["**/node_modules/**/*"],
	output: undefined,
	format: "json"
}
```

To add the symbols `*/` inside our Javadoc comments, simply write `* /` instead, and this will be translated to `*/` automatically.

## 4. Conclusion

Tons of tools for documenting software... this is a simple script that takes less than 200 lines and uses regular expressions, which means that this tool does not parse any specific programming language, but it works for any kind of document or file.

This is Javadoc, but in a wide sense.



















