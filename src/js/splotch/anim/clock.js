define(
  ['lodash'],

  function (_) {

    var updates = {};

    var internal_clock = new THREE.Clock();

    var running_request = null;

    function cancel() {
      cancelAnimationFrame(running_request);
      internal_clock.stop();
      updates = {};

    }

    function tick() {
      running_request = requestAnimationFrame(tick);
      _.each(updates, function (func) {
        try {
          func();
        } catch (err) {
          console.error(err);
        }
      });
    }

    return {

      start: function () {
        if (!internal_clock.running) {
          internal_clock.start();
          tick();
        }
      },

      stop: function () {
        if (internal_clock.running) {
          cancel();
        }
      },

      delta: function () {
        return internal_clock.getDelta();
      },

      add: function (func) {
        var fid = _.uniqueId("f");
        updates[fid] = func;
        return fid;
      },

      remove: function (fid) {
        delete updates[fid];
      }
    };
  })
