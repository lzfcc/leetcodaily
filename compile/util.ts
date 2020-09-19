
export const POOLSIZE = 64

export enum INSTRUCTION { LEA, IMM, JMP, CALL, JZ, JNZ, ENT, ADJ, LEV, LI, LC, SI, SC, PUSH, OR, XOR, AND, EQ, NE, LT, GT, LE, GE, SHL, SHR, ADD, SUB, MUL, DIV, MOD, OPEN, READ, CLOS, PRTF, MALC, MSET, MCMP, EXIT }

export class Register {
    private _val = 0
    private _segment = {}

    constructor(segment = {}) {
        this._segment = segment
    }
    get value() {
        return this._val
    }
    set value(val) {
        this._val = val
    }
    get deref() { // simulate the '*' operator
        return this._segment[this._val] || 0
    }
    set deref(val) {
        this._segment[this._val] = val
    }
}
