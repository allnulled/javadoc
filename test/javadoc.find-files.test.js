const path = require("path");
const { expect } = require("chai");
const Javadoc = require(__dirname + "/../src/javadoc.js");

describe("Method Javadoc.findFiles(includes, excludes)", function() {

    it("can find multiple included and exclude multiple file patterns", function(done) {
        Javadoc.findFiles([
            "**/*.js",
            "**/*.json",
            "**/*.md"
        ], ["**/*.json", "**/*.js"], {
            cwd: __dirname + "/test-1"
        }).then(files => {
            expect(files.length).to.equal(1);
            expect(path.basename(files[0])).to.equal("file2.md");
            return done();
        }).catch(error => {
            console.log(error);
            expect(true).to.equal(false);
        });
    });

});