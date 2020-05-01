function PriorityQueue() {
    this.data = [];
}

Array.prototype.swap = function(i, j) {
    [this[i], this[j]] = [this[j], this[i]];
}

PriorityQueue.prototype.enqueue = function(val) {
    this.data.push(val);
    let index = this.data.length - 1;
    let parentIndex = (index - 1) >> 1;
    while (parentIndex >= 0) {
        if (this.data[index] > this.data[parentIndex]) {
            this.data.swap(index, parentIndex);
        }
        index = parentIndex;
        parentIndex = (index - 1) >> 1;
    }
}

PriorityQueue.prototype.dequeue = function() {
    this.data.swap(0, this.data.length - 1);
    const val = this.data.pop();
    let index = 0, left, right;
    while (index < this.data.length) {
        left = index * 2 + 1;
        right = index * 2 + 2;
        let greater = index;
        if (left < this.data.length && this.data[left] > this.data[greater]) {
            greater = left;
        }
        if (right < this.data.length && this.data[right] > this.data[greater]) {
            greater = right;
        }
        if (greater === index) break;
        this.data.swap(index, greater);
        index = greater;
    }
    return val;
}

PriorityQueue.prototype.size = function() {
    return this.data.length;
}

const queue = new PriorityQueue();
const data = [1,5,2,4,1,3,6,4];
for (const d of data) {
    queue.enqueue(d);
}
while (queue.size() > 0) {
    console.log(queue.dequeue());
}