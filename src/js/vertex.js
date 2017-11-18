class Vertex {

    constructor(_index = 1, _x = 0, _y = 0) {

        this.index = [_index];
        this.x = _x;
        this.y = _y;
        this.modifiedX = _x;
        this.modifiedY = _y;
        this.DOMElement = undefined;
        this.index = _index;
        this.elementsToUpdate = [];

        this.DOMElement = this.createDOMElement();
    }

    createDOMElement() {
        let container = document.createElement("div");
        container.className = "points";
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
        container.appendChild(erase);

        return container;
    }

    update() {
        //
        for (let item of this.elementsToUpdate) {
            item.element.innerHTML = item.preValueText + this[item.key];
        }
    }

}

export default Vertex;