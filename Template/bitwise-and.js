var rangeBitwiseAnd = function(m, n) {
    if (m === n) return m;
    let pow = 1;
    for (let i = 1; i < 32; i++) {
        pow <<= 1;
        if (pow > n) break;
    }
    let base = pow >>> 1; // pow may overflow to negative... use >>> instead of >>
    if (base > m) {
        return 0;
    } else {
        return base + rangeBitwiseAnd(m - base, n - base);
    }
};

// Solution 里最靠前的答案竟然是……这不是也太直接了
var rangeBitwiseAnd = function(m, n) {
	if (m === 0 || n / m > 2) return 0;
	let res = m;
	for (let i = m + 1; i <= n; i++) {
		res = res & i;
	}
	return res;
};
// 甚至还有短到难以理解
var rangeBitwiseAnd = function(m, n) {
    while(n > m) {
        n = n & n-1; // 不断抹除最低位 1
    }
    return m & n; //注： 这里直接返回 n 就可以了，n 现在是从 m 到 n（输入时的）所有数的公共前缀 
};
// m = 1010110
// n = 1101010
// x = 1000000 （公共前缀）
// m = (0)0001101
// n = (0)1010110
// x = (0)0000000

let ans = rangeBitwiseAnd(5,7)
console.log(ans)
ans = rangeBitwiseAnd(2,3)
console.log(ans)
ans = rangeBitwiseAnd(8219783, 929939421)
console.log(ans)
ans = rangeBitwiseAnd(8964, 1000203)
console.log(ans)
ans = rangeBitwiseAnd(2132030030, 2147483647)
console.log(ans)
