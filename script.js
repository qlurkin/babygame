var App = (function () {
  that = {};

  var objects = [];
  var hero = null;
  var speed = 0.1;
  var context = null;
  var bottom = 0;
  var top = 0;
  var left = 0;
  var right = 0;
  const DESCRIPTION = 0;
  const RUNNING = 1;
  const ANNOUNCEMENT = 2;
  const OVER = 3;
  const SCORE = 6;
  var state = DESCRIPTION;
  var score = 0;
  var announced = false;

  var switchState = function (s) {
    var body = document.getElementsByTagName('body')[0];
    if(s == DESCRIPTION) {
      body.className = 'description';
    }

    if(s == RUNNING) {
      body.className = 'running';
      hideBulle();
    }

    if(s == ANNOUNCEMENT) {
      body.className = 'announcement';
      announced = true;
      showBulle("Chouette ! Je vais avoir un petit frère en mai !");
    }

    if(s == SCORE) {
      body.className = 'score';
    }

    if(s == OVER) {
      body.className = 'over';
      showBulle("Game Over");
    }

    state = s;
  };

  var colliding = function (rect1, rect2) {
    if(rect1.x < rect2.x + rect2.width-2 &&
      rect1.x + rect1.width-2 > rect2.x &&
      rect1.y < rect2.y + rect2.height-2 &&
      rect1.height-2 + rect1.y > rect2.y) {
          return true;
    }
    return false;
  };

  var isOver = function () {
    var i = 3;
    while(i < objects.length) {
      if(colliding(objects[i], objects[2])) return true;
      i++;
    }
    return false;
  }

  var isCanvasSupported =  function () {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  };

  var showBulle = function (msg) {
    var overlay = document.getElementById('overlay');
    var content = document.getElementById('bulle-content');
    content.innerHTML = msg
    overlay.style.opacity = "1";
  };

  var hideBulle = function () {
    var overlay = document.getElementById('overlay');
    overlay.style.opacity = "0";
  };

  var spawnVilain = function () {
    if(state == RUNNING) {
      if(Math.random() < 0.5) {
        objects.push(FlyingVilain(right));
      }
      else {
        objects.push(RunningVilain(right));
      }
    }
    var time = 1000 + Math.random()*1000;
    setTimeout(spawnVilain, time);
  };

  var draw = function () {
    for(var i=0; i<objects.length; i++) {
      objects[i].draw(context);
    }
  };

  var update = function (delta) {
    //var delta = thisCall - prevCall;
    if(objects.length > 3 && objects[3].x+objects[3].width < left) objects.splice(3,1);
    for(var i=0; i<objects.length; i++) {
      if(state == RUNNING) objects[i].update(delta, speed);
    }
    if(state == RUNNING) score += delta*speed/20;
    document.getElementById("score").innerHTML = Math.floor(score) + "m";
  };

  var loop = function () {
    if(state == RUNNING && isOver()) switchState(OVER);
    if(state == RUNNING && score > 1000 && !announced) switchState(ANNOUNCEMENT);
    if(state == RUNNING) speed *= 1.0001;
  };




  var run = function () {
    var start = null;
    function frame(timestamp) {
      if (start === null) start = timestamp;
      delta = timestamp - start;
      console.log("delta= " + delta);
      update(delta);
      draw();
      loop();
      start = timestamp;
      requestAnimationFrame(frame);
    }
    frame(0);
  };

  that.initCanvas = function () {
    var div = document.getElementById("canvas");
    if(div.offsetHeight < div.offsetWidth) {
      var height = 160;
      var width = 160 * div.offsetWidth / div.offsetHeight;
      var safeOffsetY = 0;
      var safeOffsetX = (width - 160) / 2;
    }
    else {
      var width = 160;
      var height = 160 * div.offsetHeight / div.offsetWidth;
      var safeOffsetX = 0;
      var safeOffsetY = (height - 160) / 2;
    }

    top = -safeOffsetY;
    bottom = 160 + safeOffsetY;
    left = -safeOffsetX;
    right = 160 + safeOffsetX;

    div.innerHTML = "<canvas id='viewport' width='" + width + "' height='" + height + "'></canvas>";
    var canvas = document.getElementById('viewport');
    context = canvas.getContext("2d");
    //context.scale(safeLength/160, safeLength/160);
    context.translate(safeOffsetX, safeOffsetY);
  };

  that.init = function () {
    if(performance === undefined || !isCanvasSupported()) {
      alert("Navigateur non supporté");
      return;
    }

    that.initCanvas();
    hero = Hero();
    objects.push(Background());
    objects.push(Ground());
    objects.push(hero);
    run();
    spawnVilain();
    showBulle("Je suis Charly. Si je cours 1000m, j'aurai une belle surprise !");
  };

  that.jumpStart = function () {
    if(state == RUNNING) hero.jump();
    if(state == DESCRIPTION) switchState(RUNNING);
    if(state == ANNOUNCEMENT) switchState(RUNNING);
  };

  that.jumpEnd = function () {

  };

  that.getLeft = function () {
    return left;
  };

  that.getRight = function () {
    return right;
  };

  that.getTop = function () {
    return top;
  };

  that.getBottom = function () {
    return bottom;
  };

  that.getWidth = function () {
    return right - left;
  };

  that.getHeight = function () {
    return bottom - top;
  };
  
  return that;
})();
