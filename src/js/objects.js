// *************
// ** OBJETOS **
// *************

// COORDENADAS INSERIDAS NO ARRAY GERAL _allData.points
// que serão a base para todos os cálculos e geração de objetos na tela
function coordenadaXY(x, y) {
	
	this.x = x;
	this.y = y;
	
	// Posição atual na vertical, em pixels,
	// para comparação no reordenamento via drag n' drop
	this.topPosition = _allData.points.length * _coordContainerHeight;
}

// OBJETO VISUAL (INSERIDO NA TELA) QUE UTILIZA
// AS COORDENADAS ACIMA (coordenadasXY)
function coordenadaContainer(x, y, index, isModified) {

	// converte valor bruto para float com no máximo 2 decimais
	var convertedX = x.toFixed(2),
		convertedY = y.toFixed(2)

	// estrutura do objeto
	var container = document.createElement("div"),
		closeBtn = document.createElement("img"),
		number = document.createTextNode("(" + index + ") "),
		txt = document.createTextNode("x: " + convertedX + ", y: " + convertedY),
		txtArea = document.createElement("div");
	
	container.addEventListener("mouseover", function() { highlight(index); });
	container.addEventListener("mouseout",  function() { noHighlight(index); });

	txtArea.className = "coords-txt-area";
	txtArea.addEventListener("mousedown", beginCoordsDrag);

	if (!isModified) {
		container.className = "coords-container";

		closeBtn.addEventListener("click", function() { excludeCoords(index); });
		closeBtn.src = "images/close-btn.png";
		closeBtn.className = "close-button";

		container.appendChild(closeBtn);
	} else {
		container.className = "coords-modified";
	}

	txtArea.appendChild(number);
	txtArea.appendChild(txt);
	container.appendChild(txtArea);

	container.isModified = isModified;
	container.index = index;

	return container;
}

function rotationInput(index, value) { // index = index da matriz no array _allData.matrixes
	var container = document.createElement("div"),
		closeBtn = document.createElement("div"),
		txt = document.createTextNode("Rotate "),
		deg = document.createTextNode(" °"),
		input = document.createElement("input"),
		tbl = document.createElement("table"),
		trA = document.createElement("tr"),
		trB = document.createElement("tr"),
		tdA = document.createElement("td"),
		tdB = document.createElement("td");

	input.setAttribute("type", "text");
	input.value = value;
	input.className = "input-text";
	input.onkeyup = function() {
		_allData.matrixes[index] = geraMatrizRotacao(parseFloat(this.value));
		recomposeModifiedPoints();
		desenha();
	}

	input.onkeydown = function() {
		increaseDescreaseValue(this);
	}

	closeBtn.innerHTML = "[X]";
	closeBtn.className = "close-btn";
	closeBtn.onclick = function() { excludeMatrix(index); };

	tbl.setAttribute("width", "100%");
	tbl.setAttribute("cellspacing", "0");
	tbl.setAttribute("cellpadding", "0");

	tdA.style.height = "10px";
	tdA.style.textAlign = "right";
	tdB.style.height = "50px";

	container.className = "matrixes-box";
	container.style.left = (index * 125) + "px";

	tbl.appendChild(trA);
	tbl.appendChild(trB);
	trA.appendChild(tdA);
	trB.appendChild(tdB);
	tdB.appendChild(txt);
	tdB.appendChild(input);
	tdB.appendChild(deg);
	tdA.appendChild(closeBtn);
	container.appendChild(tbl);

	return container;
}

function translationInput(index, value) {
	var container = document.createElement("div"),
		closeBtn = document.createElement("div"),
		txt = document.createTextNode("Translate center in"),
		txtX = document.createTextNode("X = "),
		txtY = document.createTextNode(" / Y = "),
		br = document.createElement("br"),
		inputX = document.createElement("input"),
		inputY = document.createElement("input"),
		tbl = document.createElement("table"),
		trA = document.createElement("tr"),
		trB = document.createElement("tr"),
		tdA = document.createElement("td"),
		tdB = document.createElement("td");

	inputX.setAttribute("type", "text");
	inputX.className = "input-text";
	inputX.value = value[0];
	inputX.onkeyup = function() {
		var theOtherNode = this.parentNode.getElementsByClassName("input-text");
		_allData.matrixes[index] = geraMatrizTranslacao(parseFloat(this.value), parseFloat(theOtherNode[1].value));
		recomposeModifiedPoints();
		desenha();
	}

	inputX.onkeydown = function() {
		increaseDescreaseValue(this);
	}

	inputY.setAttribute("type", "text");
	inputY.className = "input-text";
	inputY.value = value[1];
	inputY.onkeyup = function() {
		var theOtherNode = this.parentNode.getElementsByClassName("input-text");
		_allData.matrixes[index] = geraMatrizTranslacao(parseFloat(theOtherNode[0].value), parseFloat(this.value));
		recomposeModifiedPoints();
		desenha();
	}

	inputY.onkeydown = function() {
		increaseDescreaseValue(this);
	}

	closeBtn.innerHTML = "[X]";
	closeBtn.onclick = function() { excludeMatrix(index); };
	closeBtn.className = "close-btn";

	tbl.setAttribute("width", "100%");
	tbl.setAttribute("cellspacing", "0");
	tbl.setAttribute("cellpadding", "0");

	tdA.style.height = "10px";
	tdA.style.textAlign = "right";
	
	tdB.style.height = "50px";

	container.className = "matrixes-box";
	container.style.left = (index * 125) + "px";

	tbl.appendChild(trA);
	tbl.appendChild(trB);
	trA.appendChild(tdA);
	trB.appendChild(tdB);
	tdB.appendChild(txt);
	tdB.appendChild(br);
	tdB.appendChild(txtX);
	tdB.appendChild(inputX);
	tdB.appendChild(txtY);
	tdB.appendChild(inputY);
	tdA.appendChild(closeBtn);
	container.appendChild(tbl);

	return container;
}

