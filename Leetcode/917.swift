class Solution {
    func reverseOnlyLetters(_ S: String) -> String {
        var alphas = [Character]()
        Array(S).forEach { c in
            if c.isAlpha() {
                alphas.append(c)
            }
        }
        
        var charArr = Array(S)
        for i in 0..<charArr.count {
            if charArr[i].isAlpha() {
                charArr[i] = alphas.popLast()!
            }
        }
        return String(charArr)
    }
}

//extension String {
//    func substring(in range: Range<Int>) -> Substring {
//        let from = index(startIndex, offsetBy: range.startIndex)
//        let to = index(startIndex, offsetBy: range.endIndex)
//        return self[from..<to]
//    }
//    func char(at i: Int) -> Character {
//        return self[index(startIndex, offsetBy: i)]
//    }
//    func hasAlpha() -> Bool {
//        for c in self.utf8 {
//            if c >= 97 && c <= 122 || c >= 65 && c <= 90 {
//                return true
//            }
//        }
//        return false
//    }
//}

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

let sol = Solution()
print(sol.reverseOnlyLetters("--0-+#"))

var aStr = "azAZsec"
let index1 = aStr.index(aStr.startIndex, offsetBy: 0)
let index2 = aStr.index(aStr.startIndex, offsetBy: 4)

let mySubstring = aStr[index1...index2]

let charVal = aStr.unicodeScalars
for c in aStr.utf8 {
    print(c)
}
