define(
    [
        'splotch/ui/Viewport2',
        'signals/Signals'
    ],

    function (Viewport2, Signal) {
        return {
            $started: new Signal(),
            $faulted: new Signal(),

            run: function () {
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
