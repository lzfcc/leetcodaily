class Solution {
    var orderDict: [Character: Int]

    func isAlienSorted(_ words: [String], _ order: String) -> Bool {
        for (index, char) in order.enumerated() {
            orderDict[char] = index + 1
        }

        for i in 0..<(words.count - 1) {
            if gt(words[i], words[i + 1]) {
                return false
            }
        }

        return true
    }

    func gt(_ word1: String, _ word2: String) -> Bool {  //lexicographicaly greater than, i.e. word1 comes after word2 in dictionary
        let arr1 = Array(word1), arr2 = Array(word2)
        for i in 0..<min(arr1.count, arr2.count) {
            if orderDict[arr1[i]]! > orderDict[arr2[i]]! {
                return true
            } else if orderDict[arr1[i]]! < orderDict[arr2[i]]! {
                return false
            }
        }
        if arr1.count > arr2.count {
            return true
        }
        return false
    }

    init() {
        orderDict = Dictionary.init(dictionaryLiteral: (Character("0"), 0))
    }
}

func mylog(_ words: [String], _ order: String) {
    let sol = Solution()
    print(sol.isAlienSorted(words, order))
}

mylog(["apple","app"], "abcdefghijklmnopqrstuvwxyz")
mylog(["app","apple"], "abcdefghijklmnopqrstuvwxyz")
mylog(["dad","bee"], "abcdefghijklmnopqrstuvwxyz")
mylog(["be","bed","beef"], "abcdefghijklmnopqrstuvwxyz")
mylog(["beat","bee","beef"], "abcdefghijklmnopqrstuvwxyz")
mylog(["word","world","row"], "worldabcefghijkmnpqstuvxyz")

