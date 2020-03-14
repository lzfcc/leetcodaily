// 这个题目的简化版 https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/
// 用二分查找就可以

// brute force 超时！
var countSmaller = function(nums) {
    return nums.map((n, i) => nums.filter((m, j) => j > i && m < n).length);
};

// 排序 + 二分查找
var countSmaller = function(nums) {
    const sortedNums = nums.slice();
    sortedNums.sort((x, y) => x - y);
    const lowerBound = (arr, target) => {
        let left = 0, right = arr.length; // [left, right)
        while (left < right) {
            const mid = (left + right) >> 1;
            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }
    return nums.map(n => {
        const res = lowerBound(sortedNums, n);
        sortedNums.splice(res, 1);  // 其实数组的删除元素操作也是 O(n) 的，所以感觉这里不是严格的 O(n·log(n))
        return res;
    });
}

// 我尝试了c++
/*
class Solution {
    public:
    vector<int> countSmaller(vector<int>& nums) {
        auto sortedNums = vector<int>(nums);
        sort(sortedNums.begin(), sortedNums.end());
        auto lowerBound = [](vector<int> arr, int target) {
            int left = 0, right = arr.size(); // [left, right)
            while (left < right) {
                int mid = left + ((right - left) >> 1);
                if (arr[mid] < target) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }
            return left;
        };
        for (int i = 0; i < nums.size(); i++) {
            nums[i] = lowerBound(sortedNums, nums[i]);
            sortedNums.erase(sortedNums.begin() + nums[i]);
        }
        return nums;
    }
};
*/
// 内存超限！看来 C++ 对空间卡的很严格，即便这里只是拷贝了一份数组而已。是不是 vector 导致的？

/*
class Solution {
public:
static int compare (const void * a, const void * b) {
	return ( *(int*)a - *(int*)b );
}

vector<int> countSmaller(vector<int>& nums) {
    if (nums.size() == 0) return nums;
    
	int sortedNums[nums.size()];
	copy(nums.begin(), nums.end(), sortedNums);
	qsort(sortedNums, nums.size(), sizeof(int), compare);
	auto lowerBound = [](int arr[], int size, int target) {
		int left = 0, right = size; // [left, right)
		while (left < right) {
			int mid = left + ((right - left) >> 1);
			if (arr[mid] < target) {
				left = mid + 1;
			} else {
				right = mid;
			}
		}
		return left;
	};
	int size = nums.size();
	for (int i = 0; i < nums.size(); i++) {
		nums[i] = lowerBound(sortedNums, size, nums[i]);
		int j = nums[i];
		while (j < size - 1) {
			sortedNums[j] = sortedNums[j + 1];
			j++;
		}
		size--;
	}
	return nums;
}
};
*/
// 改用数组就好了！所以可能 vector 导致的问题？但是即便如此，仍然很慢！大概证实了复杂度的猜测！
// C++ algorithm 有自带 lower_bound
/*
class Solution {
public:
vector<int> countSmaller(vector<int>& nums) {
	auto sortedNums = vector<int>(nums);
	sort(sortedNums.begin(), sortedNums.end());
	for (int i = 0; i < nums.size(); i++) {
		auto iter = lower_bound(sortedNums.begin(), sortedNums.end(), nums[i]);
        nums[i] = distance(sortedNums.begin(), iter);
        sortedNums.erase(iter);
	}
	return nums;
}
};
*/
// 也通过了！而且占用内存很少……原来是自己实现的 lowerBound 不好？！（完全看不出问题啊……）


class BSTNode {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
        this.count = 1; // 重复元素计数
        this.lessCount = 0; // 比该元素小的元素个数
    }
    lessOrEqualCount() {
        return this.count + this.lessCount;
    } 
}

// BST
var countSmaller = function(nums) {
    const insert = (root, val) => { // insert a node and return <=val count
        if (root.val == val) {
            root.count++;
            return root.lessCount;
        }
        if (root.val < val) {
            if (!root.right) {
                root.right = new BSTNode(val);
                return root.lessOrEqualCount();
            }
            return root.lessOrEqualCount() + insert(root.right, val);
        }
        root.lessCount++;
        if (!root.left) {
            root.left = new BSTNode(val);
            return 0;
        }
        return insert(root.left, val);
    };
    const ans = new Array(nums.length).fill(0);
    let root = new BSTNode(nums[nums.length - 1]);
    for (let i = nums.length - 2; i > -1; i--) {
        ans[i] = insert(root, nums[i]);
    }
    return ans;
}
// 这个 insert 方法可不好写啊！！

// 树状数组



countSmaller([2,7,1,8,2,8,3,1,4,1,5]);