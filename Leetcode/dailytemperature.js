var dailyTemperatures = function(T) {
    const ans = T.map(() => 0);
    const tempIndexes = [];
    for (let i = 0; i < T.length; i++) {
        const t = T[i];
        if (!tempIndexes[t]) tempIndexes[t] = [];
        tempIndexes[t].push(i);
    } console.log(tempIndexes);
    for (let i = 0; i < T.length - 1; i++) {
        const t = T[i];
        let h = t + 1;
        while (h <= 100) {
            while(h <= 100 && !tempIndexes[h]) h++;
            if (h > 100) break;
            let j = 0;
            while(j < tempIndexes[h].length && tempIndexes[h][j] < i) j++;
            if (j < tempIndexes[h].length) {
                ans[i] = tempIndexes[h][j] - i;
                break;
            }
            else h++;
        }
    }
    return ans;
};

dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])
