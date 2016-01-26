import Vector2 from './lib/vector2'
import Space from './lib/space'

const initOpt = {
  //中心位置
  origin: new Vector2(0, 0),
  //最终渲染点 -- this.centerPos
  endOrigin: new Vector2(0, 0),
  //宽
  width: 100,
  //高
  height: 100,
  //填充颜色
  fillStyle: '#000',
  //描边颜色
  strokeStyle: 'red',
  lineWidth: 2,
  ctx: document.querySelector('#c').getContext('2d'),
  //自己的坐标空间
  space: new Space({
    //父空间
    superSpace: null,
    //原点在父空间中坐标
    origin: new Vector2(0, 0),
    //旋转角度
    theta: 0
  })
}

class GameObject {
  constructor(opt = initOpt, flag) {
    //flag为true时,局部替换初始变量,false:整体替换
    if(flag) {
      Object.assign(this, initOpt)
      Object.assign(this, opt)
    } else {
      Object.assign(this, opt)
    }
    if(this.origin.multiply === undefined) {
      this.origin = new Vector2(this.pos[0], this.pos[1])
    }
  }

  getEndPoints() {
    let {
      superSpace
    } = this.space
    let transMat = this.space.convertToSuperMat()
    this.endOrigin = this.origin.multiplyMatToVec(transMat)
    if(superSpace.name === 'worldspace') {
      this.endOrigin = superSpace.getRealPoint(this.endOrigin)
    }
  }

  // render(cb) {
  //   let {
  //     ctx
  //   } = this
  //   ctx.fillStyle = this.fillStyle
  //   ctx.lineWidth = this.lineWidth
  //   ctx.strokeStyle = this.strokeStyle
  //   ctx.beginPath()
  //   ctx.closePath()
  //   ctx.fill()
  //   ctx.stroke()
  // }
}

export default GameObject
