//https://github.com/adamhooper/js-priority-queue

// Maintains a sorted Array. The running-time is bad in theory, but in
// practice Array operations are small ... assuming there isn't much data.
//
// The Array is stored from last entry to first: we assume queue() will be
// the same speed either way, but this way dequeue() is O(1) instead of O(n).
const _ArrayStrategy = class {
    constructor(options) {
        this.comparator = options.comparator;
        this.data = options.initialValues;
        this.data.sort(this.comparator).reverse();
    }

    queue(value) {
        const pos = this._binarySearchForIndexReversed(value);
        this.data.splice(pos, 0, value);
    }

    dequeue() {
        return this.data.pop();
    }

    peek() {
        return this.data[this.data.length - 1];
    }

    clear() {
        this.data.length = 0;
    }

    size() {
        return this.data.length;
    }

    _binarySearchForIndexReversed(value) {
        let low = 0;
        let high = this.data.length;
        while (low < high) {
            const mid = (low + high) >>> 1;
            if (this.comparator(this.data[mid], value) < 0) { // >=, instead of the usual <
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    };
}

const _BinaryHeapStrategy = class {
    constructor(options) {
        this.comparator = options.comparator;
        this.data = options.initialValues;
        this._heapify();
    }

    // 一般，heapify 是用 bubbleDown 策略
    // _heapify() {
    //     if (this.data.length > 0) {
    //         for (let i = 1; i < this.data.length; i++) {
    //             this._bubbleUp(i);
    //         }
    //     }
    // }

    _heapify() {
        if (this.data.length > 1) {
            for (let i = (this.data.length >> 1) - 1; i >= 0; i--) { // 倒数第一个非叶节点
                this._bubbleDown(i);
            }
        }
    }

    queue(value) {
        this.data.push(value);
        this._bubbleUp(this.data.length - 1);
    }

    dequeue() {
        const ret = this.data[0];
        const last = this.data.pop();
        if (this.data.length > 0) {
            this.data[0] = last;
            this._bubbleDown(0);
        }
        return ret;
    }

    peek() {
        return this.data[0];
    }

    clear() {
        this.data.length = 0;
    }

    size() {
        return this.data.length;
    }

    _bubbleUp(pos) {
        while (pos > 0) {
            const parent = (pos - 1) >>> 1;
            if (this.comparator(this.data[pos], this.data[parent]) >= 0) {
                [this.data[pos], this.data[parent]] = [this.data[parent], this.data[pos]];
                pos = parent;
            } else {
                break;
            }
        }
    }

    _bubbleDown(pos) {
        const last = this.data.length - 1;
        while (true) {
            const left = (pos << 1) + 1;
            const right = left + 1;
            let minIndex = pos;
            if (left <= last && this.comparator(this.data[left], this.data[minIndex]) >= 0) {
                minIndex = left;
            }
            if (right <= last && this.comparator(this.data[right], this.data[minIndex]) >= 0) {
                minIndex = right;
            }
            if (minIndex !== pos) {
                [this.data[minIndex], this.data[pos]] = [this.data[pos], this.data[minIndex]];
                pos = minIndex;
            } else {
                break;
            }
        }
    }
}

// 如果单纯是 Heap Sort，不需要两个方向上的处理（BubbleUp 和 BubbleDown），仅需要一个 heapify。代码可以参考 https://www.geeksforgeeks.org/heap-sort/

const Strategy = {
    Heap: Symbol('Heap'),
    Array: Symbol('Array'),
};

const Comparator = {
    Greater: (a, b) => b - a,
    Less: (a, b) => a - b,
}

class PriorityQueue {
    constructor(nums = [], compare = Comparator.Less, strategy = Strategy.Heap) { // default: MaxHeap
        this.internal = null;
        const options = {
            initialValues: nums,
            comparator: compare,
        }
        if (strategy === Strategy.Heap) {
            this.internal = new _BinaryHeapStrategy(options);
        } else {
            this.internal = new _ArrayStrategy(options);
        }
    }

    queue(value) {
        this.internal.queue(value);
    }

    dequeue() {
        return this.internal.dequeue();
    }

    peek() {
        return this.internal.peek();
    }

    clear() {
        this.internal.clear();
    }

    size() {
        return this.internal.size();
    }
}

function benchmark() {
    for(let i = 1, base = 10; i <= 8; i++, base *= 10) {
        run(base);
    }
}

/*
scale:  10
VM191:31 Array strategy time:  0 s
VM191:42 Heap strategy time:  0 s
VM191:30 scale:  100
VM191:31 Array strategy time:  0 s
VM191:42 Heap strategy time:  0 s
VM191:30 scale:  1000
VM191:31 Array strategy time:  0.001 s
VM191:42 Heap strategy time:  0 s
VM191:30 scale:  10000
VM191:31 Array strategy time:  0.01 s
VM191:42 Heap strategy time:  0.01 s
VM191:30 scale:  100000
VM191:31 Array strategy time:  0.284 s
VM191:42 Heap strategy time:  0.034 s
VM191:30 scale:  1000000
VM191:31 Array strategy time:  51.602 s
VM191:42 Heap strategy time:  0.299 s

大致可以得出结论：当数据规模达到10^5且有频繁入队出队操作时数组方案性能开始严重下降
 */

function run(caseNum) {
    const PUSH_SIZE = caseNum / 10;

    const arr = [];
    for(let i = 0; i < caseNum; i++) {
        arr.push((Math.random() * 10000)|0);
    }

    const toPush = [];
    for(let i = 0; i < PUSH_SIZE; i++) {
        toPush.push((Math.random() * 10000)|0);
    }

    const d1 = new Date();
    const pq1 = new ArrayStrategy({initialValues:arr});
    for(let i = 0; i < PUSH_SIZE; i++) {
        pq1.queue(toPush[i]);
    }
    for(let i = 0; i < PUSH_SIZE; i++) {
        pq1.dequeue();
    }
    const d2 = new Date();
    console.log("scale: ", caseNum);
    console.log("Array strategy time: ", (d2 - d1) / 1000, "s");

    const d3 = new Date();
    const pq2 = new BinaryHeapStrategy({initialValues:arr});
    for(let i = 0; i < PUSH_SIZE; i++) {
        pq2.queue(toPush[i]);
    }
    for(let i = 0; i < PUSH_SIZE; i++) {
        pq2.dequeue();
    }
    const d4 = new Date();
    console.log("Heap strategy time: ", (d4 - d3) / 1000, "s");
}

module.exports = { PriorityQueue, Strategy, Comparator };

q = new PriorityQueue([8,4,2,1,7,9,10,13,10,4,6])
