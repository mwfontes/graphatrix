// *************
// ** FUNÇÕES **
// *************

function init() {
	_canvas = document.getElementById('canvas');

	_c = _canvas.getContext('2d');

	flushScreen();

	// window.onresize = flushScreen;

	fakeStart();

	recomposeSysData();
	desenha();

	//**************
	// CANVAS EVENTS
	//**************

	if (_canvas.addEventListener) {
	// IE9, Chrome, Safari, Opera
		_canvas.addEventListener("mousewheel", resizeScale, false);
	// Firefox
		_canvas.addEventListener("DOMMouseScroll", resizeScale, false);
	}

	_canvas.addEventListener("mousedown", startDrag, false);
	_canvas.onselectstart = function() { return false; }
	_canvas.addEventListener("dblclick", resetScale);
}

function fakeStart() {
	_allData.points.push(new coordenadaXY(1, 1));
	_allData.points.push(new coordenadaXY(3, 1));
	_allData.points.push(new coordenadaXY(3, 3));
	_allData.points.push(new coordenadaXY(3.5, 3));
	_allData.points.push(new coordenadaXY(2, 5));
	_allData.points.push(new coordenadaXY(0.5, 3));
	_allData.points.push(new coordenadaXY(1, 3));
}

function startDrag(evt) {
	_canvas.addEventListener("mousemove", dragCanvas, false);
	_canvas.addEventListener("mouseup", stopDrag, false);

	var startingX = evt.pageX,
		startingY = evt.pageY;

	var startingCenterX = _centerX,
		startingCenterY = _centerY;

	function dragCanvas(evt) {
		_centerX = startingCenterX - (startingX - evt.pageX);
		_centerY = startingCenterY - (startingY - evt.pageY);
		
		if (_centerX > _canvas.width - 50) {
			_centerX = _canvas.width - 50;
		} else if (_centerX < 50){
			_centerX = 50;
		}
		
		if (_centerY > _canvas.height - 50) {
			_centerY = _canvas.height - 50;
		} else if (_centerY < 50){
			_centerY = 50;
		}
		
		desenha();
	}

	function stopDrag() {
		_canvas.removeEventListener("mousemove", dragCanvas, false);
	}
}

function flushScreen() {
	// _width = window.innerWidth;
	// _height = window.innerHeight;

	// var matrixesContainer = document.getElementById("matrixes-container"),
	// 	inputContainer = document.getElementById("insert-container");

	// inputContainer.style.height = (_height - 20) + "px";
	// matrixesContainer.style.width = (_width - inputContainer.offsetWidth) + "px";
	// _canvas.width = (_width - inputContainer.offsetWidth);
	// _canvas.height = (_height - (matrixesContainer.offsetHeight));

	// _centerX = _canvas.width / 2;
	// _centerY = _canvas.height / 2;

	// document.getElementById("shadow-left").style.height = (_height - 94) + "px";
	// document.getElementById("shadow-top").style.width = (_width - 194) + "px";
	
	// document.getElementById("matrixes-cell").style.width = (matrixesContainer.offsetWidth - 172) + "px";
	// document.getElementById("matrixes-calculations-panel").style.width = (matrixesContainer.offsetWidth - 172) + "px";

	desenha();
}

function resizeScale(evt) {
	var delta = Math.max(-1, Math.min(1, (evt.wheelDelta || -evt.detail)));
	
	if (_scale > 4) {
		_scale += delta*4;
	} else {
		if (delta >= 0) {
			_scale += delta*4;
		}
	}

	if (_scale > 20 * (_scaleStep + 1)) {
		if (_scale < 160) {
			if (_scaleStep >= 1) {
				_scaleStep++;
			} else if (_scaleStep >= 0.0 && _scaleStep < 1) {
				_scaleStep += 0.5;
			}
		} else {
			_scale = 160;
		}
	} else if (_scale < 20 * _scaleStep) {
		if (_scaleStep > 1) {
			_scaleStep--;
		} else if (_scaleStep > 0.5 && _scaleStep <= 1) {
			_scaleStep -= 0.5;
		} else if (_scaleStep <= 0.1) {
			_scaleStep = 0.5;
		}
	}

	zoomBalloon();

	desenha();
}

