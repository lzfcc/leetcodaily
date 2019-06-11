function permutation(n, k) {
    let facSeq = [];
    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let f = 1
    for (let x of nums) {
        f *= x
        facSeq.push(f);
    }

    let res = 0;
    k--;
    while (--n > 0) {
        const m = (k / facSeq[n - 1]) | 0;
        res = res * 10 + nums[m];
        k = k - m * facSeq[n - 1];
        nums.splice(m, 1);
    }
    res = res * 10 + nums[0];
    console.log(res)
}

permutation(1, 1);
permutation(3, 4);
permutation(4, 13);
permutation(5, 77);

var permute = function (nums) {
    if (nums.length == 1) {
        return [nums];  //attention: not [...arr]
    }
    let res = [];
    let n = nums.length;
    for (let i = 0; i < n; i++) {
        const e = nums[i];
        nums.splice(i, 1);
        for (let p of permute(nums)) {  //attention: not for...in
            res.push([e, ...p]);
        }
        nums.splice(i, 0, e);
    }
    return res;
};

var permute = function (nums) {
    if (nums.length <= 1) {
        return [nums];
    }
    const e = nums.pop();
    const allButLastPermutations = permute(nums);
    let res = [];
    for (let p of allButLastPermutations) {
        for (let i = 0; i <= p.length; i++) {
            let tmp = [...p];
            tmp.splice(i, 0, e)
            res.push(tmp);
        }
    }
    return res;
};
console.log(permute([1, 2, 3]));