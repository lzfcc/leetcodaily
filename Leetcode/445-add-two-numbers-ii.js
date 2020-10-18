 function ListNode(val, next) {
     this.val = (val===undefined ? 0 : val)
     this.next = (next===undefined ? null : next)
 }

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let len1 = getLength(l1)
    let len2 = getLength(l2)
    if (len1 > len2) {
        [l1, l2] = [l2, l1];  // must ; here! otherwise bug!
        [len1, len2] = [len2, len1]
    }
    l1 = addLeadingZeros(l1, len2 - len1)
    const sum = helper(l1, l2)
    if (sum.carry > 0) {
        return new ListNode(1, sum.node)
    }
    return sum.node
};

var helper = function(l1, l2) {
    let node = null
    if (l1 && l2) {
        // console.log('l1: ', l1.val, ', l2: ', l2.val)
        node = new ListNode(0)
        const sum = helper(l1.next, l2.next)
        // console.log(sum)
        node.next = sum.node
        let val = l1.val + l2.val + sum.carry
        node.val = val % 10
        return { node, carry: val >= 10 ? 1 : 0 }
    }
    return { node, carry: 0 }
}

var getLength = function(h) {
    let len = 0
    while (h) {
        h = h.next
        len++
    }
    return len
}

var addLeadingZeros = function(h, zeros) {
    let node = h
    let i = 0
    while (i++ < zeros) {
        node = new ListNode(0, node)
    }
    return node
}

const list1 = [1, 2, 3, 4]
const list2 = [5, 6, 7]

function makeList(list) {
    return list.reduceRight((p, k) => {
        return new ListNode(k, p)
    }, null)
}

const l1 = makeList(list1)
const l2 = makeList(list2)

const res = addTwoNumbers(l1, l2)

console.log(res)

// note: why bug without semicolon?
// see here: https://stackoverflow.com/questions/7421013/why-does-5-6-8-71-2-8-in-javascript

// [a, b] = [b, a]
// [c, d] = [d, c]
// evaluate as:
// [a, b] = [b, a][c, d] = [d, c]
// that is: a = d, b = c
// [b, a][c, d] => [b, a][d] => undefined (possible)
