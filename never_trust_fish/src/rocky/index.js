var rocky = require('rocky');

/**
 * @min  {int}
 * @max  {int}
 * @return {int}
 */
var randNumber = function(min, max) {
  return parseInt(Math.random() * (max - min) + min);
};

/**
 * @x  {int} X Axis
 * @y  {int} Y Axis
 * @color  {string} Fish color
 * @ctx  {object} CanvasRenderingContext2D object
 * @e1  {int}
 * @e2  {int}
 */
var drawFish = function(x, y, color, ctx,e1,e2) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.moveTo(x, y);

  ctx.lineTo(x + 2, y);
  ctx.lineTo(x + 7, y + 8);
  ctx.lineTo(x + 11, y);
  ctx.lineTo(x + 14, y);
  ctx.lineTo(x + 16, y + 15);
  ctx.lineTo(x + 7, y + 19);
  ctx.lineTo(x - 3, y + 13);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.closePath();

  ctx.fillStyle = color;
  ctx.rockyFillRadial(x +1, y + 8, 0, e1, 0, 2 * Math.PI);
  ctx.rockyFillRadial(x +11, y + 8, 0, e2, 0, 2 * Math.PI);
};

rocky.on('draw', function(event) {
  // Get the CanvasRenderingContext2D object
  var ctx = event.context;

  // Determine the width and height of the display
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;

  // Current date/time
  var date = new Date();
  date = date.toLocaleTimeString();

  var hours = date.split(":")[0];
  var min = date.split(":")[1];
  
  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // Fill the screen
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, w, h);

  
  // Create random cat
  // Left top
  var r1 = randNumber(0, w/2);
  var r2 = randNumber(0, 50);
  drawFish(r1, r2, "#555555", ctx,randNumber(1, 4),randNumber(1, 4));

  // Right top
  var r3 = randNumber(w/2, w);
  var r4 = randNumber(0, 50);
  drawFish(r3, r4, "#555555", ctx,randNumber(1, 4),randNumber(1, 4));

  // Left bottom
  var r5 = randNumber(0, w/2);
  var r6 = randNumber(h / 2 + 25, h);
  drawFish(r5, r6, "#555555", ctx,randNumber(1, 4),randNumber(1, 4));

  // Right bottom
  var r7 = randNumber(w/2, w);
  var r8 = randNumber(h / 2 + 25, h);
  drawFish(r7, r8, "#555555", ctx,randNumber(1, 4),randNumber(1, 4));

  // Random \o/
  var r9 = randNumber(0, w);
  var r10 = randNumber(0, h);
  drawFish(r9, r10, "#555555", ctx,randNumber(1, 4),randNumber(1, 4));
  
  // Center align the text
  ctx.textAlign = 'center';
  
  // Clock font settings
  ctx.font = '42px bold numbers Leco-numbers';
  // Set the clock text color
  ctx.fillStyle = '#555555';
  // Display the time, in the middle of the screen
  ctx.fillText(hours + ":" + min, (w / 2), (h / 2) - 30, w);
  
  // Random text
  var randomString = ["Never Trust Fish", "<*))))><", "fishy, fishy..","Loading.."];
  // TODO : IDK how to work this random shit ^^,
  var rs1 = randNumber(0, randomString.length + 2);
  // Random text color
  var colorList = ["#ff5453","#ffff01","#02fe02","#00ffff"];
  // Font settings
  ctx.font = '14px bold Gothic';
  // Set the text color
  ctx.fillStyle = colorList[randNumber(0,colorList.length)];
  // Display the time, in the middle of the screen
  ctx.fillText(randomString[rs1], (w / 2), (h / 2) + 15, w);
});

rocky.on('minutechange', function(event) {
  rocky.requestDraw();
});