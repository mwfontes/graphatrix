import BasicMatrix from './basic-matrix.js';
import Utils from './utils';
import MatrixOperations from './matrix-operations';

class RotateMatrix extends BasicMatrix {
    
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
        this.degrees.value = Utils.validNumber(this.degrees.value);

        // Apply values
        let val = parseFloat(this.degrees.value) || 0;
        this.matrixStructure[0][0] = Math.cos(Utils.degToRad(val));
        this.matrixStructure[0][1] = -Math.sin(Utils.degToRad(val));
        this.matrixStructure[1][0] = Math.sin(Utils.degToRad(val));
        this.matrixStructure[1][1] = Math.cos(Utils.degToRad(val));

        this.parent.applyTransforms();
    }
}

export default RotateMatrix;