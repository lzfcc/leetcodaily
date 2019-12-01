function Group() {
    this.children = [];
    this.count = 0;
}

function process(str) {
    str += '$';
    let res = '';
    let j = 0;
    for (let i = 0; i < str.length; i++) {
        const c = str[i];
        if (c >= 'A' && c <= 'Z' || c == '(' || c == ')' || c == '$') {
            if (j - 1 >= 0 && !(res[j - 1] >= '0' && res[j - 1] <= '9') && res[j - 1] != '(') {
                res += '1';
                j++;
            }
        }
        res += c;
        j++;
    }
    return res;
}

/**
 * @param {string} formula
 * @return {string}
 */
var countOfAtoms = function(formula) {
    formula = process(formula)
    let element = '';
    let group = null;
    let count = 0;
    let i = 0;
    let root = new Group();
    const stack = [root];
    while (i < formula.length) {
        const c = formula[i];
        if (c >= 'A' && c <= 'Z' || c == '$') {
            if (i > 0) {
                update();
            }
            element += formula[i];
        } else if (c >= 'a' && c <= 'z') {
            element += formula[i];
        } else if (c >= '0' && c <= '9') {
            count = count * 10 + parseInt(c);
        } else if (c == '(') {
            if (i > 0) {
                update();
            }
            root = new Group();
            stack.push(root);
        } else {  // ')'
            update();
            group = stack.pop();
            root = stack[stack.length - 1];
        }
        i++;
    }
    root = stack[0];
    root.count = 1;
    const obj = traverse(root);
    return Object.keys(obj).sort().map(x => {
        return x + (obj[x] == 1 ? '' : obj[x]);
    }).join('');

    function update() {
        if (element.length > 0) {
            group = new Group();
            group.children.push(element);
            group.count = count;
            element = '';
        }
        if (group) {
            root.children.push(group);
            group.count = count;
            group = null;
        }
        count = 0;
    }

    function traverse(root) {
        if (!(root instanceof Group)) {
            return { [root]: 1 };
        }
        let sum = {};
        for (const sub of root.children) {
            const res = traverse(sub);
            for (const key of Object.keys(res)) {
                if (sum[key]) {
                    sum[key] += res[key];
                } else {
                    sum[key] = res[key];
                }
            }
        }
        for (const key of Object.keys(sum)) {
            sum[key] *= root.count;
        }
        return sum;
    }
};

countOfAtoms = function(formula) {
    formula += '$';
    const stack = [];
    let dict = {}, count = 0, element = '', group = null;  //group不再是树节点，而是{}
    for(const c of formula) {
        if (c >= 'A' && c <= 'Z') {
            update();
            element += c;
        } else if (c >= 'a' && c <= 'z') {
            element += c;
        } else if (c >= '0' && c <= '9') {
            count = count * 10 + parseInt(c);
        } else if (c == '(') {
            update();
            stack.push(dict);
            dict = {};
        } else {  //处理结尾符的逻辑放到了这里
            update();
            group = dict; //这是group唯一的赋值处
            dict = stack.pop();
        }
    }
    return Object.keys(group).sort().reduce((s, x) => s + x + group[x] == 1 ? '' : group[x], '');
    
    function update() {
        if (count == 0) count = 1;
        if (element.length > 0) {
            if (dict[element]) {
                dict[element] += count;
            } else {
                dict[element] = count;
            }
            element = '';
        }
        if (group) { //只有刚刚处理完')'，group才不是null
            group.times(count);
            dict.merge(group);
            group = null;
        }
        count = 0;
    }
}

Object.prototype.merge = function(dict) {
    for (const key of Object.keys(dict)) {
        if (this[key]) {
            this[key] += dict[key];
        } else {
            this[key] = dict[key];
        }
    }
}

Object.prototype.times = function(n) {
    for (const key of Object.keys(this)) {
        this[key] *= n;
    }
}


// 参考 48ms sample code
countOfAtoms1 = function(formula) {
    let dic = {};
    const stk = [1];  //stack 顶数代表当前处理的基团/元素的乘数
    for(let i = formula.length - 1; i >= 0; i--) {
        if(formula[i]=='(') {
            stk.pop();
            continue;
        }
        const t = stk[stk.length-1];
        let j = i;
        while (formula[i] >= '0' && formula[i] <= '9') {
            i--;
        }
        const n = t * ((i < j) ? Number(formula.substring(i + 1, j + 1)) : 1);
        if(formula[i] == ')') {
            stk.push(n);
            continue;
        }
        j = i
        while (formula[i] >= 'a' && formula[i] <= 'z'){
            i--;
        }
        const s = formula.substring(i, j + 1);
        dic[s] = dic[s] || 0;
        dic[s] += n;
    }
    // console.log(dic)
    return Object.keys(dic).sort()
            .reduce((s, c) => s + (dic[c] > 1 ? c + dic[c] : c), '');
};

function mergeDict(dict1, dict2) {
    for (const key of Object.keys(dict1)) {
        if (dict2[key]) {
            dict2[key] += dict1[key];
        } else {
            dict2[key] = dict1[key];
        }
    }
    return dict2;
}

Object.prototype.times = function(n) {
    for (const key of Object.keys(this)) {
        this[key] *= n;
    }
}

Object.prototype.toAnswer = function() {
    return Object.keys(this).sort().map(x => {
        return x + (this[x] == 1 ? '' : this[x]);
    }).join('');
}

let formula = 'Mg(OH)2';
console.log(countOfAtoms(formula));
formula = "K4(ON(SO3)2)2";
console.log(countOfAtoms(formula));
formula = 'CH3CH(OH)COOH';
console.log(countOfAtoms(formula));
formula = 'C10H8N4O2NH2(OH)2(PO3H)3H';
console.log(countOfAtoms(formula));
