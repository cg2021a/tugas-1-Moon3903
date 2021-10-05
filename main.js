function main() {
    var canvas = document.getElementById('myCanvas');
    var gl = canvas.getContext('webgl');

    const left = {
        color_point_1: [0.6, 0.4, 0.2], // head color
        color_point_2: [0, 0, 0], // text color
        color_point_3: [0.5, 0.3, 0.1], // body color
        // body
        point_c: [-0.250, 0.600],
        point_d: [-0.300, 0.750],
        point_e: [-0.800, 0.600],
        point_f: [-0.750, 0.750],
        point_g: [-0.300, 0.000],
        point_h: [-0.750, 0.000],
        // text 1
        point_i: [-0.750, 0.500],
        point_j: [-0.745, 0.450],
        point_k: [-0.550, 0.450],
        point_l: [-0.555, 0.500],
        //text 2
        point_n: [-0.700, 0.050],
        point_o: [-0.350, 0.050],
        point_p: [-0.703, 0.100],
        point_q: [-0.350, 0.100],
    };

    const right = {
        color_point_1: [0.6, 0.4, 0.2], // head color
        color_point_3: [0.5, 0.3, 0.1], // body color
        // body
        point_c: [0.400, 0.600],
        point_d: [0.450, 0.750],
        point_e: [0.650, 0.600],
        point_f: [0.600, 0.750],
        point_g: [0.450, 0.000],
        point_h: [0.600, 0.000],
    };

    const vertices = [
        //Left Object
        //top part
        //triangle CDE
        ...left.point_c, ...left.color_point_1,
        ...left.point_d, ...left.color_point_1,
        ...left.point_e, ...left.color_point_1,

        //triangle FDE
        ...left.point_f, ...left.color_point_1,
        ...left.point_d, ...left.color_point_1,
        ...left.point_e, ...left.color_point_1,

        //body part
        //triangle CGE
        ...left.point_c, ...left.color_point_3,
        ...left.point_e, ...left.color_point_3,
        ...left.point_g, ...left.color_point_3,

        //triangle GHE
        ...left.point_e, ...left.color_point_3,
        ...left.point_g, ...left.color_point_3,
        ...left.point_h, ...left.color_point_3,

        //text
        //triangle IJK
        ...left.point_i, ...left.color_point_2,
        ...left.point_j, ...left.color_point_2,
        ...left.point_k, ...left.color_point_2,

        //triangle IKL
        ...left.point_i, ...left.color_point_2,
        ...left.point_k, ...left.color_point_2,
        ...left.point_l, ...left.color_point_2,

        //triangle NOP
        ...left.point_n, ...left.color_point_2,
        ...left.point_o, ...left.color_point_2,
        ...left.point_p, ...left.color_point_2,

        //triangle NOQ
        ...left.point_p, ...left.color_point_2,
        ...left.point_o, ...left.color_point_2,
        ...left.point_q, ...left.color_point_2,

        // //Right Object
        //top part
        //triangle CDE
        ...right.point_c, ...right.color_point_1,
        ...right.point_d, ...right.color_point_1,
        ...right.point_e, ...right.color_point_1,

        //triangle FDE
        ...right.point_f, ...right.color_point_1,
        ...right.point_d, ...right.color_point_1,
        ...right.point_e, ...right.color_point_1,

        //body part
        //triangle CGE
        ...right.point_c, ...right.color_point_3,
        ...right.point_e, ...right.color_point_3,
        ...right.point_g, ...right.color_point_3,

        //triangle GHE
        ...right.point_e, ...right.color_point_3,
        ...right.point_g, ...right.color_point_3,
        ...right.point_h, ...right.color_point_3,
    ];

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShaderCode = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            gl_Position = vec4(aPosition.x, aPosition.y, 1.0, 1.0);
            vColor = aColor;
        }
    `;

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);


    var vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            gl_Position = vec4(aPosition.x, aPosition.y, 1.0, 1.0);
            vColor = aColor;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);


    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);


    var shaderProgram = gl.createProgram();


    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);


    gl.linkProgram(shaderProgram);


    gl.useProgram(shaderProgram);


    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(
        aPosition,
        2,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    gl.enableVertexAttribArray(aPosition);
    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
        aColor,
        3,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aColor);

    // Speed set to my NRP
    var speed = 0.0101;
    var change = 0;
    var uChange = gl.getUniformLocation(shaderProgram, "uChange");

    console.log(vertices.length);
        
    function moveVertices() {
        if (vertices[176] < -1.0 || vertices[126] > 1.0) {
            speed = speed * -1;
        }

        for (let i = 121; i < vertices.length; i += 5) {
            vertices[i] = vertices[i] + speed;
        }
    }

    function render() {
        moveVertices();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        change = change + speed;
        gl.uniform1f(uChange, change);

        gl.clearColor(0.75, 0.85, 0.8, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        var primitive = gl.TRIANGLES;
        var offset = 0;
        var nVertex = 36;
        gl.drawArrays(primitive, offset, nVertex);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render)
}
