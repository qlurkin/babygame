var RunningVilain = function (x) {
	var that = Vilain(x,123);
	that.width = 16;
	that.height = 21;

	that.draw = function (context) {
    //context.fillStyle = "red";
    //context.fillRect(that.x, that.y, that.width, that.height);
    var cactus = Tiles.cactus();
    context.drawImage(cactus, 0, 0, that.width, that.height, that.x, that.y, that.width, that.height);
	};
	that.update = function (delta, speed) {
		this.x -= delta * speed;
	};

	return that;
};
