const ListNode = require('../Utility/SinglyLinkedListNode');
const {array2LinkedList} = require('../Utility/Array2SinglyLinkedList');

var mergeTwoLists = function(l1, l2) {
    let cur = new ListNode(-1);
    let head = cur;
    while(l1 && l2) {
        if (l1.val > l2.val) {
            cur.next = l2;
            l2 = l2.next;
        } else {
            cur.next = l1;
            l1 = l1.next;
        }
        cur = cur.next;
    }
    cur.next = l1 || l2;
    return head.next;    
};


const h1 = array2LinkedList([1,2,3,4]);
const h2 = array2LinkedList([4,5,6]);

const h3 = mergeTwoLists(h1, h2);