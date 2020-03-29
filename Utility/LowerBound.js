// C++ STL algorithm lower_bound() 实现 （不是 BinarySerch！）
function LowerBound(A, start, end, target) { // 返回[first, last)内第一个不小于 target 的值的位置
	while (start < end) {
		const mid = (start + end) >> 1;
		if (A[mid] < target) {
			start = mid + 1;
		} else {
			end = mid;
		}
	}
	return start; // last也行，因为[first, last)为空的时候它们重合
};

function UpperBound(A, start, end, target) { // 返回[first, last)内第一个大于 target 的值的位置
	while (start < end) {
		const mid = (start + end) >> 1;
		if (A[mid] <= target) {
			start = mid + 1;
		} else {
			end = mid;
		}
	}
	return start;
};

function EqualRange(A, start, end, target) { // 模拟 C++ equal_range 函数
	return [LowerBound(A, start, end, target), UpperBound(A, start, end, target)]; 
}

/*
	vector<int> arr({1, 3, 3, 3, 5, 8, 8, 10});
	auto p = equal_range(arr.begin(), arr.end(), 3);
	cout << distance(arr.begin(), p.first) << "," << distance(arr.begin(), p.second) << endl; // 1,4
	p = equal_range(arr.begin(), arr.end(), 4);
	cout << distance(arr.begin(), p.first) << "," << distance(arr.begin(), p.second) << endl; // 4,4
*/

module.exports = { LowerBound, UpperBound, EqualRange };