import BasicMatrix from './basic-matrix.js';
import * as Utils from './utils';

class TranslateMatrix extends BasicMatrix {
    
    constructor(_parent) {
        //
        super(_parent);

        this.x = undefined;
        this.y = undefined;
        
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
        this.x.addEventListener("keyup", this.getValidNumber);
        
        // Y value
        let yContainer = document.createElement("div");
        container.valuesContainer.appendChild(yContainer);
        
        let yText = document.createTextNode("Y ");
        yContainer.appendChild(yText);
        
        this.y = document.createElement("input");
        this.y.setAttribute("type", "text");
        this.y.value = 0;
        yContainer.appendChild(this.y);
        this.y.addEventListener("keyup", this.getValidNumber)
        
    }

    updateMatrix() {
        this.matrixStructure[0][2] = this.x.value;
        this.matrixStructure[1][2] = this.y.value;
    }
}

export default TranslateMatrix;