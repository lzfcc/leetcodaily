var Node = function(){
    this.alphabets = {};
    this.isWord = false;
};

/**
 * Initialize your data structure here.
 */
var Trie = function() {
    this.root = new Node();
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    var node = this.root;
    for(var c of word) {
        if (!node.alphabets[c]) {
            node.alphabets[c] = new Node();
        }
        node = node.alphabets[c];
    }
    node.isWord = true;
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    var node = this.root;
    for(var c of word) {
        if(!node.alphabets[c]) return false;
        node = node.alphabets[c];
    }
    return node.isWord;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    var node = this.root;
    for(var c of prefix) {
        if(!node.alphabets[c]) return false;
        node = node.alphabets[c];
    }
    return true;
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

 var trie = new Trie();
 trie.insert('pen');
 trie.insert('pensil');
 trie.insert('apple');
 trie.insert('application');

 trie.search('blue');
 trie.search('apple');
 trie.search('penetrate');
 trie.startsWith('app');
 trie.startsWith('peno');