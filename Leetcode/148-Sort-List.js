function ListNode(val) {
    this.val = val;
    this.next = null;
}

function splitList(head) {
    if (!head) {
        return null;
    }
    let [p, q] = [head, head.next];
    while(q && q.next) {
        [p, q] = [p.next, q.next.next];
    }
    const res = p.next;
    p.next = null;
    return res;
}

function mergeSortedList(head1, head2) {
        head1.val >= head2.val && ([head1, head2]=[head2, head1]);    // X
        let [p, q] = [head1, head2];
        let [prevP, prevQ] = [null, null];
        while (p && q) {
            while(p && p.val < q.val) {
                [prevP, p] = [p, p.next];
            }
            prevP && (prevP.next = q);
            if (!p) {
                break;
            }
            while (q && p.val >= q.val) {
                [prevQ, q] = [q, q.next];
            }
            prevQ && (prevQ.next = p);
            if (!q) {
                break;
            }
        }
        return head1;  // X
}

function mergeSortedList(head1, head2) {
    let [p, q] = [head1, head2];
    let [prevP, prevQ] = [null, null];
    while (p && q) {
        while(p && p.val < q.val) {
            [prevP, p] = [p, p.next];
        }
        prevP && (prevP.next = q);
        if (!p) {
            break;
        }
        while (q && p.val >= q.val) {
            [prevQ, q] = [q, q.next];
        }
        prevQ && (prevQ.next = p);
        if (!q) {
            break;
        }
    }
    return head1.val < head2.val ? head1 : head2;    // √
}

var sortList = function(head) {
    if (!head || !head.next) {
        return head;
    }
    const mid = splitList(head);
    const head1 = sortList(head);
    const head2 = sortList(mid);
    return mergeSortedList(head1, head2);
}

const testCase = [-84,-17,-85,170,186,-85];
const head = makeList(testCase);

function makeList(arr) {
    const dummy = new ListNode(NaN);
    let p = dummy;
    for (const e of arr) {
        const node = new ListNode(e);
        p.next = node;
        p = p.next;
    }
    return dummy.next;
}

function makeArray(head) {
    const res = [];
    while(head) {
        res.push(head.val);
        head = head.next;
    }
    return res;
}

let res = sortList(head);
console.log('Wrong! expected:', testCase.sort((x,y)=>x-y), 'result:', makeArray(res));