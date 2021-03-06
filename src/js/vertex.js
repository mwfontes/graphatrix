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
        this.elementsToUpdate.push({element: index, key: "index", preValueText: ""});
        container.appendChild(index);

        let pointX = document.createElement("div");
        pointX.className = "value original";
        pointX.innerHTML = `X: ${this.x}`;
        this.elementsToUpdate.push({element: pointX, key: "x", preValueText: "X: "});
        container.appendChild(pointX);

        let ModifiedPointX = document.createElement("div");
        ModifiedPointX.className = "value";
        ModifiedPointX.innerHTML = `X: ${this.modifiedX}`;
        this.elementsToUpdate.push({element: ModifiedPointX, key: "modifiedX", preValueText: "X: "});
        container.appendChild(ModifiedPointX);
        
        let pointY = document.createElement("div");
        pointY.className = "value original";
        pointY.innerHTML = `Y: ${this.y}`;
        this.elementsToUpdate.push({element: pointY, key: "y", preValueText: "Y: "});
        container.appendChild(pointY);
        
        let modifiedPointY = document.createElement("div");
        modifiedPointY.className = "value";
        modifiedPointY.innerHTML = `Y: ${this.modifiedY}`;
        this.elementsToUpdate.push({element: modifiedPointY, key: "modifiedY", preValueText: "Y: "});
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

export default Vertex;