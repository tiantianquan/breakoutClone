import 'normalize.css'

const c = document.querySelector('#c')
const ctx = c.getContext('2d')
c.width = window.innerWidth
c.height = window.innerHeight

function loop(cb) {
  cb()
  requestAnimationFrame(() => {
    loop(cb)
  })
}

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
import {
  CollisionDetector
}
from './lib/collision'

let worldSpace = new WorldSpace(new Vector2(cw / 2, ch / 2))

let blockList = []

let walls = {
  width: 1000,
  height: 10
}
walls = {
  ...walls,
  left: new RectaObject({
      width: walls.width,
      height: walls.height,
      space: new Space({
        superSpace: worldSpace,
        origin: new Vector2(walls.height / 2, ch / 2),
        theta: 90
      })
    }, true),
    top: new RectaObject({
      width: walls.width,
      height: walls.height,
      space: new Space({
        superSpace: worldSpace,
        origin: new Vector2(cw / 2, walls.height / 2),
        theta: 0
      })
    }, true),
    right: new RectaObject({
      width: walls.width,
      height: walls.height,
      space: new Space({
        superSpace: worldSpace,
        origin: new Vector2(cw - walls.height / 2, ch / 2),
        theta: 0
      })
    }, true),
    bottom: new RectaObject({
      width: walls.width,
      height: walls.height,
      space: new Space({
        superSpace: worldSpace,
        origin: new Vector2(cw / 2, ch - walls.height / 2),
        theta: 90
      })
    }, true),
    render() {
      console.log(this.left)
    },
}
let ball = new BallObject({
  width: 10,
  height: 10,
  lineWidth: 0,
  strokeStyle: null,
  space: new Space({
    superSpace: worldSpace,
    origin: new Vector2(0, -200),
    theta: 0
  })
}, true)


for(let i = 0; i < 10; i++) {
  blockList.push(new RectaObject({
    width: 100,
    height: 20,
    space: new Space({
      //父空间
      superSpace: worldSpace,
      //原点在父空间中坐标
      origin: new Vector2(-600 + i * 110, 0),
      //旋转角度
      theta: 0
    })
  }, true))
}





//---------------------------------------------------------------------------
let flag = false
let main = function() {
  ctx.clearRect(0, 0, cw, ch)
  if(flag) {
    ball.space.origin = ball.space.origin.add(new Vector2(-1, -1))
    ball.obb.center = ball.space.origin
  } else {
    ball.space.origin = ball.space.origin.add(new Vector2(-1, 1))
    ball.obb.center = ball.space.origin
  }
  ball.render()
  rectaList.forEach((r) => {
    r.render()

    if(CollisionDetector.OBBvsOBB(ball.obb, r.obb)) {
      r.fillStyle = 'rgb(112, 71, 74)'
      flag = true
    } else {
      r.fillStyle = '#000'
    }
  })
}


loop(() => {
  walls.render()
})

//---------------------------------------------------------------
// let r1 = new RectaObject({
//   space: new Space({
//     //父空间
//     superSpace: worldSpace,
//     //原点在父空间中坐标
//     origin: new Vector2(0, 0),
//     //旋转角度
//     theta: 0
//   })
// }, true)
//
// var b1 = new BallObject({
//   space: new Space({
//     superSpace: worldSpace,
//     origin: new Vector2(0, 0),
//     theta: 0
//   })
// }, true)
//
//   r1.space.origin.x += 1
// if(CollisionDetector.OBBvsOBB(r1.obb, b1.obb)) {
//   r1.fillStyle = 'rgb(112, 71, 74)'
// } else {
//   r1.fillStyle = '#000'
// }
// r1.render()
// b1.render()
