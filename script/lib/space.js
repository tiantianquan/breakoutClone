import Matrix from './matrix'
import Vector2 from './vector2'

//空间

//@{origin} vec 相对父空间原点
//@{theta} PI 旋转角度
var Space = function(opt) {
  this.origin = opt.origin
  this.rotateAngle = opt.theta === undefined ? 0 : opt.theta
  this.superSpace = opt.superSpace
}

//转换到父空间
Space.prototype.convertToSuperMat = function() {
  //相对平移
  var transVec = this.origin

  //轴单位矢量
  var xAxisNormal = new Vector2(1, 0).rotate(this.rotateAngle)
  var yAxisNormal = new Vector2(0, 1).rotate(this.rotateAngle)

  var arr1 = xAxisNormal.convertToArr()
  var arr2 = yAxisNormal.convertToArr()
  var arr3 = transVec.convertToArr()
  arr1.push(0)
  arr2.push(0)
  arr3.push(0)

  return new Matrix(arr1, arr2, arr3)
}

// Space.contentList = []

export default Space
