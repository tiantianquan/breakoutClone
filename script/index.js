import 'normalize.css'

const c = document.querySelector('#c')
const ctx = c.getContext('2d')
c.width = window.innerWidth
c.height = window.innerHeight

function hackHighDpi(canvas, ctx) {
  var devicePixelRatio = window.devicePixelRatio || 1
  var backingStorePixelRatio = ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio || 1

  var ratio = devicePixelRatio / backingStorePixelRatio

  if(devicePixelRatio !== backingStorePixelRatio) {
    var oldWidth = canvas.width
    var oldHeight = canvas.height

    canvas.width = oldWidth * ratio
    canvas.height = oldHeight * ratio

    canvas.style.width = oldWidth + 'px'
    canvas.style.height = oldHeight + 'px'

    ctx.scale(ratio, ratio)
  }
}

hackHighDpi(c, ctx)

let cw = window.innerWidth
let ch = window.innerHeight

ctx.fillStyle = '#eee'
ctx.fillRect(0, 0, c.width, c.height)

//---------------------------------------------------------------
import WorldSpace from './lib/worldSpace'
import Vector2 from './lib/vector2'
import Space from './lib/space'
import RectaObject from './rectaObject'
import BallObject from './ballObject'

let worldSpace = new WorldSpace(new Vector2(cw / 2, ch / 2))



let r1 = new RectaObject({
  space: new Space({
    //父空间
    superSpace: worldSpace,
    //原点在父空间中坐标
    origin: new Vector2(0, 0),
    //旋转角度
    theta: 0
  })
}, true)



var b1 = new BallObject({
  space: new Space({
    superSpace: worldSpace,
    origin: new Vector2(0, 0),
    theta: 0
  })
}, true)
r1.render()
b1.render()







//---------------------------------------------------------------
// import RectaObject from './rectaObject'
//
// var  r1 = new RectaObject({
//   ctx
// },true)
// r1.render()

// import BallObject from './ballObject'
// var b1 = new BallObject()
// b1.render()
