require.config({
    paths: {
        'requirejs': 'lib/requirejs',
        'signals': 'lib/signals',
        'glmatrix': 'lib/glmatrix',
	'text': 'lib/requirejs/text'
    }
});

require(
    [
        'splotch/app',
        'requirejs/ready'
    ],

    function (app, ready) {
        ready(function () {
            app.$started.addOnce(function(msg) {
		console.info(msg);
            });

            app.$faulted.addOnce(function(msg) {
		console.error(msg);
            });

            app.run();
        });
    });
