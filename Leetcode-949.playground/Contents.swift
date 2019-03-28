class Solution {
    func largestTimeFromDigits(_ A: [Int]) -> String {
        var sortedA = A
        sortedA.sort(by: >)
        var res = ""
        func permutation(_ A:[Int], from: Int, stop: inout Bool) {
            if from == A.count {
                if A[0] * 10 + A[1] < 24 && A[2] * 10 + A[3] < 60 {
                    res = "\(A[0])\(A[1]):\(A[2])\(A[3])"
                    stop = true
                    print(res)
                }
                return
            }
            for i in from..<A.count {
                var tmpA = A
                tmpA.insert(tmpA.remove(at:i), at:from)
                //  print("--\(A)--")
                permutation(tmpA, from: from + 1, stop: &stop)
                if stop {
                    return
                }
            }
        }
        
        var stop = false
        permutation(sortedA, from: 0, stop: &stop)
        return res
    }
}

print(Solution().largestTimeFromDigits([1,8,0,9]))
