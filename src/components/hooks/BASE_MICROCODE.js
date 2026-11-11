// prettier-ignore

// prettier-ignore-start
const BASE_MICROCODE = {
    '0000': 'NOP',  // 0
    '0001': 'LDA',  // 1
    '0010': 'ADD',  // 2
    '0011': 'SUB',  // 3
    '0100': 'STA',  // 4
    '0101': 'LDI',  // 5
    '0110': 'JMP',  // 6
    '0111': 'JC',   // 7
    '1000': 'JZ',   // 8
    '1110': 'OUT',  //14
    '1111': 'HLT',  //15
    '1001': '???',  // 9
    '1010': '???',  //10
    '1011': '???',  //11
    '1100': '???',  //12
}
// prettier-ignore-end
export default BASE_MICROCODE
