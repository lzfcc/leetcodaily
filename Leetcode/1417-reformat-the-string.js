// 这个题目虽然是 easy，但可以学到一个新写法，Array.from 是可以传第二个参数的（map 函数，之前我总是要写 Array(n).fill(0).map(() => []) 这样的）
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from
// 另外，他用 01 来切换两个数组 + 用一个变量 i 除以 2 的思路很巧

// 代码改编自 submission 排行
var reformat = function(s) {
    const storage = Array.from(new Array(2), () => []);
    for (const c of s) {
        if (c >= '0' && c <= '9') storage[0].push(c);
        else storage[1].push(c);
    }
    let idx = storage[0].length > storage[1].length ? 0 : 1;
    if (storage[idx].length - storage[1-idx].length > 1) return '';
    const res = new Array(s.length);
    for (let i = 0; i < s.length; ++i) {
        res[i] = storage[idx][i >> 1];
        idx = 1 - idx;
    }
    return res.join('');
};

// 这个测试用例太有历史意义了……
/*
Example 4:

Input: s = "covid2019"
Output: "c2o0v1i9d"
*/