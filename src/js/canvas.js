class Canvas {

    constructor(_parent, _canvasElement) {

        this.parent = _parent;
        this.canvasDOM = _canvasElement; // canvas DOM element
        this.canvas = this.canvasDOM.getContext('2d'); // drawing canvas
        this.size = [0, 0]; // canvas' size
        this.center = [0, 0]; // relative center
        this.dragDelta = [0, 0]; // how much has been dragged in X and Y
        this.scale = 20; // Drawing scale
        this.margins = [180, 130];

        // binds
        this.draw = this.draw.bind(this)

        this.init();
    }

    // sets the Canvas DOM element current size for drawing calcs
    defSize() {
        let width = window.innerWidth - this.margins[0];
        let height = window.innerHeight - this.margins[1];
        this.canvasDOM.setAttribute("width", width);
        this.canvasDOM.setAttribute("height", height);
        this.size = [width, height];
    }

    // sets the relative center from where to draw
    // :: the plane's 0,0
    resetCenter() {
        this.center = [
            Math.floor((this.size[0] / 2) - this.dragDelta[0]) + 0.5,
            Math.floor((this.size[1] / 2) - this.dragDelta[1]) + 0.5
        ];
    }

    defCenter() {

        let currentCenter = [
            this.center[0],
            this.center[1]
        ]

        this.center = [
            Math.floor(currentCenter[0] - this.dragDelta[0]) + 0.5,
            Math.floor(currentCenter[1] - this.dragDelta[1]) + 0.5
        ];
    }

    // Increases/Decreases the scaling factor when the user scrolls over the canvas
    setScale(evt) {
        let delta = Math.max(-1, Math.min(1, evt.wheelDelta));
        this.scale = Math.max(8, Math.min(100, this.scale + (delta * 5)));

        this.draw();
    }

    grid() {
        // if (document.getElementById("show-grid").checked) {

        this.canvas.strokeStyle = "#f0f0f0";
        this.canvas.lineWidth = 1;

        let i;
        let scl = Math.floor(this.scale);

        // -X
        for (
            i = this.center[0] - scl; i > 0; i -= scl
        ) {
            this.canvas.beginPath();
            this.canvas.moveTo(i, 0);
            this.canvas.lineTo(i, this.size[1]);
            this.canvas.closePath();
            this.canvas.stroke();
        }

        // +X
        for (i = this.center[0] + scl; i < this.size[0]; i += scl) {
            this.canvas.beginPath();
            this.canvas.moveTo(i, 0);
            this.canvas.lineTo(i, this.size[1]);
            this.canvas.closePath();
            this.canvas.stroke();
        }

        // +Y
        for (i = this.center[1] - scl; i > 0; i -= scl) {
            this.canvas.beginPath();
            this.canvas.moveTo(0, i);
            this.canvas.lineTo(this.size[0], i);
            this.canvas.closePath();
            this.canvas.stroke();
        }

        // -Y
        for (i = this.center[1] + scl; i < this.size[1]; i += scl) {
            this.canvas.beginPath();
            this.canvas.moveTo(0, i);
            this.canvas.lineTo(this.size[0], i);
            this.canvas.closePath();
            this.canvas.stroke();
        }
        // }
    }

    // returns the right text position
    getModTextPosition(_min, _max, _index) {
        if (this.scale < 20 && _index % 2 == 0) { // if less than 20px and NOT ODD
            return _min;
        } else {
            return _max;
        }
    }

    cartesianPlane() {

        let i, count;
        let scl = Math.floor(this.scale);

        this.canvas.lineWidth = 1;
        this.canvas.font = "10px Raleway";
        this.canvas.textBaseline = "middle";

        // LINHA X
        this.canvas.strokeStyle = "#d17878";
        this.canvas.fillStyle = "#d17878";
        this.canvas.beginPath();
        this.canvas.moveTo(0, this.center[1]);
        this.canvas.lineTo(this.size[0], this.center[1]);
        this.canvas.closePath();
        this.canvas.stroke();

        // -X
        count = -1;
        for (i = this.center[0] - scl; i > 0; i -= scl) {
            this.canvas.beginPath();
            this.canvas.moveTo(i, this.center[1] - 3);
            this.canvas.lineTo(i, this.center[1] + 3);
            this.canvas.closePath();
            this.canvas.stroke();
            this.canvas.textAlign = "center";

            if (this.parent.inputController.options.showNumbers.checked) {
                this.canvas.fillText(count, i, this.center[1] + this.getModTextPosition(-10, 8, count), 100);
                count--;
            }
        }

        // +X
        count = 1;
        for (i = this.center[0] + scl; i < this.size[0]; i += scl) {
            this.canvas.beginPath();
            this.canvas.moveTo(i, this.center[1] - 3);
            this.canvas.lineTo(i, this.center[1] + 3);
            this.canvas.closePath();
            this.canvas.stroke();
            this.canvas.textAlign = "center";
            if (this.parent.inputController.options.showNumbers.checked) {
                this.canvas.fillText(count, i, this.center[1] + this.getModTextPosition(-10, 8, count), 100);
                count++;
            }
        }

        // LINHA Y
        this.canvas.strokeStyle = "#81bf68";
        this.canvas.fillStyle = "#81bf68";
        this.canvas.beginPath();
        this.canvas.moveTo(this.center[0], 0);
        this.canvas.lineTo(this.center[0], this.size[1]);
        this.canvas.closePath();
        this.canvas.stroke();

        // +Y
        count = 1;
        for (i = this.center[1] - scl; i > 0; i -= scl) {
            this.canvas.beginPath();
            this.canvas.moveTo(this.center[0] - 2, i);
            this.canvas.lineTo(this.center[0] + 3, i);
            this.canvas.closePath();
            this.canvas.stroke();
            if (this.parent.inputController.options.showNumbers.checked) {
                this.canvas.textAlign = this.getModTextPosition(-12, 6, count) < 0 ? "right" : "left";
                this.canvas.fillText(count, this.center[0] + this.getModTextPosition(-6, 6, count), i, 100);
                count++;
            }
        }

        // -Y
        count = -1;
        for (i = this.center[1] + scl; i < this.size[1]; i += scl) {
            this.canvas.beginPath();
            this.canvas.moveTo(this.center[0] - 2, i);
            this.canvas.lineTo(this.center[0] + 3, i);
            this.canvas.closePath();
            this.canvas.stroke();
            if (this.parent.inputController.options.showNumbers.checked) {
                this.canvas.textAlign = this.getModTextPosition(-12, 6, count) < 0 ? "right" : "left";
                this.canvas.fillText(count, this.center[0] + this.getModTextPosition(-6, 6, count), i, 100);
                count--;
            }
        }

    }

    pivot() {

        let drawingCenter = [
            this.center[0] + Math.round(this.parent.pivotVertex.x * this.scale),
            this.center[1] - Math.round(this.parent.pivotVertex.y * this.scale)
        ];

        this.canvas.beginPath();
        this.canvas.arc(drawingCenter[0], drawingCenter[1], 4, 0, 2 * Math.PI);

        // horizontal line
        this.canvas.moveTo(drawingCenter[0] - 6, drawingCenter[1]);
        this.canvas.lineTo(drawingCenter[0] + 6, drawingCenter[1]);

        // vertical line
        this.canvas.moveTo(drawingCenter[0], drawingCenter[1] - 6);
        this.canvas.lineTo(drawingCenter[0], drawingCenter[1] + 6);

        this.canvas.strokeStyle = "#573f84";
        this.canvas.lineWidth = 1;
        this.canvas.stroke();
        this.canvas.closePath();
    }


    draw() {
        //
        // Clears the canvas
        this.canvas.clearRect(0, 0, this.size[0], this.size[1]);

        // Complimentary functions
        // Draws the grid if checkbox is checked
        if (this.parent.inputController.options.showGrid.checked) {
            this.grid();
        }

        this.cartesianPlane();
        this.pivot();

        let i;

        // DESENHA FORMA BASE - ***** NAO MODIFICADA *****
        if (this.parent.vertices.length > 1) {

            this.canvas.beginPath();
            this.canvas.lineJoin = "bevel";
            this.canvas.strokeStyle = "#9071a5";
            this.canvas.lineWidth = 2;

            this.canvas.moveTo(
                this.center[0] + Math.round(this.parent.vertices[0].x * this.scale),
                this.center[1] + Math.round(this.parent.vertices[0].y * -this.scale)
            );

            for (i = 1; i < this.parent.vertices.length; i++) {
                this.canvas.lineTo(
                    this.center[0] + Math.round(this.parent.vertices[i].x * this.scale),
                    this.center[1] + Math.round(this.parent.vertices[i].y * -this.scale)
                );
            }

            if (this.parent.inputController.options.closePath.checked) {
                this.canvas.closePath();
            }

            this.canvas.stroke();
        }

        // // DESENHA FORMA ***** MODIFICADA *****
        // DESENHA FORMA BASE - ***** NAO MODIFICADA *****
        if (this.parent.vertices.length > 1) {

            this.canvas.beginPath();
            this.canvas.lineJoin = "bevel";
            this.canvas.strokeStyle = "#573f84";
            this.canvas.lineWidth = 2;

            this.canvas.moveTo(
                this.center[0] + Math.round(this.parent.vertices[0].modifiedX * this.scale),
                this.center[1] + Math.round(this.parent.vertices[0].modifiedY * -this.scale)
            );

            for (i = 1; i < this.parent.vertices.length; i++) {
                this.canvas.lineTo(
                    this.center[0] + Math.round(this.parent.vertices[i].modifiedX * this.scale),
                    this.center[1] + Math.round(this.parent.vertices[i].modifiedY * -this.scale)
                );
            }

            if (this.parent.inputController.options.closePath.checked) {
                this.canvas.closePath();
            }

            this.canvas.stroke();
        }


    }

    drag(evt) {

        let _this = this;

        let lastPointerPosition = [
            evt.pageX,
            evt.pageY
        ];

        function dragMove(evt) {

            _this.dragDelta = [
                lastPointerPosition[0] - evt.pageX,
                lastPointerPosition[1] - evt.pageY
            ];

            lastPointerPosition = [
                evt.pageX,
                evt.pageY
            ];

            _this.defCenter();

            _this.draw();
        }

        function stopDrag() {
            window.removeEventListener("mousemove", dragMove);
            window.removeEventListener("mouseup", stopDrag);
        }

        window.addEventListener("mousemove", dragMove);
        window.addEventListener("mouseup", stopDrag);
    }

    resize() {
        //
        // Notes the previous size before resizing. double vars to prevent pointing
        let prevSizeX = this.size[0];
        let prevSizeY = this.size[1];

        // gets the current center
        let currentCenter = [
            this.center[0],
            this.center[1]
        ];

        // redefines canvas size
        this.defSize();

        // calculates the size modification of the window
        let resizePercentageX = this.size[0] / prevSizeX;
        let resizePercentageY = this.size[1] / prevSizeY;

        // reset the center according to the percentage of the window resize
        this.dragDelta = [
            currentCenter[0] - (currentCenter[0] * resizePercentageX),
            currentCenter[1] - (currentCenter[1] * resizePercentageY)
        ];
        this.defCenter();
        this.draw();
    }

    init() {
        this.defSize();
        this.resetCenter();

        // CANVAS LISTENERS

        // OTHER LISTENERS
        window.addEventListener("resize", this.resize.bind(this))

        // hold and drag
        this.canvasDOM.addEventListener("mousedown", this.drag.bind(this));

        // zoom in/out
        window.addEventListener("mousewheel", this.setScale.bind(this), false);
        window.addEventListener("DOMMouseScroll", this.setScale.bind(this), false);
    }
}

export default Canvas;