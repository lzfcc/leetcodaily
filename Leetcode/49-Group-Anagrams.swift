class Solution {
	func groupAnagrams(_ strs: [String]) -> [[String]] {
		var dict = [String: [String]]()
		for str in strs {
			var arr = str.map { String($0) }
			arr.sort()
			let key = arr.joined(separator: "")
			var res = dict[key] ?? []
			res.append(str)
			dict[key] = res
		}
		return Array(dict.values)
	}
	
	func groupAnagrams2(_ strs: [String]) -> [[String]] {
		var dict = Dictionary(grouping: strs, by: { String($0.sorted()) })
		return Array(dict.values)
	}
}

