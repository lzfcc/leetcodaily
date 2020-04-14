const func = matrix => {
    let maxLen = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            str = String(matrix[i][j]);
            if (matrix[i][j] === Infinity) str = '∞';
            if (matrix[i][j] === -Infinity) str = '-∞';
            if (str.length > maxLen) {
                maxLen = str.length;
            }
        }
    }
    const topBoundLen = maxLen * matrix[0].length + (matrix[0].length + 1);
    const bound = '-'.repeat(topBoundLen);
    let output = [`┌${bound}┐`];
    for (let i = 0; i < matrix.length; i++) {
        const line = ['|'];
        for (let j = 0; j < matrix[0].length; j++) {
            str = String(matrix[i][j]);
            if (matrix[i][j] === Infinity) str = '∞';
            if (matrix[i][j] === -Infinity) str = '-∞';
            line.push(str.padEnd(maxLen, ' '));
        }
        line.push('|');
        output.push(line.join(' '));
    }
    output.push(`└${bound}┘`)
    output = output.join('\n');
    console.log(output);
    return output;
};

module.exports = func;

let data = [
    [883,19,9,12,44],
    [22,-19,0,4,1],
    [78,-47,36,1,102],
    [212,19,-93,1,79]];
// func(data);
