const Node = require('../Utility/BinaryTreeNode');
const { array2BinaryTree } = require('../Utility/Array2BinaryTree');

function childrenSum(root) {
    if (!root) return 0;
    let sum = 0;
    if (root.left) sum += root.left.val;
    if (root.right) sum += root.right.val;
    return sum;
}

var sumEvenGrandparent = function(root) {
    if (!root) return 0;
    const ls = sumEvenGrandparent(root.left)
    const rs = sumEvenGrandparent(root.right)
    const ps = root.val % 2 == 0 ? (childrenSum(root.left) + childrenSum(root.right)) : 0;
    console.log('For root:', root.val, '  ', ls, rs, ps);
    return ls + rs + ps;
};

const root = array2BinaryTree([6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]);
const sum = sumEvenGrandparent(root);
console.log(sum);