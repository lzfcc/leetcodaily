//Leetcode-215 https://leetcode.com/problems/kth-largest-element-in-an-array/

// QuickSelect 算法，平均 O(n)，最坏 O(n^2) https://stackoverflow.com/questions/5945193/average-runtime-of-quickselect
var findKthLargest = function(nums, k) {
    
    const swap = (nums, i, j) => {
        const temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    };
    
    const find = (nums, low, high, index) => {
        if (high <= low) return nums[low];

        // 注意：随机化并非必须，但是对程序效率的提升非常显著！
        const randIndex = (0 | Math.random() * (high - low + 1)) + low;
        swap(nums, high, randIndex);
        
        const pivot = nums[high];
        let left = low;
        for(let i = low; i < high; i++)
            if (nums[i] >= pivot) 
                swap(nums, left++, i);
        swap(nums, left, high);
        // console.log(`[${nums.slice(0, left)}] ${nums[left]} [${nums.slice(left + 1)}]`);
        if (left === index) 
            return nums[left];
        if (left > index) 
            return find(nums, low, left - 1, index);
        return find(nums, left + 1, high, index);
    }
    
    return find(nums, 0, nums.length - 1, k - 1);
};

// 将上述代码改成迭代版本
var findKthLargest = function(nums, k) {
    
    const swap = (nums, i, j) => {
        [nums[i], nums[j]] = [nums[j], nums[i]];
    };
    
    const index = k - 1;
    let low = 0, high = nums.length - 1;
    while (low < high) {
        const randIndex = (0 | Math.random() * (high - low + 1)) + low;
        swap(nums, high, randIndex);
        const pivot = nums[high];
        let partitionIndex = low;
        for(let i = low; i < high; i++)
            if (nums[i] >= pivot) 
                swap(nums, partitionIndex++, i);
        swap(nums, partitionIndex, high);
        // console.log(`[${nums.slice(0, partitionIndex)}] ${nums[partitionIndex]} [${nums.slice(partitionIndex + 1)}]`);
        if (partitionIndex === index) 
            return nums[partitionIndex];
        else if (partitionIndex > index) 
            high = partitionIndex - 1;
        else 
            low = partitionIndex + 1;
    }
    
    return nums[low];
};

// 众所周知，这个比较、对换过程不只有一种写法
var findKthLargest = function(nums, k) {
    
    const swap = (nums, i, j) => {
        [nums[i], nums[j]] = [nums[j], nums[i]];
    };
    
    const find = (nums, low, high, index) => {
        if (low >= high) return nums[high];

        const randIndex = (0 | Math.random() * (high - low + 1)) + low;
        swap(nums, high, randIndex);
        
        const pivot = nums[high];
        let left = low, right = high;
        while (true) {
            while (left < right && nums[left] < pivot) left++;
            while (left < right && nums[right] >= pivot) right--;
            if (left >= right) break;
            swap(nums, left, right);
        }
        swap(nums, left, high); //注意由于上面的交换导致左边都小于 pivot， 右边都大于 pivot，最后交换时要与 high 交换
        // console.log(`[${nums.slice(0, left)}] ${nums[left]} [${nums.slice(left + 1)}]`);
        if (left === index) 
            return nums[left];
        if (left > index) 
            return find(nums, low, left - 1, index);
        return find(nums, left + 1, high, index);
    }
    
    return find(nums, 0, nums.length - 1, nums.length - k); 
};

// 最小堆
const { PriorityQueue, Comparator } = require('./PriorityQueue');

var findKthLargest = function(nums, k) {
    const minHeap = new PriorityQueue([], Comparator.Less);
    for (const n of nums) {
        minHeap.queue(n);
        if (minHeap.size() > k) minHeap.dequeue();
    }
    return minHeap.peek();
}

findKthLargest([3,2,5,1,2,4,3,6,5], 4)