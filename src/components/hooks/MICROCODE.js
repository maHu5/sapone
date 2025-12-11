const BASE_MICROCODE = {
    '0000': {
        //NOP
        0: ['co', 'mi'],
        1: ['ro', 'ii', 'ce']
    },
    '0001': {
        //LDA
        2: ['mi', 'io'],
        3: ['ro', 'ai']
    },
    '0010': {
        //ADD
        2: ['mi', 'io'],
        3: ['ro', 'bi'],
        4: ['so', 'ai', 'fi']
    },
    '0011': {
        //SUB
        2: ['io', 'mi'],
        3: ['ro', 'bi'],
        4: ['so', 'ai', 'su', 'fi']
    },
    '0100': {
        //STA
        2: ['io', 'mi'],
        3: ['ao', 'ri']
    },
    '0101': {
        //LDI
        2: ['io', 'ai']
    },
    '0110': {
        //JMP
        2: ['io', 'jmp']
    },
    '0111': {
        //JC when cf = 0
    },
    1000: {
        //JZ when zf = 0
    },
    1110: {
        //OUT
        2: ['ao', 'oi']
    },
    1111: {
        //HLT
        2: ['hlt']
    }
}

const MICROCODE = {}

for (const flags of ['00', '01', '10', '11']) {
    const clone = JSON.parse(JSON.stringify(BASE_MICROCODE))
    for (const key in clone) {
        clone[key][0] = ['co', 'mi']
        clone[key][1] = ['ro', 'ii', 'ce']
    }

    // FLAGS
    // F F
    // C Z
    // 1 0
    //op-code: 0111 JC
    //op-code: 1000 JZ

    if (flags === '01') clone['1000'][2] = ['io', 'jmp']
    if (flags === '10') clone['0111'][2] = ['io', 'jmp']
    if (flags === '11') {
        clone['0111'][2] = ['io', 'jmp']
        clone['1000'][2] = ['io', 'jmp']
    }

    Object.entries(clone).forEach(([k, v]) => {
        MICROCODE[k + flags] = v
    })
}

export default MICROCODE
