// 题目 912 sort an array。不能使用桶排序，因为使用额外空间（O(n)），内存超限 。

const quickSort = arr => {
    const partition = (start, end) => {
        const randomIndex = (start + Math.random() * (end - start)) | 0;
        const pivot = arr[randomIndex];
        [arr[randomIndex], arr[end - 1]] = [arr[end - 1], arr[randomIndex]];
        let j = start;
        for (let i = start; i < end; i++) {
            if (arr[i] < pivot) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                j++;
            }
        }
		[arr[end - 1], arr[j]] = [arr[j], arr[end - 1]];
        return j;
    }
    const sort = (start, end) => {
        if (start >= end) return;
        const p = partition(start, end);
        sort(start, p);
        sort(p + 1, end);
    }    
	sort(0, arr.length);
	return arr;
}

const heapSort = arr => {
    // https://zh.wikipedia.org/wiki/%E5%A0%86%E6%8E%92%E5%BA%8F

    /**
     * 调整索引为 index 处的数据，使其符合堆的特性。
     * @param index 需要堆化处理的数据的索引
     * @param len 未排序的堆（数组）的长度
     */
    const maxHeapify = (index, len) => {
        const li = (index << 1) + 1; // 左子节点索引
        if (li > len) return;      // 左子节点索引超出计算范围，直接返回
        const ri = li + 1;           // 右子节点索引
        let cMax = li;             // 子节点值最大索引，默认左子节点
        if (ri <= len && arr[ri] > arr[li]) // 比较左右子节点
            cMax = ri;
        if (arr[cMax] > arr[index]) {
            [arr[cMax], arr[index]] = [arr[index], arr[cMax]];      // 如果父节点被子节点调换，
            maxHeapify(cMax, len);  // 则需要继续判断换下后的父节点是否符合堆的特性。
        }
    }

    /*
    *  第一步：将数组堆化
    *  beginIndex = 第一个非叶子节点。
    *  从第一个非叶子节点开始即可。无需从最后一个叶子节点开始。
    *  叶子节点可以看作已符合堆要求的节点，根节点就是它自己且自己以下值为最大。
    */
    const beginIndex = (arr.length >> 1) - 1;
    for (let i = beginIndex; i >= 0; i--)
        maxHeapify(i, arr.length - 1);
    
    /*
    * 第二步：对堆化数据排序
    * 每次都是移出最顶层的根节点A[0]，与最尾部节点位置调换，同时遍历长度 - 1。
    * 然后从新整理被换到根节点的末尾元素，使其符合堆的特性。
    * 直至未排序的堆长度为 0。
    */
    for (let i = arr.length - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        maxHeapify(0, i - 1);
    }

    return arr;
}

const shellSort = arr => {
	const length = arr.length;
	let temp;
	for (let step = length >> 1; step >= 1; step >>= 1) {
		for (let i = step; i < length; i++) {
			// add a[i] to the elements that have been gap sorted
			// save a[i] in temp and make a hole at position i
			temp = arr[i]
			// shift earlier gap-sorted elements up until the correct location for a[i] is found
			let j;
			for (j = i; j >= step && arr[j - step] > temp; j -= step) {
				arr[j] = arr[j - step];
			}
			// put temp (the original a[i]) in its correct location
			arr[j] = temp;
		}
	}
	console.log(arr);
	return arr;
}

function sort(arr) {
    quickSort(arr);
}

sort([1,-9,2,2,5,4,7,-3,0,8,4,-1,6]);
