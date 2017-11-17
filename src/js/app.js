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

        let vtx = new Vertex(1.00, 2.00);
        vtx.original.x = 5;
        vtx.update();
        console.log(vtx);
    }
}

const graphatrix = new Graphatrix();
graphatrix.start();