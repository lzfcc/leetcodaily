// http://es6.ruanyifeng.com/#docs/async#%E5%AE%9E%E4%BE%8B%EF%BC%9A%E6%8C%89%E9%A1%BA%E5%BA%8F%E5%AE%8C%E6%88%90%E5%BC%82%E6%AD%A5%E6%93%8D%E4%BD%9C

const fetch = require('./MockFetch/mockFetch');

/**
 代码使用fetch方法，同时远程读取一组 URL。
 每个fetch操作都返回一个 Promise 对象，放入textPromises数组。
 然后，reduce方法依次处理每个 Promise 对象，使用then将所有 Promise 对象连起来就可以依次输出结果。
 */
// function requestOrder(urls) {
//     // 远程读取所有URL
//     const textPromises = urls.map(url => fetch(url).then(response => response.toString()));

//     // 按次序输出
//     textPromises.reduce((chain, textPromise) => {
//       return chain.then(() => textPromise)
//         .then(text => console.log(text));
//     }, Promise.resolve());
//   }

/**
这种写法不太直观，可读性比较差。下面是 async 函数实现。
 */
async function requestOrder(urls) {
    try {
        for (const url of urls) {
            const response = await fetch(url);
            console.log(await response.text());
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * 上面代码确实大大简化，问题是所有远程操作都是继发。
 * 只有前一个 URL 返回结果，才会去读取下一个 URL，这样做效率很差，非常浪费时间。
 * 我们需要的是并发发出远程请求
 */
// async function requestOrder(urls) {
//     // 并发读取远程URL

//     // 错误写法 fetch 返回的是 Promise 对象
//     // const textPromises = urls.map(url => {
//     //     const response = fetch(url);
//     //     return response.text();
//     // });

//     const textPromises = urls.map(async url => {
//         const response = await fetch(url);
//         return response.text();
//     });

//     // 按次序输出
//     for (const textPromise of textPromises) {
//         console.log(await textPromise);
//     }
// }

requestOrder([1, 2, 3, 4])


