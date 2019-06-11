//Definition for an interval.
public class Interval {
    public var start: Int
    public var end: Int
    public init(_ start: Int, _ end: Int) {
        self.start = start
        self.end = end
    }
    public var description: String {
        return "(\(start),\(end))"
    }
}

class Solution {
    func intervalIntersection(_ A: [Interval], _ B: [Interval]) -> [Interval] {
        var ret = [Interval]()
        if A.count == 0 || B.count == 0 {
            return ret
        }
        var i = 0, j = 0
        while i < A.count && j < B.count {
            let res = intervalOf(A[min(i, A.count - 1)], B[min(j, B.count - 1)])
            if (res.0 == -1) {
                i += 1
            } else if (res.0 == 0) {
                i += 1
                j += 1
            } else {
                j += 1
            }
            if res.1 != nil {
                print(res.1!.description)
                ret.append(res.1!)
            }
            print(i, j)
        }
        return ret
    }
    private func intervalOf(_ A: Interval, _ B: Interval) -> (Int, Interval?) {
        if A.end < B.start {
            return (-1, nil)
        }
        if B.end < A.start {
            return (1, nil)
        }
        let res: Interval? = Interval.init(max(A.start, B.start), min(A.end, B.end))
        if A.end < B.end {
            return (-1, res)
        } else if A.end > B.end {
            return (1, res)
        } else {
            return (0, res)
        }
    }
}

func test(_ A: [[Int]], _ B: [[Int]]) {
    let intervalA = A.map({Interval.init($0[0], $0[1])})
    let intervalB = B.map({Interval.init($0[0], $0[1])})
    print(intervalA.description, intervalB.description)
    let res = Solution().intervalIntersection(intervalA, intervalB)
}


test([[0,2],[5,10],[13,23],[24,25]], [[1,5],[8,12],[15,24],[25,26]])
