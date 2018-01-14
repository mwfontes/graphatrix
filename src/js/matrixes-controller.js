import TranslateMatrix from './matrixes/translate';
import RotateMatrix from './matrixes/rotate';
import ScaleMatrix from './matrixes/scale';
import ShearMatrix from './matrixes/shear';
import ReflectMatrix from './matrixes/reflect';
import MatrixOperations from './matrixes/matrix-operations';
import Utils from './matrixes/utils';

class MatrixesController {

	constructor(_parent) {

		this.parent = _parent;

		// Input elements (where the user enters the desired vertices)
		this.buttons = {
			translate: document.getElementById("do-translate"),
			rotate: document.getElementById("do-rotate"),
			scale: document.getElementById("do-scale"),
			reflect: document.getElementById("do-reflect"),
			shear: document.getElementById("do-shear")
		}

		this.transformationMatrix = [
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1]
		];

		// Functions Binds
		this.addMatrix = this.addMatrix.bind(this);

		this.addListeners();
	}


	addMatrix(evt) {
        //
        let action = evt.target.getAttribute("id");

        switch (action) {
            case "do-translate":
                this.parent.matrixes.unshift(new TranslateMatrix(this.parent));
                break;
            case "do-rotate":
                this.parent.matrixes.unshift(new RotateMatrix(this.parent));
                break;
            case "do-scale":
                this.parent.matrixes.unshift(new ScaleMatrix(this.parent));
                break;
            case "do-reflect":
                this.parent.matrixes.unshift(new ReflectMatrix(this.parent));
                break;
            case "do-shear":
                this.parent.matrixes.unshift(new ShearMatrix(this.parent));
                break;
        }
    }

	addListeners() {
		//
		// Buttons
		this.buttons.translate.addEventListener("click", this.addMatrix);
		this.buttons.rotate.addEventListener("click", this.addMatrix);
		this.buttons.scale.addEventListener("click", this.addMatrix);
		this.buttons.reflect.addEventListener("click", this.addMatrix);
		this.buttons.shear.addEventListener("click", this.addMatrix);
	}
}

export default MatrixesController;