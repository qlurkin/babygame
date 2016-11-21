var Hero = function () {
  var jumpHeight = 80;
  var jumpDuration = 1000; //milisecond
  var A;
  var B;
  var C = 125;
  var t = jumpDuration;
  var frame = 0;
  var AnimationSize = 4;
  var frameDuration = 3;

  var that = Drawable(16, C);

  that.width = 12;
  that.height = 19;

  that.draw = function (context) {
    //context.fillStyle = "green";
    //context.fillRect(that.x, that.y, that.width, that.height);
    var charly = Tiles.charly();
    context.drawImage(charly, Math.floor(frame/frameDuration)*(that.width+2), 0, that.width, that.height, that.x, that.y, that.width, that.height);
  };

  var computeParabola = function () {
    A = (4*jumpHeight)/(jumpDuration*jumpDuration);
    B = -A * jumpDuration;
  };
  computeParabola();

  var height = function () {
    if(t>jumpDuration) return C;
    return A*t*t+B*t+C;
  }

  that.update = function (delta, speed) {
    if(t<=jumpDuration) t += delta;
    this.y = height();
    frame = (frame + 1) % (AnimationSize*frameDuration);
  }

  that.jump = function () {
    if(t>jumpDuration) t=0;
  };

  return that;
}
