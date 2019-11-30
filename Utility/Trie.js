// also code for 208. Implement Trie (Prefix Tree)
const Node = function() {
    this.alphabets = {};
    this.isWord = false;
    // this.word = null;
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
        for(const c of word) {
            if (!node.alphabets[c]) {
                node.alphabets[c] = new Node();
            }
            node = node.alphabets[c];
        }
        node.isWord = true;
        // node.word = word;
    }
    /**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
    search(word) {
        let node = this.root;
        for(const c of word) {
            if(!node.alphabets[c]) return false;
            node = node.alphabets[c];
        }
        return node.isWord;
        // return node.word !== null;
    }
/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
    startsWith(prefix) {
        let node = this.root;
        for(const c of prefix) {
            if(!node.alphabets[c]) return false;
            node = node.alphabets[c];
        }
        return true;
    }
}

module.exports = Trie;
/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */