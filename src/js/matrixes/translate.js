import BasicMatrix from './basic-matrix.js';

class TranslateMatrix extends BasicMatrix {
    
    constructor(_parent) {
        
        super(_parent);

        this.createDOMElement();
    }

    createDOMElement() {
        
        // creates a Bsic Container and returns it
        let container = this.createBasicDOMElement();

        container.title.innerHTML = "Translate";

        // X value
        let xContainer = document.createElement("div");
        container.valuesContainer.appendChild(xContainer);

        let xText = document.createTextNode("X ");
        xContainer.appendChild(xText);
        
        let xInput = document.createElement("input");
        xInput.setAttribute("type", "text");
        xContainer.appendChild(xInput);

        // Y value
        let yContainer = document.createElement("div");
        container.valuesContainer.appendChild(yContainer);

        let yText = document.createTextNode("Y ");
        yContainer.appendChild(yText);
        
        let yInput = document.createElement("input");
        xInput.setAttribute("type", "text");
        yContainer.appendChild(yInput);
        
    }
}

export default TranslateMatrix;