// https://leetcode.com/problems/ways-to-make-a-fair-array/discuss/944544/JavaPythonPython-Easy-and-Concise
function waysToMakeFair(A) {
    let res = 0, n = A.length, left = [0, 0], right = [0, 0];
    for (let i = 0; i < n; i++)
        right[i % 2] += A[i];
    console.log(right)
    for (let i = 0; i < n; i++) {
        right[i % 2] -= A[i];
        if (left[0] + right[1] == left[1] + right[0]) res++;
        left[i % 2] += A[i];
    }
    return res;
}

waysToMakeFair([2, 3, 1, 5, 4, 4, 7, 3, 4, 6, 2, 1, 3])