const { array2BinaryTree, binaryTree2Array } = require('../Utility/Array2BinaryTree');

var zigzagLevelOrder = function(root) {
    if (!root) return [];
        root.depth = 0;
        const q = [root];
        const res = [];
        while (q.length) {
            const node = q.shift();
            if (res[node.depth] === undefined) {
                res[node.depth] = [];
            }
            res[node.depth].push(node.val);
            if (node.left) {
                node.left.depth = node.depth + 1;
                q.push(node.left);
            }
            if (node.right) {
                node.right.depth = node.depth + 1;
                q.push(node.right);
            }
        }
        return res.map((arr, index) => (index & 1) ? arr.reverse() : arr)
};

var zigzagLevelOrder = function(root) {
    if (!root) return [];
    const res = [];
    function traverse(root, depth) {
        if (!root) return;
        if (!res[depth]) res[depth] = [];
        if (depth & 1) {
            res[depth].unshift(root.val);
        } else {
            res[depth].push(root.val);
        }
        traverse(root.left, depth + 1);
        traverse(root.right, depth + 1);
    }    
    traverse(root, 0);
    return res;
};

const root = array2BinaryTree([3,9,20,null,null,15,7]);

zigzagLevelOrder(root);