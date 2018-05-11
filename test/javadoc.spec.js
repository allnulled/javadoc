var report = require("assertivity").generate().report;
var exec = require("execute-command-sync");
var javadoc = require("../src/javadoc.js");
var fs = require("fs");
var path = require("path");
var rimraf = require("rimraf");
var equals = require("assert").deepEqual;
var testFiles = {
		examplesPattern: __dirname + "/examples/**/*.js",
		sample: __dirname + "/examples/sample.js",
		sample1: __dirname + "/examples/sample-1.js",
		sample2: __dirname + "/examples/sample-2.js",
		sample3: __dirname + "/examples/sample-3.js",
		sample4: __dirname + "/examples/sample-4.js",
		sample5: __dirname + "/examples/sample-5.js",
		outputs: __dirname + "/outputs",
		javadoc1: __dirname + "/outputs/tmp-javadoc-1.json",
		javadoc2: __dirname + "/outputs/tmp-javadoc-2.md",
		javadoc3: __dirname + "/outputs/tmp-javadoc-3.md",
		javadoc4Error: __dirname + "/outputs/tmp-javadoc-3.md/impossible-file.json"
};
rimraf.sync(testFiles.outputs);
var data1 = javadoc.generate({
		include: [
				testFiles.examplesPattern
		],
		exclude: [
				"!" + testFiles.sample5 // We can negate the excluded files or not, they will start always with "!", independently
		],
		format: "json",
		output: testFiles.javadoc1
});
var data2 = javadoc.generate({
		include: [
				testFiles.sample1,
				testFiles.sample2
		],
		format: "markdown",
		output: testFiles.javadoc2
});
var data3 = javadoc.generate({
		include: [testFiles.sample],
		format: "markdown",

});
// @TEST: API > include parameter works
// @TEST: API > exclude parameter works
// @TEST: API > output parameter works
// @TEST: API > format parameter works
report.as("Javadoc file 1 was generated").that(fs.existsSync(testFiles.javadoc1)).is.true();
report.as("Javadoc file 2 was generated").that(fs.existsSync(testFiles.javadoc2)).is.true();
var javadoc1Contents = fs.readFileSync(testFiles.javadoc1).toString();
var javadoc1 = JSON.parse(javadoc1Contents);
var javadoc2 = fs.readFileSync(testFiles.javadoc2).toString();
report.as("JSON format > Returns the JSON too").that.it.safely(() => JSON.parse(data1));
report.as("JSON format > Exports JSON object").that(javadoc1).is.object();
report.as("JSON format > Matches glob patterns correctly (include and exclude)").that(Object.keys(javadoc1).length).is(5);
report.as("JSON format > Exported all files").that(javadoc1).has.keys([
		testFiles.sample,
		testFiles.sample1,
		testFiles.sample2,
		testFiles.sample3,
		testFiles.sample4,
]);
report.as("JSON format > File data is array (1)").that(javadoc1[testFiles.sample]).is.array();
report.as("JSON format > File data is array (2)").that(javadoc1[testFiles.sample1]).is.array();
report.as("JSON format > File data is array (3)").that(javadoc1[testFiles.sample2]).is.array();
report.as("JSON format > File data is array (4)").that(javadoc1[testFiles.sample3]).is.array();
report.as("JSON format > File data is array (5)").that(javadoc1[testFiles.sample4]).is.array();
report.as("JSON format > Takes all comments (1)").that(javadoc1[testFiles.sample]).is.array();
report.as("JSON format > Takes all comments (2)").that(javadoc1[testFiles.sample1]).is.array();
report.as("JSON format > Takes all comments (3)").that(javadoc1[testFiles.sample2]).is.array();
report.as("JSON format > Takes all comments (4)").that(javadoc1[testFiles.sample3]).is.array();
report.as("JSON format > Takes all comments (5)").that(javadoc1[testFiles.sample4]).is.array();
report.as("JSON format > Separates all comments as expected (1)").that(javadoc1[testFiles.sample1]).is.array();
report.as("JSON format > Separates all comments as expected (2)").that(javadoc1[testFiles.sample1].length).is(2);
report.as("JSON format > Separates all tags as expected (1)").that.it(javadoc1[testFiles.sample1][0]).is.array();
report.as("JSON format > Separates all tags as expected (2)").that.its("0", "name").is("default");
report.as("JSON format > Separates all tags as expected (3)").that.its("1", "name").is("@param");
report.as("JSON format > Separates all tags as expected (4)").that.its("2", "name").is("@param");
report.as("JSON format > Separates all tags as expected (5)").that.its("3", "name").is("@intercalado");
report.as("JSON format > Separates all tags as expected (6)").that.its("4", "name").is("@name");
report.as("JSON format > Separates all tags as expected (7)").that.its("5", "name").is("@attr");
report.as("JSON format > Separates all tags as expected (8)").that.its("6", "name").is("@param");
report.as("JSON format > Separates all tags as expected (9)").that.its("7", "name").is("@returns");
report.as("JSON format > Separates all tags as expected (10)").that.its("8", "name").is("@code");
report.as("JSON format > Separates all tags as expected (11)").that.its("9", "name").is("@description");
report.as("JSON format > Separates all tags as expected (12)").that.its("10", "name").is("@");
report.as("JSON format > Separates all tags as expected (13)").that.it(javadoc1[testFiles.sample1][1]).is.array();
report.as("JSON format > Separates all tags as expected (14)").that.its("0", "name").is("default");
report.as("JSON format > Separates all tags as expected (15)").that.its("1", "name").is("@another");
report.as("JSON format > Assigns the text as expected (1)").that(javadoc1[testFiles.sample1][0]).is.array();
report.as("JSON format > Assigns the text as expected (2)").that.its("0", "text").is("\n\nThis is on the 'default' property.");
report.as("JSON format > Assigns the text as expected (3)").that.its("1", "text").is("Parameter one");
report.as("JSON format > Assigns the text as expected (4)").that.its("2", "text").is("Parameter two");
report.as("JSON format > Assigns the text as expected (5)").that.its("3", "text").is("ok");
report.as("JSON format > Assigns the text as expected (6)").that.its("4", "text").is("Name");
report.as("JSON format > Assigns the text as expected (7)").that.its("5", "text").is("Attribute");
report.as("JSON format > Assigns the text as expected (8)").that.its("6", "text").is("Parameter three");
report.as("JSON format > Assigns the text as expected (9)").that.its("7", "text").is("Returns");
report.as("JSON format > Assigns the text as expected (10)").that.its("8", "text").is("This block must have indentation\n\n```js\nvar a = {\n b: {\n   c: {\n     d: \"e\"\n   }\n }\n};\n```\n");
report.as("JSON format > Assigns the text as expected (11)").that.its("9", "text").is("Something else\n\nBut multiline too.");
report.as("JSON format > Assigns the text as expected (12.1)").that(javadoc1[testFiles.sample1][0][10].text).is.string();
report.as("JSON format > Assigns the text as expected (12.2)").that(javadoc1[testFiles.sample1][0][10].text).is.empty();
report.as("JSON format > Assigns the text as expected (12.3)").that(javadoc1[testFiles.sample1][0][10].text).is("");
report.as("JSON format > Assigns the text as expected (13)").that(javadoc1[testFiles.sample1][1]).is.array();
report.as("JSON format > Assigns the text as expected (14)").that.its("0", "text").is("\n\nAnother comment.");
report.as("JSON format > Assigns the text as expected (15)").that.its("1", "text").is("tag");
report.as("JSON format > Return the same data generated").that.it.safely(() => equals(JSON.parse(data1), javadoc1));
report.as("Comments > Multiline comments are escaped ('* /' becomes '*/')").that(javadoc1Contents).has("*/");
report.as("Markdown format > tag names and values are correct (1)").that(javadoc2).has("**Name:** Name");
report.as("Markdown format > tag names and values are correct (2)").that(javadoc2).has("**Attr:** Attribute");
report.as("Markdown format > tag names and values are correct (3)").that(javadoc2).has(`This is on the 'default' property.

**Param:** Parameter one

**Param:** Parameter two

**Intercalado:** ok

**Name:** Name

**Attr:** Attribute

**Param:** Parameter three

**Returns:** Returns

**Code:** This block must have indentation

\`\`\`js
var a = {
 b: {
   c: {
     d: "e"
   }
 }
};
\`\`\`
`);
report.as("Markdown format > tag names and values are correct (4)").that(javadoc2).has("**Returns:** Returns");
report.as("Markdown format > tag names and values are correct (5)").that(javadoc2).has("**Code:** This block must have indentation");
report.as("Markdown format > tag names and values are correct (6)").that(javadoc2).has("**Description:** Something else");
report.as("Markdown format > tag names and values are correct (7)").that(javadoc2).has("**Another:** tag");
report.as("Markdown format > tag names and values are correct (8)").that(javadoc2).has(`var a = {
 b: {
   c: {
     d: "e"
   }
 }
};`);
report.as("Markdown format > Generated comments also return the data generated").that(data2).is.like(javadoc2);
exec(`node bin/javadoc.cli.js --include "${testFiles.sample}" -f "markdown" > "${testFiles.javadoc3}"`, {
		cwd: path.resolve(__dirname + "/..")
});
// @TEST: CLI > include parameter works
// @TEST: CLI > exclude parameter works
// @TEST: CLI > output parameter works
// @TEST: CLI > format parameter works
// @TEST: CLI > without parameters it also works
var javadoc3 = fs.readFileSync(testFiles.javadoc3).toString().replace(/\n$/g, "");
report.as("CLI outputs the same as the programmatic API does").that(data3).is.like(javadoc3);
report.as("Error is thrown when directory is an already existing file").that.it.throws(function() {
		javadoc.generate({
				include: [testFiles.examplesPattern],
				format: "json",
				output: testFiles.javadoc4Error
		});
});