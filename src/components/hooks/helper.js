export function boolArrayToInt(boolArray, signed = false) {
    const _boolArray = [...boolArray]
    const binStr = _boolArray.map((b) => (b ? '1' : '0')).join('')

    let value = parseInt(binStr, 2)

    if (signed) {
        const bits = boolArray.length
        const signBit = boolArray[0]

        if (signBit) {
            // two's complement: value is negative
            value -= 1 << bits
        }
    }

    return value
}

export function intToBoolArray(n, bits = 8, signed = false) {
    let masked

    if (signed) {
        const mask = 1 << bits
        masked = n < 0 ? mask + n : n
    } else {
        masked = n & ((1 << bits) - 1)
    }

    const binStr = masked.toString(2).padStart(bits, '0')
    const reversedArr = [...binStr].map((bit) => bit === '1')

    return reversedArr
}

/**
 * Converts an 8-bit binary string ("11111111") to a number or two's complement number.
 */
export function parseBinaryString(binStr, signed = false) {
    const cleanStr = binStr.replace(/[^01]/g, '').padStart(8, '0').slice(-8)
    let value = parseInt(cleanStr, 2)
    if (signed && cleanStr[0] === '1') {
        // two's complement
        value -= 1 << 8
    }
    return value
}

// a, b = 8-bit values (0..255)
// op = 'add' | 'sub'
export function alu(aBits, bBits, op) {
    const a = boolArrayToInt(aBits)
    const b = boolArrayToInt(bBits)
    let result, carry

    if (op === 'add') {
        const sum = a + b
        result = sum & 0xff // nur 8 Bit behalten
        carry = sum > 0xff ? true : false
    } else if (op === 'sub') {
        const diff = a - b
        result = diff & 0xff
        carry = diff < 0 ? true : false // Borrow = true when negative
    }
    return { result: intToBoolArray(result), carry }
}

export const getBinary = (bits) => bits.map((v) => (v ? '1' : '0')).join('')

export function darkenColor(color, amount = 0.5) {
    // Supports HEX or RGB(a)
    let r, g, b

    if (color.startsWith('#')) {
        const bigint = parseInt(color.slice(1), 16)
        if (color.length === 4) {
            r = ((bigint >> 8) & 0xf) * 17
            g = ((bigint >> 4) & 0xf) * 17
            b = (bigint & 0xf) * 17
        } else {
            r = (bigint >> 16) & 255
            g = (bigint >> 8) & 255
            b = bigint & 255
        }
    } else if (color.startsWith('rgb')) {
        const parts = color.match(/[\d.]+/g).map(Number)
        ;[r, g, b] = parts
    } else {
        // fallback
        return color
    }

    r = Math.round(r * amount)
    g = Math.round(g * amount)
    b = Math.round(b * amount)
    return `rgb(${r}, ${g}, ${b})`
}
