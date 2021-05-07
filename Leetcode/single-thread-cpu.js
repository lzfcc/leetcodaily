// https://www.geeksforgeeks.org/binary-heap/
class MinHeap {
	constructor(n, cmp) {
		this.capacity = n
		this.heapArray = []
		this.cmp = cmp || ((a, b) => a - b)
	}

	// Get the Parent index for the given index
	parent(key) {
		return (key - 1) >> 1
	}

	// Get the Left Child index for the given index
	left(key) {
		return 2 * key + 1
	}

	// Get the Right Child index for the given index
	right(key) {
		return 2 * key + 2
	}

	// Inserts a new key
	insertKey(key) {
		if (this.heapArray.length == this.capacity) {
			// heap is full
			return false
		}

		// First insert the new key at the end
		this.heapArray.push(key)

		let i = this.heapArray.length - 1
		// Fix the min heap property if it is violated
		while (i != 0 && this.cmp(this.heapArray[i], this.heapArray[this.parent(i)]) < 0) {
			this.swap(i, this.parent(i))
			i = this.parent(i)
		}
		return true
	}

	// Returns the minimum key (key at root) from min heap
	getMin() {
		return this.heapArray[0]
	}

	// Method to remove minimum element (or root) from min heap
	extractMin() {
		if (this.heapArray.length <= 0) {
			return Infinity
		}

		if (this.heapArray.length == 1) {
			return this.heapArray.pop()
		}

		// Store the minimum value, and remove it from heap
		let root = this.heapArray[0]
		this.heapArray[0] = this.heapArray[this.heapArray.length - 1]
		this.heapArray.pop()

		this.minHeapify(0)

		return root
	}

	// A recursive method to heapify a subtre with the root at given index
	// This method assumes that the subtrees are already heapified
	minHeapify(key) {
		let l = this.left(key)
		let r = this.right(key)
		let smallest = key
		if (l < this.heapArray.length && this.cmp(this.heapArray[l], this.heapArray[smallest]) < 0) {
			smallest = l
		}
		if (r < this.heapArray.length && this.cmp(this.heapArray[r], this.heapArray[smallest]) < 0) {
			smallest = r
		}

		if (smallest != key) {
			this.swap(key, smallest)
			this.minHeapify(smallest)
		}
	}

	size () {
		return this.heapArray.length
	}

	swap(x, y) {
		const t = this.heapArray[x]
		this.heapArray[x] = this.heapArray[y]
		this.heapArray[y] = t
	}
}

function Task(i, s, d) {
	this.index = i
	this.start = s || 0
	this.duration = d || 0
}
/**
 * @param {number[][]} tasks
 * @return {number[]}
 */
var getOrder = function (tasks) {
	tasks = tasks.map((t, i) => {
		return new Task(i, t[0], t[1])
	}).sort((t1, t2) => {
		return t1.start - t2.start
	})
	const ans = []
	const waiting = new MinHeap(100005, (t1, t2) => {
		if (t1.duration != t2.duration) {
			return t1.duration - t2.duration
		}
		return t1.index < t2.index
	})
	let k = 0
	let t = tasks[k].start
	while (k < tasks.length || waiting.size() > 0) {
		while (k < tasks.length && tasks[k].start <= t) {
			waiting.insertKey(tasks[k])
			k++
		}
        if (waiting.size() == 0) {
            t = tasks[k].start
            continue
        }
		const min = waiting.extractMin()
		//		console.log(j, min, t)
		ans.push(min.index)
		t += min.duration
	}
	console.log(ans)
	return ans
};

// 这是最初的代码，有两个问题
// 问题1: 对于大数据会超时，因为没有用优先队列
// 问题2: 更严重，看下面的注释
var getOrderTLE = function(tasks) {
	tasks = tasks.map((t, i) => {
		return new Task(i, t[0], t[1])
	}).sort((t1, t2) => {
		return t1.start - t2.start
	})
	const ans = []
	const waiting = []
	let k = 0
	let t = tasks[k].start
	while (k < tasks.length || waiting.length > 0) {
		while (k < tasks.length && tasks[k].start <= t) {
            // 这段代码可能执行不到，比如时刻 1 来了一个任务执行 1s 结束，时刻 10 才有下一个任务
            // 根本没有机会让 t 和 k 往前走
			waiting.push(tasks[k])
			k++
		}
        //>>>>> 修正：
        if (waiting.size() == 0) {
            t = tasks[k].start
            continue
        }
        //<<<<<
		let min = 1e10, j = 0
		for (let i = 0; i < waiting.length; i++) {
			if (waiting[i].duration < min) {
				min = waiting[i].duration
				j = i
			}
			if (waiting[i].duration == min && waiting[i].index < waiting[j].index) {
				j = i
			}
		}
		ans.push(waiting[j].index)
		waiting.splice(j, 1) // process and dequeue
		t += min
	}
    console.log(ans)
	return ans
};

getOrderTLE([[5,2],[7,2],[9,4],[6,3],[5,10],[1,1]])