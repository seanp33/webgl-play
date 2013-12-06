define(
    [
	'splotch/model/ShaderGuts',
        'splotch/ui/Viewport2',
        'signals/Signals',
	'text!shaders/SimpleVertex.glsl',
	'text!shaders/SimpleFragment.glsl'
    ],

    function (ShaderGuts, Viewport2, Signal, simple_vertex, simple_fragment) {
        return {
            $started: new Signal(),
            $faulted: new Signal(),

            run: function () {
		var guts = new ShaderGuts();
		guts.vertex = [ 
		    "void main(){",
                    "gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);",
		    "}"
		].join("\n");

		guts.fragment = [
		    "void main(){",
		    "gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);",
		    "}"].join("\n");
		
		guts.vertex = simple_vertex;
		guts.fragment = simple_fragment;

		var shaderMaterial = new THREE.ShaderMaterial({
		    vertexShader:   simple_vertex,
		    fragmentShader: simple_fragment
		});

		var gui = new dat.GUI();
		gui.add(guts, "vertex");
		gui.add(guts, "fragment");
		gui.add(guts, "somebool");

                var self = this;
                this.viewport = new Viewport2();
                this.viewport.$ready.add(function (msg) {
                    console.log(msg);
                    self.$started.dispatch("started");
                });

                this.viewport.$error.add(function (msg) {
                    console.log(msg);
                    self.$faulted.dispatch(msg);
                });

                this.viewport.init();
            }


        };
    }
);
