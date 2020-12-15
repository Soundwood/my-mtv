class Particle {
    constructor(x,y,directionX,directionY,size,color,ctx,width,height) {
        this.x = x
        this.y = y
        this.directionX = directionX
        this.directionY = directionY
        this.size = size
        this.color = color
        this.width = width
        this.height = height
        this.ctx = ctx
    }
    draw() {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        this.ctx.fillStyle = '#8C5523'
        this.ctx.fill()
    }
    update() {
        if (this.x > this.width || this.x < 0) {
            this.directionX = -this.directionX
        }
        if (this.y > this.height || this.y < 0) {
            this.directionY = -this.directionY
        }
        this.x += this.directionX
        this.y += this.directionY
        this.draw()
    }
}
export default Particle