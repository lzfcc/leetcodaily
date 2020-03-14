function Node(val) {
	this.val = val;
	this.next = null;
}

/**
 * Initialize your data structure here.
 */
var MyLinkedList = function() {
	this.dumbHead = new Node(-1);
};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1. 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
	let head = this.dumbHead.next;
	let i = 0;
	while (i < index && head) {
		head = head.next;
		i++;
	}
	if (!head) return -1;  // 第一次 wrong answer 少写这句
	console.log(head.val);
	return head.val;
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
	this.addAtIndex(0, val);
};

/**
 * Append a node of value val to the last element of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
	const newTail = new Node(val);
	let prev = this.dumbHead;
	let head = this.dumbHead.next;
	while (head) {
		prev = head;
		head = head.next;
	}
	prev.next = newTail;
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
	let prev = this.dumbHead;
	let head = this.dumbHead.next;
	let i = 0;
	while (i < index && head) {
		prev = head;
		head = head.next;
		i++;
	}
	if (!head && i < index) 
		return;
	
	const newNode = new Node(val);
	prev.next = newNode;
	newNode.next = head;
};

/**
 * Delete the index-th node in the linked list, if the index is valid. 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
	let prev = this.dumbHead;
	let head = this.dumbHead.next;
	let i = 0;
	while (i < index && head) {
		prev = head;
		head = head.next;
		i++;
	}
	if (!head && i <= index)
		return;
	
	prev.next = head.next;
	head = null;
};

function test(operations, args) {
	let list = null;
	for (let i = 0; i < operations.length; i++) {
		if (operations[i] == 'MyLinkedList') {
			list = new MyLinkedList();
		} else {
			list[operations[i]](args[i][0]);
		}
	}
}

test(["MyLinkedList","addAtHead","get","addAtHead","addAtHead","deleteAtIndex","addAtHead","get","get","get","addAtHead","deleteAtIndex"],
[[],[4],[1],[1],[5],[3],[7],[3],[3],[3],[1],[4]])