function reflectionInput(index, value) {
	var container = document.createElement("div"),
		closeBtn = document.createElement("div"),
		txt = document.createTextNode("Reflect "),
		deg = document.createTextNode(" °"),
		input = document.createElement("input"),
		tbl = document.createElement("table"),
		trA = document.createElement("tr"),
		trB = document.createElement("tr"),
		tdA = document.createElement("td"),
		tdB = document.createElement("td");

	input.setAttribute("type", "text");
	input.className = "input-text";
	input.value = value;
	input.onkeyup = function() {
		_allData.matrixes[index] = geraMatrizReflexao(parseFloat(this.value));
		recomposeModifiedPoints();
		desenha();
	}

	input.onkeydown = function() {
		increaseDescreaseValue(this);
	}

	closeBtn.innerHTML = "[X]";
	closeBtn.onclick = function() { excludeMatrix(index); };
	closeBtn.className = "close-btn";

	tbl.setAttribute("width", "100%");
	tbl.setAttribute("cellspacing", "0");
	tbl.setAttribute("cellpadding", "0");

	tdA.style.height = "10px";
	tdA.style.textAlign = "right";
	tdB.style.height = "50px";

	container.className = "matrixes-box";
	container.style.left = (index * 125) + "px";

	tbl.appendChild(trA);
	tbl.appendChild(trB);
	trA.appendChild(tdA);
	trB.appendChild(tdB);
	tdB.appendChild(txt);
	tdB.appendChild(input);
	tdB.appendChild(deg);
	tdA.appendChild(closeBtn);
	container.appendChild(tbl);

	return container;
}

function resizeInput(index, value) {
	var container = document.createElement("div"),
		closeBtn = document.createElement("div"),
		txt = document.createTextNode("Resize"),
		txtX = document.createTextNode("X = "),
		txtY = document.createTextNode(" / Y = "),
		br = document.createElement("br"),
		inputX = document.createElement("input"),
		inputY = document.createElement("input"),
		tbl = document.createElement("table"),
		trA = document.createElement("tr"),
		trB = document.createElement("tr"),
		tdA = document.createElement("td"),
		tdB = document.createElement("td");

	inputX.setAttribute("type", "text");
	inputX.className = "input-text";
	inputX.value = value[0];
	inputX.onkeyup = function() {
		var theOtherNode = this.parentNode.getElementsByClassName("input-text");
		_allData.matrixes[index] = geraMatrizResize(parseFloat(this.value), parseFloat(theOtherNode[1].value));
		recomposeModifiedPoints();
		desenha();
	}

	inputX.onkeydown = function() {
		increaseDescreaseValue(this);
	}

	inputY.setAttribute("type", "text");
	inputY.className = "input-text";
	inputY.value = value[1];
	inputY.onkeyup = function() {
		var theOtherNode = this.parentNode.getElementsByClassName("input-text");
		_allData.matrixes[index] = geraMatrizResize(parseFloat(theOtherNode[0].value), parseFloat(this.value));
		recomposeModifiedPoints();
		desenha();
	}

	inputY.onkeydown = function() {
		increaseDescreaseValue(this);
	}

	closeBtn.innerHTML = "[X]";
	closeBtn.onclick = function() { excludeMatrix(index); };
	closeBtn.className = "close-btn";

	tbl.setAttribute("width", "100%");
	tbl.setAttribute("cellspacing", "0");
	tbl.setAttribute("cellpadding", "0");

	tdA.style.height = "10px";
	tdA.style.textAlign = "right";
	tdB.style.height = "50px";

	container.className = "matrixes-box";
	container.style.left = (index * 125) + "px";

	tbl.appendChild(trA);
	tbl.appendChild(trB);
	trA.appendChild(tdA);
	trB.appendChild(tdB);
	tdB.appendChild(txt);
	tdB.appendChild(br);
	tdB.appendChild(txtX);
	tdB.appendChild(inputX);
	tdB.appendChild(txtY);
	tdB.appendChild(inputY);
	tdA.appendChild(closeBtn);
	container.appendChild(tbl);

	return container;
}

