/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class MatrixOperations {

    static multiplyMatrixes(_m1, _m2) {
        let resultMatrix = [[], [], []];
        let stringProof = [[], [], []];
        let i, j, k;
        let columns = Math.min(_m1[0].length, _m2[0].length);

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

    static vertexApplyTransformations(_list, _transformationMatrix) {

        let i;

        for (i = 0; i < _list.length; i++) {

            let vertexMatrix = [[_list[i].x], [_list[i].y], [1]];

            let result = this.multiplyMatrixes(_transformationMatrix, vertexMatrix);

            _list[i].modifiedX = result[0][0];
            _list[i].modifiedY = result[1][0];

            _list[i].update();
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (MatrixOperations);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Utils {

    // Returns only valid number related characters
    static validNumber(_value) {
        //
        let validChars = "1234567890.,-".split("");
        let enteredChars = _value.split("") || [];
        let dots = 0;

        // Verifies if there is more than one dot in the array

        return enteredChars.map((_char, i) => {
            if (validChars.indexOf(_char) != -1) {

                // converts comma intro dot
                if (_char == ",") {
                    _char = ".";
                }

                // if it's a dot, increases the number of dots present, to assure that there will be only one present
                if (_char == ".") {
                    dots++;
                }

                // if the first digited character is a dot, appends a number 0 first
                if (_char == "." && i == 0) {
                    _char = "0" + _char;
                }

                // if the number of dots is greater than one, skips to the next character
                if (_char == "." && dots > 1) {
                    return;
                }

                return _char;
            }
        }).join("");
    }

    static degToRad(_val) {
        //
        return _val / 180 * Math.PI;
    }

    static radToDeg(_val) {
        //
        return _val / Math.PI * 180;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Utils);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__matrix_operations__ = __webpack_require__(0);



class BasicMatrix {

    constructor(_parent) {

        this.parent = _parent;
        this.DOMElement = undefined;
        this.elementsToUpdate = [];

        this.matrixStructure = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

        //BINDS
        this.erase = this.erase.bind(this);
        this.drag = this.drag.bind(this);
    }

    drag(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        console.log(evt);
        if (evt.button == 2) {
            evt.currentTarget;
        }
    }

    erase() {

        // remove matrix from the DOM
        this.DOMElement.parentNode.removeChild(this.DOMElement);

        // remove the matrix from the app's matrixes list
        let idx = this.parent.matrixes.indexOf(this);
        this.parent.matrixes.splice(idx, 1);

        // Apply transforms - Update transformation matrix
        this.parent.applyTransforms();

        // console.log(this.parent.canvas.draw);
        // this.parent.canvas.draw();
    }

    createBasicDOMElement() {
        this.DOMElement = document.createElement("div");
        this.DOMElement.className = "matrix-input";
        this.DOMElement.addEventListener("contextmenu", this.drag, true);

        // insert in the DOM. If no matrixes are present, just append.
        // if there are matrixes present, use insertBefore of 0 (should come before the first one)
        let holder = document.getElementById("matrixes-elements-holder");
        if (this.parent.matrixes.length == 0) {
            holder.appendChild(this.DOMElement);
        } else {
            holder.insertBefore(this.DOMElement, this.parent.matrixes[0].DOMElement);
        }

        let title = document.createElement("h5");
        this.DOMElement.appendChild(title);

        let valuesContainer = document.createElement("div");
        valuesContainer.className = "values-input-container";
        this.DOMElement.appendChild(valuesContainer);

        let erase = document.createElement("div");
        erase.className = "erase-matrix";
        erase.addEventListener("click", this.erase.bind(this));
        this.DOMElement.appendChild(erase);

        return {
            "valuesContainer": valuesContainer,
            "title": title
        };
    }

    updateMatrix() {}
}

/* harmony default export */ __webpack_exports__["a"] = (BasicMatrix);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a new Vertex and automatically insters it into the DOM
 * @param {Object} _parent - The caller object
 * @param {Object} _params - the properties of the vertex
 * @param {number} _params.index - The index of the vertex in the global vertices list
 * @param {number} _params.x - The X coordinate of the vertex
 * @param {number} _params.y - The Y coordinate of the vertex
 */

class Vertex {

    constructor(_parent, _params) {

        this.parent = _parent;

        this.x = parseFloat(_params.x);
        this.y = parseFloat(_params.y);
        this.modifiedX = parseFloat(_params.x);
        this.modifiedY = parseFloat(_params.y);
        this.DOMElement = undefined;
        this.index = _params.index;
        this.displayName = _params.displayName;
        this.elementsToUpdate = [];

        if (_params.index != -1 && !isNaN(_params.index)) {
            this.DOMElement = this.createDOMElement();
        }

        // BINDS
        this.update = this.update.bind(this);
    }

    createDOMElement() {
        let container = document.createElement("div");
        container.className = "vertex";
        document.getElementById("vertices-container").appendChild(container);

        let index = document.createElement("div");
        index.className = "index";
        index.innerHTML = `${this.index}`;
        this.elementsToUpdate.push({ element: index, key: "index", preValueText: "" });
        container.appendChild(index);

        let pointX = document.createElement("div");
        pointX.className = "value original";
        pointX.innerHTML = `X: ${this.x}`;
        this.elementsToUpdate.push({ element: pointX, key: "x", preValueText: "X: " });
        container.appendChild(pointX);

        let ModifiedPointX = document.createElement("div");
        ModifiedPointX.className = "value";
        ModifiedPointX.innerHTML = `X: ${this.modifiedX}`;
        this.elementsToUpdate.push({ element: ModifiedPointX, key: "modifiedX", preValueText: "X: " });
        container.appendChild(ModifiedPointX);

        let pointY = document.createElement("div");
        pointY.className = "value original";
        pointY.innerHTML = `Y: ${this.y}`;
        this.elementsToUpdate.push({ element: pointY, key: "y", preValueText: "Y: " });
        container.appendChild(pointY);

        let modifiedPointY = document.createElement("div");
        modifiedPointY.className = "value";
        modifiedPointY.innerHTML = `Y: ${this.modifiedY}`;
        this.elementsToUpdate.push({ element: modifiedPointY, key: "modifiedY", preValueText: "Y: " });
        container.appendChild(modifiedPointY);

        let erase = document.createElement("div");
        erase.className = "erase-points";
        erase.addEventListener("click", this.erase.bind(this));
        container.appendChild(erase);

        return container;
    }

    // updates visible values (DOM Element)
    update() {
        //
        for (let item of this.elementsToUpdate) {
            if (item.key == "index") {
                item.element.innerHTML = item.preValueText + this[item.key];
            } else {
                item.element.innerHTML = item.preValueText + this[item.key].toFixed(2);
            }
        }

        // Pivot assignment***
        // get the selected option
        let currentPivot = this.parent.inputController.pivotsList.selectedOptions[0];
        if (currentPivot && this.DOMElement) {
            if (currentPivot.vertex === this) {
                this.DOMElement.setAttribute("data-pivot", "");
            } else {
                this.DOMElement.removeAttribute("data-pivot");
            }
        }
    }

    erase() {
        //
        // Gets the object index in the global list
        let index = this.parent.vertices.indexOf(this);

        // Removes it from the DOM
        this.DOMElement.parentNode.removeChild(this.DOMElement);

        // Removes it from the global vertices list
        this.parent.vertices.splice(index, 1);

        // Updates all the vertices from the list
        // to refresh the indexes
        for (let el of this.parent.vertices) {
            el.index = this.parent.vertices.indexOf(el) + 1;
            el.update();
        }

        // remove from the select pivot
        this.parent.inputController.pivotsList.remove(index);

        // Update the pivots Indexes
        this.parent.inputController.updatePivotsIndexes();

        this.parent.canvas.draw();
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Vertex);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_global_scss__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_global_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_global_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__canvas__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vertex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__input_controller__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__matrixes_controller__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__matrixes_matrix_operations__ = __webpack_require__(0);








class Graphatrix {

    constructor() {

        this.canvas = undefined; // the drawing/plotting canvas
        this.inputController = undefined; // Controls the user interaction in the input tab
        this.vertices = []; // List of created vertices by the user
        this.matrixes = [];
        this.pivotVertex = undefined; // Points to the current vertex marked as pivot
        this.massCenter = undefined; // A vertex that is the polygon mass center
        this.absoluteCenter = undefined; // A vertex that is the polygon absolute center
    }

    fakeStart() {

        let _this = this;

        function addFake(_x, _y) {
            _this.inputController.input.x.value = _x;
            _this.inputController.input.y.value = _y;
            _this.inputController.addVertex({ type: "fake", keycode: -1 });
            _this.inputController.input.x.value = "";
            _this.inputController.input.y.value = "";
        }

        addFake(1, 1);
        addFake(3, 1);
        addFake(3, 3);
        addFake(3.5, 3);
        addFake(2, 5);
        addFake(0.5, 3);
        addFake(1, 3);
    }

    applyTransforms() {
        //
        let i;

        // sets the first matrix to multiply as the last one in the matrixes array
        let resultMatrix = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

        // if (this.matrixes.length > 0) {
        //     resultMatrix = this.matrixes[this.matrixes.length - 1].matrixStructure;
        // }

        for (i = this.matrixes.length - 1; i >= 0; i--) {
            resultMatrix = __WEBPACK_IMPORTED_MODULE_5__matrixes_matrix_operations__["a" /* default */].multiplyMatrixes(this.matrixes[i].matrixStructure, resultMatrix);
        }

        this.matrixesController.transformationMatrix = resultMatrix;

        // console.log(resultMatrix);

        // automatically apply transformations to vertices
        __WEBPACK_IMPORTED_MODULE_5__matrixes_matrix_operations__["a" /* default */].vertexApplyTransformations(this.vertices, this.matrixesController.transformationMatrix);

        // Redraw
        this.canvas.draw();
    }

    start() {

        this.canvas = new __WEBPACK_IMPORTED_MODULE_1__canvas__["a" /* default */](this, document.getElementById('canvas'));
        this.inputController = new __WEBPACK_IMPORTED_MODULE_3__input_controller__["a" /* default */](this);
        this.matrixesController = new __WEBPACK_IMPORTED_MODULE_4__matrixes_controller__["a" /* default */](this);

        this.fakeStart();

        // Make the fisrt draw. !!!***Should be the last command***!!!
        this.canvas.draw();
    }
}

const graphatrix = new Graphatrix();
graphatrix.start();
console.log(graphatrix);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Canvas {

    constructor(_parent, _canvasElement) {

        this.parent = _parent;
        this.canvasDOM = _canvasElement; // canvas DOM element
        this.canvas = this.canvasDOM.getContext('2d'); // drawing canvas
        this.size = [0, 0]; // canvas' size
        this.center = [0, 0]; // relative center
        this.dragDelta = [0, 0]; // how much has been dragged in X and Y
        this.scale = 20; // Drawing scale
        this.margins = [180, 130];

        // binds
        this.draw = this.draw.bind(this);

        this.init();
    }

    cartesianPlane() {

        let i, count;
        let scl = Math.floor(this.scale);

        this.canvas.lineWidth = 1;
        this.canvas.font = "10px Raleway";
        this.canvas.textBaseline = "middle";

        // LINHA X
        this.canvas.strokeStyle = "#d17878";
        this.canvas.fillStyle = "#d17878";
        this.canvas.beginPath();
        this.canvas.moveTo(0, this.center[1]);
        this.canvas.lineTo(this.size[0], this.center[1]);
        this.canvas.closePath();
        this.canvas.stroke();

        // -X
        count = -1;
        for (i = this.center[0] - scl; i > 0; i -= scl) {
            this.canvas.beginPath();
            this.canvas.moveTo(i, this.center[1] - 3);
            this.canvas.lineTo(i, this.center[1] + 3);
            this.canvas.closePath();
            this.canvas.stroke();
            this.canvas.textAlign = "center";

            if (this.parent.inputController.options.showNumbers.checked) {
                this.canvas.fillText(count, i, this.center[1] + this.getModTextPosition(-10, 8, count), 100);
                count--;
            }
        }

        // +X
        count = 1;
        for (i = this.center[0] + scl; i < this.size[0]; i += scl) {
            this.canvas.beginPath();
            this.canvas.moveTo(i, this.center[1] - 3);
            this.canvas.lineTo(i, this.center[1] + 3);
            this.canvas.closePath();
            this.canvas.stroke();
            this.canvas.textAlign = "center";
            if (this.parent.inputController.options.showNumbers.checked) {
                this.canvas.fillText(count, i, this.center[1] + this.getModTextPosition(-10, 8, count), 100);
                count++;
            }
        }

        // LINHA Y
        this.canvas.strokeStyle = "#81bf68";
        this.canvas.fillStyle = "#81bf68";
        this.canvas.beginPath();
        this.canvas.moveTo(this.center[0], 0);
        this.canvas.lineTo(this.center[0], this.size[1]);
        this.canvas.closePath();
        this.canvas.stroke();

        // +Y
        count = 1;
        for (i = this.center[1] - scl; i > 0; i -= scl) {
            this.canvas.beginPath();
            this.canvas.moveTo(this.center[0] - 2, i);
            this.canvas.lineTo(this.center[0] + 3, i);
            this.canvas.closePath();
            this.canvas.stroke();
            if (this.parent.inputController.options.showNumbers.checked) {
                this.canvas.textAlign = this.getModTextPosition(-12, 6, count) < 0 ? "right" : "left";
                this.canvas.fillText(count, this.center[0] + this.getModTextPosition(-6, 6, count), i, 100);
                count++;
            }
        }

        // -Y
        count = -1;
        for (i = this.center[1] + scl; i < this.size[1]; i += scl) {
            this.canvas.beginPath();
            this.canvas.moveTo(this.center[0] - 2, i);
            this.canvas.lineTo(this.center[0] + 3, i);
            this.canvas.closePath();
            this.canvas.stroke();
            if (this.parent.inputController.options.showNumbers.checked) {
                this.canvas.textAlign = this.getModTextPosition(-12, 6, count) < 0 ? "right" : "left";
                this.canvas.fillText(count, this.center[0] + this.getModTextPosition(-6, 6, count), i, 100);
                count--;
            }
        }
    }

    draw() {
        //
        // Clears the canvas
        this.canvas.clearRect(0, 0, this.size[0], this.size[1]);

        // Complimentary functions
        // Draws the grid if checkbox is checked
        if (this.parent.inputController.options.showGrid.checked) {
            this.grid();
        }

        this.cartesianPlane();
        this.pivot();

        let i;

        // DESENHA FORMA BASE - ***** NAO MODIFICADA *****
        if (this.parent.vertices.length > 1) {

            this.canvas.beginPath();
            this.canvas.lineJoin = "bevel";
            this.canvas.strokeStyle = "#c2bac7";
            this.canvas.lineWidth = 1;

            this.canvas.moveTo(this.center[0] + Math.round(this.parent.vertices[0].x * this.scale), this.center[1] + Math.round(this.parent.vertices[0].y * -this.scale));

            for (i = 1; i < this.parent.vertices.length; i++) {
                this.canvas.lineTo(this.center[0] + Math.round(this.parent.vertices[i].x * this.scale), this.center[1] + Math.round(this.parent.vertices[i].y * -this.scale));
            }

            if (this.parent.inputController.options.closePath.checked) {
                this.canvas.closePath();
            }

            this.canvas.stroke();

            // Draw the unmodified vertices
            for (i = 0; i < this.parent.vertices.length; i++) {
                this.canvas.beginPath();
                this.canvas.arc(this.center[0] + Math.round(this.parent.vertices[i].x * this.scale), this.center[1] + Math.round(this.parent.vertices[i].y * -this.scale), 2, 0, 2 * Math.PI);
                this.canvas.fillStyle = "#fff";
                this.canvas.lineWidth = 1;
                this.canvas.fill();
                this.canvas.stroke();
                this.canvas.closePath();
            }
        }

        // // DESENHA FORMA ***** MODIFICADA *****
        if (this.parent.vertices.length > 1) {

            this.canvas.beginPath();
            this.canvas.lineJoin = "bevel";
            this.canvas.strokeStyle = "#573f84";
            this.canvas.lineWidth = 2;

            // Begin the line
            this.canvas.moveTo(this.center[0] + Math.round(this.parent.vertices[0].modifiedX * this.scale), this.center[1] + Math.round(this.parent.vertices[0].modifiedY * -this.scale));

            // Draw the other lines
            for (i = 1; i < this.parent.vertices.length; i++) {
                this.canvas.lineTo(this.center[0] + Math.round(this.parent.vertices[i].modifiedX * this.scale), this.center[1] + Math.round(this.parent.vertices[i].modifiedY * -this.scale));
            }

            if (this.parent.inputController.options.closePath.checked) {
                this.canvas.closePath();
            }

            this.canvas.stroke();

            // Draw the modified vertices
            for (i = 0; i < this.parent.vertices.length; i++) {
                this.canvas.beginPath();
                this.canvas.arc(this.center[0] + Math.round(this.parent.vertices[i].modifiedX * this.scale), this.center[1] + Math.round(this.parent.vertices[i].modifiedY * -this.scale), 2, 0, 2 * Math.PI);
                this.canvas.fillStyle = "#fff";
                this.canvas.lineWidth = 1;
                this.canvas.fill();
                this.canvas.stroke();
                this.canvas.closePath();
            }
        }
    }

    drag(evt) {

        let _this = this;

        let lastPointerPosition = [evt.pageX, evt.pageY];

        function dragMove(evt) {

            _this.dragDelta = [lastPointerPosition[0] - evt.pageX, lastPointerPosition[1] - evt.pageY];

            lastPointerPosition = [evt.pageX, evt.pageY];

            _this.defCenter();

            _this.draw();
        }

        function stopDrag() {
            window.removeEventListener("mousemove", dragMove);
            window.removeEventListener("mouseup", stopDrag);
        }

        window.addEventListener("mousemove", dragMove);
        window.addEventListener("mouseup", stopDrag);
    }

    // sets the Canvas DOM element current size for drawing calcs
    defSize() {
        let width = window.innerWidth - this.margins[0];
        let height = window.innerHeight - this.margins[1];
        this.canvasDOM.setAttribute("width", width);
        this.canvasDOM.setAttribute("height", height);
        this.size = [width, height];
    }

    defCenter() {

        let currentCenter = [this.center[0], this.center[1]];

        this.center = [Math.floor(currentCenter[0] - this.dragDelta[0]) + 0.5, Math.floor(currentCenter[1] - this.dragDelta[1]) + 0.5];
    }

    // Increases/Decreases the scaling factor when the user scrolls over the canvas
    setScale(evt) {
        let delta = Math.max(-1, Math.min(1, evt.wheelDelta));
        this.scale = Math.max(8, Math.min(100, this.scale + delta * 5));

        this.draw();
    }

    grid() {
        // if (document.getElementById("show-grid").checked) {

        this.canvas.strokeStyle = "#f0f0f0";
        this.canvas.lineWidth = 1;

        let i;
        let scl = Math.floor(this.scale);

        // -X
        for (i = this.center[0] - scl; i > 0; i -= scl) {
            this.canvas.beginPath();
            this.canvas.moveTo(i, 0);
            this.canvas.lineTo(i, this.size[1]);
            this.canvas.closePath();
            this.canvas.stroke();
        }

        // +X
        for (i = this.center[0] + scl; i < this.size[0]; i += scl) {
            this.canvas.beginPath();
            this.canvas.moveTo(i, 0);
            this.canvas.lineTo(i, this.size[1]);
            this.canvas.closePath();
            this.canvas.stroke();
        }

        // +Y
        for (i = this.center[1] - scl; i > 0; i -= scl) {
            this.canvas.beginPath();
            this.canvas.moveTo(0, i);
            this.canvas.lineTo(this.size[0], i);
            this.canvas.closePath();
            this.canvas.stroke();
        }

        // -Y
        for (i = this.center[1] + scl; i < this.size[1]; i += scl) {
            this.canvas.beginPath();
            this.canvas.moveTo(0, i);
            this.canvas.lineTo(this.size[0], i);
            this.canvas.closePath();
            this.canvas.stroke();
        }
        // }
    }

    // returns the right text position
    getModTextPosition(_min, _max, _index) {
        if (this.scale < 20 && _index % 2 == 0) {
            // if less than 20px and NOT ODD
            return _min;
        } else {
            return _max;
        }
    }

    pivot() {

        let drawingCenter = [this.center[0] + Math.round(this.parent.pivotVertex.x * this.scale), this.center[1] - Math.round(this.parent.pivotVertex.y * this.scale)];

        this.canvas.beginPath();
        this.canvas.arc(drawingCenter[0], drawingCenter[1], 4, 0, 2 * Math.PI);

        // horizontal line
        this.canvas.moveTo(drawingCenter[0] - 6, drawingCenter[1]);
        this.canvas.lineTo(drawingCenter[0] + 6, drawingCenter[1]);

        // vertical line
        this.canvas.moveTo(drawingCenter[0], drawingCenter[1] - 6);
        this.canvas.lineTo(drawingCenter[0], drawingCenter[1] + 6);

        this.canvas.strokeStyle = "#573f84";
        this.canvas.lineWidth = 1;
        this.canvas.stroke();
        this.canvas.closePath();
    }

    // sets the relative center from where to draw
    // :: the plane's 0,0
    resetCenter() {
        this.center = [Math.floor(this.size[0] / 2 - this.dragDelta[0]) + 0.5, Math.floor(this.size[1] / 2 - this.dragDelta[1]) + 0.5];
    }

    resize() {
        //
        // Notes the previous size before resizing. double vars to prevent pointing
        let prevSizeX = this.size[0];
        let prevSizeY = this.size[1];

        // gets the current center
        let currentCenter = [this.center[0], this.center[1]];

        // redefines canvas size
        this.defSize();

        // calculates the size modification of the window
        let resizePercentageX = this.size[0] / prevSizeX;
        let resizePercentageY = this.size[1] / prevSizeY;

        // reset the center according to the percentage of the window resize
        this.dragDelta = [currentCenter[0] - currentCenter[0] * resizePercentageX, currentCenter[1] - currentCenter[1] * resizePercentageY];
        this.defCenter();
        this.draw();
    }

    init() {
        this.defSize();
        this.resetCenter();

        // CANVAS LISTENERS

        // OTHER LISTENERS
        window.addEventListener("resize", this.resize.bind(this));

        // hold and drag
        this.canvasDOM.addEventListener("mousedown", this.drag.bind(this));

        // zoom in/out
        window.addEventListener("mousewheel", this.setScale.bind(this), false);
        window.addEventListener("DOMMouseScroll", this.setScale.bind(this), false);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Canvas);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vertex__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__matrixes_matrix_operations__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__matrixes_utils__ = __webpack_require__(1);




class InputController {

	constructor(_parent) {

		this.parent = _parent;

		// Input elements (where the user enters the desired vertices)
		this.input = {
			x: document.getElementById("input-x"),
			y: document.getElementById("input-y"),
			button: document.getElementById("input-button")
		};

		this.pivotsList = document.getElementById("pivot-select");

		this.options = {
			closePath: document.getElementById("open-close-path"),
			showGrid: document.getElementById("show-grid"),
			showNumbers: document.getElementById("show-numbers")
		};

		this.originCoords = {
			x: document.getElementById("origin-x"),
			y: document.getElementById("origin-y")

			// Functions Binds
		};this.addVertex = this.addVertex.bind(this);
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
			pivot.innerHTML = pivot.vertex.index;
		}
	}

	setPivot(_vtx) {
		//
		this.parent.pivotVertex = _vtx;

		//updates the Origin coordinates
		this.originCoords.x.value = this.parent.pivotVertex.x.toFixed(2);
		this.originCoords.y.value = this.parent.pivotVertex.y.toFixed(2);
	}

	defPivotPosition() {
		//
		// abort if the selected value is empty (it means the list is empty)
		if (this.pivotsList.value == "" || this.pivotsList.value != "absolute" && this.pivotsList.value != "mass") {
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
				this.parent.massCenter.x += this.parent.vertices[i].x / this.parent.vertices.length;
				this.parent.massCenter.y += this.parent.vertices[i].y / this.parent.vertices.length;
			};

			this.setPivot(this.parent.massCenter);
		}
	}

	addVertex(evt) {
		//
		// Validates numbers
		this.input.x.value = __WEBPACK_IMPORTED_MODULE_2__matrixes_utils__["a" /* default */].validNumber(this.input.x.value);
		this.input.y.value = __WEBPACK_IMPORTED_MODULE_2__matrixes_utils__["a" /* default */].validNumber(this.input.y.value);

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
		let vtx = new __WEBPACK_IMPORTED_MODULE_0__vertex__["a" /* default */](this.parent, {
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
		this.parent.massCenter = new __WEBPACK_IMPORTED_MODULE_0__vertex__["a" /* default */](this.parent, {
			index: "mass",
			displayName: "",
			x: 0,
			y: 0
		});
		this.parent.massCenter.displayName = "Mass center";
		this.addPivot(this.parent.massCenter);
		this.setPivot(this.parent.massCenter);

		this.parent.absoluteCenter = new __WEBPACK_IMPORTED_MODULE_0__vertex__["a" /* default */](this.parent, {
			index: "absolute",
			displayName: "",
			x: 0,
			y: 0
		});
		this.parent.absoluteCenter.displayName = "Absolute center";
		this.addPivot(this.parent.absoluteCenter);
	}
}

/* harmony default export */ __webpack_exports__["a"] = (InputController);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__matrixes_translate__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__matrixes_rotate__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__matrixes_scale__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__matrixes_shear__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__matrixes_reflect__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__matrixes_matrix_operations__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__matrixes_utils__ = __webpack_require__(1);








class MatrixesController {

				constructor(_parent) {

								this.parent = _parent;

								// Input elements (where the user enters the desired vertices)
								this.buttons = {
												translate: document.getElementById("do-translate"),
												rotate: document.getElementById("do-rotate"),
												scale: document.getElementById("do-scale"),
												reflect: document.getElementById("do-reflect"),
												shear: document.getElementById("do-shear")
								};

								this.transformationMatrix = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

								// Functions Binds
								this.addMatrix = this.addMatrix.bind(this);

								this.addListeners();
				}

				addMatrix(evt) {
								//
								let action = evt.target.getAttribute("id");

								switch (action) {
												case "do-translate":
																this.parent.matrixes.unshift(new __WEBPACK_IMPORTED_MODULE_0__matrixes_translate__["a" /* default */](this.parent));
																break;
												case "do-rotate":
																this.parent.matrixes.unshift(new __WEBPACK_IMPORTED_MODULE_1__matrixes_rotate__["a" /* default */](this.parent));
																break;
												case "do-scale":
																this.parent.matrixes.unshift(new __WEBPACK_IMPORTED_MODULE_2__matrixes_scale__["a" /* default */](this.parent));
																break;
												case "do-reflect":
																this.parent.matrixes.unshift(new __WEBPACK_IMPORTED_MODULE_4__matrixes_reflect__["a" /* default */](this.parent));
																break;
												case "do-shear":
																this.parent.matrixes.unshift(new __WEBPACK_IMPORTED_MODULE_3__matrixes_shear__["a" /* default */](this.parent));
																break;
								}
				}

				addListeners() {
								//
								// Buttons
								this.buttons.translate.addEventListener("click", this.addMatrix);
								this.buttons.rotate.addEventListener("click", this.addMatrix);
								this.buttons.scale.addEventListener("click", this.addMatrix);
								this.buttons.reflect.addEventListener("click", this.addMatrix);
								this.buttons.shear.addEventListener("click", this.addMatrix);
				}
}

/* harmony default export */ __webpack_exports__["a"] = (MatrixesController);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__basic_matrix_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__matrix_operations__ = __webpack_require__(0);




class TranslateMatrix extends __WEBPACK_IMPORTED_MODULE_0__basic_matrix_js__["a" /* default */] {

    constructor(_parent) {
        //
        super(_parent);

        this.x = undefined;
        this.y = undefined;

        // Binds
        this.updateMatrix = this.updateMatrix.bind(this);

        this.createDOMElement();
    }

    createDOMElement() {

        // creates a Basic Container and returns it
        let container = this.createBasicDOMElement();

        container.title.innerHTML = "Translate";

        // X value
        let xContainer = document.createElement("div");
        container.valuesContainer.appendChild(xContainer);

        let xText = document.createTextNode("X ");
        xContainer.appendChild(xText);

        this.x = document.createElement("input");
        this.x.setAttribute("type", "text");
        this.x.value = 0;
        xContainer.appendChild(this.x);
        this.x.addEventListener("keyup", this.updateMatrix);

        // Y value
        let yContainer = document.createElement("div");
        container.valuesContainer.appendChild(yContainer);

        let yText = document.createTextNode("Y ");
        yContainer.appendChild(yText);

        this.y = document.createElement("input");
        this.y.setAttribute("type", "text");
        this.y.value = 0;
        yContainer.appendChild(this.y);
        this.y.addEventListener("keyup", this.updateMatrix);
    }

    updateMatrix() {

        // First, validates input values
        this.x.value = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].validNumber(this.x.value);
        this.y.value = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].validNumber(this.y.value);

        // Apply values
        this.matrixStructure[0][2] = parseFloat(this.x.value || 0);
        this.matrixStructure[1][2] = parseFloat(this.y.value || 0);

        this.parent.applyTransforms();
    }
}

/* harmony default export */ __webpack_exports__["a"] = (TranslateMatrix);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__basic_matrix_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__matrix_operations__ = __webpack_require__(0);




class RotateMatrix extends __WEBPACK_IMPORTED_MODULE_0__basic_matrix_js__["a" /* default */] {

    constructor(_parent) {
        //
        super(_parent);

        this.degrees = undefined;

        // Binds
        this.updateMatrix = this.updateMatrix.bind(this);

        this.createDOMElement();
    }

    createDOMElement() {

        // creates a Basic Container and returns it
        let container = this.createBasicDOMElement();

        container.title.innerHTML = "Rotate";

        // Degrees value
        let degContainer = document.createElement("div");
        container.valuesContainer.appendChild(degContainer);

        let degText = document.createTextNode("deg ");
        degContainer.appendChild(degText);

        this.degrees = document.createElement("input");
        this.degrees.setAttribute("type", "text");
        this.degrees.value = 0;
        degContainer.appendChild(this.degrees);
        this.degrees.addEventListener("keyup", this.updateMatrix);
    }

    updateMatrix() {
        //
        // First, validates input values
        this.degrees.value = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].validNumber(this.degrees.value);

        // Apply values
        let val = parseFloat(this.degrees.value) || 0;
        this.matrixStructure[0][0] = Math.cos(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].degToRad(val));
        this.matrixStructure[0][1] = -Math.sin(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].degToRad(val));
        this.matrixStructure[1][0] = Math.sin(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].degToRad(val));
        this.matrixStructure[1][1] = Math.cos(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].degToRad(val));

        this.parent.applyTransforms();
    }
}

