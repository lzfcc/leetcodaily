/**
 * @param {number[]} A
 * @return {number}
 */
var maxTurbulenceSize = function(A) {
    const compare = (x, y, gt) => gt ? x > y : x < y;    
    const solve = (A, start, end) => {
        const len = end - start;
        if (len <= 1) {
            return len;
        }

        const mid = start + (len >> 1);
        let lenl, lenr;

        let longest = 1;
        let i = mid + 1, j = mid - 1;
        let op;

        lenl = solve(A, start, mid);
        lenr = solve(A, mid, end);
        if (len & 1) { // odd
            if (compare(A[mid], A[i], true) && compare(A[mid], A[j], true)) {
                op = true;
            } else if (compare(A[mid], A[i], false) && compare(A[mid], A[j], false)) {
                op = false;
            } else if (A[mid] === A[i] && A[mid] === A[j]){
                return Math.max(1, lenl, lenr);
            } else {
                return Math.max(2, lenl, lenr);
            }
            let p = mid, tempOp = op;
            while (compare(A[p], A[i], tempOp)) {
                longest++;
                p = i++;
                if (i >= end) break;
                tempOp = !tempOp;
            }
            p = mid;
            tempOp = op;
            while (compare(A[p], A[j], tempOp)) {
                longest++;
                p = j--;
                if (j < start) break;
                tempOp = !tempOp;
            }
        } else {
            if (A[mid] > A[j]) {
                op = true;
            } else if (A[mid] < A[j]) {
                op = false;
            } else {
                return Math.max(1, lenl, lenr);
            }
            let p = mid, tempOp = op;
            while (compare(A[p], A[j], tempOp)) {
                longest++;
                p = j--;
                if (j < start) break;
                tempOp = !tempOp;
            }
            if (i < end) {
                p = mid;
                tempOp = op;
                while (compare(A[p], A[i], tempOp)) {
                    longest++;
                    p = i++;
                    if (i >= end) break;
                    tempOp = !tempOp;
                }
            }
        }
        return Math.max(longest, lenl, lenr);
    }
    
    return solve(A, 0, A.length);
};

// let x = maxTurbulenceSize([12, 14, 20, 15, 18, 14, 29, 19, 23, 14, 8, 8, 16, 10]);
let x = maxTurbulenceSize([250,50,219,258,199,79,36,218,218,248]);
// let x = maxTurbulenceSize([4,8,12,14]);
console.log(x);