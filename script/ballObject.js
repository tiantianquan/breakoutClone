/*
  球状对象
 */
import GameObject from './gameObject'
import Vector2 from './lib/vector2'

class BallObject extends GameObject {
  constructor(opt, flag) {
    //父类构造
    super(opt, flag)
  }

  render() {
    this.getEndPoints()
    let {
      ctx, width
    } = this
    ctx.fillStyle = this.fillStyle
    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = this.strokeStyle
    ctx.beginPath()
    ctx.arc(this.endOrigin.x, this.endOrigin.y, width / 2, 0, Math.PI * 2)
    ctx.closePath()
    if(ctx.fillStyle)
      ctx.fill()
    if(ctx.strokeStyle)
      ctx.stroke()
  }
}

export default BallObject