/* harmony default export */ __webpack_exports__["a"] = (RotateMatrix);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__basic_matrix_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__matrix_operations__ = __webpack_require__(0);




class ScaleMatrix extends __WEBPACK_IMPORTED_MODULE_0__basic_matrix_js__["a" /* default */] {

    constructor(_parent) {
        //
        super(_parent);

        this.x = undefined;
        this.y = undefined;

        // Binds
        this.updateMatrix = this.updateMatrix.bind(this);

        this.createDOMElement();
    }

    createDOMElement() {

        // creates a Basic Container and returns it
        let container = this.createBasicDOMElement();

        container.title.innerHTML = "Scale";

        // X value
        let xContainer = document.createElement("div");
        container.valuesContainer.appendChild(xContainer);

        let xText = document.createTextNode("X ");
        xContainer.appendChild(xText);

        this.x = document.createElement("input");
        this.x.setAttribute("type", "text");
        this.x.value = 1;
        xContainer.appendChild(this.x);
        this.x.addEventListener("keyup", this.updateMatrix);

        // Y value
        let yContainer = document.createElement("div");
        container.valuesContainer.appendChild(yContainer);

        let yText = document.createTextNode("Y ");
        yContainer.appendChild(yText);

        this.y = document.createElement("input");
        this.y.setAttribute("type", "text");
        this.y.value = 1;
        yContainer.appendChild(this.y);
        this.y.addEventListener("keyup", this.updateMatrix);
    }

