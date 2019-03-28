# leetcodaily
Leetcode everyday.
Mainly JavaScript, sometimes Swift.

Leecode common snippets:

1. Convertion from an array to binary tree
```js
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

function build(array) {
    let nodes = array.map(function(x){
        return x != null ? new TreeNode(x) : null;
    });
    for(let i = 0; i < array.length; i++) {
        if (nodes[i] == null) continue;
        nodes[i].left = nodes[i * 2 + 1] || null;
        nodes[i].right = nodes[i * 2 + 2] || null;
    }
    return nodes[0];
}
```

2. String munipulation in Swift
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
