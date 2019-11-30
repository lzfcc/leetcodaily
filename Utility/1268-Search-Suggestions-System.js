const Node = function() {
    this.alphabets = {};
    this.word = null;
    this.repeat = 0; // 允许单词重复
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
        node.word = word;
        node.repeat++;
    }
    
    findSuggestWordsForPrefix(prefix) {
        let node = this.root;
        for (const c of prefix) {
            if(!node.alphabets[c]) return [];
            node = node.alphabets[c];
        }
        const stack = [node], words = [];
        while(stack.length && words.length < 3) {
            const currentNode = stack.pop();
            if (currentNode.word) {
                let n = currentNode.repeat;
                while (n > 0 && words.length < 3) {
                    words.push(currentNode.word);
                    n--;
                }
            }
            const keysInOrder = Object.keys(currentNode.alphabets).sort().reverse();
            for (const c of keysInOrder) {
                stack.push(currentNode.alphabets[c])
            }
        }
        return words;
    }
}

/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */


var suggestedProducts = function(products, searchWord) {
    const trie = new Trie();
    products.forEach(element => {
        trie.insert(element);
    });
    let searchPrefix= '';
    const a = searchWord.split('').map(c => {
        searchPrefix += c;
        return trie.findSuggestWordsForPrefix(searchPrefix)
    });
    console.log(a.map(e => e.toString()));
};

// suggestedProducts(["mobile","mouse","moneypot","monitor","mousepad"], "mouse");
// suggestedProducts(["havana"], "havana");
// suggestedProducts(["bags","baggage","banner","box","cloths"], "bags");
// suggestedProducts(["havana"], "titiana");

