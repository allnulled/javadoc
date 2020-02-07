const { expect } = require("chai");
const path = require("path");
const Javadoc = require(__dirname + "/../src/javadoc.js");

describe("Method Javadoc.findCommentsInFile(file)", function () {

    it("can find multiple javadoc comments and return a JSON", function (done) {
        const filepath = path.resolve(__dirname + "/test-2/comments-1.js");
        Javadoc.findCommentsInFile(filepath).then(comments => {
            //console.log(comments);
            expect(comments).to.deep.equal([{
                _:
                    ['This is the default space for a description\nThis is the default space for a description\nThis is the default space for a description\nThis is the default space for a description\nThis is the default space for a description'],
                '@name':
                    ['This is a name\nCan I add something down?\nCan I add something down?\nCan I add something down?\nCan I add something down?'],
                '@type': ['This is a type'],
                '@parameter':
                    ['This is a parameter',
                        'This is a second parameter\nMore lines\nMore lines\nMore lines\nMore lines\nMore lines',
                        'This is a third parameter']
            },
            {
                _: ['General description.'],
                '@name': ['This is a name'],
                '@type': ['This is a type'],
                '@parameter':
                    ['This is a parameter',
                        'This is a second parameter',
                        'This is a third parameter'],
                '@description': ['This is the specific space for a description']
            }]);
            return done();
        }).catch(error => {
            console.log(error);
            expect(true).to.equal(false);
        });
    });

});