/**
 * @param {number[][]} points
 * @return {number}
 */
var numberOfBoomerangs = function(points) {
    const N = points.length;
    const distance2 = (p1, p2) => (p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2;
    const isEqual = (p1, p2) => p1[0] === p2[0] && p1[1] === p2[1];
    const dict = new Map();
    const ans = [];
    let dis, pairs;
    for (let i = 0; i < N - 1; i++) {
        for (let j = i + 1; j < N; j++) {
            dis = distance2(points[i], points[j]);
            !dict.has(dis) && dict.set(dis, []);
            pairs = dict.get(dis);
            for (const [pi, pj] of pairs) { // i < j, pi < pj, pi <= i => pi < j
                if (isEqual(points[pi], points[i])) {
                    ans.push([pj, pi, j], [j, pi, pj]);
                }
                if (isEqual(points[pj], points[i])) {
                    ans.push([pi, pj, j], [j, pj, pi]);
                }
                if (isEqual(points[pj], points[j])) {
                    ans.push([pi, pj, i], [i, pj, pi]);
                }
            }
            pairs.push([i, j]);
        }
    }
    return ans.length;
};

// 本题并不需要记录点三元组，所以更快点方式：
var numberOfBoomerangs = function(points) {
    let res = 0;
    for (let i = 0; i < points.length; i++) {
        const map = new Map();
        for (let j = 0; j < points.length; j++) {
            if (i === j) continue;
            const dist = (points[i][1] - points[j][1]) ** 2 + (points[i][0] - points[j][0]) ** 2;
            map.set(dist, 1 + (map.get(dist) || 0));
        }
        for (const cnt of map.values()) {
            res += cnt * (cnt - 1);
        }
    }
    return res;
};

const points = [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,1],[3,3]];
numberOfBoomerangs(points);