// suggestedProducts(["mobile","mouse","moneypot","moneypot","mousepad"], "mouse");
suggestedProducts(["yrvpszjpbajqheimd","yopkhfp","yrvpszjpvpwebetnkflkpqyztqbenyxycsp","yrvpszjpvpwebetnkflkpqjmqnkwys","yrvpbbutjaijwrazgefknyb","yrvpszjpvpwebetnkflvkjkuhjhkly","yrvpszjpvpwebetnkflkpqyztqrkbhx","jmltzx","dydx","yrvpszjpvpwebetnkflkpqyztqvt","yrvpszjpvpwebetnkflkpqyztqjkmblhl","yrvpszjpvaertqgmslpgvvyqtt","rrunezlvpobngec","yrvphtnnwfkcztywegkcnbhcduvfgflk","mbeyjwspsgaadovrdbtczushqbmyzyr","yrvpszjpvpwebetxp","nqdtmxfpskrwupro","yrvpszjpvpwebetnkflkpqyztqiwpdboe","yrvpszjpvpwebetnkflkpqyzttckwwevsur","hmjgee","yvzsajwjavkvyjpzgnxobbaamqli","yrvpsivqmu","czcedmqasdxsbbozmfrkgeuxflanoq","yrvpszjpvpwebetnkflkpqyztqiwpdbfstuy","yrvpszzo","yrvpszjpvpwebsknliqzmmkmdfbtjj","sdtlwkrfn","yrvvqzuwkcwdqlhaqea","yrvpszjpvpwebetvjwepruokkrw","yrvpszjpvpwebetnkflkpqyztqiwpdbfwqp","yrvpszjpvpwegcwjjqdxkdzguuwy","iylfqvu","yrvpszjpvajqfsocuiqwfkpkknvprnrqug","yrvpszjprxdnavnrnkecbgsmllswyxqra","yrvpszjpvpwebeh","yrvpszjpvpwxpcmpaw","yrvpszjpvpwebetnkflkpqyztqiwpdbfjvc","wiwxagayhusuksacxvyqsu","yrvpszjpvpwebetddiosvwmomgx","yrvpszjpvpwebetnkflkpqyztqiwpyzat","yrvpszjpvpwebetnkflkpqyztqiwpdbfstn","npc","yrvpszjpvpwebetnkflkpqyztqiwpdbfstuc","lrcddaekjzdvvdsegfpllfceet","yrvpszjpvpwebetnkflkpupqvscw","yrbojjxinzxhjjatajmatgp","yrvpszjpvpwebetnkflkpqyzejcbutmh","yrvpszjpvpwebetnkfbr","yrvpszjpvpwebetnkflksqj","zaxtzonglnetwook","yrvpszjpvpwebejqbbwok","nufwrgxrtrzjrgrtx","yrvpszjpvpwvogkei","yrvpszmphqmdasrgmapblhn","hd","yrvpsbeoyxqeqwpyobmuhhssquvremcw","yrvpszjpvpwebetnkflkpqyztqiqb","yrvpszjpvpwebetnkflkpqyztqiwpdot","yrvpszjpvpwcxnqlwthalpvthc","yrvpszjpvpvaijzcydiflmdsa","yjzfybcmvwitagvdbbsfeeico","yrvpszjpvpwebetnkflkplu","tzhkqhlzznfsbowpi","yrvpszjpvpwuyxawsyiprbemu","gmwjnmuhkpz","prqu","yrvpszjpvpweszvvpszwmqkiabfyxidni","yrvpszjpvpwebetnkflkpqyztqiwpdbfr","yrvpszjpvpwmqsrhpm","yrvpszjpvpwebetnkflkpqyztqiwpdbfstc","ahfflamk","yrvpszlttt","ishlhvvmcx","yrvpszjpvpwebetnkflkpqyztqiwpdbfsdo","mldxgokjpsxfivvozvvxxsfmwyhfduycphu","yrvpszjpvpyhgulgd","yrvpszjpvpwfbczoklsmzcxpcvftyc","yrvpszjpvpwebetnkflkpqyztqwifauo","yrvpszjpvpwebetnkflkpqyztqiwpdbfstud","yvnydqhhawrxjduuuzbhvur","yrvpszjpvpwebetnkflkpqyztqiwpdbfstb","ahplytavleixtctzsgtwzlqycaidve","yrvpszjrbtrkoz","qyneeiizhtligbhvpuqzdus","vgqbf","qnubbnqdtisubi","yrvpszjpfcw","jyhbufwbnqbmtngzkcjlimwbuxu","yrvpszjpvzvu","yrvpszjpvpwebetnkflkpqyztqiwpdbfstug","yrvpszcmomgbkddqismmtsduts","eaiedwqxkl","yrvpszjpvpwebeteyrtwhszyrv","yrvpszjpvpqzaahkkzvduplszxduetzy","yrvpszjpvpwebetnkflkpqyztqiwbq","yrvpszjpvpwebetnkflkpqyztqiwpdcw","yrvpclabbxbgcllhiwqfyytoobcxdhpd","yrvpszjpvpwebetbu","yrvpszjpvpkmxspnsdwithkew","ywvdoscehffjlvxkplcvkuzyvctyeuzlleg","yrvpszjpvpwebetnubdjnskdkyqvx","yrvpszjpvpwebetnkflkpqyztuc","arhyqq","pjibfrkxhsnzibbkitka","yrvpszjpvpwebetnkflkpqyztqiwpdbfev","rtdgagykso","yrvpszjpvpwebetnkflkpqyvqd","yrvwbkzljhdiehikqwkwxfvzujdafzlcx","yrvpszjpvpwebrdywc","yrvpszshowbyfdgvfgmx","yrvpszjpvpwebohwwrgebtiwwcxxvk","yrvpszjpvpwebetnkflkivlssfmzxaj","lktnibnmmmy","favaobnuruxyqdln","yrvpszjpvpopnlusqeaybvprtoq","yrvpszjpvpwebetnkflkpqyztqiwplaly","nmautwtdzvhlwqfv","yrvpszjpvpjgtozzpvc","yrvpszjpvpsguilgtpihi","yrvpszjpvpwebeiaqqlzynovquqsazbusrc","yrvpszjpvpwebthrct","yrvpszjpvpwebetnkffrvsn","yrvpszjpqstsdxtjgvjqhkhypus","yrvpszjpvpwebetnkflkpisvyvewadzlfdq","pvcweftpqldodse","yrvpszjpvpwebetnklsjduc","jpvvuytnuegjpnspnzyqaqn","pzgsdefwuaqlmxbfgrnnyfevxssraytkreu","yrvpszjpvpwebetnkflkpqyztqiwpigp","yrvpszjpvpwebetnkflkpqyztqiwe","yrvpszjpvpwebetnkflkpqmrwupcxxhk","yrvpszjpvpwebetnkflkpqyztqiwpdbfstuo","yrvpszjpvpwebetnkflkpqyztjmfof","yrvpszjpvpwebetnkflkpqyztqiwo","yrvpsu","yrvpszjpvpwebetnkflkpqyztqiwigristm","yrvpszjpvpwebetnkflkhliuckbadgxs","hvtgyknlkexdtsszpgcieignmogowmckiiu","yrvpszjpvpwebetnkflkpqyzgmxvkgweh","yrvpszjpvpwebetnkflkpqyztqiwpdbfstud","yrvpszjpvpwebetnkflkpqyztqiwpik","cgypdevetfdjyvax","rxumjczboh","yrvpszjpvpwebetnkflkpqyztqgrtl","qmcxonwbhmcealguxyvdqbk","yrvpszjpvpwebns","yrvpszjpvpwexbzhiwnmoetohnflrwnwbnn","yrvpszjpvpwebmkr","yrvpszjpvpwexwfzmfuckmipqpvw","yrvpszjpvpwebetnkflkpqyztqiwpdbfstub","yrvpszjpvpwebetnkflkpqyztqiwpn","nifymmldthgihlixkqvyeehlbstbhlmvmn","ydgtztbeiczlx","avnhiiuq","zpspgauojpesnqhdxnn","yepqjndyhklawosidytujadslyeoyw","yrvpszjpvpwebetnkflkpn","tnrwzbmuhcvdmsrnbijysoahjycrnicpdam","yrvnnldhuqxe","yrvrpbdwdcvunsfo","yrvpszjpvpwebetnkl","yrvpszjpvpwebetnkflkpqyztqiwpdudxdd","yrvpszjpvpwebetnkflkpqyztqiwpdbfstuh","yrvpszjpvpwebetnkflkpqyztqiwppj","ndlcmk","yrvpszjpvpwebetnkflkpqyztqif","yrvpnjzykmggaclfpdvtvtsxv","yrvpszjpvpwebetnkflkpqyztqiwpdbfb","yrgwyvkrosum","yrvpszjpvpwebetnkflkpqyztqiwpdbfsto","yrvpszjpvpwebetnkqeawcgzdmauavxhzk","dbcanhranazbuvfbnngvtvvikptmfejak","yrvpszjpvgfbzrydlqzxvmkwkfzgkhqje","yrvpszjpvpwebetnkflkpqyztqiwpdbfyqx","rzdwoqrimyawq","yrvpszjpvpwebetnkflkpqydcp","wrvmokwbgkiifvlv","yrvpszjpvpwebetnkflfsyvln","nxddxwmiyfocjonqxfccdaxzuwvz","yrvpsqiqqewlzlt","yqhzupm","hm","yrvpszjpvpwebetnkflkpv","yrvpszjpvpwebetnijtafmzahuwrwf","vrni","yrvpszjpvpwebetnkflkpqyztqiwpdbpyd","yrvpszjpvpwebetnlrimnigvomjshvpnm","ywmbitntqajhfwcypc","wsykb","yrvpszjpvpwebetnkflkpqyziny","yrvpszjpvpwebetnkflkjvcm","yrvpszjpvpwebetnkflkiyp","yrvpszjpvpwebetnkflllnzyeowsfjgs","yrvpszjpvpwebetnkflkpqyzexii","ixcuhduteeerfnsqbqrpvydgxnhezvr","yrvpszjpvpwebetseprruixaa","yrvpszjpvpwebetnkflnyvxnnfhpjgfv","qc","wngdomlm","yrvpszjpvsaqnihnmtyaquvkpnvapyqm","xjljvzuhjvlrql","yrvpszjpvpwebetnkflkpqyztqiwpdbfstug","yrvpszjpvpwebetnkflkkffhp","yrvpszjpvpwebetnkflkpqyztqiwpdbfx","yrvpszjpvrkagmadehuoyb","yrvpszjpvpwebetnkflkpkslueby","yrvpszjpvpwexnntasajngzjwjtzrhjsryn","taesbfmiiwxveidtj","fnhjonofwwkcgcdwtmppsyywupngvpe","yrvvoapewpfmonlgoi","cdrdazqovenjvuadnkeulvspy","yrvpszjpvpwkhuitbrq","yjd","yrvpszjpvpwebetnkflkpqjgmfortfytj","yrvpszjpdvvuugfoezycnhugoktbpsf","md","lxstawcvsqcjee","ybonpfvkgxigvrwnkuetunanmiiqc","yrvpszjycajkezrbpjsndeuwqzbmhp","yrvpszjpvpwebetnkflkpqyztqiwpdbfms","yrvpszjpvpwebetnkixsqbmzg","yrvpszjpvpwebetnkflktli","yrvpszjpvpwebetnkflkpqyztqcx","yrvpszjpvpwebetpfoj","yraqzecj","aamldvdiofdhobrsyuhuctuwxcwphl","yrehdpiekzgjhiafh","yrvpszjpvalijnqfioggredsg","yrvpszjpvpwebetnkflkpqyztqiwpdbfstuw","eflmxhbirawwhwemvjgterpqmozgw","yrvpszjpvpwegjglrovy","yrvpszjmia","sstgtcyufziigmzysytcfveqh","yrvpszjpvpwebeaehascjd","ywthzxa","yrvpszjpvpwebetnkflkpqyztqiwpdbfso","yrvpszjpvpwebetnkflkpqyztqibggq","yrvpszjpvpwhbtvbailibpxa","yfbqmypbqvirjhyqexyixctw","yrvpszjpvpwekxkn","yrvpszjpvpwebetnkflkpqyztqiwpdbvpn","yrvpszjpvpvrg","gzmblbqcmapc","yrvvmpoxnop","yrvpszjpvpwebetnkfrgxtimt","yldcaqpydbqempahkkbixmmhcwmittnl","yrvpsenltnibbbdkitykoyrjs","yrvpszjpvpwebetnkflljcwqrejnmf","yhbbrplmyvhm","yrvpszaaciwrpzhdbnbeyfger","afh","yrvpszjpvpwebetnkflkjvoyw","yrvpszjpvpwegaqolclusrrvfia","yrvpszudwvzip","yrvpszjpvpwplxivegq","yrvsnvomtsgqppgjutf","yrvpszjpvpwebetnkflkpqyztqiwpdbsbsi","yrvpszjpvpwebetnkflyunsf","o","ooodhbwuwmujtcqqky","yrvpszjpvpwebetnkflkpqyztqiwpdgzs","yrvpsfmvpgg","yrvpszjpvpwebetffbbmphstbjqebhkokv","nmecdghgnbho","fjbavlsd","yrvpsjondwaukqrogaeuzjuewqej","oehfigufwqdltkvfgtfokxlvahs","yrvpszjpvpwebetnkflbzcqutjcqmgdmen","yrvpszjpvpqpqnfoleoexllqllzxbyix","jaoqlouznhg","yrvpszjpvpwebetnkflkpqyztqiwpdbufs","yrvpszjpvpwebetnkflkpqyztqiwpdbfstuh","lmflzoqnjiqkpawxlwtqyvcg","yrvpszjpvpwebetnkflkpqyztqiwpdbfstua","yxvajocnqrduli","xttfupvol","hcxcce","yrvpszjpvpwebetnkflkpqyztqiitxydsv","wthlizryppmh","yrvpszjpvpwebetnkflkpqyxfqfdr"],"yrv")