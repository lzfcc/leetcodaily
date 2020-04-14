const { array2BinaryTree, binaryTree2Array } = require('../Utility/Array2BinaryTree');
const TreeNode = require('../Utility/BinaryTreeNode');

// 这个题我写了半天都没写对。
// 思路大概是对了，就是递归求解，我当时想的是要么解在左子树里，要么在右子树里，要么横跨当前的根节点，那么就是左右的最大深度相加在加根节点：
function findMaxDepth(root) {
    if (!root) return 0;
    const ld = findMaxDepth(root.left);
    const rd = findMaxDepth(root.right);
    return Math.max(ld, rd) + 1;
}

var diameterOfBinaryTree = function(root) {
    if (!root) return 0;
    return Math.max(diameterOfBinaryTree(root.left) + 1, diameterOfBinaryTree(root.right) + 1, findMaxDepth(root.left) + 1 + findMaxDepth(root.right)) - 1;
};
// 这个代码看着还算清晰了，但是实际上最初我写的比这个麻烦的多。
// 发现这个解法稍慢，应该是因为 diameterOfBinaryTree 递归的时候，产生了大量的 findMaxDepth 的重复计算。
// 看下面的解答：原来引入了一个 ans，直接在 depth 求解的过程中就维护了最大值

var diameterOfBinaryTree = function(root) {
    if (!root) return 0;
    let ans = 1;
    function depth(root) { // 注意：这里 depth 实际上是节点数，所以边数要减 1
        if (!root) return 0;
        const ld = depth(root.left);
        const rd = depth(root.right);
        ans = Math.max(ans, ld + rd + 1);
        return Math.max(ld, rd) + 1;
    }
    depth(root);
    return ans - 1;
};

const root = array2BinaryTree([1,2,3,4,5]);
const res = diameterOfBinaryTree(root);
console.log(res);