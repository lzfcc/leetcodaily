// 全排列三个主题：求全排列，求第 k 个排列，求上一个/下一个全排列

// 一、求全排列
// 算法竞赛入门经典
var permute = function (nums, A = []) {
    if (nums.length === A.length) {
        console.log(A)
    } else {
        for (let i = 0; i < nums.length; i++) {
            let ok = 1
            for (let j = 0; j < A.length; j++) {
                if (A[j] == nums[i]) {
                    ok = 0
                }
            }
            if (ok) {
                A.push(nums[i])
                permute(nums, A)
                A.pop()
            }
        }
    }
};

permute([1, 2, 3])

// 好理解版本，但是输出顺序就比较乱
var permute = function (nums) {
    if (nums.length <= 1) {
        return [nums];
    }
    const e = nums.pop();
    let res = [];
    for (let p of permute(nums)) {
        for (let i = 0; i <= p.length; i++) {
            p.splice(i, 0, e);
            res.push([...p]);
            p.splice(i, 1);
        }
    }
    return res;
};

// 以上方法都用到 splice，尽管 C++ 也有功能类似到 erase 和 insert 方法可以实现，但还是有性能问题。
// 另外，如果有重复元素，输出的全排列中也有重复，这个问题如何解决呢？
//console.log(permute([1, 2, 3]));
//console.log(permute([1, 1, 3]));

// 生成全排列的经典算法是 Heap 算法，https://en.wikipedia.org/wiki/Heap%27s_algorithm
// 证明以及错误实现的那部分没看懂😓
function generate(k, A) {
    if (k === 1) {
        console.log(A);
    } else {
        // Generate permutations with kth unaltered
        // Initially k == length(A)
        generate(k - 1, A);

        // Generate permutations for kth swapped with each k-1 initial
        for (let i = 0; i < k - 1; i ++) {
            // Swap choice dependent on parity of k (even or odd)
            if (k % 2 === 0) {
                swap(A, i, k - 1); // zero-indexed, the kth is at k-1
            } else {
                swap(A, 0, k - 1);
            }
            generate(k - 1, A);
        }
    }
}

var arr = [4,3,2,1]//[1,2,3,4]
generate(arr.length, arr);

// 包含重复的全排列
var permuteUnique = function(nums, bits = 0, arr = []) {
    if (arr.length === nums.length) {
        console.log(arr)
        return
    }
    const set = new Set()
    for (let i = 0; i < nums.length; i++) {
        if ((bits & (1 << i)) || set.has(nums[i])) { // prevent missing or duplication  
            continue
        }
        set.add(nums[i])
        arr.push(nums[i])
        permuteUnique(nums, bits | (1 << i), arr)
        arr.pop()   
    }
};

console.log('permutation unique')
permuteUnique([1,1,2,3])

// 二、求第 k 个排列
/**
 * @returns 1 到 n 的全排列中第 k 个排列
 * @param {int} n (1 <= n <= 9) 
 * @param {int} k 
 */
function permutation(n, k) {
    let facSeq = [1]; // 阶乘表
    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let f = 1
    for (let x = 1; x < 10; x++) {
        f *= x
        facSeq.push(f);
    }

    let res = 0;
    k--;
    while (n-- > 0) {
        let index = Math.floor(k / facSeq[n])
        k = k % facSeq[n]
        res = res * 10 + nums[index]
        nums.splice(index, 1)
    }
    console.log(res)
}

// 很明显，这个方法的输入 n 只能是很小的数，否则阶乘溢出
permutation(1, 1);
permutation(3, 4);
permutation(4, 13);
permutation(5, 87);


// 三、next permuation
// https://leetcode.com/problems/next-permutation/solution/
// https://www.geeksforgeeks.org/find-the-next-lexicographically-greater-word-than-a-given-word/
function nextPermutation(nums) {
    let i = nums.length - 2;
    while (i >= 0 && nums[i + 1] <= nums[i]) { // find descending numbers from the end
        i--;
    }
    if (i >= 0) {
        let j = nums.length - 1;
        while (j >= 0 && nums[j] <= nums[i]) { // find the smallest number on the right of nums[i] that is greater than it
            j--;
        }
        swap(nums, i, j);
    }
    // if i < 0, directly reverse nums
    reverse(nums, i + 1);
    return nums;
}

function reverse(nums, start) {
    let i = start, j = nums.length - 1;
    while (i < j) {
        swap(nums, i, j);
        i++;
        j--;
    }
}

function swap(nums, i, j) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
}

// what about previous permuation
function prevPermutation(nums) {
    let i = nums.length - 2;
    while (i >= 0 && nums[i + 1] >= nums[i]) { // find ascending numbers from the end
        i--;
    }
    if (i >= 0) {
        let j = nums.length - 1;
        while (j >= 0 && nums[j] >= nums[i]) { // find the greatest number on the right of nums[i] that is smaller than it
            j--;
        }
        swap(nums, i, j);
    }
    reverse(nums, i + 1);
    return nums;
}

Array.prototype.equal = function(arr) {
    if (this.length != arr.length) return false;
    return this === arr || this.reduce((res, x, i) => res && x === arr[i], true);
}

arr = [1,2,3,4];
let perm = [...arr];
do {
    perm = nextPermutation(perm);
    console.log(perm);
} while(!arr.equal(perm))  