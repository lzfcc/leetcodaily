class DSU {
    constructor() {
        this.parent = new Array(11).fill(0).map((x, i) => i);
    }
    find(x) {
        if (this.parent[x] != x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    union(x, y) {
        this.parent[this.find(x)] = this.find(y);
    }
}

// 看了 solution...
var accountsMerge = function(accounts) {
    const dsu = new DSU();
    const em_to_name = {}, em_to_id = {};
    let i = 0;
    for (const acc of accounts) {
        const [name, ...emails] = acc;
        for (const email of emails) {
            em_to_name[email] = name;
            if (typeof em_to_id[email] === 'undefined') {
                em_to_id[email] = i;
                i += 1;
            }
            dsu.union(em_to_id[emails[0]], em_to_id[email])
        }
    }
    const ans = {}
    for (const email of Object.keys(em_to_name)) {
        const id = dsu.find(em_to_id[email]);
        if (typeof ans[id] === 'undefined') ans[id] = [];
        ans[id].push(email);
    }
    const res = [];
    return Object.values(ans).map(v => {
        v.sort()
        return [em_to_name[v[0]], ...v];
    });
};

// const res = accountsMerge([
//     ["John","johnsmith@mail.com","john_newyork@mail.com"],
//     ["John","johnsmith@mail.com","john00@mail.com"],
//     ["Mary","mary@mail.com"],
//     ["John","johnnybravo@mail.com"]]);
const res = accountsMerge([
    ["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],
    ["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],
    ["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],
    ["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],
    ["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]]);
console.log(res);