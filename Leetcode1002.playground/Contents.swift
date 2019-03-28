class Solution {
    func commonChars(_ A: [String]) -> [String] {
        if A.count == 0 {
            return []
        }
        var dict = [Character: Int]()
        var tdict = [Character: Int]()
        for c in A[0] {
            if let n = dict[c] {
                dict[c] = n + 1
            } else {
                dict[c] = 1
            }
        }
        for str in A.dropFirst() {
            for c in str {
                if let n = dict[c] {
                    if let m = tdict[c] {
                        tdict[c] = m < n ? m + 1 : n
                    } else {
                        tdict[c] = 1
                    }
                }
            }
            dict = tdict
            tdict.removeAll()
        }

        var res = [String]()
        for (k, v) in dict {
            for _ in 0..<v {
                res.append(String(k))
            }
        }
        return res
    }
}

print(Solution().commonChars(["bell", "label", "roller"]))
