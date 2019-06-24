const ListNode = require('./SinglyLinkedListNode');

exports.array2LinkedList = function (array) {
    if (array.length <= 0) {
        return null;
    }
    let head = new ListNode(array[0]);
    let node = head;
    for (let i = 1; i < array.length; i++) {
        let tmp = new ListNode(array[i]);
        node.next = tmp;
        node = tmp;
    }
    return head;
};

exports.linkedList2Array = function (head) {
    let res = [];
    while (head) {
        res.push(head.val);
        head = head.next;
    }
    return res;
};