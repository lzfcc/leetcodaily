import UIKit

class Solution {
    func mostCommonWord(_ paragraph: String, _ banned: [String]) -> String {
        var word = ""
        var freq = [String: Int]()
        for c in paragraph {
            if !c.isAlpha() {
                if word.count > 0 {
                    word = word.lowercased()
                    if let k = freq[word] {
                        freq[word] = k + 1
                    } else {
                        freq[word] = 1
                    }
                }
                word = ""
                continue
            }
            word.append(c)
        }
        if word.count > 0 {
            word = word.lowercased()
            if let k = freq[word] {
                freq[word] = k + 1
            } else {
                freq[word] = 1
            }
        }
        
        let sortedFreq = freq.sorted(by: {$0.value > $1.value})
        for item in sortedFreq {
            if !banned.contains(item.key) {
                return item.key
            }
        }
        return ""
    }
}

extension String {
    func substring(in range: Range<Int>) -> Substring {
        let from = index(startIndex, offsetBy: range.startIndex)
        let to = index(startIndex, offsetBy: range.endIndex)
        return self[from..<to]
    }
    func char(at i: Int) -> Character {
        return self[index(startIndex, offsetBy: i)]
    }
    func hasAlpha() -> Bool {
        for c in self.utf8 {
            if c >= 97 && c <= 122 || c >= 65 && c <= 90 {
                return true
            }
        }
        return false
    }
}

extension Character {
    var ascii: Int {
        let charVal = self.unicodeScalars
        if let c = charVal.first {
            return Int(c.value)
        }
        return -1
    }
    func isAlpha() -> Bool {
        return ascii >= 97 && ascii <= 122 || ascii >= 65 && ascii <= 90
    }
}

//let sol = Solution().mostCommonWord("Bob hit a ball, the hit BALL flew far after it was hit.", ["hit"])
let sol = Solution().mostCommonWord("Bob did.  ", ["bob"])

var x = 3, y = 5, bound = 15.0
var res1 = 0.0, res2 = 0.0
for p in 0...20 {
    res1 = pow(Double(x), Double(p))
    if res1 >= bound {
        break
    }
    for q in 0...20 {
        res2 = pow(Double(y), Double(q))
        if res2 >= bound {
            break
        }
        if res1 + res2 <= bound {
            print("\(x)^\(Int(p))+\(y)^\(Int(q))=\(Int(res1 + res2))")
        }
    }
}
var noRep = Set<Int>()
noRep.insert(3)
noRep.insert(5)
noRep.insert(3)
print(Array(noRep))
