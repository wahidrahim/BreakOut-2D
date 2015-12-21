var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;

var ball_radius = 10;

var paddle_height = 15;
var paddle_width = 100;
var paddle_x = (canvas.width - paddle_width) / 2;

var right_pressed = false;
var left_pressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    right_pressed = true;
  }
  else if (e.keyCode == 37) {
    left_pressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    right_pressed = false;
  }
  else if (e.keyCode == 37) {
    left_pressed = false;
  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle_x, canvas.height - paddle_height - 2, paddle_width, paddle_height);
  ctx.fillStyle = '#9933ff';
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ball_radius, 0, Math.PI*2);
  ctx.fillStyle = '#ff00ff';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();

  if (x + dx < ball_radius || x + dx > canvas.width - ball_radius) {
    dx = -dx;
  }
  if (y + dy < ball_radius || y + dy > canvas.height - ball_radius) {
    dy = -dy;
  }

  if (right_pressed && paddle_x < canvas.width - paddle_width) {
    paddle_x += 5;
  }
  else if (left_pressed && paddle_x > 0) {
    paddle_x -= 5;
  }

  x += dx;
  y += dy;
}


setInterval(draw, 5);
