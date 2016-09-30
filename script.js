(function () {
  var App = {};

  App.width = 0;
  App.height = 0;

  App.initCanvas = function () {
    var body = document.getElementsByTagName("body")[0];
    body.innerHTML = "<canvas width='" + window.innerWidth + "' height='" + window.innerHeight + "'></canvas>";
    width = window.innerWidth;
    height = window.innerHeight;
  };

  App.init = function () {
    this.initCanvas();
  };

  App.jumpStart = function () {
    console.log("Jump Start");
  }

  App.jumpEnd = function () {
    console.log("Jump End");
  }

  window.addEventListener("resize", function (event) {
    App.initCanvas();
  }, false);

  App.isKeyDown = false; //for auto-repeat handling
  document.addEventListener('keydown', function (event) {
    console.log("key");
    if(event.key === ' ' || event.key === 'ArrowUp') {
      if(!App.isKeyDown) //for auto-repeat handling
        App.jumpStart();
      App.isKeyDown = true; //for auto-repeat handling
    }
    event.preventDefault();
  }, false);

  document.addEventListener('keyup', function (event) {
    console.log("key");
    if(event.key === ' ' || event.key === 'ArrowUp') {
      App.jumpEnd();
      App.isKeyDown = false; //for auto-repeat handling
    }
    event.preventDefault();
  }, false);

  document.addEventListener('mousedown', function (event) {
    console.log("click");
    App.jumpStart();
    event.preventDefault();
  }, false);

  document.addEventListener('mouseup', function (event) {
    console.log("click");
    App.jumpEnd();
    event.preventDefault();
  }, false);

  document.addEventListener('touchstart', function (event) {
    console.log("touch");
    App.jumpStart();
    event.preventDefault();
  }, false);

  document.addEventListener('touchend', function (event) {
    console.log("touch");
    App.jumpEnd();
    event.preventDefault();
  }, false);

  App.init();
})();
