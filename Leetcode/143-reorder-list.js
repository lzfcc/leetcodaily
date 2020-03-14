const { linkedList2Array, array2LinkedList } = require('../Utility/Array2SinglyLinkedList');

var reorderList = function(head) {
    if (!head || !head.next) return head;
	const reverseList = root => {
		if (!root) return null;
		let newHead = null;
		const reverse = node => {
			if (node.next) {
				const nextNode = reverse(node.next);
				nextNode.next = node;
			} else {
				newHead = node;
			}
			return node;
		}
		reverse(root);
		root.next = null;
		return newHead;
	}
	let slow = head, fast = head;
	while (fast.next && fast.next.next) {
		slow = slow.next;
		fast = fast.next.next;
	}
	let rightHead = slow.next;
	slow.next = null;
	rightHead = reverseList(rightHead);
	let p1 = head, p2 = rightHead;
	while (p1 && p2) {
		const tp1 = p1.next;
		const tp2 = p2.next;
		p1.next = p2;
		p2.next = tp1;
		p1 = tp1;
		p2 = tp2;
	}
	return head;
};

// 参考答案
var reorderList = function(head) {
    if (!head || !head.next) return head;
    let slow = head;
    let fast = head.next;
    //find the middle node
    while(fast && fast.next){
        slow = slow.next;
        fast = fast.next.next;
    }
    let second = slow.next;
    slow.next = null;
    // reverse the second half
    let node = null;
    let curr = second;
    while(curr){
        const temp = curr.next;
        curr.next = node;
        node = curr;
        curr = temp;
    }
    second = node;
    while (second) {
		const p1 = head.next;
		const p2 = second.next;
		head.next = second;
		second.next = p1;
		head = p1;
		second = p2;
    }
    // do not return anything
}


const head = array2LinkedList([1,2,3,4,5]);
const newHead = reorderList(head);
console.log(linkedList2Array(newHead));