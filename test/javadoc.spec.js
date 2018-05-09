var report = require("assertivity").generate().report;
var exec = require("execute-command-sync");
var javadoc = require("../src/javadoc.js");
var fs = require("fs");
var path = require("path");
var equals = require("assert").deepEqual;
var testFiles = {
		examplesPattern: __dirname + "/examples/**/*.js",
		sample: __dirname + "/examples/sample.js",
		sample1: __dirname + "/examples/sample-1.js",
		sample2: __dirname + "/examples/sample-2.js",
		sample3: __dirname + "/examples/sample-3.js",
		sample4: __dirname + "/examples/sample-4.js",
		sample5: __dirname + "/examples/sample-5.js",
		javadoc1: __dirname + "/tmp-javadoc-1.json",
		javadoc2: __dirname + "/tmp-javadoc-2.md",
		javadoc3: __dirname + "/tmp-javadoc-3.md",
};
var consoleLog = console.log;
var consoleLogged = [];
function consoleNolog() {
		consoleLogged = consoleLogged.concat(Array.prototype.slice.call(arguments));
};
console.log = consoleNolog;
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
		format: "markdown"
});
console.log = consoleLog;
// @TEST: API > include parameter works
// @TEST: API > exclude parameter works
// @TEST: API > output parameter works
// @TEST: API > format parameter works
report.as("Javadoc file 1 was generated").that(fs.existsSync(testFiles.javadoc1)).is.true();
report.as("Javadoc file 2 was generated").that(fs.existsSync(testFiles.javadoc2)).is.true();
var javadoc1 = JSON.parse(fs.readFileSync(testFiles.javadoc1).toString());
var javadoc2 = fs.readFileSync(testFiles.javadoc2).toString();
report.as("JSON format > Returns the JSON too").that.it.safely(()=>JSON.parse(data1));
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
report.as("JSON format > Separates all tags (1)").that(javadoc1[testFiles.sample1][0]).has.keys([
		"default",
		"@name",
		"@attr",
		"@param",
		"@returns",
		"@code",
		"@description"
]);
report.as("JSON format > Separates all tags (2)").that(javadoc1[testFiles.sample1][1]).has.keys([
		"default",
		"@another"
]);
report.as("JSON format > Separates all tags (3)").that(javadoc1[testFiles.sample2][0]).has.keys([
		"default"
]);
report.as("JSON format > Separates all tags (4)").that(javadoc1[testFiles.sample3][0]).has.keys([
		"default",
		"@Something",
		"@SomethingElse"
]);
report.as("JSON format > Separates all tags (5)").that(javadoc1[testFiles.sample4][0]).has.keys([
		"default",
		"@file"
]);
report.as("JSON format > Separates all tags (6)").that(javadoc1[testFiles.sample][0]).has.keys([
		"default",
		"@Lots"
]);
report.as("JSON format > Return the same data generated").that.it.safely(() => equals(JSON.parse(data1), javadoc1));
report.as("Comments > Multiline comments are escaped ('* /' becomes '*/')").that(javadoc1[testFiles.sample][0]["@Lots"][0]).has("/* This is a multiline comment test */");
report.as("Markdown format > tag names and values are correct (1)").that(javadoc2).has("**Name:** Name");
report.as("Markdown format > tag names and values are correct (2)").that(javadoc2).has("**Attr:** Attribute");
report.as("Markdown format > tag names and values are correct (3)").that(javadoc2).has("**Param:** Parameter one,Parameter two,Parameter three");
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
//consoleLog(consoleLogged);
report.as("Output > Works by console too").that(consoleLogged).has(' \n\n\n**Lots:** /* This is a multiline comment test */\nthings\nto\n\nsay\n\n\n\n\n \n\n\n\n**Param:** Parameter one,Parameter two,Parameter three\n\n**Intercalado:** ok,ok,ok,ok,ok,ok\n\n```js\nvar a = {\n  b: {\n    c: {\n      d: "e"\n    }\n  }\n};\n```\n\n\n**Name:** Name\n\n**Attr:** Attribute\n\n**Returns:** Returns\n\n**Code:** This block must have indentation\n\n**Description:** Something else\n\nBut multiline too.\n\n\n\n\n');
// consoleLog(consoleLogged);
console.log = consoleNolog;
exec(`node bin/javadoc.cli.js --include "${testFiles.sample}" -f "markdown" > "${testFiles.javadoc3}"`, {
	cwd: path.resolve(__dirname + "/..")
});
console.log = consoleLog;
// @TEST: CLI > include parameter works
// @TEST: CLI > exclude parameter works
// @TEST: CLI > output parameter works
// @TEST: CLI > format parameter works
// @TEST: CLI > without parameters it also works
var javadoc3 = fs.readFileSync(testFiles.javadoc3).toString().replace(/\n$/g, "");
//consoleLog("DATA3", data3, "JAVADOC3", javadoc3, "JAVADOC3END");
// consoleLog("data3", data3.length);
// consoleLog("javadoc3", javadoc3.length);
report.as("CLI seems to work fine too, as it outputs the same as the programmatic API").that(data3).is.like(javadoc3);
// fs.unlinkSync(__dirname + "/tmp-javadoc-1.json");
// fs.unlinkSync(__dirname + "/tmp-javadoc-2.md");
//fs.unlinkSync(__dirname + "/tmp-javadoc-3.md");