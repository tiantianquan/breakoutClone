/*
  球状对象
 */
import GameObject from './gameObject'
import Vector2 from './lib/vector2'

class BallObject extends GameObject {
  constructor(opt,flag) {
    //父类构造
    super(opt,flag)
  }

  // /**
  //  * 获取最终渲染坐标点
  //  */
  // getEndPoints() {
  //   let {
  //     superSpace
  //   } = this.space
  //   let transMat = this.space.convertToSuperMat()
  //   this.endPoints = this.points.map((point) => {
  //     let endPoint = point.multiplyMatToVec(transMat)
  //     if(superSpace.name === 'worldspace') {
  //       endPoint = superSpace.getRealPoint(endPoint)
  //     }
  //     return endPoint
  //   })
  // }

  render() {
    this.getEndPoints()
    let {
      ctx, width
    } = this
    ctx.fillStyle = this.fillStyle
    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = this.strokeStyle
    ctx.beginPath()
    ctx.arc(this.endOrigin[0], this.endOrigin[1], width / 2, 0, Math.PI * 2)
    ctx.closePath()
    if(ctx.fillStyle)
      ctx.fill()
    if(ctx.strokeStyle)
      ctx.stroke()
  }
}

export default BallObject
