import '../css/global.scss';

import Canvas from './canvas';

class Graphatrix {

    constructor () {

        this.canvas = undefined;
    }
    
    start() {
        
        // sets the drawing canvas
        // this.canvas.draw();
        this.canvas = new Canvas(document.getElementById('canvas'));
    }
}

const graphatrix = new Graphatrix();
graphatrix.start();