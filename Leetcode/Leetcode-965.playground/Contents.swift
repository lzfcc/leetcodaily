//A naive BFS or DFS problem

//Definition for a binary tree node.
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
    func isUnivalTree(_ root: TreeNode?) -> Bool {
        guard root != nil else {
            return false
        }
        uniVal = root!.val
        return bfs(root)
//        return dfs(root)
    }
    private var uniVal = 0
    private var nodes: [TreeNode] = []
    private func bfs(_ root:TreeNode?) -> Bool {
        nodes.append(root!)
        while nodes.count > 0 {
            let node = nodes.removeFirst()
            if node.val != uniVal {
                return false
            }
            if let lf = node.left {
                nodes.append(lf)
            }
            if let rg = node.right {
                nodes.append(rg)
            }
        }
        return true
    }
    private func dfs(_ node: TreeNode?) -> Bool {
        if node != nil {
            if node?.val != uniVal {
                return false
            }
            return dfs(node?.left) && dfs(node?.right)
        }
        return true
    }
}

let sol = Solution()
let n1 = TreeNode(1)
let n2 = TreeNode(2)
n1.left = n2
sol.isUnivalTree(n1)

