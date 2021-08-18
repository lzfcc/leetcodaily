// minimum-difference-between-largest-and-smallest-value-in-three-moves
// 题目大意，有一个数组，允许对其中三个数进行修改，使得数组极差最小
// 提示：移除数组中最大的三个元素与最小的三个元素之前
// 举例：[6,6,0,1,1,4,6]
// 排序：【0,1,1,4,6,6,6】
// a[3]-a[0] = 4 [0,1,1,4,x,x,x] (x 都换成 4 即可)
// a[4]-a[1] = 5 [x,1,1,4,6,x,x]
// a[5]-a[2] = 5 [x,x,1,4,6,6,x]
// a[6]-a[0] = 2 [x,x,x,4,6,6,6] (x 都换成 4 即可)

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int minDifference(vector<int> &A)
{
    int n = A.size();
    if (n < 5)
        return 0;
    sort(A.begin(), A.end());
    return min({A[n - 1] - A[3], A[n - 2] - A[2], A[n - 3] - A[1], A[n - 4] - A[0]});
}

// 但是全部排序没有必要！可以部分排序，因为我们只关心最大的3个。运行时间明显缩短。

int minDifference(vector<int> &A)
{
    int n = A.size();
    if (n < 5)
        return 0;
    partial_sort(A.begin(), A.begin() + 4, A.end()); // 前 3 个元素按照从小到大排序
    nth_element(A.begin() + 4, A.end() - 4, A.end());
    sort(A.end() - 4, A.end()); // 后 3 个元素按照从小到达排序
    return min({A[n - 1] - A[3], A[n - 2] - A[2], A[n - 3] - A[1], A[n - 4] - A[0]});
}