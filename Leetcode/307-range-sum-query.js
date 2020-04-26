var NumArray = function(nums) {
    const N = nums.length;
	this.nums = Array(N).fill(0); // 0-indexed
	this.sums = Array(N + 1).fill(0); // 1-index
	for (let i = 0; i < N; i++) {
		this.update(i, nums[i]);
	}
};

const lowbit = x => x & (-x);

/** 
 * @param {number} i 
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function(i, val) {
    const delta = val - this.nums[i];
    this.nums[i] = val;
    for (let idx = i + 1; idx <= this.nums.length; idx += lowbit(idx)) {
        this.sums[idx] += delta;
    }
};

NumArray.prototype.query = function(n) {
	let sum = 0;
    for (let idx = n + 1; idx > 0; idx -= lowbit(idx)) {
      sum += this.sums[idx];
    }
    return sum;
}

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
	return this.query(j) - this.query(i - 1);
};

var obj = new NumArray([1,2,3,4,5,6,7,8]);
obj.update(4, -5);
var res = obj.sumRange(0, 4);
console.log(res, obj.nums)
obj.update(2, 5);
res = obj.sumRange(2, 7);
console.log(res, obj.nums)
