//await 只能说用在 async 函数中，用在普通函数中报错。
//即使将 forEach 方法参数改成 async 仍然有问题
//http://www.ruanyifeng.com/blog/2015/05/async.html

const fetch = require('./MockFetch/mockFetch');

async function dbPost(n) {
    const data = await fetch(n);
    return `#${n}:${data.text()}`
}

// async function dbFuc(db) {
//     let docs = [1, 2, 3];
//     let result = [];
//     // 可能得到错误结果 这时三个 db.post 操作将是并发执行
//     docs.forEach(async function (doc) {
//        //result.push(await dbPost(doc));
//        console.log(await dbPost(doc));
//     });
//     return result;
// }

// 正确用法是for循环
async function dbFuc(db) {
    let docs = [1, 2, 3];

    let result = [];
    for (let doc of docs) {
        result.push(await dbPost(doc));
    }
    return result;
}

//如果确实想要并发，使用 Promise.all
async function dbFuc(db) {
    let docs = [1, 2, 3];
    let promises = docs.map((doc) => dbPost(doc));

    let results = await Promise.all(promises);
    return results;
}

dbFuc().then(function (result) {
    console.log(result);
});

//不同风格的异步处理方法比较：
// function chainRequest(requests) {
//     let ret = null;
//     let p = Promise.resolve();
//     for (let req of requests) {
//         p = p.then(function (val) {
//             ret = val;
//             return req;
//         });
//     }
//     return p.catch(function (e) { }).then(function () {
//         return ret;
//     });
// }

// async function chainRequest(requests) {
//     let ret = null;
//     try {
//         for (let req of requests) {
//             ret = await req;
//         }
//     } catch (e) { }
//     return ret.text();
// }

function spawn(genF) {
    return new Promise(function (resolve, reject) {
        const gen = genF();
        function step(nextF) {
            let next;
            try {
                next = nextF();
            } catch (e) {
                return reject(e);
            }
            if (next.done) {
                return resolve(next.value);
            }
            Promise.resolve(next.value).then(function (v) {
                step(function () { return gen.next(v); });
            }, function (e) {
                step(function () { return gen.throw(e); });
            });
        }
        step(function () { return gen.next(undefined); });
    });
}


function chainRequest(requests) {
    return spawn(function* () {
        let ret = null;
        try {
            for (let req of requests) {
                ret = yield req;
            }
        } catch (e) {
            /* 忽略错误，继续执行 */
        }
        return ret.text();
    });
}

let reqList = [fetch(1), fetch(2), fetch(3), fetch(4)];

chainRequest(reqList).then(function (res) {
    console.log(res);
});