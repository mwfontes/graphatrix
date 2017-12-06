import '../css/global.scss';

import Canvas from './canvas';
import Vertex from './vertex';
import InputController from './input-controller';
import MatrixesController from './matrixes-controller';

class Graphatrix {

    constructor () {

        this.canvas = undefined; // the drawing/plotting canvas
        this.inputController = undefined; // Controls the user interaction in the input tab
        this.vertices = []; // List of created vertices by the user
        this.matrixes = [];
        this.pivotVertex = undefined; // Points to the current vertex marked as pivot
        this.massCenter = undefined; // A vertex that is the polygon mass center
        this.absoluteCenter = undefined; // A vertex that is the polygon absolute center
    }

    fakeStart() {
        
        let _this = this;

        function addFake(_x, _y) {
            _this.inputController.input.x.value = _x;
            _this.inputController.input.y.value = _y;
            _this.inputController.addVertex({type: "fake", keycode: -1});
            _this.inputController.input.x.value = "";
            _this.inputController.input.y.value = "";
        }

        addFake(1, 1);
        addFake(3, 1);
        addFake(3, 3);
        addFake(3.5, 3);
        addFake(2, 5);
        addFake(0.5, 3);
        addFake(1, 3);
    }
    
    start() {
        
        this.canvas = new Canvas(this, document.getElementById('canvas'));
        this.inputController = new InputController(this);
        this.matrixesController = new MatrixesController(this);

        this.fakeStart();

        // Make the fisrt draw. !!!***Should be the last command***!!!
        this.canvas.draw();
    }
}

const graphatrix = new Graphatrix();
graphatrix.start();