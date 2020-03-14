class Node {
	constructor(val, next = null, random = null) {
		this.val = val;
		this.next = next;
		this.random = random;
	}
}

var copyRandomList = function(head) {
	let p = head;
	while(p) { // a -> b -> c ==> a -> a' -> b -> b' -> c -> c'
		const copyNode = new Node(p.val, p.next, p.random);
		p.next = copyNode;
		p = copyNode.next;
	}
	let copy = head.next;
	while (1) {
		if (copy.random) {
			copy.random = copy.random.next;
		}
		if (copy.next) {
			copy = copy.next.next;
		} else {
			break;
		}
	}
	const retHead = head.next;
	let orig = head;
	copy = retHead;
//	while (copy && copy.next) { // 恢复两个链表分别的结构
//		orig.next = copy.next;
//		orig = orig.next;
//		copy.next = copy.next.next;
//		copy = copy.next;
//	}
	// 上面的写法 wrong anser：原始链表最后一个节点的 next 被修改。的确，上面的写法，结尾的一对 x -> x' 没有处理
	while (orig) {
		orig.next = copy.next;
		orig = orig.next;
        if (copy.next) {
            copy.next = copy.next.next;
		    copy = copy.next;
        }
	}
	return retHead;
};

// 参考答案
// https://leetcode.com/problems/copy-list-with-random-pointer/discuss/43491/A-solution-with-constant-space-complexity-O(1)-and-linear-time-complexity-O(N)
var copyRandomList = function(head) {
	let iter = head, next;

	// First round: make copy of each node,
	// and link them together side-by-side in a single list.
	while (iter) {
		const copy = new Node(iter.val, iter.next, iter.random);
		iter.next = copy;
		iter = copy.next;
	}

	// Second round: assign random pointers for the copy nodes.
	iter = head;
	while (iter) {
		if (iter.random) {
			iter.next.random = iter.random.next;
		}
		iter = iter.next.next;
	}

	// Third round: restore the original list, and extract the copy list.
	iter = head;
	const pseudoHead = new Node(0);
	let copy = null, copyIter = pseudoHead; // implicit head == null protection

	while (iter) {
		// extract the copy
		copy = iter.next;
		copyIter.next = copy;
		copyIter = copy;

		// restore the original list
		iter.next = copy.next;
		iter = iter.next;
	}

	return pseudoHead.next;
}



const n1 = new Node(7)
const n2 = new Node(13);
const n3 = new Node(11);
const n4 = new Node(10);
const n5 = new Node(1);
n1.next = n2;
n2.next = n3;
n2.random = n1;
n3.next = n4;
n3.random = n5;
n4.next = n5;
n4.random = n3;
n5.random = n1;


const copyHead = copyRandomList(n1);

console.log(copyHead);