function addPoint() {
	// Seleciona campos de entrada de X e Y
	var inputX = document.getElementById("point-x"),
		inputY = document.getElementById("point-y");

	if (inputX.value != "" && !isNaN(inputX.value) && inputY.value != "" && !isNaN(inputY.value)) { // se os valores inseridos são números [...]

		// lê os valores inseridos de X e Y
		var newX = parseFloat(inputX.value),
			newY = parseFloat(inputY.value),
			pointNumber = document.getElementsByClassName("coords-container").length;

		// Insere "objeto" container dos pontos X e Y
		_allData.points.push(new coordenadaXY(newX, newY));

		// Reseta campos de entrada dos pontos X e Y
		inputX.value = "";
		inputY.value = "";

		recomposeSysData();
		desenha();
		
		inputX.focus();
	}
}

function addRotationMatrix() {
	_allData.matrixes.unshift(geraMatrizRotacao(0)); // Insere matriz no início do array
	recomposeSysData();
	desenha();
}

function addTranslationMatrix() {
	_allData.matrixes.unshift(geraMatrizTranslacao(0, 0)); // Insere matriz no início do array
	recomposeSysData();
	desenha();
}

function addShearMatrix() {
	_allData.matrixes.unshift(geraMatrizShearing(0, 0)); // Insere matriz no início do array
	recomposeSysData();
	desenha();
}

function addReflectionMatrix() {
	_allData.matrixes.unshift(geraMatrizReflexao(0)); // Insere matriz no início do array
	recomposeSysData();
	desenha();
}

function addResizeMatrix() {
	_allData.matrixes.unshift(geraMatrizResize(1, 1)); // Insere matriz no início do array
	recomposeSysData();
	desenha();
}

function excludeMatrix(index) {
	_allData.matrixes.splice(index, 1);
	recomposeSysData();
	desenha();
}

function excludeCoords(index) {
	console.log("excluding: " + index);
	_allData.points.splice(index, 1);
	recomposeSysData();
	desenha();
}


// *** FUNÇÃO QUE PLOTA NO GRÁFICO
function desenha() {

	_c.clearRect (0, 0, _width, _height);

	showGrid();
	geraPlano();

	// DESENHA FORMA BASE - ***** NAO MODIFICADA *****
	if (_allData.points.length > 1) {

		_c.beginPath();
		var calcPointsXY = calculaOriginal(_allData.points[0].x, _allData.points[0].y);
		_c.moveTo(calcPointsXY[0], calcPointsXY[1]);
		for (var c = 1; c < _allData.points.length; c++) {
			calcPointsXY = calculaOriginal(_allData.points[c].x, _allData.points[c].y);
			_c.lineTo(calcPointsXY[0], calcPointsXY[1]);
		}

		if (document.getElementById("open-close-path").checked) {
			_c.closePath();
		}

		_c.strokeStyle = "#abc";
		_c.lineWidth = 2;
		_c.stroke();
	}

	// DESENHA FORMA ***** MODIFICADA *****
	if (_allData.points.length > 1) {

		_c.beginPath();
		calcPointsXY = calcula(_allData.points[0].x, _allData.points[0].y, false);
		_c.moveTo(calcPointsXY[0], calcPointsXY[1]);
		for (var c = 1; c < _allData.points.length; c++) {
			calcPointsXY = calcula(_allData.points[c].x, _allData.points[c].y, false);
			_c.lineTo(calcPointsXY[0], calcPointsXY[1]);
		}

		if (document.getElementById("open-close-path").checked) {
			_c.closePath();
		}

		_c.strokeStyle = "#000";
		_c.lineWidth = 2;
		_c.stroke();
	}

	if (_allData.points.length > 0) {
		for (var g = 0; g < _allData.points.length; g++) {
			var calcPointsXY = calcula(_allData.points[g].x, _allData.points[g].y, false);

			_c.beginPath();
			_c.arc(calcPointsXY[0], calcPointsXY[1], 3, 0, 2*Math.PI);
			_c.fillStyle = "#d00";
			_c.fill();
			_c.closePath();
		}
	}

	// ***** DESENHA ALVO NO CENTRO DO OBJETO *****
	var targetXY = calcula(getCenterPoint()[0], getCenterPoint()[1], false);

	_c.beginPath();
	// desenha círculo (x, y, raio, angulo inicial, angulo final)
	_c.arc(targetXY[0], targetXY[1], 5, 0, 2*Math.PI);

	// desenha linha horizontal
	_c.moveTo(targetXY[0]+10, targetXY[1]);
	_c.lineTo(targetXY[0]-10, targetXY[1]);

	// desenha linha vertical
	_c.moveTo(targetXY[0], targetXY[1]-10);
	_c.lineTo(targetXY[0], targetXY[1]+10);

	// termina desenho
	_c.strokeStyle = "#d00";
	_c.lineWidth = 1;
	_c.stroke();
	_c.closePath();
}

