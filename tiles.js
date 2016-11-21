var Tiles = (function () {
  that = {};
  var ground = new Image();
  ground.src = "ground.png";
  that.ground = function () {
    return ground;
  };

  var background = new Image();
  background.src = "background.png";
  that.background = function () {
    return background;
  };

  var charly = new Image();
  charly.src = "charly.png"
  that.charly = function () {
    return charly;
  };

  var bird = new Image();
  bird.src = "bird.png"
  that.bird = function () {
    return bird;
  };

  var cactus = new Image();
  cactus.src = "cactus.png"
  that.cactus = function () {
    return cactus;
  };

  return that;
})();
