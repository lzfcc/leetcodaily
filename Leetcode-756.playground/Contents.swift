class Solution {
    func pyramidTransition(_ bottom: String, _ allowed: [String]) -> Bool {
        var patterDict = [String: [String]]()
        for w in allowed {
           let key = String(w.prefix(2))
            let val = String(w.suffix(1))
            if patterDict[key] == nil {
                patterDict[key] = [String]()
            }
            patterDict[key]?.append(val)
        }
        
        func buildNext(_ A: String, _ ans: String, _ i: Int) -> Bool {
            print("A = \(A), ans = \(ans), A = \(i)")
            if A.count == 0 {  //找到可行解
                return true
            }
            if i + 1 == A.count {  //某一排全部摆放完成
                return buildNext(ans, "", 0)
            }
            let w = A.subString(from: i, length: 2)
            if let dic = patterDict[w] {
                for x in dic {
                    if buildNext(A, ans + x, i + 1) {
                        return true
                    }
                }
            } else {
                return false
            }

            return false
        }

        return buildNext(bottom, "", 0)
    }
}

extension String {
    func subString(from: Int, length: Int) -> String {
        let indexStartOfText = self.index(self.startIndex, offsetBy: from)
        let indexEndOfText = self.index(self.startIndex, offsetBy: from + length)
        let substring = self[indexStartOfText..<indexEndOfText]
        return String(substring)
    }
}

Solution().pyramidTransition("XYXX", ["XXX", "XXY", "XYX", "XYY", "YXZ"])

var a = "abcdefg"
print(a.subString(from: 2, length: 3))
