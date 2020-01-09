class MatrixOperations {
  static multiplyMatrixes(_m1, _m2) {
    const resultMatrix = [[], [], []];
    const stringProof = [[], [], []];
    let i, j, k;
    const columns = Math.min(_m1[0].length, _m2[0].length);

    // If there is only one matrix, then return the only one and abort
    if (!_m2) {
      return _m1;
    }

    for (i = 0; i < _m1.length; i++) {
      // line
      for (j = 0; j < columns; j++) {
        // column _m1
        resultMatrix[i][j] = _m1[i][0] * _m2[0][j];
        for (k = 1; k < _m2.length; k++) {
          // column _m2
          resultMatrix[i][j] += _m1[i][k] * _m2[k][j];
        }
      }
    }

    return resultMatrix;
  }

  static applyVerticesTransformations(_list, _transformationMatrix) {
    let i;

    for (i = 0; i < _list.length; i++) {
      const vertexMatrix = [[_list[i].x], [_list[i].y], [1]];
      const result = this.multiplyMatrixes(_transformationMatrix, vertexMatrix);
      _list[i].modifiedX = result[0][0];
      _list[i].modifiedY = result[1][0];
      _list[i].update();
    }
  }
  
  static applyPivotTransformations(pivot, _transformationMatrix) {
    console.log(pivot);
    const vertexMatrix = [[pivot.x], [pivot.y], [1]];
    const result = this.multiplyMatrixes(_transformationMatrix, vertexMatrix);
    pivot.modifiedX = result[0][0];
    pivot.modifiedY = result[1][0];
    pivot.update();
  }
}

export default MatrixOperations;
