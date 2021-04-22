const { array2BinaryTree } = require('../Utility/Array2BinaryTree')

function traverse (root, order = 0, mode = 0) {
    const orders = ['preorder', 'inorder', 'postorder']
    const modes = ['recursive', 'iterative']
    const funcName = orders[order] + '_' + modes[mode]
    if (Methods[funcName]) {
        Methods[funcName](root)
    }
}

const Methods = {
    inorder_recursive (root) {
        if (!root) {
            return
        }
        this.inorder_recursive(root.left)
        console.log(root.val)
        this.inorder_recursive(root.right)
    },
    inorder_iterative (root) {
        const st = []
        while (root || st.length) {
            while (root) {
                st.push(root)
                root = root.left
            }
            const cur = st.pop()
            console.log(cur.val)
            root = cur.right
        }
    },
    preorder_recursive (root) {
        if (!root) {
            return
        }
        console.log(root.val)
        this.preorder_recursive(root.left)
        this.preorder_recursive(root.right)
    },
    preorder_iterative (root) {
        const st = []
        while (root || st.length) {
            while (root) {
                console.log(root.val)
                st.push(root)
                root = root.left
            }
            const cur = st.pop()
            root = cur.right
        }
    },
    postorder_recursive (root) {
        if (!root) {
            return
        }
        this.postorder_recursive(root.left)
        this.postorder_recursive(root.right)
        console.log(root.val)
    },
    // postorder_iterative (root) { // use Set
    //     const st = []
    //     const seen = new Set()
    //     while (root || st.length) {
    //         if (root) {
    //             st.push(root)
    //             root = root.left
    //         } else {
    //             const peek = st[st.length - 1]
    //             if (seen.has(peek)) {
    //                 console.log(st.pop().val)
    //             } else {
    //                 seen.add(peek)
    //                 root = peek.right;
    //             }
    //         }
    //     }
    // },
    postorder_iterative (root) {
        const st = []
        let prev = null
        while (root || st.length) {
            while (root) {
                st.push(root)
                root = root.left
            }
            root = st.pop()
            if (root.right == null || root.right == prev) {
                console.log(root.val)
                prev = root
                root = null
            } else {
                st.push(root)
                root = root.right
            }
        }
    }
}

// const root = array2BinaryTree([1,2,3,null,4,5,null,6])
// traverse(root, 0, 1)

const root = array2BinaryTree([1,2,3,4,null,5,null,null,null,6])
traverse(root, 2, 1)
