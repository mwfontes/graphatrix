class Vertex {

    constructor(_x = 0, _y = 0) {

        this.original = {
            x: _x,
            y: _y,
            DOMElement: undefined
        }
        this.modified = undefined;
        this.elementsToUpdate = [];

        this.original.DOMElement = this.createDOMElement(this.original);
    }

    createDOMElement(_params) {
        let container = document.createElement("div");
        container.className = "points";
        document.getElementById("vertices-container").appendChild(container);

        let pointX = document.createElement("span");
        pointX.innerHTML = `X: ${_params.x} `;
        this.elementsToUpdate.push({element: pointX, value: _params.x});
        container.appendChild(pointX);
        
        let pointY = document.createElement("span");
        pointY.innerHTML = `Y: ${_params.y}`;
        container.appendChild(pointY);
        
        let erase = document.createElement("div");
        erase.className = "erase-points";
        container.appendChild(erase);

        return container;
    }

    update() {
        this.elementsToUpdate[0].element.innerHTML = this.elementsToUpdate[0].value;
        console.log(this.elementsToUpdate[0].element);
    }

}

export default Vertex;

{/* <div class="points">
    <span>X: 0.00</span>
    <span>Y: 0.00</span>
    <div class="erase-points"></div>
</div> */}