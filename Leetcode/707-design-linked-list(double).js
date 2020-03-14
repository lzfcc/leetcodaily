function Node(val) {
	this.val = val;
	this.next = this.prev = null;
}

/**
 * Initialize your data structure here.
 */
var MyLinkedList = function() {
	this.dumbHead = new Node(-1);
	this.dumbTail = new Node(-1);
	this.dumbHead.next = this.dumbTail;
	this.dumbTail.prev = this.dumbHead;
};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1. 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
	let head = this.dumbHead.next;
	let i = 0;
	while (i < index && head != this.dumbTail) {
		head = head.next;
		i++;
	}
	return head.val;
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
	// const head = this.dumbHead.next;
	// const newHead = new Node(val);
	// newHead.next = head;
	// head.prev = newHead;
	// newHead.prev = this.dumbHead;
	this.addAtIndex(0, val);
};

/**
 * Append a node of value val to the last element of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
	const tail = this.dumbTail.prev;
	const newTail = new Node(val);
	newTail.prev = tail;
	tail.next = newTail;
	newTail.next = this.dumbTail;
	this.dumbTail.prev = newTail;  // 第一次 wrong answer 少写这句
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
	let head = this.dumbHead.next;
	let i = 0;
	while (i < index && head != this.dumbTail) {
		head = head.next;
		i++;
	}
	if (head == this.dumbTail && i < index) 
		return;
	
	const newNode = new Node(val);
	newNode.next = head;
	head.prev.next = newNode;
	newNode.prev = head.prev;
	head.prev = newNode;
};

/**
 * Delete the index-th node in the linked list, if the index is valid. 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
	let head = this.dumbHead.next;
	let i = 0;
	while (i < index && head != this.dumbTail) {
		head = head.next;
		i++;
	}
	if (head == this.dumbTail && i <= index) // 第二次 wrong answer <= 写成 <
		return;
	
	head.prev.next = head.next;
	head.next.prev = head.prev;
	head = null;
};