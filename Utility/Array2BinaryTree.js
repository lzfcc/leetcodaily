const TreeNode = require('./BinaryTreeNode');
/**
 * Convertion from an array to binary tree
 * @param array in leetcode style
 * @returns root tree node */
exports.array2BinaryTree = function (array) {
    if (!array) {
        return null
    }
    let nodes = array.map(x => x ? new TreeNode(x) : null);
    let offset = 1;
    let i = 0;
    while (offset < nodes.length) {
        if (nodes[i]) {
            if (offset < nodes.length) {
                nodes[i].left = nodes[offset];
                offset++;
            }
            if (offset < nodes.length) {
                nodes[i].right = nodes[offset];
                offset++;
            }
        }
        i++;
    }
    return nodes[0];
};

exports.binaryTree2Array = function (root) {
    function bfs(root) {
        let queue = [root];
        let res = [];
        while (queue.length > 0) {
            let head = queue.shift();
            if (head) {
                res.push(head.val);
                queue.push(head.left);
                queue.push(head.right);
            } else {
                res.push(null);
            }
        }
        return res;
    }
    let arr = bfs(root);
    while (arr[arr.length - 1] === null) {
        arr.pop();
    }
    return arr;
};

//Code in this module can be used to solve Leetcode problem:[Serialize and Deserialize BST](https://leetcode.com/submissions/detail/238163685/)
function test() {
    // const {arry2BinaryTree, binaryTree2Array} = require('../Utility/Array2BinaryTree');
    let r = array2BinaryTree([3, 1, 4, null, 2, null, 5]);
    console.log(binaryTree2Array(r));
}