function getCenterPoint(isCenter) {

	var minX, minY, maxX, maxY, midX, midY;
	var type = document.getElementById("pivot-select").value;
	var pointsLength = _allData.points.length;

	if (type == "absolute" && type != "") {
		for (var c = 0; c < pointsLength; c++) {
			if (c == 0) {
				minX = _allData.points[c].x;
				maxX = _allData.points[c].x;
				minY = _allData.points[c].y;
				maxY = _allData.points[c].y;
			} else {
				if (_allData.points[c].x < minX) {
					minX = _allData.points[c].x;
				} else if (_allData.points[c].x > maxX) {
					maxX = _allData.points[c].x;
				}

				if (_allData.points[c].y < minY) {
					minY = _allData.points[c].y;
				} else if (_allData.points[c].y > maxY) {
					maxY = _allData.points[c].y;
				}
			}
		}

		midX = (maxX + minX) / 2;
		midY = (maxY + minY) / 2;

	} else if (type == "mass" && type != "") {
		
		midX = 0;
		for (var c = 0; c < pointsLength; c++) {
			midX += _allData.points[c].x;
		}

		midY = 0;
		for (var c = 0; c < pointsLength; c++) {
			midY += _allData.points[c].y;
		}

		midX = midX / pointsLength;
		midY = midY / pointsLength;

	} else if (type != ""){
		midX = _allData.points[parseInt(type)].x;
		midY = _allData.points[parseInt(type)].y;
	}

	var showX, showY;

	try {
		if (!isNaN(midX)) {
			showX = midX.toFixed(2);
			showY = midY.toFixed(2);
			document.getElementById("pivot-coords").innerHTML = "Origin: X = " + showX + ", Y = " + showY;
		} else {
			document.getElementById("pivot-coords").innerHTML = "";
		}
	} catch(e) {}

	return [midX, midY];
}

function calcula(x, y, isModified) {
	var calcX, calcY;

	var mT;

	if (_allData.matrixes.length > 0) {
		var centerPt = getCenterPoint(false);

		// Inicia cálculo efetivo da matriz de transformação

		mT = _allData.matrixes[_allData.matrixes.length-1];

		if (_allData.matrixes.length > 1) {
			for (var c = _allData.matrixes.length-2; c >= 0; c--) {
					mT = multiplicaMatriz(_allData.matrixes[c], mT);
			}
		}

		// Aplica mT para pontos X e Y
		calcX = (mT.a11 * x) + (mT.a12 * y) + (mT.a13 * 1);
		calcY = (mT.a21 * x) + (mT.a22 * y) + (mT.a23 * 1);

	} else { // CASO NAO EXISTA NENHUMA MATRIZ ADICIONADA PELO USUARIO
		calcX = x;
		calcY = y;
	}

	if (!isModified) {
		calcX = Math.floor((_centerX + (_scale * calcX)).toFixed(2)) + 0.5;
		calcY = Math.floor((_centerY - (_scale * calcY)).toFixed(2)) + 0.5;
	}

	return [calcX, calcY];
}

function calculaOriginal(x, y) {
	var calcX, calcY;

	calcX = (_centerX + (_scale * x)).toFixed(2);
	calcY = (_centerY - (_scale * y)).toFixed(2);

	return [calcX, calcY];
}

function calculaMarcaPlano(x, y) {
	var calcX, calcY;

	calcX = _centerX + (_scale * x);
	calcY = _centerY - (_scale * y);

	return [calcX, calcY];
}

function calcPlaneScaleProportion(scale) {
	var modScale;
	modScale = scale / _scaleStep;

	return modScale;
}

function resetScale() {
	_scale = 20;
	_scaleStep = 1;
	recomposeSysData();
	desenha();
}

