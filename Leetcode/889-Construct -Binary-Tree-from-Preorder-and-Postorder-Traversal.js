function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

// 看了 solution...
var constructFromPrePost = function(pre, post) {
    if (pre.length == 0) return null;
    const root = new TreeNode(pre[0]);
    if (pre.length == 1) return root;
    const leftTreeCount = post.indexOf(pre[1]) + 1;
    root.left = constructFromPrePost(pre.slice(1, 1 + leftTreeCount), post.slice(0, leftTreeCount));
    root.right = constructFromPrePost(pre.slice(1 + leftTreeCount), post.slice(leftTreeCount, post.length - 1));
    return root;
};



//let r = constructFromPrePost([1,2,4,5,3,6,7], [5,4,2,7,6,3,1]);
r = constructFromPrePost([1,2,4,5,3,6,7], [2,1,3,6,5,7,4]);
console.log(r);