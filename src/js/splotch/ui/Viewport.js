/**
 * Create a canvas element.
 * Obtain a drawing context for the canvas.
 * Initialize the viewport: initViewport
 * Create one or more buffers containing the data to be rendered (typically vertices).
 * Create one or more matrices to define the transformation from vertex buffers to screen space.
 * Create one or more shaders to implement the drawing algorithm.
 * Initialize the shaders with parameters.
 * Draw.
 */
define(
    [
        'signals/Signals'
    ],

    function (Signal) {

        function initViewport(gl, canvas) {
            gl.viewport(0, 0, canvas.width, canvas.height);
        }

        function initMatrices(modelView, projection) {
            // The transform matrix for the square - translate back in Z
            // for the camera
            modelView = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -3.333, 1]);

            // The projection matrix (for a 45 degree field of view)
            projection = new Float32Array([2.41421, 0, 0, 0, 0, 2.41421, 0, 0, 0, 0, -1.002002, -1, 0, 0, -0.2002002, 0]);
        }

        function initShaders(vertexShaderSource, fragmentShaderSource) {
            vertexShaderSource =

                "    attribute vec3 vertexPos;\n" +
                    "    uniform mat4 modelViewMatrix;\n" +
                    "    uniform mat4 projectionMatrix;\n" +
                    "    void main(void) {\n" +
                    "        // Return the transformed and projected vertex value\n" +
                    "        gl_Position = projectionMatrix * modelViewMatrix * \n" +
                    "                vec4(vertexPos, 1.0);\n" +
                    "    }\n";

            fragmentShaderSource =
                "    void main(void) {\n" +
                    "    // Return the pixel color: always output white\n" +
                    "    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n" +
                    "}\n";
        }

        function draw(gl, obj) {
            // clear the background (with black)
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            // set the vertex buffer to be drawn
            gl.bindBuffer(gl.ARRAY_BUFFER, obj.buffer);

            // set the shader to use
            gl.useProgram(shaderProgram);

            // connect up the shader parameters: vertex position and
            projection / model
            matrices
            gl.vertexAttribPointer(shaderVertexPositionAttribute,
                obj.vertSize, gl.FLOAT, false, 0, 0);
            gl.uniformMatrix4fv(shaderProjectionMatrixUniform, false,
                projectionMatrix);
            gl.uniformMatrix4fv(shaderModelViewMatrixUniform, false,
                modelViewMatrix);

            // draw the object
            gl.drawArrays(obj.primtype, 0, obj.nVerts);
        }

        function Viewport(canvas) {
            this.canvas = canvas;
            this.$ready = new Signal();
            this.$error = new Signal();
            this.gl = null;
            this.modelViewMatrix = [];
            this.projectionMatrix = [];
            this.vertexShaderSource = "";
            this.fragmentShaderSource = "";
        }

        Viewport.prototype.init = function () {
            try {

                this.gl = this.canvas.getContext("experimental-webgl");

                this.$ready.dispatch("experimental-webgl ready");

                initViewport(this.gl, this.canvas);

                initMatrices(this.modelViewMatrix, this.projectionMatrix);

                initShaders(this.vertexShaderSource, this.fragmentShaderSource);
            }
            catch (e) {
                this.$error.dispatch("Your browser is ass and you need to upgrade. Error creating WebGL context: " + e.toString());
            }
        };

        Viewport.prototype.paint = function () {

        }

        return Viewport;
    }
)
;
