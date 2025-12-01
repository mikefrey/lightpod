import {equal} from 'assert'
import {describe, it} from 'mocha'

import {char} from '../fonts/font'

describe('char', () => {
  it('should decode correctly', () => {
    const c = char(5, [0x04, 0x0A, 0x11, 0x11, 0x1F, 0x11, 0x11, 0x00])

    let expected = '  X  \n X X \nX   X\nX   X\nXXXXX\nX   X\nX   X\n     '

    let actual = c.data.map(row => row.reduce((v, c) => v + (c ? 'X' : ' '), '')).join('\n')

    equal(actual, expected)
  })
})