function geraPlano() {
	//var linhaXY = [];
	//var number;
	var h = Math.floor(_height - 80),
		w = Math.floor(_width - 120);

	var centerXDelta = w/2 - _centerX,
		centerYDelta = _centerY - h/2;

	var modScale = calcPlaneScaleProportion(_scale);

	_c.strokeStyle = "#aaa";
	_c.fillStyle = "#aaa";
	_c.lineWidth = 1;
	_c.font = "8px sans-serif";

	// LINHA X
	_c.beginPath();
	var coord = calculaPlano(centerXDelta - w/2, 0)
	_c.moveTo(coord[0], coord[1]);
	coord = calculaPlano(centerXDelta + w/2, 0);
	_c.lineTo(coord[0], coord[1]);
	_c.closePath();
	_c.stroke();

	// -X
	for (var c = 0; c > centerXDelta - w/2; c-=modScale) {
		_c.beginPath();
		var coord = calculaPlano(c, -4)
		_c.moveTo(coord[0], coord[1]);
		coord = calculaPlano(c, 4);
		_c.lineTo(coord[0], coord[1]);
		if (c != 0) {
			_c.fillText((c / _scale).toFixed(1), coord[0]-5, coord[1] + 20);
		}
		_c.closePath();
		_c.stroke();
	}

	// +X
	for (var c = 0; c < centerXDelta + w/2; c+=modScale) {
		_c.beginPath();
		var coord = calculaPlano(c, -4)
		_c.moveTo(coord[0], coord[1]);
		coord = calculaPlano(c, 4);
		_c.lineTo(coord[0], coord[1]);
		if (c != 0) {
			_c.fillText((c / _scale).toFixed(1), coord[0]-5, coord[1] + 20);
		}
		_c.closePath();
		_c.stroke();
	}

	// LINHA Y
	_c.beginPath();
	coord = calculaPlano(0, centerYDelta + h/2)
	_c.moveTo(coord[0], coord[1]);
	coord = calculaPlano(0, centerYDelta - h/2);
	_c.lineTo(coord[0], coord[1]);
	_c.closePath();
	_c.stroke();

	// -Y
	for (var c = 0; c > centerYDelta - h/2; c-=modScale) {
		_c.beginPath();
		var coord = calculaPlano(-4, c)
		_c.moveTo(coord[0], coord[1]);
		coord = calculaPlano(4, c);
		_c.lineTo(coord[0], coord[1]);
		if (c != 0) {
			_c.fillText((c / _scale).toFixed(1), coord[0] - 25, coord[1] + 3);
		}
		_c.closePath();
		_c.stroke();
	}

	// +Y
	for (var c = 0; c < centerYDelta + h/2; c+=modScale) {
		_c.beginPath();
		var coord = calculaPlano(-4, c)
		_c.moveTo(coord[0], coord[1]);
		coord = calculaPlano(4, c);
		_c.lineTo(coord[0], coord[1]);
		if (c != 0) {
			_c.fillText((c / _scale).toFixed(1), coord[0] - 25, coord[1] + 3);
		}
		_c.closePath();
		_c.stroke();
	}

		_c.stroke();
}

function showGrid() {
	if (document.getElementById("show-grid").checked) {
		var h = Math.floor(_height - 80),
		w = Math.floor(_width - 120);

		var centerXDelta = w/2 - _centerX,
		centerYDelta = _centerY - h/2;
	
		_c.strokeStyle = "#f0f0f0";
		_c.lineWidth = 1;
	
		var modScale = calcPlaneScaleProportion(_scale);

		// -X
		for (var c = 0; c > centerXDelta - w/2; c-=modScale) {
			_c.beginPath();
			var coord = calculaPlano(c, -h);
			_c.moveTo(coord[0], coord[1]);
			coord = calculaPlano(c, h);
			_c.lineTo(coord[0], coord[1]);
			_c.closePath();
			_c.stroke();
		}

		// +X
		for (var c = 0; c < centerXDelta + w/2; c+=modScale) {
			_c.beginPath();
			var coord = calculaPlano(c, -h);
			_c.moveTo(coord[0], coord[1]);
			coord = calculaPlano(c, h);
			_c.lineTo(coord[0], coord[1]);
			_c.closePath();
			_c.stroke();
		}

		// -Y
		for (var c = 0; c > centerYDelta - h/2; c-=modScale) {
			_c.beginPath();
			var coord = calculaPlano(-w, c);
			_c.moveTo(coord[0], coord[1]);
			coord = calculaPlano(w, c);
			_c.lineTo(coord[0], coord[1]);
			_c.closePath();
			_c.stroke();
		}

		// +Y
		for (var c = 0; c < centerYDelta + h/2; c+=modScale) {
			_c.beginPath();
			var coord = calculaPlano(-w, c);
			_c.moveTo(coord[0], coord[1]);
			coord = calculaPlano(w, c);
			_c.lineTo(coord[0], coord[1]);
			_c.closePath();
			_c.stroke();
		}
	}
}

