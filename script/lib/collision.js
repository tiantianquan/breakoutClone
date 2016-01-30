/*
碰撞检测
 */
import Vector2 from './vector2'

//包围体
var OBB = function(center, rotateAngle, width, height) {
  this.center = center
  this.rotateAngle = rotateAngle
  this.width = width
  this.height = height

  this.axisX = new Vector2(Math.cos(rotateAngle), Math.sin(rotateAngle))
  this.axisY = new Vector2(-Math.sin(rotateAngle), Math.cos(rotateAngle))
}

//获得在axis上的投影半径
OBB.prototype.getProjectionRadius = function(axis) {
  return Math.abs(this.width / 2 * axis.dot(this.axisX)) + Math.abs(this.height / 2 *
    axis.dot(this.axisY))
}


//碰撞机
var CollisionDetector = {}
CollisionDetector.OBBvsOBB = function(obb1, obb2) {
  var axis1 = obb1.axisX
  var axis2 = obb1.axisY
  var axis3 = obb2.axisX
  var axis4 = obb2.axisY

  var centerVec = obb1.center.sub(obb2.center)

  if(Math.abs(axis1.dot(centerVec)) >= obb1.getProjectionRadius(axis1) + obb2.getProjectionRadius(
      axis1)) return false
  if(Math.abs(axis2.dot(centerVec)) >= obb1.getProjectionRadius(axis2) + obb2.getProjectionRadius(
      axis2)) return false
  if(Math.abs(axis3.dot(centerVec)) >= obb1.getProjectionRadius(axis3) + obb2.getProjectionRadius(
      axis3)) return false
  if(Math.abs(axis4.dot(centerVec)) >= obb1.getProjectionRadius(axis4) + obb2.getProjectionRadius(
      axis4)) return false

  return true
}

export {
  OBB,
  CollisionDetector
}
