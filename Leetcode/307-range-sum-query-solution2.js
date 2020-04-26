var NumArray = function(nums) {
    this.nums = nums;
    const len = nums.length > 0 ? Math.ceil(nums.length / nums.length ** 0.5) : 0;
    this.rangeSum = Array(len).fill(0);
    for (let i = 0; i < nums.length; i++) {
        this.rangeSum[(i / len) | 0] += nums[i];
    }
};

/** 
 * @param {number} i 
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function(i, val) {
    const k = (i / this.rangeSum.length) | 0;
    this.rangeSum[k] = this.rangeSum[k] - this.nums[i] + val;
    this.nums[i] = val;
};

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
    let sum = 0;
    const len = this.rangeSum.length;
    const start = (i / len) | 0;
    const end = (j / len) | 0;
    if (start === end) {
        for (let k = i; k <= j; k++) sum += this.nums[k];
    } else {
        for (let k = i; k < (start + 1) * len; k++)
            sum += this.nums[k];
        for (let k = start + 1; k < end; k++)
            sum += this.rangeSum[k];
        for (let k = end * len; k <= j; k++)
            sum += this.nums[k];
    }
    return sum;
};

var obj = new NumArray([-28,-39,53,65,11,-56,-65,-39,-43,97]);
var operations = ["sumRange","update","sumRange","sumRange","update","update","sumRange","sumRange","update","update"]
var args = [[5,6],[9,27],[2,3],[6,7],[1,-82],[3,-72],[3,7],[1,8],[5,13],[4,-67]];
for (let i = 0; i < operations.length; i++) {
    const res = obj[operations[i]](...args[i]);
    console.log(res);
}