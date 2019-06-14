const fs = require('fs');

function promise() {
    const args = Array.from(arguments);
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('1s passed... ?')
            resolve(args.reduce((prev, cur) => prev * cur));
        }, 1000);
    });
}

const makeRequest = () => {
    return promise(2).then(value1 => {
        return promise(value1).then(value2 => {
            return promise(value1, value2);
        });
    });
};

const betterMakeRequest = async () => {
    const value1 = await promise(2);
    const value2 = await promise(value1);
    return promise(value1, value2);
};

betterMakeRequest().then(console.log);