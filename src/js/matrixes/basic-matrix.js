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
    }

    erase() {
        console.log("Should erase this matrix.");
    }

    createBasicDOMElement() {
        this.DOMElement = document.createElement("div");
        this.DOMElement.className = "matrix-input";

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