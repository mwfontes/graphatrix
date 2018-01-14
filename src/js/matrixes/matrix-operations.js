class MatrixOperations {

    static multiplyMatrixes(_m1, _m2) {
        let resultMatrix = [[],[],[]];
        let stringProof = [[],[],[]];
        let i, j, k;
        let columns = Math.min(_m1[0].length, _m2[0].length);

        // If there is only one matrix, then return the only one and abort
        if (!_m2) {
            return _m1;
        }

        for (i = 0; i < _m1.length; i++) { // line
            for (j = 0; j < columns; j++) { // column _m1
                resultMatrix[i][j] = _m1[i][0]*_m2[0][j];
                for (k = 1; k < _m2.length; k++) { // column _m2
                    resultMatrix[i][j] += _m1[i][k]*_m2[k][j];
                }
            }
        }

        return resultMatrix;
        
    }

    static vertexApplyTransformations(_list, _transformationMatrix) {
        
        
        let i;
        
        for (i = 0; i < _list.length; i++) {
            
            let vertexMatrix = [
                [_list[i].x],
                [_list[i].y],
                [1]
            ]
            
            let result = this.multiplyMatrixes(_transformationMatrix, vertexMatrix);

            _list[i].modifiedX = result[0][0];
            _list[i].modifiedY = result[1][0];

            _list[i].update();

        }
    }
}

export default MatrixOperations;