define(
    [
	'splotch/model/ShaderGuts',
        'splotch/ui/Viewport',
	'splotch/ui/Baller',
        'signals/Signals'
    ],

    function (ShaderGuts, Viewport, Baller, Signal) {
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
		var guts = new ShaderGuts();
		
		guts.vertex = "simple_vertex";
		guts.fragment = "simple_fragment";

		
		var gui = new dat.GUI();
		gui.add(guts, "vertex");
		gui.add(guts, "fragment");
		gui.add(guts, "somebool");
	
	    }
        };
    }
);
