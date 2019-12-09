/**
 * Initialize your data structure here.
 */
var RandomizedSet = function() {
	this.store = [];
	this.obj = {};
};

//https://www.cnblogs.com/grandyang/p/5740864.html

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
	if (this.obj[val] !== undefined) {
		return false;
	}
	this.store.push(val);
	this.obj[val] = this.store.length - 1;
	return true;
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
	if (this.obj[val] === undefined) {
		return false;
	}
	const index = this.obj[val];
	if (index === this.store.length - 1) {
		this.store.pop();
	} else {
		this.store[index] = this.store.pop();
		this.obj[this.store[index]] = index;
	}
	delete this.obj[val];
	return true;
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
	const index = Math.floor(this.store.length * Math.random());
	return this.store[index];
};


var obj = new RandomizedSet()
var param_1 = obj.insert(2)
var param_2 = obj.remove(3)
var param_3 = obj.insert(3)
var param_4 = obj.getRandom()
var param_5 = obj.insert(2)
var param_6 = obj.remove(2)
var param_7 = obj.insert(1)
var param_8 = obj.getRandom()
