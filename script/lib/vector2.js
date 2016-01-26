import Matrix from './matrix'

//矢量
var Vector2 = function(x, y, space) {
  this.x = x
  this.y = y
  this.push(x, y)
  this.space = space
}

Vector2.prototype = []

//标量乘法
Vector2.prototype.multiply = function(d) {
  return new Vector2(this.x * d, this.y * d)
}

//加法
Vector2.prototype.add = function(vec) {
  return new Vector2(this.x + vec.x, this.y + vec.y)
}

//减法
Vector2.prototype.sub = function(vec) {
  return new Vector2(this.x - vec.x, this.y - vec.y)
}

//矢量模
Vector2.prototype.magnitude2 = function() {
  return this.x * this.x + this.y * this.y
}
Vector2.prototype.magnitude = function() {
  return Math.sqrt(this.magnitudeSquare())
}

//归一化
Vector2.prototype.normalization = function() {
  return this.multiply(1 / this.magnitude())
}

//点积
Vector2.prototype.dot = function(vec) {
  return this.x * vec.x + this.y * vec.y
}

//夹角
Vector2.prototype.cosAngle = function(vec) {
  return this.dot(vec) / (this.magnitude() * vec.magnitude())
}

//乘以矩阵
Vector2.prototype.multiplyMat = function(mat) {
  var arr = this.convertToArr()
  arr.push(1)

  return [
    arr[0] * mat[0][0] + arr[1] * mat[1][0] + arr[2] * mat[2][0],
    arr[0] * mat[0][1] + arr[1] * mat[1][1] + arr[2] * mat[2][1],
    arr[0] * mat[0][2] + arr[1] * mat[1][2] + arr[2] * mat[2][2]
  ]
}
Vector2.prototype.multiplyMatToVec = function(mat) {
  var arr = this.multiplyMat(mat)
  return new Vector2(arr[0], arr[1])
}

Vector2.prototype.rotate = function(theta) {
  return this.multiplyMatToVec(Matrix.rotateMat(theta))
}

Vector2.prototype.trans = function(tx, ty) {
  return this.multiplyMatToVec(Matrix.transMat(tx, ty))
}

Vector2.prototype.scale = function(sx, sy) {
  if(arguments.length === 1)
    return this.multiplyMatToVec(Matrix.scaleMat(sx))
  else
    return this.multiplyMatToVec(Matrix.scaleMat(sx, sy))
}

//转换为普通数组
Vector2.prototype.convertToArr = function() {
  return [this[0], this[1]]
}

export default Vector2
