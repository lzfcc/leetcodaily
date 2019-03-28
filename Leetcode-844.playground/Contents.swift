class Solution {
    func backspaceCompare(_ S: String, _ T: String) -> Bool {
        func process(_ S: String) -> String {
            var arr = [Character]()
            for c in S {
                if c == Character("#") {
                    arr.popLast()
                } else {
                    arr.append(c)
                }
            }
            print(arr)
            return String(arr)
        }
        return process(S) == process(T)
    }
}

print(Solution().backspaceCompare("#","##b"))

let s = "s$a@0o"
for c in s {
    print(c <= "a")
}
