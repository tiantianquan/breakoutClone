/*
  矩形对象
 */
import GameObject from './gameObject'
import Vector2 from './lib/vector2'

class RectaObject extends GameObject {
  constructor(...arg) {
    //父类构造
    super(...arg)

    //子类构造
    const {
      width, height, origin
    } = this

    //内部向量点
    this.points = []
    this.points[0] = origin.add(new Vector2(-width / 2, height / 2))
    this.points[1] = origin.add(new Vector2(width / 2, height / 2))
    this.points[2] = origin.add(new Vector2(width / 2, -height / 2))
    this.points[3] = origin.add(new Vector2(-width / 2, -height / 2))

    //最终渲染点
    this.endPoints = []
  }

  /**
   * 获取最终渲染坐标点
   */
  getEndPoints() {
    super.getEndPoints()

    let {
      superSpace
    } = this.space
    let transMat = this.space.convertToSuperMat()

    this.endPoints = this.points.map((point) => {
      let endPoint = point.multiplyMatToVec(transMat)
      if(superSpace.name === 'worldspace') {
        endPoint = superSpace.getRealPoint(endPoint)
      }
      return endPoint
    })
  }

  /**
   * 渲染
   */
  render() {
    this.getEndPoints()
    let {
      ctx
    } = this
    ctx.fillStyle = this.fillStyle
    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = this.strokeStyle
    ctx.beginPath()
    for(var i = 0; i < this.endPoints.length; i++) {
      if(i === 0)
        ctx.moveTo(this.endPoints[0][0], this.endPoints[0][1])
      else
        ctx.lineTo(this.endPoints[i][0], this.endPoints[i][1])
    }
    ctx.closePath()
    if(ctx.fillStyle)
      ctx.fill()
    if(ctx.strokeStyle)
      ctx.stroke()
  }
}

export default RectaObject
