const fs = require('fs');
const path = require("path");

function printFile(filename) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, function(err, data) {
            if (err) {
                reject(err);
                return;
            }
            resolve(data.toString());
        });
    });
}

const makeRequest = () => {
    try {
        console.log(`__filename=${__filename}, __dirname=${__dirname}`);
        printFile(path.resolve(__dirname, 'wrong.json')).then(result => {
            const data = JSON.parse(result);
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    } catch(err) {  //不能处理 JSON.parse 的错误，因为它在 Promise 中
        console.log(err);
    }
}

const betterMakeRequest = async () => {
    try {
        const result = await printFile(path.resolve(__dirname, 'test.json'));
        const data = JSON.parse(result);
        console.log(data);
    } catch(err) {  
        console.log(err);
    }
}

betterMakeRequest()