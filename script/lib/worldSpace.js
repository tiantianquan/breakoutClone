import Space from './space'
import Vector2 from './vector2'

//世界空间,默认为屏幕中心
class WorldSpace extends Space {

  constructor(center) {
    super(center)
    this.center = center
    this.name = 'worldspace'
  }

  getRealPoint(vec) {
    return new Vector2(this.center.x + vec.x, this.center.y - vec.y)
  }
}

export default WorldSpace
