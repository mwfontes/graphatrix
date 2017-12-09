import Vertex from './vertex';
import MatrixOperations from './matrixes/matrix-operations';
import Utils from './matrixes/utils';

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

		this.originCoords = {
			x: document.getElementById("origin-x"),
			y: document.getElementById("origin-y"),
		}

		// Functions Binds
		this.addVertex = this.addVertex.bind(this);
		this.switchPivot = this.switchPivot.bind(this);

		this.addListeners();
		this.init();
	}


	addPivot(_vtx) {
		//
		let option = document.createElement("option");
		option.value = _vtx.index;
		option.innerHTML = _vtx.displayName;
		option.vertex = _vtx;
		this.pivotsList.appendChild(option);
	}


	updatePivotsIndexes() {
		//
		for (let pivot of this.pivotsList.options) {
			console.log(pivot);
			pivot.innerHTML = pivot.vertex.index;
		}
	}


	setPivot(_vtx) {
		//
		this.parent.pivotVertex = _vtx;

		//updates the Origin coordinates
		this.originCoords.x.value = this.parent.pivotVertex.x;
		this.originCoords.y.value = this.parent.pivotVertex.y;
	}

	defPivotPosition() {
		//
		// abort if the selected value is empty (it means the list is empty)
		if (this.pivotsList.value == "" || (this.pivotsList.value != "absolute" && this.pivotsList.value != "mass")) {
			return;
		}
		let i;
		

		if (this.pivotsList.value == "absolute") {
			//
			// Reset
			this.parent.absoluteCenter.x = 0;
			this.parent.absoluteCenter.y = 0;

			let minX = this.parent.vertices[0].x;
			let maxX = this.parent.vertices[0].x;
			let minY = this.parent.vertices[0].y;
			let maxY = this.parent.vertices[0].y;

			for (i = 0; i < this.parent.vertices.length; i++) {
				if (this.parent.vertices[i].x < minX) {
					minX = this.parent.vertices[i].x;
				} else if (this.parent.vertices[i].x > maxX) {
					maxX = this.parent.vertices[i].x;
				}

				if (this.parent.vertices[i].y < minY) {
					minY = this.parent.vertices[i].y;
				} else if (this.parent.vertices[i].y > maxY) {
					maxY = this.parent.vertices[i].y;
				}
			}
	
			this.parent.absoluteCenter.x = (maxX + minX) / 2;
			this.parent.absoluteCenter.y = (maxY + minY) / 2;

			this.setPivot(this.parent.absoluteCenter);

		} else if (this.pivotsList.value == "mass") {
			//
			// Reset
			this.parent.massCenter.x = 0;
			this.parent.massCenter.y = 0;
			// sums it all and divide by the number of vertices
			for (i = 0; i < this.parent.vertices.length; i++) {
				this.parent.massCenter.x += (this.parent.vertices[i].x) / this.parent.vertices.length;
				this.parent.massCenter.y += (this.parent.vertices[i].y) / this.parent.vertices.length;
			};

			this.setPivot(this.parent.massCenter);

		}
	}


	addVertex(evt) {
		//
		// Validates numbers
		this.input.x.value = Utils.validNumber(this.input.x.value);
		this.input.y.value = Utils.validNumber(this.input.y.value);

		// If keydown and not ENTER key, then abort
		if (evt.type == "keyup" && evt.keyCode != 13) {
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
		if (evt.type == "keyup") {
			this.input.x.focus();
		}

		// Add new vertex to the Graphatrix global vertices
		let vtx = new Vertex(this.parent, {
			index: this.parent.vertices.length + 1,
			displayName: this.parent.vertices.length + 1,
			x: this.input.x.value,
			y: this.input.y.value
		});

		this.parent.vertices.push(vtx);
		
		// Add the new vertex information to the pivots list
		this.addPivot(vtx);
		
		// clear the inputs
		this.input.x.value = "";
		this.input.y.value = "";

		// Apply all transformations to the vertex
		vtx.update();

		// Apply the center pivot calculations
		this.defPivotPosition();
		
		// draw
		this.parent.canvas.draw();
	}


	switchPivot(evt) {
		//
		// get the previous pivot to update later
		// let previousPivot = this.parent.pivotVertex;

		// Switch to the new vertex
		this.parent.pivotVertex = Object.create(evt.target.selectedOptions[0].vertex);

		this.defPivotPosition();
		this.parent.canvas.draw();
	}


	addListeners() {
		//
		// Insert Vertex Button
		this.input.button.addEventListener("click", this.addVertex);

		// Inser Keyboard Enter
		this.input.x.addEventListener("keyup", this.addVertex);
		this.input.y.addEventListener("keyup", this.addVertex);

		// OPTIONS (close path + show grid)
		this.options.closePath.addEventListener("click", this.parent.canvas.draw);
		this.options.showGrid.addEventListener("click", this.parent.canvas.draw);
		this.options.showNumbers.addEventListener("click", this.parent.canvas.draw);

		// Pivot selection
		this.pivotsList.addEventListener("change", this.switchPivot);
	}

	init() {
		//
		this.parent.massCenter = new Vertex(this.parent, {
			index: "mass",
			displayName: "",
			x: 0,
			y: 0
		});
		this.parent.massCenter.displayName = "Mass center";
		this.addPivot(this.parent.massCenter);
		this.setPivot(this.parent.massCenter);
		
		this.parent.absoluteCenter = new Vertex(this.parent, {
			index: "absolute",
			displayName: "",
			x: 0,
			y: 0
		});
		this.parent.absoluteCenter.displayName = "Absolute center";
		this.addPivot(this.parent.absoluteCenter);
	}
}

export default InputController;