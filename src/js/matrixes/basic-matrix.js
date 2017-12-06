class BasicMatrix {
    
    constructor(_parent) {
        
        this.parent = _parent;
        this.DOMElement = undefined;
        this.elementsToUpdate = [];
        
        let matrixStructure = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]

        //BINDS
        this.getValidNumber = this.getValidNumber.bind(this);
        this.getMatrix = this.getMatrix.bind(this);
        this.erase = this.erase.bind(this);

    }

    erase() {
        console.log("Should erase this matrix.");
    }

    createBasicDOMElement() {
        this.DOMElement = document.createElement("div");
        this.DOMElement.className = "matrix-input";
        document.getElementById("matrixes-elements-holder").appendChild(this.DOMElement);

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

    getMatrix() {
        return matrixStructure;
    }

    getValidNumber(evt) {
        //
        evt.target.value = Utils.validNumber(evt.target.value);
    }
}

export default BasicMatrix;