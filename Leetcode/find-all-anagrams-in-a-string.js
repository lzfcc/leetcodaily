/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    const pm = {}
    for (const c of p) {
        pm[c] = (pm[c] || 0) + 1
    }
    const ans = []
    let left = 0, right = 0, valid = 0
    const wm = {}
    while (right < s.length) {
        const c = s[right++]
        // 进行窗口内数据的一系列更新
        if (pm[c]) {
            wm[c] = (wm[c] || 0) + 1
            if (pm[c] === wm[c]) {
                valid++
            }
        }
        // 判断左侧窗口是否要收缩
        while (right - left >= p.length) {
            // 当窗口符合条件时，把起始索引加入 res
            if (valid == Object.keys(pm).length) {
                ans.push(left)
            }
            const d = s[left++]
            // 进行窗口内数据的一系列更新
            if (pm[d]) {
                if (pm[d] === wm[d]) {
                    valid--
                }
                wm[d]--
            }
        }
    }
    return ans
};

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    const pm = {}
    for (const c of p) {
        pm[c] = (pm[c] || 0) + 1
    }
    const ans = []
    let left = 0, right = 0, count = p.length
    while (right < s.length) {
        const c = s[right++]
        if (c in pm) {
            pm[c]-- > 0 && count--
        }
        if (count === 0) { ans.push(left ) }
        if (right - left === p.length) {
            const d = s[left++]
            if (d in pm) {
                pm[d]++ >= 0 && count++
            }
        }
    }
    return ans
};

findAnagrams("cbaebabacd", "abc")