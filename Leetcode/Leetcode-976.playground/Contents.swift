class Solution {
    func largestPerimeter(_ A: [Int]) -> Int {
        let sortedA = A.sorted(by: >)
        for i in 0..<sortedA.count {
            for j in (i+1)..<sortedA.count {
                for k in (j+1)..<sortedA.count {
                    if sortedA[i] < sortedA[j] + sortedA[k] {
                        return sortedA[i] + sortedA[j] + sortedA[k]
                    } else {
                        break
                    }
                }
            }
        }
        return 0
    }
}

let sol = Solution()
let s = sol.largestPerimeter([3,2,3,6])
