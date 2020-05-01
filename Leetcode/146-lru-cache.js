// const LRUCache = require('mnemonist/lru-cache');

var MAX_8BIT_INTEGER = Math.pow(2, 8) - 1,
    MAX_16BIT_INTEGER = Math.pow(2, 16) - 1,
    MAX_32BIT_INTEGER = Math.pow(2, 32) - 1;

const getPointerArray = function (size) {
    var maxIndex = size - 1;

    if (maxIndex <= MAX_8BIT_INTEGER)
        return Uint8Array;

    if (maxIndex <= MAX_16BIT_INTEGER)
        return Uint16Array;

    if (maxIndex <= MAX_32BIT_INTEGER)
        return Uint32Array;

    return Float64Array;
};


function LRUCache(capacity) {
    this.capacity = capacity;

    if (typeof this.capacity !== 'number' || this.capacity <= 0)
        throw new Error('mnemonist/lru-cache: capacity should be positive number.');

    var PointerArray = getPointerArray(capacity);

    this.forward = new PointerArray(capacity);
    this.backward = new PointerArray(capacity);
    this.K = new Array(capacity);
    this.V = new Array(capacity);

    // Properties
    this.size = 0;
    this.head = 0;
    this.tail = 0;
    this.items = {};
}

/**
   * Method used to clear the structure.
   *
   * @return {undefined}
   */
LRUCache.prototype.clear = function () {
    this.size = 0;
    this.head = 0;
    this.tail = 0;
    this.items = {};
};

/**
 * Method used to set the value for the given key in the cache.
 *
 * @param  {any} key   - Key.
 * @param  {any} value - Value.
 * @return {undefined}
 */
LRUCache.prototype.set = function (key, value) {

    // The key already exists, we just need to update the value and splay on top
    var pointer = this.items[key];

    if (typeof pointer !== 'undefined') {
        this.splayOnTop(pointer);
        this.V[pointer] = value;

        return;
    }

    // The cache is not yet full
    if (this.size < this.capacity) {
        pointer = this.size++;
    }

    // Cache is full, we need to drop the last value
    else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        delete this.items[this.K[pointer]];
    }

    // Storing key & value
    this.items[key] = pointer;
    this.K[pointer] = key;
    this.V[pointer] = value;

    // Moving the item at the front of the list
    this.forward[pointer] = this.head;
    this.backward[this.head] = pointer;
    this.head = pointer;
};


/**
 * Method used to check whether the key exists in the cache.
 *
 * @param  {any} key   - Key.
 * @return {boolean}
 */
LRUCache.prototype.has = function (key) {
    return key in this.items;
};

/**
 * Method used to get the value attached to the given key. Will move the
 * related key to the front of the underlying linked list.
 *
 * @param  {any} key   - Key.
 * @return {any}
 */
LRUCache.prototype.get = function (key) {
    var pointer = this.items[key];

    if (typeof pointer === 'undefined')
        return -1;

    this.splayOnTop(pointer);

    return this.V[pointer];
};

/**
 * Method used to splay a value on top.
 *
 * @param  {number}   pointer - Pointer of the value to splay on top.
 * @return {LRUCache}
 */
LRUCache.prototype.splayOnTop = function(pointer) {
    var oldHead = this.head;
  
    if (this.head === pointer)
      return this;
  
    var previous = this.backward[pointer],
        next = this.forward[pointer];
  
    if (this.tail === pointer) {
      this.tail = previous;
    }
    else {
      this.backward[next] = previous;
    }
  
    this.forward[previous] = next;
  
    this.backward[oldHead] = pointer;
    this.head = pointer;
    this.forward[pointer] = oldHead;
  
    return this;
  };

  const cache = new LRUCache(2 /* capacity */);

  cache.set(1, 1);
  cache.set(2, 2);
  cache.get(1);       // returns 1
  cache.set(3, 3);    // evicts key 2
  cache.get(2);       // returns -1 (not found)
  cache.set(4, 4);    // evicts key 1
  cache.get(1);       // returns -1 (not found)
  cache.get(3);       // returns 3
  cache.get(4);       // returns 4
  