    updateMatrix() {

        // First, validates input values
        this.x.value = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].validNumber(this.x.value);
        this.y.value = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].validNumber(this.y.value);

        // Apply values
        this.matrixStructure[0][0] = parseFloat(this.x.value || 0);
        this.matrixStructure[1][1] = parseFloat(this.y.value || 0);

        this.parent.applyTransforms();
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ScaleMatrix);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__basic_matrix_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__matrix_operations__ = __webpack_require__(0);




class ShearMatrix extends __WEBPACK_IMPORTED_MODULE_0__basic_matrix_js__["a" /* default */] {

    constructor(_parent) {
        //
        super(_parent);

        this.x = undefined;
        this.y = undefined;

        // Binds
        this.updateMatrix = this.updateMatrix.bind(this);

        this.createDOMElement();
    }

    createDOMElement() {

        // creates a Basic Container and returns it
        let container = this.createBasicDOMElement();

        container.title.innerHTML = "Shear";

        // X value
        let xContainer = document.createElement("div");
        container.valuesContainer.appendChild(xContainer);

        let xText = document.createTextNode("X ");
        xContainer.appendChild(xText);

        this.x = document.createElement("input");
        this.x.setAttribute("type", "text");
        this.x.value = 0;
        xContainer.appendChild(this.x);
        this.x.addEventListener("keyup", this.updateMatrix);

        // Y value
        let yContainer = document.createElement("div");
        container.valuesContainer.appendChild(yContainer);

        let yText = document.createTextNode("Y ");
        yContainer.appendChild(yText);

        this.y = document.createElement("input");
        this.y.setAttribute("type", "text");
        this.y.value = 0;
        yContainer.appendChild(this.y);
        this.y.addEventListener("keyup", this.updateMatrix);
    }

