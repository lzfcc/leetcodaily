public class TreeNode {
    public var val: Int
    public var left: TreeNode?
    public var right: TreeNode?
    public init(_ val: Int) {
        self.val = val
        self.left = nil
        self.right = nil
    }
}

class Solution {
    func averageOfLevels(_ root: TreeNode?) -> [Double] {
        var q = [(TreeNode, Int)]()
        q.append((root!, 0))
        var currentDepth = 0, currentSum = 0, nodesCount = 0, res = [Double]()
        while q.count > 0{
            let head = q.removeFirst()
            let (node, depth) = head
            if currentDepth != depth {
                res.append(Double(currentSum) / Double(nodesCount))
                currentDepth = depth
                currentSum = 0
                nodesCount = 0
            }
            nodesCount += 1
            currentSum += node.val
            
            if let leftNode = head.0.left {
                q.append((leftNode, depth + 1))
            }
            if let rightNode = head.0.right {
                q.append((rightNode, depth + 1))
            }
        }
        print("\(currentSum), \(currentDepth), \(nodesCount)")
        res.append(Double(currentSum) / Double(nodesCount))
        return res
    }
    
    func findJudge(_ N: Int, _ trust: [[Int]]) -> Int {
        var trusted = Array.init(repeating: 0, count: N + 1)
        var trusting = trusted
        for relation in trust {
            trusted[relation[1]] += 1
            trusting[relation[0]] += 1
        }
        for i in 1...N {
            if trusted[i] == N - 1 && trusting[i] == 0{
                return i
            }
        }
        return -1
    }
    
}

let n1 = TreeNode(3)
let n2 = TreeNode(9)
let n3 = TreeNode(20)
let n4 = TreeNode(15)
let n5 = TreeNode(7)
n1.left = n2
n1.right = n3
n2.left = n4
n3.right = n5

print(Solution().averageOfLevels(n1))

print(Solution().findJudge(3, [[1,3],[2,3],[3,1]]))

