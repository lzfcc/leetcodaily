# leetcodaily
Leetcode everyday.
Mainly JavaScript, sometimes Swift.

Leecode common snippets:

1. String munipulation in Swift
```swift
extension String {
    func substring(in range: Range<Int>) -> Substring {
        let from = index(startIndex, offsetBy: range.startIndex)
        let to = index(startIndex, offsetBy: range.endIndex)
        return self[from..<to]
    }
    func char(at i: Int) -> Character {
        return self[index(startIndex, offsetBy: i)]
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
```
