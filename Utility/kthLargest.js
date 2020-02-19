//Leetcode-215 https://leetcode.com/problems/kth-largest-element-in-an-array/

var findKthLargest = function(nums, k) {
    
    const swap = (nums, i, j) => {
        const temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    };
    
    const find = (nums, low, high, index) => {
        if (high <= low) return nums[low];

        // 注意：随机化对程序效率的提升非常显著！
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

// 最小堆

const { PriorityQueue, Comparator } = require('./priority_queue');

var findKthLargest = function(nums, k) {
    const minHeap = new PriorityQueue([], Comparator.Less);
    for (const n of nums) {
        minHeap.queue(n);
        if (minHeap.size() > k) minHeap.dequeue();
    }
    return minHeap.peek();
}

findKthLargest([3,2,5,1,2,4,3,6,5], 4)