function ext_euclid(a, b) {
    if (b == 0) {
        return [1, 0, a];
    } else {
        let [x, y, q] = ext_euclid(b, a % b);
        [x, y] = [y, x - ((a / b) | 0) * y];
        return [x, y, q];
    }
}

ext_euclid(3, 5)  //4 mod 5 的逆元是3。即假定有两个整数 a, b，满足 a/b 是整数，且 a, b mod 5 的分别 4 和 3，那么 a/b mod 5 = 3。比如a=9，b=3