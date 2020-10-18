var specialArray_O_n_logn = function(nums) {
    let upper = nums.length
    let lower = 0
    let ans = -1
    let loop = 0
    while (upper >= lower) {
        const mid = (upper + lower) >> 1
        // const count = nums.filter(x => x >= mid).length
        let count = 0
        for (let j = 0; j < nums.length; j++) {
            if(nums[j] >= mid) count++
        }
        if (count > mid) {
            lower = mid + 1
        } else if (count < mid) {
            upper = mid - 1
        } else {
            ans = mid
            break
        }
        loop++
    }
    return loop
};

var specialArray_O_n2 = function(nums) {
    let loop = 0
    for(let i = 0; i <= nums.length; i++) {
        let count = 0
        for (let j = 0; j < nums.length; j++) {
            if(nums[j] >= i) count++;
        }
        if(count == i) break;
        loop++
    }
    return loop;
};

/*
replace filter with
        for(let j = 0; j < nums.length; j++) {
            if(nums[j] >= i) count++;
        }
will make it faster!
 */

function randomArray() {
    const n = (Math.random() * 20) | 0
    const arr = []
    for (let i = 0; i < n; i++) {
        arr.push((Math.random() * 20) | 0)
    }
    // console.log(arr)
    return arr
}

const data = []
for (let i = 0; i < 3000; i++) {
    data.push(randomArray())
}

let t1 = +new Date()
let allLoops = 0
data.forEach(arr => {
    allLoops += specialArray_O_n2(arr)
})
let t2 = +new Date()
console.log('O(n^2): ', t2 - t1, 'ms, avg loops: ', allLoops / data.length)

t1 = +new Date()
allLoops = 0
data.forEach(arr => {
    allLoops += specialArray_O_n_logn(arr)
})
t2 = +new Date()
console.log('O(n*log(n)): ', t2 - t1, 'ms, avg loops: ', allLoops / data.length)