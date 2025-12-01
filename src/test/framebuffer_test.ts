import {equal} from 'assert'
import {describe, it} from 'mocha'

import {FrameBuffer} from '../framebuffer'

describe('FrameBuffer.coordsToIdx', () => {
  it('should map coordinates correctly', () => {
    const buf = new FrameBuffer(64, 8)

    equal(buf.coordToIdx(0, 0), 0)
    equal(buf.coordToIdx(0, 1), 1)
    equal(buf.coordToIdx(0, 2), 2)
    equal(buf.coordToIdx(0, 3), 3)
    equal(buf.coordToIdx(0, 4), 4)
    equal(buf.coordToIdx(0, 5), 5)
    equal(buf.coordToIdx(0, 6), 6)
    equal(buf.coordToIdx(0, 7), 7)

    equal(buf.coordToIdx(1, 0), 15)
    equal(buf.coordToIdx(1, 1), 14)
    equal(buf.coordToIdx(1, 2), 13)
    equal(buf.coordToIdx(1, 3), 12)
    equal(buf.coordToIdx(1, 4), 11)
    equal(buf.coordToIdx(1, 5), 10)
    equal(buf.coordToIdx(1, 6), 9)
    equal(buf.coordToIdx(1, 7), 8)

    equal(buf.coordToIdx(2, 0), 16)
    equal(buf.coordToIdx(2, 1), 17)
    equal(buf.coordToIdx(2, 2), 18)
    equal(buf.coordToIdx(2, 3), 19)
    equal(buf.coordToIdx(2, 4), 20)
    equal(buf.coordToIdx(2, 5), 21)
    equal(buf.coordToIdx(2, 6), 22)
    equal(buf.coordToIdx(2, 7), 23)

    equal(buf.coordToIdx(3, 0), 31)
    equal(buf.coordToIdx(3, 1), 30)
    equal(buf.coordToIdx(3, 2), 29)
    equal(buf.coordToIdx(3, 3), 28)
    equal(buf.coordToIdx(3, 4), 27)
    equal(buf.coordToIdx(3, 5), 26)
    equal(buf.coordToIdx(3, 6), 25)
    equal(buf.coordToIdx(3, 7), 24)

    equal(buf.coordToIdx(4, 0), 32)
    equal(buf.coordToIdx(4, 1), 33)
    equal(buf.coordToIdx(4, 2), 34)
    equal(buf.coordToIdx(4, 3), 35)
    equal(buf.coordToIdx(4, 4), 36)
    equal(buf.coordToIdx(4, 5), 37)
    equal(buf.coordToIdx(4, 6), 38)
    equal(buf.coordToIdx(4, 7), 39)

    equal(buf.coordToIdx(5, 0), 47)
    equal(buf.coordToIdx(5, 1), 46)
    equal(buf.coordToIdx(5, 2), 45)
    equal(buf.coordToIdx(5, 3), 44)
    equal(buf.coordToIdx(5, 4), 43)
    equal(buf.coordToIdx(5, 5), 42)
    equal(buf.coordToIdx(5, 6), 41)
    equal(buf.coordToIdx(5, 7), 40)
  })
})
