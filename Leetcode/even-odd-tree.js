const { array2BinaryTree } = require('../Utility/Array2BinaryTree')

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isEvenOddTree = function(root) {
    let q = [root]
    let even = true
    while (q.length > 0) {
        let nextQ = []
        let prev = q[0].val
        for (let i = 1; i < q.length; i++) {
            const obj = q[i]
            if (even) {
                if (obj.val % 2 === 0 || obj.val <= prev) {
                    return false
                }
            } else {
                if (obj.val % 2 === 1 || obj.val >= prev) {
                    return false
                }
            }
            prev = obj.val
            obj.left && nextQ.push(obj.left)
            obj.right && nextQ.push(obj.right)
        }
        q = nextQ
        even = !even
    }
    return true
};



let root = array2BinaryTree([1,10,4,3,null,7,9,12,8,6,null,null,2])
isEvenOddTree(root)

root = array2BinaryTree([5,4,2,3,3,7])
isEvenOddTree(root)