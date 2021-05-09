// https://github.com/mourner/tinyqueue/blob/master/index.js
export default class PriorityQueue {
	constructor(data = [], compare = (a, b) => a - b) {
		this.data = data;
		this.compare = compare;

		if (this.data.length > 0) {
			for (let i = (this.data.length >> 1) - 1; i >= 0; i--) this._down(i);
		}

//		this._heapify()
	}

	_heapify () { // wrong !! you have to do in while(...)
		for (let i = (this.data.length - 2) >> 1; i >= 0; i--) {
			const leftIndex = (i << 1) + 1
			const rightIndex = leftIndex + 1
			let minIndex = leftIndex
			if (rightIndex < this.data.length) {
				minIndex = this.compare(this.data[leftIndex], this.data[rightIndex]) > 0 ? rightIndex : leftIndex
			}
			if (this.compare(this.data[i], this.data[minIndex]) > 0) {
				const t = this.data[i]
				this.data[i] = this.data[minIndex]
				this.data[minIndex] = t
			}
		}
	}

	push(item) {
		this.data.push(item);
		this._up(this.data.length - 1);
	}

	pop() {
		if (this.data.length === 0) return undefined;

		const top = this.data[0];
		const bottom = this.data.pop();

		if (this.data.length > 0) {
			this.data[0] = bottom;
			this._down(0);
		}

		return top;
	}

	peak() {
		return this.data[0];
	}

	_up(pos) {
		const {data, compare} = this;
		const item = data[pos];

		while (pos > 0) {
			const parent = (pos - 1) >> 1;
			const current = data[parent];
			if (compare(item, current) >= 0) break;
			data[pos] = current;
			pos = parent;
		}

		data[pos] = item;
	}

	_down(pos) {
		const {data, compare} = this;
		const halfLength = this.data.length >> 1;
		const item = data[pos];

		while (pos < halfLength) {
			let bestChild = (pos << 1) + 1; // initially it is the left child
			const right = bestChild + 1;

			if (right < this.data.length && compare(data[right], data[bestChild]) < 0) {
				bestChild = right;
			}
			if (compare(data[bestChild], item) >= 0) break;

			data[pos] = data[bestChild];
			pos = bestChild;
		}

		data[pos] = item;
	}

	isEmpty () {
		return this.data.length == 0
	}
}
