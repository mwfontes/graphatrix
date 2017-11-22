import '../css/global.scss';

import Canvas from './canvas';
import Vertex from './vertex';
import TranslateMatrix from './matrixes/translate';
import InputController from './input-controller';

class Graphatrix {

    constructor () {

        this.canvas = undefined;
        this.inputController = undefined;
        this.vertices = [];
        this.pivotVertex = undefined;
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