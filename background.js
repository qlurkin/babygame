var Background = function () {
  var that = {};

  var offset = 0;

  that.update = function (delta, speed) {
    offset -= delta * (speed/4);
    while(offset < -160) offset += 160;
  };

  that.draw = function (context) {
    var tile =Tiles.background();
    var pattern=context.createPattern(tile,"repeat");
    context.fillStyle = pattern;
    context.translate(offset, 0);
    context.fillRect(App.getLeft(), 0, App.getWidth()+160, 144);
    context.translate(-offset, 0);
  };

  return that;
};
