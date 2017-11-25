import '../css/global.scss';

import Canvas from './canvas';
import Vertex from './vertex';
import TranslateMatrix from './matrixes/translate';
import InputController from './input-controller';

class Graphatrix {

    constructor () {

        this.canvas = undefined; // the drawing/plotting canvas
        this.inputController = undefined; // Controls the user interaction in the input tab
        this.vertices = []; // List of created vertices by the user
        this.pivotVertex = undefined; // Points to the current vertex marked as pivot
        this.massCenter = undefined; // A vertex that is the polygon mass center
        this.absoluteCenter = undefined; // A vertex that is the polygon absolute center
    }
    
    start() {
        
        this.canvas = new Canvas(this, document.getElementById('canvas'));
        this.inputController = new InputController(this);

        let transMat = new TranslateMatrix(this);

        // Make the fisrt draw. !!!Should be the last command!!!
        this.canvas.draw();
    }
}

const graphatrix = new Graphatrix();
graphatrix.start();