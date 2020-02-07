const { expect } = require("chai");
const Javadoc = require(__dirname + "/../src/javadoc.js");

describe("Method Javadoc.generate(includes, excludes)", function() {

    it("can include, exclude, format markdown and output file", function(done) {
        Javadoc.generate({
            include: [
                __dirname + "/test-3/**/*.js",
                __dirname + "/test-3/**/*.json",
                __dirname + "/test-3/**/*.md"
            ],
            exclude: [
                "**/*.md",
                "**/*.json"
            ],
            format: "md",
            output: __dirname + "/test-3/README.api.md.txt"
        }).then(output => {
            return done();
        }).catch(error => {
            console.log("Error", error);
            expect(true).to.equal(false);
        });
    });

    it("can include, exclude, format json and output file", function(done) {
        Javadoc.generate({
            include: [
                __dirname + "/test-3/**/*.js",
                __dirname + "/test-3/**/*.json",
                __dirname + "/test-3/**/*.md"
            ],
            exclude: [
                "**/*.md",
                "**/*.json"
            ],
            format: "json",
            output: __dirname + "/test-3/README.api.json"
        }).then(output => {
            return done();
        }).catch(error => {
            console.log("Error", error);
            expect(true).to.equal(false);
        });
    });

    it("can work without matching files", function(done) {
        Javadoc.generate({
            include: [
                __dirname + "/test-3/**/*.jss",
                __dirname + "/test-3/**/*.json",
                __dirname + "/test-3/**/*.md"
            ],
            exclude: [
                "**/*.md",
                "**/*.json"
            ],
            format: "json",
            output: __dirname + "/test-3/README.api.json"
        }).then(output => {
            return done();
        }).catch(error => {
            console.log("Error", error);
            expect(true).to.equal(false);
        });
    });

});