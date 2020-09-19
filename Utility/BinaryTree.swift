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

func printTree(_ root:TreeNode?) -> [Int?] {	
	var queue:[TreeNode?] = [TreeNode]()
	
	queue.append(root)
	var res:[Int?] = [Int?]()
	while !queue.isEmpty {
		//remove first leaf
		let leaf = queue.removeFirst();
		
		//print leaf
		if leaf == nil || leaf?.val == Int.max {
			res.append(nil)
		} else {
			res.append(leaf!.val)
			
			 //leaf in the queue
			queue.append(leaf!.left)
			queue.append(leaf!.right)
		}
	}
	
	//remove last null
	while res.last! == nil {
		res.removeLast()
	}

	print(res)
	return res
}

let a = [1,2,3,nil,4,5]
let node = array2BinaryTree(a)
//print(node)
printTree(node)

let b = [nil,1,nil]
print(b[0] == nil)
print(b.first! == nil)
print(b.first == nil)