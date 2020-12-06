var carPooling = function(trips, capacity) {
    const insert = (q, t) => {
        // 根据乘客终点二分查找并插入
        let s = 0, e = q.length
        while (s < e) {
            const mid = (s + e) >> 1
            if (q[mid][2] < t[2]) {
                s = mid + 1
            } else {
                e = mid
            }
        }
        q.splice(s, 0, t)
    }
    trips.sort((t1, t2) => {
        if (t1[1] === t2[1]) {
            return t1[2] - t2[2]
        }
        return t1[1] - t2[1]
    })
    const q = []
    let p = 0
    for (const t of trips) {
        console.log(q)
        p += t[0]
        while (q.length > 0 && q[0][2] <= t[1]) { // last passenger's end <= this passenger's start
            p -= q[0][0]
            q.shift()
        }
        insert(q, t)
        if (p > capacity) {
            return false
        }
    }
    return true
};

carPooling([[3,2,7],[3,7,9],[8,3,9]], 11)