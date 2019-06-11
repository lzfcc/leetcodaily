class Solution {
    func sortedSquares(_ A: [Int]) -> [Int] {
        if let a = A.first {
            if a >= 0 {
                return A.map({$0 * $0})
            } else {
                var s = 0, e = A.count - 1
                var res = [Int]()
                while s <= e {
                    if abs(A[s]) > abs(A[e]) {
                        res.append(A[s] * A[s])
                        s += 1
                    } else {
                        res.append(A[e] * A[e])
                        e -= 1
                    }
                }
                return res.reversed()
            }
        }
        return []
    }
}

let sol = Solution()
let res = sol.sortedSquares([-4, -2, 0, 3, 5])
