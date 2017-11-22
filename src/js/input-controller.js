import Vertex from './vertex';

class InputController {

	constructor(_parent) {

		this.parent = _parent;

		// Input elements (where the user enters the desired vertices)
		this.input = {
			x: document.getElementById("input-x"),
			y: document.getElementById("input-y"),
			button: document.getElementById("input-button")
		}

		this.pivotsList = document.getElementById("pivot-select");

		this.options = {
			closePath: document.getElementById("open-close-path"),
			showGrid: document.getElementById("show-grid"),
			showNumbers: document.getElementById("show-numbers")
		}

		// Functions Binds
		this.addVertex = this.addVertex.bind(this);
		this.switchPivot = this.switchPivot.bind(this);

		this.addListeners();
	}

	updatePivotsIndexes() {
		//
		for (let pivot of this.pivotsList.options) {
			console.log(pivot);
			pivot.innerHTML = pivot.vertex.index;
		}
	}

	addVertex(evt) {
		// 
		// If keydown and not ENTER key, then abort
		if (evt.type == "keydown" && evt.keyCode != 13) {
			return;
		}

		// If one or both inputs are empty, abort
		if (this.input.x.value == "" || this.input.y.value == "") {
			return;
		}

		// If any of the inputs are NaN, then abort
		if (isNaN(this.input.x.value) || isNaN(this.input.y.value)) {
			return;
		}

		// if ENTER was pressed and everything is OK, the set focus to the X input again
		if (evt.type == "keydown") {
			this.input.x.focus();
		}

		// Add new vertex to the Graphatrix global vertices
		let vtx = new Vertex(this.parent, {
			index: this.parent.vertices.length + 1,
			x: this.input.x.value,
			y: this.input.y.value
		});

		// if list is empty, set the first vertex as pivot
		if (this.parent.vertices.length === 0) {
			this.parent.pivotVertex = vtx;
		}
		
		this.parent.vertices.push(vtx);
		
		// Add the new vertex information to the pivots list
		let option = document.createElement("option");
		option.value = vtx.index;
		option.innerHTML = vtx.index;
		option.vertex = vtx;
		this.pivotsList.appendChild(option);
		
		// clear the inputs
		this.input.x.value = "";
		this.input.y.value = "";

		// Apply all transformations to the vertex
		vtx.update();
		
		// draw
		this.parent.canvas.draw();
	}


	switchPivot(evt) {
		//
		// get the previous pivot to update later
		let previousPivot = this.parent.pivotVertex;

		// Switch to the new vertex
		this.parent.pivotVertex = evt.target.selectedOptions[0].vertex;

		// Update both vertices
		previousPivot.update();
		this.parent.pivotVertex.update();
	}


	addListeners() {
		//
		// Insert Vertex Button
		this.input.button.addEventListener("click", this.addVertex);

		// Inser Keyboard Enter
		this.input.x.addEventListener("keydown", this.addVertex);
		this.input.y.addEventListener("keydown", this.addVertex);

		// OPTIONS (close path + show grid)
		this.options.closePath.addEventListener("click", this.parent.canvas.draw);
		this.options.showGrid.addEventListener("click", this.parent.canvas.draw);
		this.options.showNumbers.addEventListener("click", this.parent.canvas.draw);

		// Pivot selection
		this.pivotsList.addEventListener("change", this.switchPivot);
	}
}

export default InputController;