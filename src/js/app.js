import '../css/global.scss';

import Canvas from './canvas';
import Vertex from './vertex';
import InputController from './input-controller';

class Graphatrix {

    constructor () {

        this.canvas = undefined;
        this.inputController = undefined;
        this.vertices = [];
    }
    
    start() {
        
        this.canvas = new Canvas(this, document.getElementById('canvas'));
        this.inputController = new InputController(this);

        let i;
        for (i = 0; i < 5; i += 1) {
            this.vertices.push(new Vertex(this, {
                index: this.vertices.length + 1,
                x: 1 + i,
                y: i * i
            }));
        }

        this.canvas.draw();

    }
}

const graphatrix = new Graphatrix();
graphatrix.start();