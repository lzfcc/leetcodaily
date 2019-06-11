//class Solution {
//    func sumEvenAfterQueries(_ A: [Int], _ queries: [[Int]]) -> [Int] {
//        var arr = A
//        var evemSum = 0
//        for a in A {
//            if a & 1 == 0 {
//                evemSum += a
//            }
//        }
//
//        var resArr = [Int](repeating: 0, count: queries.count)
//        var i = 0
//        for q in queries {
//            if arr[q[1]] & 1 == 0 && q[0] & 1 == 0 {
//                evemSum = evemSum + q[0]
//            } else if arr[q[1]] & 1 == 1 && q[0] & 1 == 1 {
//                evemSum = evemSum + arr[q[1]] + q[0]
//            } else {
//                if arr[q[1]] & 1 == 0 {
//                    evemSum = evemSum - arr[q[1]]
//                }
//            }
//            resArr[i] = evemSum
//            arr[q[1]] += q[0]
//            i += 1
//        }
//
//        return resArr
//    }
//}

class Solution {
    func sumEvenAfterQueries(_ A: [Int], _ queries: [[Int]]) -> [Int] {
        var arr = A
        var evemSum = A.reduce(0, { (res: Int, a: Int) -> Int in
            res + (a & 1 == 0 ? a : 0)
        })
        
        var resArr = [Int](repeating: 0, count: queries.count)
        for (i, q) in queries.enumerated() {
            if arr[q[1]] & 1 == 0 {
                evemSum -= arr[q[1]]
            }
            arr[q[1]] += q[0]
            if arr[q[1]] & 1 == 0 {
                evemSum += arr[q[1]]
            }
            resArr[i] = evemSum
        }
        
        return resArr
    }
}


let sol = Solution()
let res = sol.sumEvenAfterQueries([1,9,9,7,3], [[3,0],[-3,3],[-4,0],[2,2]])
