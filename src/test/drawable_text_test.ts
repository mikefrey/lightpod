import {deepEqual} from 'assert'
import {describe, it} from 'mocha'

import {Text} from '../drawable'
import {FrameBuffer} from '../framebuffer'
import {Font8} from '../fonts/font8'

describe('text', () => {
  it('should draw correctly', () => {

    const buf = new FrameBuffer(64, 8)
    const text = new Text(Font8, 'A', 0, 0, 1, 'left')

    text.draw(buf)

    const expected = new Uint32Array([
      0,0,1,1,1,1,1,0,
      0,0,0,1,0,0,1,0,
      1,0,0,0,1,0,0,0,
      0,0,0,1,0,0,1,0,
      0,0,1,1,1,1,1,0
    ])

    const actual = buf.data.slice(0, expected.length)

    deepEqual(actual, expected)
  })
})