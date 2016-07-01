define([], function () {
  return {

    generate: function (conf, callback) {
      var worker = new Worker('js/splotch/util/graph_gen_worker.js');
      worker.onmessage = function (event) {
        callback(event.data);
      }


      worker.onerror = function (error) {
        console.error("A graph_gen_worker error occured: " + error);
      }

      worker.postMessage(conf);
    }
  }
});
