class Solution {
	func beautifulArray(_ N: Int) -> [Int] {
		if N <= 0 {
			return []
		}
		let arr = Array(1...N)
		var ans = Array(1...N)
		var i = 0
		var j = N - 1
		var p = (N - 1) / 2
		var q = (N - 1) / 2 + 1
		var t = true
		while i < j {
			if t {
				ans[i] = arr[p]
				ans[j] = arr[q]
			} else {
				ans[i] = arr[q]
				ans[j] = arr[p]
			}
			i += 1
			j -= 1
			p -= 1
			q += 1
			t = !t
		}
		if N % 2 == 1 {
			ans[N / 2] = 1
		}
		print(ans)
		return ans
	}
}

let sol = Solution()
sol.beautifulArray(3)
sol.beautifulArray(0)
sol.beautifulArray(1)
sol.beautifulArray(12)
sol.beautifulArray(6)
sol.beautifulArray(9)
sol.beautifulArray(101)