/**
 * @param {number[][]} moves
 * @return {string}
 */
var tictactoe = function(moves) {
    const winVectors= ['111000000', '000111000', '000000111', '100100100', '010010010', '001001001', '100010001', '001010100'].map(s => parseInt(s, 2));
    const A = new Array(9).fill(0);
    const B = new Array(9).fill(0);
    for (let i = 0; i < moves.length; i++) {
        const [x, y] = moves[i];
        if (i & 1) {
            B[3 * x + y] = 1;
        } else {
            A[3 * x + y] = 1;
        }
    }
    const numA = parseInt(A.join(''), 2);
    const numB = parseInt(B.join(''), 2);
    const winA = winVectors.filter(v => {
        return (numA & v) == v;
    }).length > 0;
    const winB = winVectors.filter(v => {
        return (numB & v) == v;
    }).length > 0;
    if (winA) {
        return 'A wins'
    } else if (winB) {
        return 'B wins'
    } else {
        return moves.length < 9 ? 'Pending' : 'Draw';
    }    
};

a = tictactoe([[0,0],[2,0],[1,1],[2,1],[2,2]])
a = tictactoe([[0,0],[1,1],[0,1],[0,2],[1,0],[2,0]])
a = tictactoe([[0,0],[1,1],[2,0],[1,0],[1,2],[2,1],[0,1],[0,2],[2,2]])
a = tictactoe([[0,0],[1,1]])