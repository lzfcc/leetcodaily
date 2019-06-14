const fs = require('fs');
const path = require("path");
const DIR_PATH = __dirname;

module.exports = function(n) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            fs.readFile(path.resolve(DIR_PATH, `test${n}.json`), {'encoding':'utf8'}, function(err, data){
                if (err) {
                    reject(err);
                    return;
                }
                resolve(new ServerData(data));
            });
        }, 1000//Math.ceil(3000 * Math.random())
        );
    });
}

class ServerData {
    constructor(dataString) {
        this.data = JSON.parse(dataString);
    }
    text() {
        return this.data['content'];
    }
}
