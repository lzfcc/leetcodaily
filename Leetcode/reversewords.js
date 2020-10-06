// https://leetcode.com/problems/reverse-words-in-a-string/discuss/47720/Clean-Java-two-pointers-solution-(no-trim(-)-no-split(-)-no-StringBuilder)
const trim = (a) => {
    const n = a.length
    let i = 0, j = 0
    while (j < n) {
        while (j < n && a[j] == ' ') {
            j++             // skip spaces
        }
        while (j < n && a[j] != ' ') {
            a[i++] = a[j++] // keep non spaces
        }
        while (j < n && a[j] == ' ') {
            j++             // skip spaces
        }
        if (j < n) {
            a[i++] = ' '    // keep only one space
        }
    }
    return i
}

const reverse = (a, i, j) => {
    let t
    while (i < j) {
        t = a[i]
        a[i++] = a[j]
        a[j--] = t
    }
}

var reverseWords = function(s) {
	let arr = s.split('')
	let n = arr.length
	n = trim(arr)
    reverse(arr, 0, n - 1)
    let i = 0, j = 0
	while (i < n) {
		while (j < n && arr[j] != ' ') {
			j++
		}
		reverse(arr, i, j - 1)
		i = ++j
	}
	return arr.slice(0, n).join('')
};

console.log(reverseWords('  Bob loves   alice '))
