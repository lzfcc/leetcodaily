var letterCasePermutation = function(S) {
    const ret = [];
    if (S.length === 0) {
        return ret;
    }
    if (S.length === 1) {
        ret.push(S);
        if (S.match(/[A-Z]/)) {
            ret.push(S.toLowerCase());
        } else if (S.match(/[a-z]/)) {
            ret.push(S.toUpperCase());
        }
        return ret;
    }
    let c = S[0];
    const res = letterCasePermutation(S.substr(1));
    ret.push(...res.map(s => c + s));
    if (c.match(/[A-Z]/)) {
        c = c.toLowerCase();
        ret.push(...res.map(s => c + s));
    } else if (c.match(/[a-z]/)) {
        c = c.toUpperCase();
        ret.push(...res.map(s => c + s));
    }
    console.log(ret);
    return ret;
};

// 参考submission快速版本
var letterCasePermutation = function(S) {
    const result = []
    process(0, '');
    // 尾递归
    function process(pos, str) {
        if (S.length === str.length) {
            result.push(str);
            return;
        }
        const char = S[pos];
        if (!isNaN(char)) {
            process(pos + 1, str + char);
        } else {
            process(pos + 1, str + char.toUpperCase());
            process(pos + 1, str + char.toLowerCase());
        }
    }
    console.log(result);
    return result;
};

letterCasePermutation('a1b2');
letterCasePermutation('1234');
letterCasePermutation('');
letterCasePermutation('2k31bF');