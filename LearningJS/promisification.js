//https://javascript.info/promisify

const fs = require('fs');
function promisify(f) {
    return function (...args) { // return a wrapper-function
        return new Promise((resolve, reject) => {
            function callback(err, result) { // our custom callback for f
                if (err) {
                    return reject(err);
                } else {
                    resolve(result);
                }
            }
            args.push(callback); // append our custom callback to the end of arguments
            f.call(this, ...args); // call the original function
        });
    };
};

function loadFile(src, callback) {
    fs.readFile(src, callback);
}

let loadFilePromise = promisify(loadFile);
loadFilePromise('./promisification.jss').then(function (buffer) {
    console.log(buffer.toString());
}, function(err) {
    console.log(err);
});