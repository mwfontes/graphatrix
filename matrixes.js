function multiplicaMatriz(mA, mB) {
	var result = {
		a11: (mA.a11 * mB.a11) + (mA.a12 * mB.a21) + (mA.a13 * mB.a31),
		a12: (mA.a11 * mB.a12) + (mA.a12 * mB.a22) + (mA.a13 * mB.a32),
		a13: (mA.a11 * mB.a13) + (mA.a12 * mB.a23) + (mA.a13 * mB.a33),

		a21: (mA.a21 * mB.a11) + (mA.a22 * mB.a21) + (mA.a23 * mB.a31),
		a22: (mA.a21 * mB.a12) + (mA.a22 * mB.a22) + (mA.a23 * mB.a32),
		a23: (mA.a21 * mB.a13) + (mA.a22 * mB.a23) + (mA.a23 * mB.a33),

		a31: (mA.a31 * mB.a11) + (mA.a32 * mB.a21) + (mA.a33 * mB.a31),
		a32: (mA.a31 * mB.a12) + (mA.a32 * mB.a22) + (mA.a33 * mB.a32),
		a33: (mA.a31 * mB.a13) + (mA.a32 * mB.a23) + (mA.a33 * mB.a33)
	}

	return result;
}

function geraMatrizTranslacao(toX, toY) {

	if (isNaN(toX) || toX == "") {
		toX = 0;
	}

	if (isNaN(toY) || toY == "") {
		toY = 0;
	}

	var result = {
		a11: 1,
		a12: 0,
		a13: toX,

		a21: 0,
		a22: 1,
		a23: toY,

		a31: 0,
		a32: 0,
		a33: 1,
		
		tipo: translationInput,
		value: [toX, toY],
		leftPosition: 0,
		reset: function() { // importante para quando selecina-se um novo pivot, onde o centro deve ser recalculado
			this.a13 = this.value[0] - getCenterPoint()[0];
			this.a23 = this.value[1] - getCenterPoint()[1];
		}
	}

	return result;
}

function geraMatrizResize(fatorX, fatorY) {

	if (isNaN(fatorX) || fatorX == "") {
		fatorX = 1;
	}

	if (isNaN(fatorY) || fatorY == "") {
		fatorY = 1;
	}

	var result = {
		a11: fatorX,
		a12: 0,
		a13: 0,

		a21: 0,
		a22: fatorY,
		a23: 0,

		a31: 0,
		a32: 0,
		a33: 1,
		
		tipo: resizeInput,
		value: [fatorX, fatorY],
		leftPosition: 0
	}

	return result;
}

function geraMatrizRotacao(angleInput) {

	if (isNaN(angleInput) || angleInput == "") {
		angle = 0;
	}

	angle = angleInput * (Math.PI/180);

	var result = {
		a11: Math.cos(angle),
		a12: -Math.sin(angle),
		a13: 0,

		a21: Math.sin(angle),
		a22: Math.cos(angle),
		a23: 0,

		a31: 0,
		a32: 0,
		a33: 1,
		
		tipo: rotationInput,
		value: angleInput,
		leftPosition: 0
	}

	return result;
}

function geraMatrizReflexao(angleInput) {

	if (isNaN(angleInput) || angleInput == "") {
		angle = 0;
	}

	angle = angleInput * (Math.PI/180);

	var result = {
		a11: Math.cos(2 * angle),
		a12: Math.sin(2 * angle),
		a13: 0,

		a21: Math.sin(2 * angle),
		a22: -Math.cos(2 * angle),
		a23: 0,

		a31: 0,
		a32: 0,
		a33: 1,
		
		tipo: reflectionInput,
		value: angleInput,
		leftPosition: 0
	}

	return result;
}

function geraMatrizShearing(X, Y) {

	if (isNaN(X) || X == "") {
		X = 0;
	}

	if (isNaN(Y) || Y == "") {
		Y = 0;
	}

	var result = {
		a11: 1,
		a12: X,
		a13: 0,

		a21: Y,
		a22: 1,
		a23: 0,

		a31: 0,
		a32: 0,
		a33: 1,
		
		tipo: shearingInput,
		value: [X, Y],
		leftPosition: 0
	}

	return result;
}

// *****************************************************
// ** INICIO DA MONTAGEM DA VISUALIZAÇAO DOS CALCULOS **
// *****************************************************

