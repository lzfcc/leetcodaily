/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function MyTreeNode(node, depth) {
    this.node = node
    this.depth = depth
}
var isSymmetric = function (root) {
    let buckets = []
    function inOrder(root) {
        let q = []
        q.push(root)
        while (q.length > 0) {
            const nd = q.shift()
            const dep = nd.depth
            const node = nd.node
            buckets[dep] = buckets[dep] || []
            buckets[dep].push(node ? node.val : null)
            if (node) {
                q.push(new MyTreeNode(node.left, dep + 1))
                q.push(new MyTreeNode(node.right, dep + 1))
            }
        }
    }
    inOrder(new MyTreeNode(root, 0))
    for (let level of buckets) {
        let ps = 0, pe = level.length - 1
        while (ps < pe) {
            if (level[ps] != level[pe]) {
                return false
            }
            ps++
            pe--
        }
    }
    return true
};