function shearingInput(index, value) {
	var container = document.createElement("div"),
		closeBtn = document.createElement("div"),
		txt = document.createTextNode("Shear"),
		txtX = document.createTextNode("X = "),
		txtY = document.createTextNode(" / Y = "),
		br = document.createElement("br"),
		inputX = document.createElement("input"),
		inputY = document.createElement("input"),
		tbl = document.createElement("table"),
		trA = document.createElement("tr"),
		trB = document.createElement("tr"),
		tdAA = document.createElement("td"),
		tdB = document.createElement("td");

	inputX.setAttribute("type", "text");
	inputX.className = "input-text";
	inputX.value = value[0];
	inputX.onkeyup = function() {
		var theOtherNode = this.parentNode.getElementsByClassName("input-text");
		_allData.matrixes[index] = geraMatrizShearing(parseFloat(this.value), parseFloat(theOtherNode[1].value));
		recomposeModifiedPoints();
		desenha();
	}

	inputX.onkeydown = function() {
		increaseDescreaseValue(this);
	}

	inputY.setAttribute("type", "text");
	inputY.className = "input-text";
	inputY.value = value[1];
	inputY.onkeyup = function() {
		var theOtherNode = this.parentNode.getElementsByClassName("input-text");
		_allData.matrixes[index] = geraMatrizShearing(parseFloat(theOtherNode[0].value), parseFloat(this.value));
		recomposeModifiedPoints();
		desenha();
	}

	inputY.onkeydown = function() {
		increaseDescreaseValue(this);
	}

	closeBtn.innerHTML = "[X]";
	closeBtn.onclick = function() { excludeMatrix(index); };
	closeBtn.className = "close-btn";

	tbl.setAttribute("width", "100%");
	tbl.setAttribute("cellspacing", "0");
	tbl.setAttribute("cellpadding", "0");

	tdAA.style.height = "10px";
	tdAA.style.textAlign = "right";
	
	tdB.style.height = "50px";

	container.className = "matrixes-box";
	container.style.left = (index * 125) + "px";

	tbl.appendChild(trA);
	tbl.appendChild(trB);
	trA.appendChild(tdAA);
	trB.appendChild(tdB);
	tdB.appendChild(txt);
	tdB.appendChild(br);
	tdB.appendChild(txtX);
	tdB.appendChild(inputX);
	tdB.appendChild(txtY);
	tdB.appendChild(inputY);
	tdAA.appendChild(closeBtn);
	container.appendChild(tbl);

	return container;
}

function createPivot(texto, valor, previouslySelected) {
	var container = document.createElement("option");
		container.value = valor;
		container.innerHTML = texto;

		if (previouslySelected == valor) {
			container.selected = "selected";
		}
		
	return container;
}

// MATRIZ COM CÁLCULOS FORMADOS A SER VISUALIZADA NA TELA
function CalculatedMatrix(matrix) {
	var container = document.createElement("div"),
		tbl = document.createElement("table"),
		trA = document.createElement("tr"),
		trB = document.createElement("tr"),
		trC = document.createElement("tr"),
		tdAA = document.createElement("td"),
		tdAB = document.createElement("td"),
		tdAC = document.createElement("td"),
		tdBA = document.createElement("td"),
		tdBB = document.createElement("td"),
		tdBC = document.createElement("td"),
		tdCA = document.createElement("td"),
		tdCB = document.createElement("td"),
		tdCC = document.createElement("td"),
		txtAA = document.createTextNode(matrix.a11.toFixed(2)),
		txtAB = document.createTextNode(matrix.a12.toFixed(2)),
		txtAC = document.createTextNode(matrix.a13.toFixed(2)),
		txtBA = document.createTextNode(matrix.a21.toFixed(2)),
		txtBB = document.createTextNode(matrix.a22.toFixed(2)),
		txtBC = document.createTextNode(matrix.a23.toFixed(2)),
		txtCA = document.createTextNode(matrix.a31.toFixed(2)),
		txtCB = document.createTextNode(matrix.a32.toFixed(2)),
		txtCC = document.createTextNode(matrix.a33.toFixed(2));

		tbl.appendChild(trA);
		tbl.appendChild(trB);
		tbl.appendChild(trC);

		trA.appendChild(tdAA);
		trA.appendChild(tdAB);
		trA.appendChild(tdAC);

		trB.appendChild(tdBA);
		trB.appendChild(tdBB);
		trB.appendChild(tdBC);

		trC.appendChild(tdCA);
		trC.appendChild(tdCB);
		trC.appendChild(tdCC);

		tdAA.appendChild(txtAA);
		tdAB.appendChild(txtAB);
		tdAC.appendChild(txtAC);

		tdBA.appendChild(txtBA);
		tdBB.appendChild(txtBB);
		tdBC.appendChild(txtBC);

		tdCA.appendChild(txtCA);
		tdCB.appendChild(txtCB);
		tdCC.appendChild(txtCC);

		container.appendChild(tbl);
		container.className = "matrixes-box";

		return container;
}