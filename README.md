# leetcodaily
Leetcode everyday.
Mainly JavaScript, sometimes Swift.

Leecode common snippets:

1. String munipulation in Swift
```swift
extension String {
    var length: Int {
		return count
	}
    subscript (r: Range<Int>) -> String {
		let range = Range(uncheckedBounds: (lower: max(0, min(length, r.lowerBound)),
											upper: min(length, max(0, r.upperBound))))
		let start = index(startIndex, offsetBy: range.lowerBound)
		let end = index(start, offsetBy: range.upperBound - range.lowerBound)
		return String(self[start ..< end])
	}
    func substring(in range: Range<Int>) -> Substring {
        let from = index(startIndex, offsetBy: range.startIndex)
        let to = index(startIndex, offsetBy: range.endIndex)
        return self[from..<to]
    }
    func char(at i: Int) -> Character {
        return self[index(startIndex, offsetBy: i)]
    }
	subscript (i: Int) -> String {
		return self[i ..< i + 1]
	}
	func substring(fromIndex: Int) -> String {
		return self[min(fromIndex, length) ..< length]
	}
	func substring(toIndex: Int) -> String {
		return self[0 ..< max(0, toIndex)]
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

extension String {
    func charactersFrequency() -> Dictionary<Character, Int>  {
		return self.reduce([:]) { (d, c) -> Dictionary<Character, Int> in
			var d = d
			let i = d[c] ?? 0
			d[c] = i + 1
			return d
		}
	}
}
```
