class MinHeap {
    constructor (size) {
        this.size = size
        this.arr = []
    }
    heapify (i) {
        let n = this.arr.length
        let left = 2 * i + 1
        let right = 2 * i + 2
        let smallest = i
        if (left < n && this.arr[smallest] > this.arr[left]) smallest = left
        if (right < n && this.arr[smallest] > this.arr[right]) smallest = right
        if (smallest != i) {
            this._swap(smallest, i)
            this.heapify(smallest)
        }
    }
    _swap (i, j) {
        const t = this.arr[i]
        this.arr[i] = this.arr[j]
        this.arr[j] = t
    }
    peek () {
        return this.arr[0]
    }
    add (x) {
        if (this.arr.length < this.size) {  // add and adjust to be a min heap
            this.arr.push(x)
            let i = this.arr.length - 1
            let parent = (i - 1) >> 1
            while (parent >= 0 && this.arr[i] < this.arr[parent]){
                this._swap(parent, i)
                i = parent
                parent = (parent - 1) >> 1
            }
        } else if (this.arr[0] < x) {
            this.arr[0] = x
            this.heapify(0)
        }
    }
}

/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function(k, nums) {
    this.heap = new MinHeap(k)
    nums.forEach(n => this.heap.add(n))
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
    this.heap.add(val)
    return this.heap.peek()
};


const data = [2, 5, 9, 10, 4, 4, 7]
var obj = new KthLargest(4, [4, 1, 5, 8, 2])
data.forEach(x => {
    console.log(obj.add(x))
})


/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function(k, nums) {
    this.nums = nums.sort((x, y) => x - y)
    this.k = k
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
    let l = 0, u = this.nums.length
    while (l < u) {
        const mid = (l + u) >> 1
        if (this.nums[mid] > val) {
            u = mid
        } else {
            l = mid + 1
        }
    }
    this.nums.splice(l, 0, val)
    return this.nums[this.nums.length - this.k]
};


var obj = new KthLargest(3, [4, 1, 5, 8, 2])
data.forEach(x => {
    console.log(obj.add(x))
})