function calculaPlano(x, y) {

	var w = document.getElementById("canvas").width,
		h = document.getElementById("canvas").height;

	return [Math.floor(_centerX + x) + 0.5, Math.floor(_centerY - y) + 0.5];
}

function highlight(n) {
	document.getElementsByClassName("coords-container")[n].style.backgroundPosition = "center";
	document.getElementsByClassName("coords-container")[n].style.color = "#fff";
	document.getElementsByClassName("coords-container")[n].style.textShadow = "0 -1px 0 #000";

	document.getElementsByClassName("coords-modified")[n].style.backgroundPosition = "center";
	document.getElementsByClassName("coords-modified")[n].style.color = "#fff";
	document.getElementsByClassName("coords-modified")[n].style.textShadow = "0 -1px 0 #000";

	showSelectedPointOnCanvas(_allData.points[n]);
}

function noHighlight(n) {
	document.getElementsByClassName("coords-container")[n].style.backgroundPosition = "top";
	document.getElementsByClassName("coords-container")[n].style.color = "#000";
	document.getElementsByClassName("coords-container")[n].style.textShadow = "0 1px 0 #fff";

	document.getElementsByClassName("coords-modified")[n].style.backgroundPosition = "top";
	document.getElementsByClassName("coords-modified")[n].style.color = "#000";
	document.getElementsByClassName("coords-modified")[n].style.textShadow = "0 1px 0 #fff";

	desenha();
}

function showSelectedPointOnCanvas(obj) {
	var calcPointsXY;
	var midX = _centerX,
		midY = _centerY;
	
	// marca no plano X
	
	calcPointsXY = calcula(obj.x, obj.y, false);
	_c.dashedLine(calcPointsXY[0], calcPointsXY[1], calcPointsXY[0], midY, 4)
	
	// marca no plano Y
	_c.dashedLine(calcPointsXY[0], calcPointsXY[1], midX, calcPointsXY[1], 4)
	
	// Marca ponto
	_c.beginPath();
	calcPointsXY = calcula(obj.x, obj.y, false);
	_c.arc(calcPointsXY[0], calcPointsXY[1], 8, 0, 2*Math.PI);
	
	 _c.lineWidth = 2;
	 _c.strokeStyle = "#d00";
	 _c.stroke();
	 _c.closePath();

}

// FUNÇÃO QUE CRIA AS LINHAS PONTILHADAS
CanvasRenderingContext2D.prototype.dashedLine = function(x1, y1, x2, y2, dashLen) {
    if (dashLen == undefined) dashLen = 2;
    
    this.beginPath();
    this.moveTo(x1, y1);
    
    var dX = x2 - x1;
    var dY = y2 - y1;
    var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
    var dashX = dX / dashes;
    var dashY = dY / dashes;
    
    var q = 0;

    while (q++ < dashes) {
		x1 += dashX;
		y1 += dashY;
		this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
    }

    this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);
    
    this.lineWidth = 2;
	this.strokeStyle = "#d00";
	this.lineCap = 'butt';
    this.stroke();
    this.closePath();
};

function checkInputEnter(obj) {
	if (window.event.keyCode == 13)	{
		addPoint();
	} else {
		increaseDescreaseValue(obj);
	}
}

function increaseDescreaseValue(obj) {

if (window.event.keyCode == 38){
		if (obj.value == "" || isNaN(parseFloat(obj.value))) {
			obj.value = 0;
		} else {
			obj.value = parseFloat(obj.value) + 1;
		}
	} else if (window.event.keyCode == 40){
		if (obj.value == "" || isNaN(parseFloat(obj.value))) {
			obj.value = 0;
		} else {
			obj.value = parseFloat(obj.value) - 1;
		}
	}
}

function changePivot() {

	for (var c = 0; c < _allData.matrixes.length; c++) {
		try {
			_allData.matrixes[c].reset();
		} catch(e) {};
	}

	recomposeSysData();
	desenha();
}

function zoomBalloon() {
	if (!document.getElementById("balloon")) {
		var container = document.createElement("div");
		var canvas = document.getElementById("canvas");

		container.innerHTML = "Double-click to reset zoom.";
		container.id = "balloon";

    	canvas.parentNode.insertBefore(container, canvas.nextSibling);

		setTimeout(function() { document.body.removeChild(container); }, 5000);
	}
}

