const Node = function() {
    this.alphabets = {};
    this.isWord = false;
}

/**
 * Initialize your data structure here.
 */
class Trie {
    constructor() {
        this.root = new Node();
    }
    /**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
    insert(word) {
        let node = this.root;
        for(let i = word.length - 1; i >= 0; i--) {
            const c = word[i];
            if (!node.alphabets[c]) {
                node.alphabets[c] = new Node();
            }
            node = node.alphabets[c];
        }
        node.isWord = true;
    }
}

var StreamChecker = function(words) {
    this.trie = new Trie();
    for (const word of words) {
        this.trie.insert(word);
    }
    this.seq = [];
};

/** 
 * @param {character} letter
 * @return {boolean}
 */
StreamChecker.prototype.query = function(letter) {
    this.seq.push(letter);
    let cur = this.trie.root;
    for (let i = this.seq.length - 1; i >= 0; i--) {
        const c = this.seq[i];
        if (cur.alphabets[c]) {
            cur = cur.alphabets[c];
        } else {
            return false;
        }
        if (cur.isWord) {
            return true;
        }
    }
    return false;
};

// var ch = new StreamChecker(['red','cast','card','do','army','mark']);
// ch.query('a');
// ch.query('r');
// ch.query('e');
// ch.query('d');
// ch.query('o');

// var ch = new StreamChecker(['cd','f','kl']);
// ch.query('a');
// ch.query('b');
// ch.query('c');
// ch.query('d');
// ch.query('e');
// ch.query('f');
// ch.query('g');
// ch.query('h');
// ch.query('i');
// ch.query('j');
// ch.query('k');
// ch.query('l');

var ch = new StreamChecker(["ab","ba","aaab","abab","baa"]);
i = 1;
for (const c of ["a","a","a","a","a","b","a","b","a","b","b","b","a","b","a","b","b","b","b","a","b","a","b","a","a","a","b","a","a","a"]) {
    console.log(i++);
    console.log(ch.query(c));
}