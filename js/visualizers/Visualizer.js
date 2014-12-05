var Vizualizers = (function (Vizualizers, undefined) {
  'use strict';

  function Visualizer (obj) {
    this._objRoot = obj;
  }

  Visualizer.prototype.vizualize = function () {
    console.log(this._objRoot);
  };

  Vizualizers.Visualizer = Visualizer;

  return Vizualizers;
})(Vizualizers || {});
