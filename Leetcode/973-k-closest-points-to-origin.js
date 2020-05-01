function Point(x, y) {
    this.x = x;
    this.y = y;
    this.module = x * x + y * y;
}

function PriorityQueue(capacity) {
    this.data = [];
    // if (val <= 0 || (val | 0) !== val) throw new Error()
    this.capacity = capacity;
}

Array.prototype.swap = function(i, j) {
    [this[i], this[j]] = [this[j], this[i]];
}

PriorityQueue.prototype.enqueue = function(val) { 
    // if (val instanceof Point) throw new Error()
    // if (this.data.length === this.capacity && val.module >= this.data[0].module) return;
    this.data.push(val);
    let index = this.data.length - 1;
    let parentIndex;
    while (index > 0) {
        parentIndex = (index - 1) >> 1;
        if (this.data[index].module > this.data[parentIndex].module) {
            this.data.swap(index, parentIndex);
        } else break;
        index = parentIndex;
    }
    if (this.data.length > this.capacity) { 
        this.dequeue();
    }
    console.log(this.serialization().map(arr => arr.toString()));
}

PriorityQueue.prototype.dequeue = function() {
    this.data.swap(0, this.data.length - 1);
    const val = this.data.pop();
    let index = 0, left, right;
    while (true) {
        left = index * 2 + 1;
        right = left + 1;
        let less = index;
        if (left < this.data.length && this.data[left].module > this.data[less].module) {
            less = left;
        }
        if (right < this.data.length && this.data[right].module > this.data[less].module) {
            less = right;
        }
        if (less === index) break;
        this.data.swap(index, less);
        index = less;
    }
    return val;
}

PriorityQueue.prototype.serialization = function() {
    return this.data.map(p => [p.x, p.y]);
}

/**
 * @param {number[][]} points
 * @param {number} K
 * @return {number[][]}
 */
var kClosest = function(points, K) {
    const q = new PriorityQueue(K);
    points.forEach(p => q.enqueue(new Point(...p)));
    return q.serialization();
};

kClosest([[2, 3], [1, 1], [0, 4], [3, 5], [0, -2], [-2, 4], [-1, -1], [3, -3]], 4);