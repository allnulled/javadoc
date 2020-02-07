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

`$ javadoc --include **/*.js **/*.ts --exclude **/node_modules/** --format markdown --output README.md`

Or abbreviatedly:

`$ javadoc -i **/*.php **/*.sql -e **/node_modules/** -f json -o README.md`

Type `javadoc` to see the help.

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
