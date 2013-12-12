define(
    [
	'splotch/model/ShaderGuts',
        'splotch/ui/Viewport',
	'splotch/ui/Baller',
	'splotch/data/colors',
	'splotch/util/graph_gen',
        'signals/Signals'
    ],

    function (ShaderGuts, Viewport, Baller, colors, graph_gen, Signal) {
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

		this._init_graph();
		
                this.viewport.init();
            },
	    
	    init_datgui:function(){
		var guts = new ShaderGuts();
		
		guts.vertex = "simple_vertex";
		guts.fragment = "simple_fragment";

		
		var gui = new dat.GUI();
		gui.add(guts, "vertex");
		gui.add(guts, "fragment");
		gui.add(guts, "somebool");
	
	    },
	    
	    _init_graph:function(){
		var conf = {
		    count:1000,
		    existing_node_count:1000,
		    color_palette:colors.paired,
		    max_edges_per_node:10,
		    area:100
		}
		
		graph_gen.generate(conf, function(nodes){
		    console.log(JSON.stringify(nodes));
		});
	    }
        };
    }
);
