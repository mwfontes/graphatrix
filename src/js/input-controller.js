import Vertex from './vertex';

class InputController {

    constructor(_parent) {

        this.parent = _parent;

        // Input elements (where the user enters the desired vertices)
        this.input = {
            x: document.getElementById("input-x"),
            y: document.getElementById("input-y"),
            button: document.getElementById("input-button")
        }

        this.options = {
            closePath: document.getElementById("open-close-path"),
            showGrid: document.getElementById("show-grid")
        }

        this.addListeners();
    }

    addVertex() {
        // 
        // Add new vertex to the Graphatrix global vertices
        this.parent.vertices.push(new Vertex(this.parent, {
            index: this.parent.vertices.length + 1,
            x: this.input.x.value,
            y: this.input.y.value
        }));

        // clear the inputs
        this.input.x.value = "";
        this.input.y.value = "";
    }

    addListeners() {
        //
        // Insert Vertex Button
        this.input.button.addEventListener("click", this.addVertex.bind(this));

        // OPTIONS (close path + show grid)
        this.options.closePath.addEventListener("click", this.parent.canvas.draw.bind(this.parent.canvas));
        this.options.showGrid.addEventListener("click", this.parent.canvas.draw.bind(this.parent.canvas));
    }
}

export default InputController;