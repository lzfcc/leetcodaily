const Trie = require('../Utility/Trie');

Trie.prototype.magicSearch = function(node, word, dif) {
    if (dif > 1) return false;
    if (word.length == 0) return node.isWord && dif == 1;

    let ok = false;
    for(const [c, subNode] of Object.entries(node.alphabets)) {
        ok = ok || this.magicSearch(subNode, word.substr(1), c == word[0] ? dif : dif + 1);
    }
    return ok;
}

/**
 * Initialize your data structure here.
 */
var MagicDictionary = function() {
    this.trie = new Trie();
};

/**
 * Build a dictionary through a list of words 
 * @param {string[]} dict
 * @return {void}
 */
MagicDictionary.prototype.buildDict = function(dict) {
    dict.forEach(word => {
        this.trie.insert(word);
    });
};

/**
 * Returns if there is any word in the trie that equals to the given word after modifying exactly one character 
 * @param {string} word
 * @return {boolean}
 */
MagicDictionary.prototype.search = function(word) {
    return this.trie.magicSearch(this.trie.root, word, 0);
};


const dict = new MagicDictionary()
dict.buildDict(['leetcode', 'hello']);
console.log(dict.search('hello'), dict.search('jello'), dict.search('hell'), dict.search('leetcoded'));