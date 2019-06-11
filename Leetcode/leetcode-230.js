function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
 
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    let count = 1, ans;
    function inOrder(node) {
        if (node == null || !!ans) return;
        inOrder(node.left);
        if (count++ == k) {
            ans = node.val;
            return;
        }
        inOrder(node.right);
    }
    inOrder(root);
    return ans;
};

function build(array) {
    let nodes = array.map(function(x){
        return x != null ? new TreeNode(x) : null;
    });
    for(let i = 0; i < array.length; i++) {
        if (nodes[i] == null) continue;
        nodes[i].left = nodes[i * 2 + 1] || null;
        nodes[i].right = nodes[i * 2 + 2] || null;
    }
    return nodes[0];
}