_matrixesCalcPanelOpen = false;
function showCalculationsPanel() {
	
	var container = document.getElementById("matrixes-calculations-panel");
	
	if (!_matrixesCalcPanelOpen) {
		recomposeSysData();
		container.style.height = "240px";
		_matrixesCalcPanelOpen = true;
	} else  {
		container.style.height = "0";
		_matrixesCalcPanelOpen = false;
	}
}

// RECONTRÓI OS PONTOS MODIFICADOS
// COM BASE NO _allData **********
function recomposeModifiedPoints() {
	// Seleciona todos os containers a serem reconstruídos
	var modifiedContainer = document.getElementById("modified-container"),
		modCalc;
	
	// Limpa containers
	modifiedContainer.innerHTML = "";
	// Recompõe pontos inseridos e modificados pelo usuário
	for (var c = 0; c < _allData.points.length; c++) {
		modCalc = calcula(_allData.points[c].x, _allData.points[c].y, true);
		modifiedContainer.appendChild(new coordenadaContainer(modCalc[0], modCalc[1], c, true));
	}
}

// RECONTRÓI OS ELEMENTOS NA TELA PARA INTERAÇÃO DO USUÁRIO
// COM BASE NO _allData ***********************************
function recomposeSysData() {
	// Seleciona todos os containers a serem reconstruídos
	var pointsContainer = document.getElementById("points-container"),
		modifiedContainer = document.getElementById("modified-container"),
		pivotSelector = document.getElementById("pivot-select"),
		matrixesContainer = document.getElementById("matrixes-cell"),
		c;

	var selectedPivot = document.getElementById("pivot-select").value;

	// Limpa containers
	pointsContainer.innerHTML = "";
	pivotSelector.innerHTML = "";
	matrixesContainer.innerHTML = "";

	// Recompõe pontos inseridos e modificados pelo usuário
	for (c = 0; c < _allData.points.length; c++) {
		pointsContainer.appendChild(new coordenadaContainer(_allData.points[c].x, _allData.points[c].y, c, false));
	}

	// Recompõe matrizes inseridas pelo usuário
	for (c = 0; c < _allData.matrixes.length; c++) {
	// Eureka!!! É possivel inserir uma funcao inteira dentro de uma propriedade do objeto. Sendo assim, quando "tipo" foi selecionado lah na geracao das matrizes, a funcao craidora do matrix Container foi inseria ali. Basta chamar a propriedade que ela age como a funcao embutida!
		matrixesContainer.appendChild(_allData.matrixes[c].tipo(c, _allData.matrixes[c].value));
	}
	
	// Mostra a construção das matrizes
	var container = document.getElementById("matrixes-calculations-panel");
	container.innerHTML = "";
	
	// COLOCA A PRIMEIRA LINHA, COM AS MARIZES ORIGINAIS
	for (var c = 0; c < _allData.matrixes.length; c++) {
		var matrixT = new CalculatedMatrix(_allData.matrixes[c]);
		matrixT.style.left = (c * 125) + "px";
		container.appendChild(matrixT);
	}
	
	// COLOCA AS DEMAIS LINHAS, CALCULADAS, ATÉ CHEGAR AO FINAL
	for (var i = 0; i < _allData.matrixes.length - 1; i++) { // Conta as linhas
		for(var c = 0; c < _allData.matrixes.length - 1 - i; c++) { // Adiciona as matrizes
			var matrixT;
			if (c < _allData.matrixes.length - i - 2) {
				matrixT = new CalculatedMatrix(_allData.matrixes[c]);
			} else {
				matrixT = new CalculatedMatrix(multiplicaMatriz(_allData.matrixes[c], _allData.matrixes[c + 1]));
			}
			matrixT.style.left = (c * 125) + "px";
			matrixT.style.top = ((i + 1) * 60) + "px";
			container.appendChild(matrixT);
		}
	}

	// Recompõe pontos inseridos pelo usuário - (Texto, value)
	pivotSelector.appendChild(new createPivot("Absolute center", "absolute", selectedPivot));
	pivotSelector.appendChild(new createPivot("Mass center", "mass", selectedPivot));
	for (c = 0; c < _allData.points.length; c++) {
		pivotSelector.appendChild(new createPivot("Point " + c, c, selectedPivot));
	}

	// IMPEDE QUE QUALQUER ELEMENTO NA PÁGINA SEJA SELECIONADO
	var allElements = document.getElementsByTagName("*");
	for (var c = 0; c < allElements.length; c++) {
		allElements[c].onselectstart = function() { return false; }
	}

	// Reconstrói pontos modificados no painel:
	recomposeModifiedPoints();
}

window.onload = init;