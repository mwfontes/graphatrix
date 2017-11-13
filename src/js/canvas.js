class Canvas {

    constructor(_canvasElement) {

        this.canvasDOM = _canvasElement; // canvas DOM element
        this.canvas = this.canvasDOM.getContext('2d'); // drawing canvas
        this.size = [0, 0]; // canvas' size
        this.center = [0, 0]; // relative center
        this.dragDelta = [0, 0]; // how much has been dragged in X and Y
        this.scale = 20; // Drawing scale
        this.margins = [180, 130];

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
    setCenter(_w, _h) {
        this.center = [
            (_w / 2) - this.dragDelta[0],
            (_h / 2) - this.dragDelta[1]
        ];
    }

    // TBD
    setScale(evt) {
        let delta = Math.max(-1, Math.min(1, evt.wheelDelta));
        this.scale = Math.max(4, Math.min(100, this.scale + (delta * 5)));
        this.draw();
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
        this.canvas.clearRect(0, 0, this.size[0], this.size[1]);

        this.grid();
        this.cartesianPlane();
        // geraPlano();

        // DESENHA FORMA BASE - ***** NAO MODIFICADA *****
        // if (_allData.points.length > 1) {

        //     this.canvas.beginPath();
        //     var calcPointsXY = calculaOriginal(_allData.points[0].x, _allData.points[0].y);
        //     this.canvas.moveTo(calcPointsXY[0], calcPointsXY[1]);
        //     for (var c = 1; c < _allData.points.length; c++) {
        //         calcPointsXY = calculaOriginal(_allData.points[c].x, _allData.points[c].y);
        //         this.canvas.lineTo(calcPointsXY[0], calcPointsXY[1]);
        //     }

        //     if (document.getElementById("open-close-path").checked) {
        //         this.canvas.closePath();
        //     }

        //     this.canvas.strokeStyle = "#abc";
        //     this.canvas.lineWidth = 2;
        //     this.canvas.stroke();
        // }

        // // DESENHA FORMA ***** MODIFICADA *****
        // if (_allData.points.length > 1) {

        //     this.canvas.beginPath();
        //     calcPointsXY = calcula(_allData.points[0].x, _allData.points[0].y, false);
        //     this.canvas.moveTo(calcPointsXY[0], calcPointsXY[1]);
        //     for (var c = 1; c < _allData.points.length; c++) {
        //         calcPointsXY = calcula(_allData.points[c].x, _allData.points[c].y, false);
        //         this.canvas.lineTo(calcPointsXY[0], calcPointsXY[1]);
        //     }

        //     if (document.getElementById("open-close-path").checked) {
        //         this.canvas.closePath();
        //     }

        //     this.canvas.strokeStyle = "#000";
        //     this.canvas.lineWidth = 2;
        //     this.canvas.stroke();
        // }

        // if (_allData.points.length > 0) {
        //     for (var g = 0; g < _allData.points.length; g++) {
        //         var calcPointsXY = calcula(_allData.points[g].x, _allData.points[g].y, false);

        //         this.canvas.beginPath();
        //         this.canvas.arc(calcPointsXY[0], calcPointsXY[1], 3, 0, 2*Math.PI);
        //         this.canvas.fillStyle = "#d00";
        //         this.canvas.fill();
        //         this.canvas.closePath();
        //     }
        // }

    }

    drag(evt) {

        let _this = this;

        let startPosition = [
            evt.pageX,
            evt.pageY
        ]

        let currentCenter = [
            this.center[0],
            this.center[1]
        ]

        function dragMove(evt) {

            _this.center = [
                currentCenter[0] - (startPosition[0] - evt.pageX),
                currentCenter[1] - (startPosition[1] - evt.pageY)
            ];

            _this.draw();
        }

        function stopDrag() {
            window.removeEventListener("mousemove", dragMove);
            window.removeEventListener("mouseup", stopDrag);
        }

        window.addEventListener("mousemove", dragMove);
        window.addEventListener("mouseup", stopDrag);
    }

    init() {
        this.defSize();
        this.setCenter(this.size[0], this.size[1]);
        this.draw();

        // CANVAS LISTENERS

        // hold and drag
        this.canvasDOM.addEventListener("mousedown", this.drag.bind(this));

        // zoom in/out
        window.addEventListener("mousewheel", this.setScale.bind(this), false);
        window.addEventListener("DOMMouseScroll", this.setScale.bind(this), false);
    }
}

export default Canvas;