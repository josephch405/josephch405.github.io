var c = document.getElementById("bgCanvas");
var ctx = c.getContext("2d");

var counter = 30;
var maxP = 30;

clampNum = function(min, num, max) {
    return Math.min(Math.max(num, min), max);
}

BGC = {
    points: [],
    init: function() {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        for (var i = 0; i < maxP; i++) {
            BGC.add();
        }
    },
    add: function() {
        BGC.points.push({
            x: Math.random() * window.innerWidth * 1.2 - window.innerWidth * .1,
            y: Math.random() * window.innerHeight * 1.2 - window.innerHeight * .1,
            vx: Math.random() * 2 - 1,
            vy: Math.random() * 2 - 1
        });
    },
    remove: function() {
        BGC.points.splice(1, 1);
    },
    draw: function() {
        var numOfPoints = BGC.points.length;

        if (window.innerWidth != ctx.canvas.width || window.innerHeight != ctx.canvas.height) {
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;
        }

        ctx.fillStyle = "rgba(255,255,255, 1)";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        /*if (numOfPoints < maxP) {
            if (counter < 0) {
                BGC.add();
                counter = (maxP - numOfPoints) / maxP * 2;
            } else counter--;
        }*/

        for (var i = 0; i < numOfPoints; i++) {
            var pt = BGC.points[i];
            pt.vx += (Math.random() - .5) / 4;
            pt.vy += (Math.random() - .5) / 4;
            var min = window.innerHeight * (-.3);
            var max = window.innerHeight * (1.3);
            if (Math.abs(pt.x - (window.innerWidth / 2)) > window.innerWidth / 1.8) {
                pt.vx -= .5 * pt.x / Math.abs(pt.x);
            }
            if (Math.abs(pt.y - (window.innerHeight / 2)) > window.innerHeight / 1.8) {
                pt.vy -= .5 * pt.y / Math.abs(pt.y);
            }
            pt.vx = clampNum(-.5, pt.vx, .5);
            pt.vy = clampNum(-.5, pt.vy, .5);
            pt.x += pt.vx;
            pt.y += pt.vy;
            ctx.fillStyle = "#DCDCDC";
            ctx.fillRect(pt.x - 2, pt.y - 2, 4, 4);
        }

        for (var i = 0; i < numOfPoints; i++) {
            var p1 = BGC.points[i];
            var cF = 5;
            for (var ii = i + 1; ii < numOfPoints; ii++) {
                var p2 = BGC.points[ii];
                var d = BGC.dist(p1, p2);
                if (d < window.innerWidth / cF) {

                    xDiff = p1.x - p2.x;
                    yDiff = p1.y - p2.y;

                    p1.vx += Math.pow(window.innerWidth / cF - Math.abs(xDiff), 2) / 2000000 * xDiff / Math.abs(xDiff);
                    p2.vx -= Math.pow(window.innerWidth / cF - Math.abs(xDiff), 2) / 2000000 * xDiff / Math.abs(xDiff);
                    p1.vy += Math.pow(window.innerWidth / cF - Math.abs(yDiff), 2) / 2000000 * yDiff / Math.abs(yDiff);
                    p2.vy -= Math.pow(window.innerWidth / cF - Math.abs(yDiff), 2) / 2000000 * yDiff / Math.abs(yDiff);

                    ctx.lineCap = "round";
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    var alpha = 20 * ((window.innerWidth / cF) - d) / (window.innerWidth / cF);
                    ctx.strokeStyle = "rgba(220,220,220," + alpha + ")";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    },
    dist: function(p1, p2) {
        return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
    }
}

BGC.init();

setInterval(BGC.draw, 50);






$(document).ready(function(){
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 500, "easeInOutCubic", function(){
        window.location.hash = hash;
      });
    }
  });
});