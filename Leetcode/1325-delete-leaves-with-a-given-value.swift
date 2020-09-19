public class TreeNode {
	public var val: Int
	public var left: TreeNode?
	public var right: TreeNode?
	public init() { self.val = 0; self.left = nil; self.right = nil; }
	public init(_ val: Int) { self.val = val; self.left = nil; self.right = nil; }
	public init(_ val: Int, _ left: TreeNode?, _ right: TreeNode?) {
		self.val = val
		self.left = left
		self.right = right
	}
}

class Solution {
	func removeLeafNodes(_ root: TreeNode?, _ target: Int) -> TreeNode? {
		if root == nil {
			return nil
		}
		root!.left = self.removeLeafNodes(root!.left, target)
		root!.right = self.removeLeafNodes(root!.right, target)
		if root!.left == nil && root!.right == nil && root!.val == target {
			return nil
		}
		return root
	}
}

let nodes = [1,2,3,2,nil,2,4]

func array2BinaryTree(_ arr: Array<Int?>) -> TreeNode? {
	if arr.count == 0 {
		return nil
	}
	let nodes = arr.map {(num) -> TreeNode? in 
		if num == nil {
			return nil
		}
		return TreeNode(num!)
	}
	for (index, node) in nodes.enumerated() {
		if (node == nil) {
			continue
		}
		if index * 2 + 1 < arr.count {
			node!.left = nodes[index * 2 + 1]
		}
		if index * 2 + 2 < arr.count {
			node!.right = nodes[index * 2 + 2]
		}
	}
	return nodes[0]
}

//var rt = array2BinaryTree([1,2,3,2,nil,2,4])
var rt = array2BinaryTree([1,2,nil,2,nil,2])

let sol = Solution()
rt = sol.removeLeafNodes(rt, 2)
print(rt)

print(Array.init(10))