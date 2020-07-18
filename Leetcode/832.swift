class Solution {
    func flipAndInvertImage(_ A: [[Int]]) -> [[Int]] {
        var res: [[Int]] = []
        for row in A {
            res.append(row.reversed().map({1-$0}))
        }
        return res
    }
}

func test(input: [[Int]], expected:[[Int]]) -> Bool {
    let res = Solution().flipAndInvertImage(input)
    return res == expected
}

test(input: [[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]], expected: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]])
