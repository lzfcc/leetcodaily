import * as fs from 'fs'
import { INSTRUCTION, POOLSIZE, Register } from './util'

export let token = null
export let src = 0
export let old_src = 0
export let line = 1

// segments
export const text = []
export const stack = []
export const data = []


// registers
export let pc = new Register(text)
export let bp = new Register(text)
export let sp = new Register(stack)
export let ax = new Register()

export function next() {
    token = src++
    return
}

export function program() {
    next()
    while (token) {
        console.log(token)
        next()
    }
}

function expression() {
    //
}

export function run() {
    let op
    while (true) {
        op = pc.deref
        pc.value++
        switch (op) {
            case INSTRUCTION.IMM:
                ax.value = pc.deref
                pc.value++
                break
            case INSTRUCTION.LI:
            case INSTRUCTION.LC:
                ax.value = ax.deref
            case INSTRUCTION.SC:
            case INSTRUCTION.SI:
                sp.deref = ax.value
                sp.value++
                break
            case INSTRUCTION.PUSH:
                sp.value--
                sp.deref = ax.value
                break
            case INSTRUCTION.JMP:  //??
                pc.value = pc.deref
                break
            case INSTRUCTION.JZ:
                pc.value = ax.value ? pc.value + 1 : pc.deref
            case INSTRUCTION.JNZ:
                pc.value = ax.value ? pc.deref : pc.value + 1
            case INSTRUCTION.CALL:
                sp.value--
                sp.deref = pc.value + 1
                pc.value = pc.deref
                break
            case INSTRUCTION.ENT:  // make new stack frame: ENT <size>
                sp.value--
                sp.deref = bp.value
                bp.value = sp.value
                sp.value -= pc.deref
                pc.value++
                break
            case INSTRUCTION.ADJ: // remove arguments from frame: ADJ <size>
                sp.value += pc.deref
                pc.value++
                break
            case INSTRUCTION.LEV:
                sp.value = bp.value
                bp.value = sp.deref
                sp.value++
                pc.value = sp.deref
                sp.value++
                break
            case INSTRUCTION.LEA: // load address for arguments: LEA <offset>
                ax.value = bp.value + pc.deref
                pc.value++
                break
            case INSTRUCTION.OR:
                ax.value = sp.deref | ax.value;
                sp.value++
                break
            case INSTRUCTION.XOR:
                ax.value ^= sp.deref
                sp.value++;
                break
            case INSTRUCTION.AND:
                ax.value &= sp.deref
                sp.value++
                break
            case INSTRUCTION.EQ:
                ax.value = sp.deref == ax.value ? 1 : 0
                sp.value++;
                break
            case INSTRUCTION.NE:
                ax.value = sp.deref != ax.value ? 1 : 0
                sp.value++
                break
            case INSTRUCTION.LT:
                ax.value = sp.deref < ax.value ? 1 : 0
                sp.value++
                break
            case INSTRUCTION.LE:
                ax.value = sp.deref <= ax.value ? 1 : 0
                sp.value++
                break
            case INSTRUCTION.GT:
                ax.value = sp.deref > ax.value ? 1 : 0
                sp.value++
                break
            case INSTRUCTION.GE:
                ax.value = sp.deref >= ax.value ? 1 : 0
                sp.value++
                break
            case INSTRUCTION.SHL:
                ax.value = sp.deref << ax.value
                sp.value++
                break
            case INSTRUCTION.SHR:
                ax.value = sp.deref >> ax.value;
                sp.value++
                break
            case INSTRUCTION.ADD:
                ax.value += sp.deref
                sp.value++
                break
            case INSTRUCTION.SUB:
                ax.value = sp.deref - ax.value
                sp.value++
                break
            case INSTRUCTION.MUL:
                ax.value *= sp.deref
                sp.value++
                break
            case INSTRUCTION.DIV:
                ax.value = sp.deref / ax.value
                sp.value++
                break
            case INSTRUCTION.MOD:
                ax.value = sp.deref % ax.value
                sp.value++
                break
            case INSTRUCTION.EXIT:
                console.log(`exit(${sp.value})`)
                return sp.deref
                break
            // case INSTRUCTION.OPEN: { ax = open((char *)sp[1], sp[0]); } break
            // case INSTRUCTION.CLOS: { ax = close(*sp);} break
            // case INSTRUCTION.READ: { ax = read(sp[2], (char *)sp[1], *sp); } break
            case INSTRUCTION.PRTF: {
                const tmp = sp.value + pc[1]
                /*ax.value = */console.log(tmp[-1], tmp[-2], tmp[-3], tmp[-4], tmp[-5], tmp[-6])
            }
                break
            // case INSTRUCTION.MALC: { ax = (int)malloc(*sp);} break
            // case INSTRUCTION.MSET: { ax = (int)memset((char *)sp[2], sp[1], *sp);} break
            // case INSTRUCTION.MCMP: { ax = memcmp((char *)sp[2], (char *)sp[1], *sp);} break
            default:
                console.log(`unknown instruction: ${op}`)
                return
                break
        }
    }
}


function main() {
    sp.value = POOLSIZE
    text.push(INSTRUCTION.IMM, 10,
        INSTRUCTION.PUSH, INSTRUCTION.IMM, 20,
        INSTRUCTION.ADD, INSTRUCTION.PUSH,
        INSTRUCTION.EXIT)

    program()
    run()
}

const kFilePath = './package.json'

try {
    let data = ''
    if (fs.existsSync(kFilePath)) {
        data = fs.readFileSync(kFilePath, 'utf-8')
    }
    console.log(data.toString())
    main()
} catch (e) {
    console.log(e)
}
