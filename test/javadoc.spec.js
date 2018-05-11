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
		sample6: __dirname + "/examples/sample-6.js",
		sample7: __dirname + "/examples/sample-7.js",
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
var javadoc1Contents = fs.readFileSync(testFiles.javadoc1).toString();
var javadoc1 = JSON.parse(javadoc1Contents);
var javadoc2 = fs.readFileSync(testFiles.javadoc2).toString();
exec(`node bin/javadoc.cli.js --include "${testFiles.sample}" -f "markdown" > "${testFiles.javadoc3}"`, {
		cwd: path.resolve(__dirname + "/..")
});
var javadoc3 = fs.readFileSync(testFiles.javadoc3).toString().replace(/\n$/g, "");

report.as("Javadoc file 1 was generated").into("Sentence 0").that(fs.existsSync(testFiles.javadoc1)).is.true();
report.as("Javadoc file 2 was generated").into("Sentence 1").that(fs.existsSync(testFiles.javadoc2)).is.true();
report.as("JSON format > Returns the JSON too").into("Sentence 2").that.it.safely(() => JSON.parse(data1));
report.as("JSON format > Exports JSON object").into("Sentence 3").that(javadoc1).is.object();
report.as("JSON format > Matches glob patterns correctly (include and exclude)").into("Sentence 4").that(Object.keys(javadoc1).length).is(6);
report.as("JSON format > Exported all files").into("Sentence 5").that(javadoc1).has.keys([
		testFiles.sample,
		testFiles.sample1,
		testFiles.sample2,
		testFiles.sample3,
		testFiles.sample4,
]);
report.as("JSON format > File data is array (1)").into("Sentence 6").that(javadoc1[testFiles.sample]).is.array();
report.as("JSON format > File data is array (2)").into("Sentence 7").that(javadoc1[testFiles.sample1]).is.array();
report.as("JSON format > File data is array (3)").into("Sentence 8").that(javadoc1[testFiles.sample2]).is.array();
report.as("JSON format > File data is array (4)").into("Sentence 9").that(javadoc1[testFiles.sample3]).is.array();
report.as("JSON format > File data is array (5)").into("Sentence 10").that(javadoc1[testFiles.sample4]).is.array();
report.as("JSON format > Takes all comments (1)").into("Sentence 11").that(javadoc1[testFiles.sample]).is.array();
report.as("JSON format > Takes all comments (2)").into("Sentence 12").that(javadoc1[testFiles.sample1]).is.array();
report.as("JSON format > Takes all comments (3)").into("Sentence 13").that(javadoc1[testFiles.sample2]).is.array();
report.as("JSON format > Takes all comments (4)").into("Sentence 14").that(javadoc1[testFiles.sample3]).is.array();
report.as("JSON format > Takes all comments (5)").into("Sentence 15").that(javadoc1[testFiles.sample4]).is.array();
report.as("JSON format > Separates all comments as expected (1)").into("Sentence 16").that(javadoc1[testFiles.sample1]).is.array();
report.as("JSON format > Separates all comments as expected (2)").into("Sentence 17").that(javadoc1[testFiles.sample1].length).is(2);
report.as("JSON format > Separates all tags as expected (1)").into("Sentence 18").that.it(javadoc1[testFiles.sample1][0]).is.array();
report.as("JSON format > Separates all tags as expected (2)").into("Sentence 19").that.its("0", "name").is("default");
report.as("JSON format > Separates all tags as expected (3)").into("Sentence 20").that.its("1", "name").is("@param");
report.as("JSON format > Separates all tags as expected (4)").into("Sentence 21").that.its("2", "name").is("@param");
report.as("JSON format > Separates all tags as expected (5)").into("Sentence 22").that.its("3", "name").is("@intercalado");
report.as("JSON format > Separates all tags as expected (6)").into("Sentence 23").that.its("4", "name").is("@name");
report.as("JSON format > Separates all tags as expected (7)").into("Sentence 24").that.its("5", "name").is("@attr");
report.as("JSON format > Separates all tags as expected (8)").into("Sentence 25").that.its("6", "name").is("@param");
report.as("JSON format > Separates all tags as expected (9)").into("Sentence 26").that.its("7", "name").is("@returns");
report.as("JSON format > Separates all tags as expected (10)").into("Sentence 27").that.its("8", "name").is("@code");
report.as("JSON format > Separates all tags as expected (11)").into("Sentence 28").that.its("9", "name").is("@description");
report.as("JSON format > Separates all tags as expected (12)").into("Sentence 29").that.its("10", "name").is("@");
report.as("JSON format > Separates all tags as expected (13)").into("Sentence 30").that.it(javadoc1[testFiles.sample1][1]).is.array();
report.as("JSON format > Separates all tags as expected (14)").into("Sentence 31").that.its("0", "name").is("default");
report.as("JSON format > Separates all tags as expected (15)").into("Sentence 32").that.its("1", "name").is("@another");
report.as("JSON format > Assigns the text as expected (1)").into("Sentence 33").that(javadoc1[testFiles.sample1][0]).is.array();
report.as("JSON format > Assigns the text as expected (2)").into("Sentence 34").that.its("0", "text").is("\n\nThis is on the 'default' property.");
report.as("JSON format > Assigns the text as expected (3)").into("Sentence 35").that.its("1", "text").is("Parameter one");
report.as("JSON format > Assigns the text as expected (4)").into("Sentence 36").that.its("2", "text").is("Parameter two");
report.as("JSON format > Assigns the text as expected (5)").into("Sentence 37").that.its("3", "text").is("ok");
report.as("JSON format > Assigns the text as expected (6)").into("Sentence 38").that.its("4", "text").is("Name");
report.as("JSON format > Assigns the text as expected (7)").into("Sentence 39").that.its("5", "text").is("Attribute");
report.as("JSON format > Assigns the text as expected (8)").into("Sentence 40").that.its("6", "text").is("Parameter three");
report.as("JSON format > Assigns the text as expected (9)").into("Sentence 41").that.its("7", "text").is("Returns");
report.as("JSON format > Assigns the text as expected (10)").into("Sentence 42").that.its("8", "text").is("This block must have indentation\n\n```js\nvar a = {\n b: {\n   c: {\n     d: \"e\"\n   }\n }\n};\n```\n");
report.as("JSON format > Assigns the text as expected (11)").into("Sentence 43").that.its("9", "text").is("Something else\n\nBut multiline too.");
report.as("JSON format > Assigns the text as expected (12.1)").into("Sentence 44").that(javadoc1[testFiles.sample1][0][10].text).is.string();
report.as("JSON format > Assigns the text as expected (12.2)").into("Sentence 45").that(javadoc1[testFiles.sample1][0][10].text).is.empty();
report.as("JSON format > Assigns the text as expected (12.3)").into("Sentence 46").that(javadoc1[testFiles.sample1][0][10].text).is("");
report.as("JSON format > Assigns the text as expected (13)").into("Sentence 47").that(javadoc1[testFiles.sample1][1]).is.array();
report.as("JSON format > Assigns the text as expected (14)").into("Sentence 48").that.its("0", "text").is("\n\nAnother comment.");
report.as("JSON format > Assigns the text as expected (15)").into("Sentence 49").that.its("1", "text").is("tag");
report.as("JSON format > Return the same data generated").into("Sentence 50").that.it.safely(() => equals(JSON.parse(data1), javadoc1));
report.as("Comments > Multiline comments are escaped ('* /' becomes '*/')").into("Sentence 51").that(javadoc1Contents).has("*/");
report.as("Markdown format > tag names and values are correct (1)").into("Sentence 52").that(javadoc2).has("**Name:** Name");
report.as("Markdown format > tag names and values are correct (2)").into("Sentence 53").that(javadoc2).has("**Attr:** Attribute");
report.as("Markdown format > tag names and values are correct (3)").into("Sentence 54").that(javadoc2).has(`This is on the 'default' property.

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
report.as("Markdown format > tag names and values are correct (4)").into("Sentence 55").that(javadoc2).has("**Returns:** Returns");
report.as("Markdown format > tag names and values are correct (5)").into("Sentence 56").that(javadoc2).has("**Code:** This block must have indentation");
report.as("Markdown format > tag names and values are correct (6)").into("Sentence 57").that(javadoc2).has("**Description:** Something else");
report.as("Markdown format > tag names and values are correct (7)").into("Sentence 58").that(javadoc2).has("**Another:** tag");
report.as("Markdown format > tag names and values are correct (8)").into("Sentence 59").that(javadoc2).has(`var a = {
 b: {
   c: {
     d: "e"
   }
 }
};`);
report.as("Markdown format > Generated comments also return the data generated").into("Sentence 60").that(data2).is.like(javadoc2);
// @TEST: CLI > include parameter works
// @TEST: CLI > exclude parameter works
// @TEST: CLI > output parameter works
// @TEST: CLI > format parameter works
// @TEST: CLI > without parameters it also works
report.as("CLI outputs the same as the programmatic API does").into("Sentence 61").that(data3).is.like(javadoc3);
report.as("Error is thrown when directory is an already existing file").into("Sentence 62").that.it.throws(function() {
		javadoc.generate({
				include: [testFiles.examplesPattern],
				format: "json",
				output: testFiles.javadoc4Error
		});
});
