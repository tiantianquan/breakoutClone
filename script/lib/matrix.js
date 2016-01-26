//矩阵
var Matrix = function(r0, r1, r2) {
  this.push(r0, r1, r2)
}

Matrix.prototype = []

Matrix.prototype.multiply = function(mat) {
  return new Matrix(
    [
      this[0][0] * mat[0][0] + this[0][1] * mat[1][0] + this[0][2] * mat[2][0],
      this[0][0] * mat[0][1] + this[0][1] * mat[1][1] + this[0][2] * mat[2][1],
      this[0][0] * mat[0][2] + this[0][1] * mat[1][2] + this[0][2] * mat[2][2]
    ], [
      this[1][0] * mat[0][0] + this[1][1] * mat[1][0] + this[1][2] * mat[2][0],
      this[1][0] * mat[0][1] + this[1][1] * mat[1][1] + this[1][2] * mat[2][1],
      this[1][0] * mat[0][2] + this[1][1] * mat[1][2] + this[1][2] * mat[2][2]
    ], [
      this[2][0] * mat[0][0] + this[2][1] * mat[1][0] + this[2][2] * mat[2][0],
      this[2][0] * mat[0][1] + this[2][1] * mat[1][1] + this[2][2] * mat[2][1],
      this[2][0] * mat[0][2] + this[2][1] * mat[1][2] + this[2][2] * mat[2][2]
    ]
  )
}

//旋转矩阵
Matrix.rotateMat = function(theta) {
  var cosTheta = Math.cos(theta)
  var sinTheta = Math.sin(theta)
  return new Matrix([cosTheta, sinTheta, 0], [-sinTheta, cosTheta, 0], [0, 0, 1])
}

//平移矩阵
Matrix.transMat = function(tx, ty) {
  return new Matrix([1, 0, 0], [0, 1, 0], [tx, ty, 1])
}

//缩放矩阵
Matrix.scaleMat = function(sx, sy) {
  if(arguments.length === 1)
    return new Matrix([sx, 0, 0], [0, sx, 0], [0, 0, 1])
  else
    return new Matrix([sx, 0, 0], [0, sy, 0], [0, 0, 1])
}

export default Matrix
