interface Character {
  size: number,
  data: Char,
  def: number[]
}

export type CharacterList = {[char: string]: Character}

export class Font {
  list: CharacterList

  constructor(list: CharacterList) {
    this.list = list
  }

  get(c: string): Char {
    const char = this.list[c]
    if (!char) {
      return this.list[' '].data
    }
    return char.data
  }

  measure(text: string): number {
    return text.split('').reduce((m, t) => m + this.list[t].size + 1, 0)
  }
}

export function char(size: number, def: number[]) {
  const data: boolean[][] = Array(8).fill([]).map(() => [])

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < size; x++) {
      let p = def[y] & 1 << x
      data[y][x] = p > 0
    }
  }

  return { size, def, data }
}
