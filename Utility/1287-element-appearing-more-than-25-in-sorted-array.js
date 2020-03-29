// 直接看了讨论区，不然我就用 O(n) 做了。其实也不会很慢（测试数据量不大）。
var findSpecialInteger = function(arr) {
    if (arr.length === 1) return arr[0];
    const quauter = arr.length >> 2;
    let ele = arr[0], count = 1;
    let i = 1;
    for (; i < arr.length; i++) {
        if (arr[i] === ele) count++;
        else {
            ele = arr[i];
            count = 1;
        }
        if (count > quauter) break;
    }
    return arr[i];
};

/* binary search(C++)
int findSpecialInteger(vector<int>& arr) {
    int n = arr.size();
    for (int i : {n/4, n/2, n*3/4}) {
        auto p = equal_range(arr.begin(), arr.end(), arr[i]);
        if (p.second - p.first > n / 4)
            return arr[i];
    }
    return 0;
}
*/

const { EqualRange } = require('../Utility/LowerBound');

var findSpecialInteger = function(arr) {
    let n = arr.length;
    const points = [n >> 2, n >> 1, Math.floor(n * 0.75)];
    for (let i of points) {
        const [lo, hi] = EqualRange(arr, 0, n, arr[i]);
        if (hi - lo > points[0])
            return arr[i];
    }
    return 0;
}

findSpecialInteger([1,2,2,6,6,6,6,7,10]);
findSpecialInteger([1]);

// 用 C++ 也试了，一样是理论的 O(N) 算法反而更快