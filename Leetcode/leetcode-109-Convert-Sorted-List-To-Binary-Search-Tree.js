const TreeNode = require('../Utility/BinaryTreeNode');
const ListNode = require('../Utility/SinglyLinkedListNode');

/**
 * @param {ListNode} head
 * @return {TreeNode}
 */

var sortedListToBST = function (head) {

    function buildTreeFromListHead(head) {
        if (head == null) {
            return null;
        } 
        if (head.next == null) {
            return new TreeNode(head.val);
        }
        let leftRear = null;
        let slow = head
        let fast = head
        while (fast && fast.next) {
            leftRear = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        let root = new TreeNode(slow.val);
        leftRear.next = null;
        let leftRoot = buildTreeFromListHead(head);
        let rightRoot = buildTreeFromListHead(slow.next);
        root.left = leftRoot;
        root.right = rightRoot;
        return root;
    }

    return buildTreeFromListHead(head);
};

function test() {
    let head =  buildList([0,1,2,3,4,5,6,7,8]);
    let root = sortedListToBST(head);
    root;
}

test();