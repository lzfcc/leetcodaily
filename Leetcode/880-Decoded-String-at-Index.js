var decodeAtIndex = function(S, K) {
    let count = 0n;
    K = BigInt(K);
    for (let i = 0; i < S.length; i++) {
        if (S[i].match(/\d/)) {
            count *= BigInt(S[i])
        } else {
            count++;
        }
    }
    for (let i = S.length - 1; i >= 0; i--) {
        if (S[i].match(/\d/)) {
            count /= BigInt(+S[i]);
            K %= count
            if (K === 0n){
                if (S[i - 1].match(/\d/)) {
                    continue;
                }
                return S[i - 1];
            }
        } else {
            if (count === K) {
                return S[i];
            }
            count--;
        }
    }
    return '';
};

function test(S, K) {
    let res = ''
    for (const c of S) {
        if (c.match(/\d/)) {
            res = res.repeat(+c);
        } else {
            res += c;
        }
    }
    console.log(res[K - 1] === decodeAtIndex(S, K));
}

test('how3dare4you2bitch', 77)
test('leet2code3', 10);
test('see3you2later4', 45);
test('k283', 16);
test('ab3xz', 7);
test('ab3xz', 3);
test("jb8dis8", 12);
