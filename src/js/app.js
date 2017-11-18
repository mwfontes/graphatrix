import '../css/global.scss';

import Canvas from './canvas';
import Vertex from './vertex';

class Graphatrix {

    constructor () {

        this.canvas = undefined;
    }
    
    start() {
        
        // sets the drawing canvas
        // this.canvas.draw();
        this.canvas = new Canvas(document.getElementById('canvas'));


        let i;
        for (i = 0; i < 5; i += 1) {
            let vtx = new Vertex(i, 1.00 * i, 1.33 * i);
            vtx.x = 8;
            vtx.modifiedX = 20;
            vtx.update();
        }

    }
}

const graphatrix = new Graphatrix();
graphatrix.start();