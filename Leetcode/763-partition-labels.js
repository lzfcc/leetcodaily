class Interval {
    constructor (from, to)  {
        [this.from, this.to] = [from, to];
    }
    length() {
        return this.to - this.from + 1;
    }
    merge(interval) {
        this.from = Math.min(this.from, interval.from);
        this.to = Math.max(this.to, interval.to);
    }
    include(x) {
        return this.from <= x && x <= this.to;
    }
}

var partitionLabels = function(S) {
    const intervalStack = [];
    const lastAppear = {};
    const aCharCode = 'a'.charCodeAt();
    for (let i = 0; i < 26; i++) {
        lastAppear[String.fromCharCode(i + aCharCode)] = -1;
    }
    for (let i = 0; i < S.length; i++) {
        const interval = new Interval(i, i);
        if (lastAppear[S[i]] >= 0) {
            let prev = intervalStack.pop();
            while (!prev.include(lastAppear[S[i]])) {
                prev = intervalStack.pop();
            }
            interval.merge(prev);
        }
        intervalStack.push(interval);
        lastAppear[S[i]] = i;
    }
    return intervalStack.map(interval => interval.length());
};

// Solution
var partitionLabels = function(S) {
    const lastAppear = {};
    const aCharCode = 'a'.charCodeAt();
    for (let i = 0; i < 26; i++) {
        lastAppear[String.fromCharCode(i + aCharCode)] = -1;
    }
    for (let i = 0; i < S.length; i++) {
        lastAppear[S[i]] = i;
    }
    let j = 0, anchor = 0;
    const ans = [];
    for (let i = 0; i < S.length; i++) {
        j = Math.max(j, lastAppear[S[i]]);
        if (i == j) {
            ans.push(i - anchor + 1);
            anchor = i + 1;
        }
    }
    return ans;
};

['ababcbacadefegdehijhklij', 'thisisadownloadfrom', 'bbclearningenglish', 'iphoneten'].map(test => partitionLabels(test))
