import Utils from './utils';
import MatrixOperations from './matrix-operations';

class BasicMatrix {
    
    constructor(_parent) {
        
        this.parent = _parent;
        this.DOMElement = undefined;
        this.elementsToUpdate = [];
        
        this.matrixStructure = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]

        //BINDS
        this.erase = this.erase.bind(this);
        this.drag = this.drag.bind(this);
    }

    drag(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        console.log(evt);
        if (evt.button == 2) {
            evt.currentTarget
        }
    }

    erase() {
        
        // remove matrix from the DOM
        this.DOMElement.parentNode.removeChild(this.DOMElement);

        // remove the matrix from the app's matrixes list
        let idx = this.parent.matrixes.indexOf(this);
        this.parent.matrixes.splice(idx, 1);

        // Apply transforms - Update transformation matrix
        if (this.parent.matrixes.length > 0) {
            this.parent.applyTransforms();
        }
    }

    createBasicDOMElement() {
        this.DOMElement = document.createElement("div");
        this.DOMElement.className = "matrix-input";
        this.DOMElement.addEventListener("contextmenu", this.drag, true)

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

        return ({
            "valuesContainer": valuesContainer,
            "title": title
        });
    }

    updateMatrix() {}
}

export default BasicMatrix;