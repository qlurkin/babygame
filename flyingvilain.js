var FlyingVilain = function (x) {
	var that = Vilain(x,110);
	that.width = 17;
	that.height = 12;
  var frame = 0;
  var AnimationSize = 4;
  var frameDuration = 3;
	that.draw = function (context) {
    //context.fillStyle = "red";
    //context.fillRect(that.x, that.y, that.width, that.height);
    var bird = Tiles.bird();
    context.drawImage(bird, Math.floor(frame/frameDuration)*(that.width+2), 0, that.width, that.height, that.x, that.y, that.width, that.height);

	};
	that.update = function (delta, speed) {
		this.x -= delta * speed;
    frame = (frame + 1) % (AnimationSize*frameDuration);
	};

	return that;
};
