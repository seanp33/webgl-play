define(
    [
	'splotch/model/ShaderGuts',
        'splotch/ui/Viewport',
	'splotch/data/colors',
	'splotch/util/graph_gen',
        'signals/Signals'
    ],

    function (ShaderGuts, Viewport, colors, graph_gen, Signal) {
        
	var existing_node_count = 0;
	
	return {
            $started: new Signal(),
            $faulted: new Signal(),

	    run: function () {
		this.init_datgui();
                var self = this;
                this.viewport = new Viewport();
                this.viewport.$ready.add(function (msg) {
                    console.log(msg);
                    self.$started.dispatch("started");
                });

                this.viewport.$error.add(function (msg) {
                    console.log(msg);
                    self.$faulted.dispatch(msg);
                });
		
                this.viewport.init();

},
	    
	    init_datgui:function(){
		var self = this;
		this.particle_control = {
		    particle_count:100,
		    particle_color:"#ffae23",
		    generate:function(){
			self.gen_particles();
		    }
		}
		
		var guts = new ShaderGuts();
		
		guts.vertex = "simple_vertex";
		guts.fragment = "simple_fragment";

		
		var gui = new dat.GUI();
		gui.add(guts, "vertex");
		gui.add(guts, "fragment");
		gui.add(guts, "somebool");
		gui.add(this.particle_control, "particle_count");
		gui.add(this.particle_control, "particle_color");
		gui.add(this.particle_control, "generate");
	
	    },
	    
	    gen_particles:function(){
		var conf = {
		    count:this.particle_control.particle_count,
		    existing_node_count:existing_node_count,
		    color_palette:[this.particle_control.particle_color],
		    max_edges_per_node:3,
		    area:3000
		}
		
		existing_node_count += this.particle_control.particle_count;

		console.log(JSON.stringify(conf));
		
		var self = this;
		graph_gen.generate(conf, function(nodes){
		    self.viewport.feed_particles(nodes);
		});
	    }
        };
    }
);
