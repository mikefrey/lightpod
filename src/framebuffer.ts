export class FrameBuffer {
   width: number
   height: number
   size: number
   data: Uint32Array
   transformX: number = 0
   transformY: number = 0

   constructor(w: number, h: number) {
      this.width = w
      this.height = h
      this.size = w * h
      this.data = new Uint32Array(w * h)
   }

   setTransform(x: number, y: number) {
      this.transformX = x
      this.transformY = y
   }

   coordToIdx(x: number, y: number): number {
      x = x + this.transformX
      y = y + this.transformY

      if (x < 0 || this.width < x) {
         return -1
      }
      if (y < 0 || this.height < y) {
         return -1
      }

      if (x % 2) {
         y = this.height - 1 - y
      }

      return (x * this.height) + y
   }

   set(x: number, y: number, color: number) {
      const i = this.coordToIdx(x, y)
      if (0 <= i && i < this.size) {
         this.data[i] = color
      }
   }

   get(x: number, y: number): number {
      const i = this.coordToIdx(x, y)
      return this.data[i]
   }

   clear() {
      this.data = new Uint32Array(this.width * this.height)
   }

   each(fn: (x:number, y:number) => number) {
      let x = 0
      let y = 0
      let size = this.width * this.height

      for (let i = 0; i < size; i++) {
         this.set(x, y, fn(x, y))

         x += 1
         if (x >= 64) {
            y += 1
            x = 0
         }
      }
   }
}
