const { array2BinaryTree } = require('../Utility/Array2BinaryTree');

var printTree = function(root) {
    let depth = 0;
    let bfs = (node, level) => {
        if (!node) return;
        depth = Math.max(depth, level + 1);
        bfs(node.left, level + 1);
        bfs(node.right, level + 1);
    }
    bfs(root, 0);
    const outLen = 2 ** depth - 1;
    const ans = new Array(depth).fill(0).map(() => new Array(outLen).fill(''));
    // 此时可以给每个树节点分配一个 0 ～ (outlen - 1) 的编号
    
    bfs = (node, level, start, end) => {
        if (!node) return;
        const index = (start + end) / 2;
        ans[level][index] = String(node.val);
        bfs(node.left, level + 1, start, index - 1);
        bfs(node.right, level + 1, index + 1, end);
    }
    bfs(root, 0, 0, outLen - 1);
    
    return ans;
};

// 求深度的更短写法
const getDepth = node => node ? Math.max(getDepth(node.left), getDepth(node.right)) + 1 : 0;
let depth = getDepth(root);

function test() {
    const cases = [[1,2], [1,2,3,null,4], [1,2,5,3,null,null,6,4]];
    cases.forEach(c => {
        const root = array2BinaryTree(c);
        console.log(printTree(root));
    });
}

test();
