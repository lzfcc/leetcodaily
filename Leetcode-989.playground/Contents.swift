class Solution {
    func addToArrayForm(_ A: [Int], _ K: Int) -> [Int] {
        var arr = [Int](), cur = K
        var i = A.count - 1
        while i >= 0 || cur > 0 {
            if i >= 0 {
                cur += A[i]
            }
            arr.append(cur  % 10)
            cur /= 10
            i -= 1
        }
        return arr.reversed()
    }
}

func mylog(_ A: [Int], _ K: Int) {
    print(Solution().addToArrayForm(A, K))
}

mylog([1,2,0,0], 34)
mylog([2,1,5], 806)
mylog([2,7,4], 181)
mylog([1,2,9], 0)
mylog([9,9,9,9], 1)
mylog([6], 354)