    updateMatrix() {

        // First, validates input values
        this.x.value = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].validNumber(this.x.value);
        this.y.value = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].validNumber(this.y.value);

        // Apply values
        this.matrixStructure[0][1] = parseFloat(this.x.value || 0);
        this.matrixStructure[1][0] = parseFloat(this.y.value || 0);

        this.parent.applyTransforms();
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ShearMatrix);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__basic_matrix_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__matrix_operations__ = __webpack_require__(0);




class RotateMatrix extends __WEBPACK_IMPORTED_MODULE_0__basic_matrix_js__["a" /* default */] {

    constructor(_parent) {
        //
        super(_parent);

        this.degrees = undefined;

        // Binds
        this.updateMatrix = this.updateMatrix.bind(this);

        this.createDOMElement();
    }

    createDOMElement() {

        // creates a Basic Container and returns it
        let container = this.createBasicDOMElement();

        container.title.innerHTML = "Reflect";

        // Degrees value
        let degContainer = document.createElement("div");
        container.valuesContainer.appendChild(degContainer);

        let degText = document.createTextNode("deg ");
        degContainer.appendChild(degText);

        this.degrees = document.createElement("input");
        this.degrees.setAttribute("type", "text");
        this.degrees.value = 0;
        degContainer.appendChild(this.degrees);
        this.degrees.addEventListener("keyup", this.updateMatrix);
    }

    updateMatrix() {
        //
        // First, validates input values
        this.degrees.value = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].validNumber(this.degrees.value);

        // Apply values
        let val = parseFloat(this.degrees.value) || 0;
        this.matrixStructure[0][0] = Math.cos(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].degToRad(val) * 2);
        this.matrixStructure[0][1] = Math.sin(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].degToRad(val) * 2);
        this.matrixStructure[1][0] = Math.sin(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].degToRad(val) * 2);
        this.matrixStructure[1][1] = -Math.cos(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */].degToRad(val) * 2);

        this.parent.applyTransforms();
    }
}

/* harmony default export */ __webpack_exports__["a"] = (RotateMatrix);

/***/ })
/******/ ]);
//# sourceMappingURL=graphatrix.bundle.js.map