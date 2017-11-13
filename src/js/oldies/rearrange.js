
//***** MOVIMENTAÇÃO E CONTROLE DAS COORDENADAS ******
function beginCoordsDrag(evt) {
	
	var n = this.parentNode.index;
	document.getElementsByClassName("coords-container")[n].style.backgroundPosition = "bottom";
	document.getElementsByClassName("coords-modified")[n].style.backgroundPosition = "bottom";

	// Seleciona o objeto em questão
	var dragObj = this.parentNode;

	// Coloca demais objetos no plano de fundo
	var theOthers = document.getElementsByClassName("coords-container");
	for (var c = 0; c < theOthers.length; c++) {
		theOthers[c].style.zIndex = 0;
	}

	// traz objeto em questão à frente
	dragObj.style.zIndex = 1;

	// marca ponto de início para fazer o delta
	var startingPoint = evt.clientY ? evt.clientY : evt.pageY;

	// cria limitação do movimento para cima(top) e para baixo (bottom)
	var limits = {
		top: -10,
		bottom: parseFloat(document.getElementById("points-container").offsetHeight)
	}

	// listeners de movimentação e término
	window.addEventListener("mousemove", dragIt);
	window.addEventListener("mouseup", stopDragCoords);

	// função executada a cada update da posição do mouse
	function dragIt(evt) {
		var y = evt.clientY ? evt.clientY : evt.pageY; // pega o Y do mouse na tela

		var delta = y - startingPoint;

		if (dragObj.offsetTop > limits.top && dragObj.offsetTop < limits.bottom) { // se está entre os 2 delimitadores....
			dragObj.style.top = (delta) + "px"; // atribui posição
		} else if (dragObj.offsetTop < limits.top) {
			dragObj.style.top = limits.top + "px"; // atribui posição
		} else if (dragObj.offsetTop > limits.bottom) {
			dragObj.style.top = limits.bottom + "px";
		}

		// Passa para o atributo .topPosition o valor vertical do container na tela
		_allData.points[dragObj.index].topPosition = dragObj.offsetTop;

		// pequeno algoritmo para controle visual dos dados dos objetos. Deverá sair na versão RELEASE.
		/*var cntnr = document.getElementById("controle-container");
		cntnr.innerHTML = "";
		for (var c = 0; c < _allData.points.length; c++) {
			var txt = document.createTextNode(_allData.points[c].topPosition + "   ");
			cntnr.appendChild(txt);
		}*/

	}

	// cancela drag
	function stopDragCoords(evt) {
		
		//remove mouse listener
		window.removeEventListener("mousemove", dragIt);
		window.removeEventListener("mouseup", stopDragCoords);
		
		// chama função que ordena conforme posição na tela
		swapCoordsIndexes();
		
		// Recompõe elementos na tela
		recomposeSysData();

		// redesenha gráfico
		desenha();
	}
}

// Função que troca a ordem das coordenadas de acordo com a posição na tela
function swapCoordsIndexes() {

	do {

		var modificou = false; // variável boolean que vira true quando algum objeto troca o index

		for (var c = 0; c < _allData.points.length - 1; c++) {
			if (_allData.points[c].topPosition > _allData.points[c + 1].topPosition) {
				var tmpObjArray = _allData.points[c];
				_allData.points[c] = _allData.points[c + 1];
				_allData.points[c + 1] = tmpObjArray;
				modificou = true;
			}
		}
	} while (modificou == true);

	// recalcula as referencias das posições dos objetos no _allData
	for (var c = 0; c < _allData.points.length; c++) {
		_allData.points[c].topPosition = c * _coordContainerHeight;
	}
}



//*************************************************************************************************
//*************************************************************************************************
//*************************************************************************************************


//***** MOVIMENTAÇÃO E CONTROLE DAS MATRIZES ******
function beginMatrixesDrag(evt) {
	
	// Seleciona o objeto em questão
	var dragObj = this.parentNode.parentNode.parentNode;

	// coloca demais objs no fundo
	var theOthers = document.getElementsByClassName("matrixes-container");
	for (var c = 0; c < theOthers.length; c++) {
		theOthers[c].style.zIndex = 0;
	}

	// traz obj em questão à frente
	dragObj.style.zIndex = 1;

	// marca ponto de início para fazer o delta
	var startingPoint = evt.clientX ? evt.clientX : evt.pageX;

	// cria limitação do movimento para cima(top) e para baixo (bottom)
	var limits = {
		left: -10,
		right: parseFloat(document.getElementById("matrixes-cell").offsetWidth - dragObj.offsetWidth + 5)
	}

	// listeners de movimentação e término
	window.addEventListener("mousemove", dragIt);
	window.addEventListener("mouseup", swapMatrixesIndexes);

	// função executada a cada update da posição do mouse
	function dragIt(evt) {
		var x = evt.clientX ? evt.clientX : evt.pageX; // pega o Y do mouse na tela

		var delta = x - startingPoint;

		if (dragObj.offsetLeft > limits.left && dragObj.offsetLeft < limits.right) { // se está entre os 2 delimitadores....
			dragObj.style.left = (delta) + "px"; // atribui posição
		} else if (dragObj.offsetTop < limits.left) {
			dragObj.style.left = limits.left + "px"; // atribui posição
		} else if (dragObj.offsetTop > limits.right) {
			dragObj.style.left = limits.right + "px"; // atribui posição
		}

		// Passa para o atributo .topPosition o valor vertical do container na tela
		_allData.matrixes[0].leftPosition = dragObj.offsetLeft;

		// pequeno algoritmo para controle visual dos dados dos objetos. Deverá sair na versão RELEASE.
		var cntnr = document.getElementById("controle-container");
		cntnr.innerHTML = "";
		for (var c = 0; c < _allData.matrixes.length; c++) {
			var txt = document.createTextNode(_allData.matrixes[c].leftPosition + "   ");
			cntnr.appendChild(txt);
		}

	}

	// cancela drag
	function stopDragCoords(evt) {
		window.removeEventListener("mousemove", dragCoords);
		
		// chama função que ordena conforme posição na tela
		swapMatrixesIndexes();
		
		// Recompõe elementos na tela
		recomposeSysData();

		// redesenha gráfico
		desenha();
	}
}

// Função que troca a ordem das coordenadas de acordo com a posição na tela
function swapMatrixesIndexes() {

	do {

		var modificou = false; // variável boolean que vira true quando algum objeto troca o index

		for (var c = 0; c < _allData.matrixes.length - 1; c++) {
			if (_allData.matrixes[c].leftPosition > _allData.matrixes[c + 1].leftPosition) {
				var tmpObjArray = _allData.matrixes[c];
				_allData.matrixes[c] = _allData.matrixes[c + 1];
				_allData.matrixes[c + 1] = tmpObjArray;
				modificou = true;
			}
		}
	} while (modificou == true);

	for (var c = 0; c < _allData.matrixes.length; c++) {
		_allData.matrixes[c].leftPosition = c * _coordContainerHeight;
	}
}