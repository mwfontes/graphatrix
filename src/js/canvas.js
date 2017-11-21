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
            (this.size[0] / 2) - this.dragDelta[0],
            (this.size[1] / 2) - this.dragDelta[1]
        ];
    }

    defCenter() {

        let currentCenter = [
            this.center[0],
            this.center[1]
        ]

        this.center = [
            currentCenter[0] - this.dragDelta[0],
            currentCenter[1] - this.dragDelta[1]
        ];
    }

    // TBD
    setScale(evt) {
        let delta = Math.max(-1, Math.min(1, evt.wheelDelta));
        this.scale = Math.max(4, Math.min(100, this.scale + (delta * 5)));
    }

    // Draws the target at the center of the polygon
    target() {
        // let targetXY = calcula(getCenterPoint()[0], getCenterPoint()[1], false);

        // this.canvas.beginPath();
        // // desenha círculo (x, y, raio, angulo inicial, angulo final)
        // this.canvas.arc(targetXY[0], targetXY[1], 5, 0, 2 * Math.PI);

        // // desenha linha horizontal
        // this.canvas.moveTo(targetXY[0] + 10, targetXY[1]);
        // this.canvas.lineTo(targetXY[0] - 10, targetXY[1]);

        // // desenha linha vertical
        // this.canvas.moveTo(targetXY[0], targetXY[1] - 10);
        // this.canvas.lineTo(targetXY[0], targetXY[1] + 10);

        // // termina desenho
        // this.canvas.strokeStyle = "#d00";
        // this.canvas.lineWidth = 1;
        // this.canvas.stroke();
        // this.canvas.closePath();
    }

    grid() {
        // if (document.getElementById("show-grid").checked) {

        this.canvas.strokeStyle = "#f0f0f0";
        this.canvas.lineWidth = 1;
        
        let i;

        // -X
        for (
            i = this.center[0] - this.scale; i > 0; i -= this.scale
        ) {
            this.canvas.beginPath();
            this.canvas.moveTo(Math.floor(i) + 0.5, 0);
            this.canvas.lineTo(Math.floor(i) + 0.5, this.size[1]);
            this.canvas.closePath();
            this.canvas.stroke();
        }

        // +X
        for (i = this.center[0] + this.scale; i < this.size[0]; i += this.scale) {
            this.canvas.beginPath();
            this.canvas.moveTo(Math.floor(i) + 0.5, 0);
            this.canvas.lineTo(Math.floor(i) + 0.5, this.size[1]);
            this.canvas.closePath();
            this.canvas.stroke();
        }

        // +Y
        for (i = this.center[1] - this.scale; i > 0; i -= this.scale) {
            this.canvas.beginPath();
            this.canvas.moveTo(0, Math.floor(i) + 0.5);
            this.canvas.lineTo(this.size[0], Math.floor(i) + 0.5);
            this.canvas.closePath();
            this.canvas.stroke();
        }

        // -Y
        for (i = this.center[1] + this.scale; i < this.size[1]; i += this.scale) {
            this.canvas.beginPath();
            this.canvas.moveTo(0, Math.floor(i) + 0.5);
            this.canvas.lineTo(this.size[0], Math.floor(i) + 0.5);
            this.canvas.closePath();
            this.canvas.stroke();
        }
        // }
    }


    cartesianPlane() {

        this.canvas.strokeStyle = "#aaa";
        this.canvas.fillStyle = "#aaa";
        this.canvas.lineWidth = 1;
        this.canvas.font = "12px sans-serif";

        // LINHA X
        this.canvas.beginPath();
        this.canvas.moveTo(0, this.center[1]);
        this.canvas.lineTo(this.size[0], this.center[1]);
        this.canvas.closePath();
        this.canvas.stroke();

        let i;

        // -X
        for (i = this.center[0] - this.scale; i > 0; i -= this.scale) {
            this.canvas.beginPath();
            this.canvas.moveTo(Math.floor(i) + 0.5, this.center[1] - 3);
            this.canvas.lineTo(Math.floor(i) + 0.5, this.center[1] + 3);
            this.canvas.closePath();
            this.canvas.stroke();
        }

        // +X
        for (i = this.center[0] + this.scale; i < this.size[0]; i += this.scale) {
            this.canvas.beginPath();
            this.canvas.moveTo(Math.floor(i) + 0.5, this.center[1] - 3);
            this.canvas.lineTo(Math.floor(i) + 0.5, this.center[1] + 3);
            this.canvas.closePath();
            this.canvas.stroke();
        }

        // LINHA Y
        this.canvas.beginPath();
        this.canvas.moveTo(this.center[0] + 0.5, 0);
        this.canvas.lineTo(this.center[0] + 0.5, this.size[1]);
        this.canvas.closePath();
        this.canvas.stroke();

        // +Y
        for (i = this.center[1] - this.scale; i > 0; i -= this.scale) {
            this.canvas.beginPath();
            this.canvas.moveTo(this.center[0] - 2.5, Math.floor(i) + 0.5);
            this.canvas.lineTo(this.center[0] + 3.5, Math.floor(i) + 0.5);
            this.canvas.closePath();
            this.canvas.stroke();
        }

        // -Y
        for (i = this.center[1] + this.scale; i < this.size[1]; i += this.scale) {
            this.canvas.beginPath();
            this.canvas.moveTo(this.center[0] - 2.5, Math.floor(i) + 0.5);
            this.canvas.lineTo(this.center[0] + 3.5, Math.floor(i) + 0.5);
            this.canvas.closePath();
            this.canvas.stroke();
        }

    }


    draw() {
        //
        // Clears the canvas
        this.canvas.clearRect(0, 0, this.size[0], this.size[1]);

        // Draws the grid if checkbox is checked
        if (this.parent.inputController.options.showGrid.checked) {
            this.grid();
        }

        this.cartesianPlane();
        let i;

        // DESENHA FORMA BASE - ***** NAO MODIFICADA *****
        if (this.parent.vertices.length > 1) {

            this.canvas.beginPath();
            this.canvas.lineCap = "round";
            
            this.canvas.moveTo(
                this.center[0] + (this.parent.vertices[0].x * this.scale),
                this.center[1] + (this.parent.vertices[0].y * -this.scale)
            );

            for (i = 1; i < this.parent.vertices.length; i++) {
                this.canvas.lineTo(
                    this.center[0] + (this.parent.vertices[i].x * this.scale),
                    this.center[1] + (this.parent.vertices[i].y * -this.scale) 
                );
            }

            if (this.parent.inputController.options.closePath.checked) {
                this.canvas.closePath();
            }

            this.canvas.strokeStyle = "#abc";
            this.canvas.lineWidth = 2;
            this.canvas.stroke();
        }

        // // DESENHA FORMA ***** MODIFICADA *****

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