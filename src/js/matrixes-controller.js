import TranslateMatrix from './matrixes/translate';
import RotateMatrix from './matrixes/rotate';
import MatrixOperations from './matrixes/matrix-operations';
import Utils from './matrixes/utils';

class MatrixesController {

	constructor(_parent) {

		this.parent = _parent;

		// Input elements (where the user enters the desired vertices)
		this.buttons = {
			translate: document.getElementById("do-translate"),
			rotate: document.getElementById("do-rotate"),
			resize: document.getElementById("do-resize"),
			reflect: document.getElementById("do-reflect"),
			shear: document.getElementById("do-shear")
		}

		// Functions Binds
		this.addMatrix = this.addMatrix.bind(this);

		this.addListeners();
	}


	addMatrix(evt) {
        //
        let action = evt.target.getAttribute("id");

        switch (action) {
            case "do-translate":
                this.parent.matrixes.push(new TranslateMatrix(this.parent));
                break;
            case "do-rotate":
                this.parent.matrixes.push(new RotateMatrix(this.parent));
                break;
            case "do-resize":
                // this.parent.matrixes.push(new ResizeMatrix(this.parent));
                break;
            case "do-reflect":
                // this.parent.matrixes.push(new ReflectMatrix(this.parent));
                break;
            case "do-shear":
                // this.parent.matrixes.push(new ShearMatrix(this.parent));
                break;
        }
    }

	addListeners() {
		//
		// Buttons
		this.buttons.translate.addEventListener("click", this.addMatrix);
		this.buttons.rotate.addEventListener("click", this.addMatrix);
		this.buttons.resize.addEventListener("click", this.addMatrix);
		this.buttons.reflect.addEventListener("click", this.addMatrix);
		this.buttons.shear.addEventListener("click", this.addMatrix);
	}
}

export default MatrixesController;