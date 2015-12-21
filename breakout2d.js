var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var score = 0;
var lives = 3;
var paused = false;

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 5;
var dy = -5;

var ball_radius = 10;

var paddle_height = 20;
var paddle_width = 100;
var paddle_x = (canvas.width - paddle_width) / 2;

var right_pressed = false;
var left_pressed = false;

var brick_rows = 3;
var brick_columns = 8;
var brick_width = 75;
var brick_height = 20;
var brick_padding = 10;
var brick_offset_top = 30;
var brick_offset_left = 30;

var bricks = [];

for (c = 0; c < brick_columns; c++) {
  bricks[c] = [];
  for (r = 0; r < brick_rows; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener('mousemove', mouseHandler, false);
document.addEventListener('keypress', keyPressHandler, false);
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function mouseHandler(e) {
  var relative_x = e.clientX - canvas.offsetLeft;

  if (relative_x > 0 && relative_x < canvas.width) {
    paddle_x = relative_x - paddle_width / 2;
  }
}

function keyPressHandler(e) {
  if (e.keyCode == 80 || e.keyCode == 112) {
    if (paused) {
      paused = false;
    }
    else {
      paused = true;
    }
  }
}

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
  ctx.fillStyle = '#8c66ff';
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ball_radius, 0, Math.PI*2);
  ctx.fillStyle = '#ff66ff';
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (c = 0; c < brick_columns; c++) {
    for (r = 0; r < brick_rows; r++) {
      if (bricks[c][r].status) {
        var brick_x = c * (brick_width + brick_padding) + brick_offset_left;
        var brick_y = r * (brick_height + brick_padding) + brick_offset_top;

        bricks[c][r].x = brick_x;
        bricks[c][r].y = brick_y;

        ctx.beginPath();
        ctx.rect(brick_x, brick_y, brick_width, brick_height);
        ctx.fillStyle = '#d9ff66';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function brickCollision() {
  for (c = 0; c < brick_columns; c++) {
    for (r = 0; r < brick_rows; r++) {
      var brick = bricks[c][r];

      if (brick.status) {
        if (x > brick.x && x < brick.x + brick_width && y > brick.y && y < brick.y + brick_height) {
          dy = -dy;
          brick.status = 0;
          score++;

          if (score == brick_rows * brick_columns) {
            alert('You win!');
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#eee';
  ctx.fillText('Score: ' + score, 8, 20);
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#eee';
  ctx.fillText('Lives: ' + lives, canvas.width - 65, 20);
}

function drawPuase() {
  ctx.font = '30px Arial';
  ctx.fillStyle = '#eee';
  ctx.fillText('PAUSED', canvas.width - 425, canvas.height /2);
}

function draw() {
  if (paused) {
    drawPuase();
  }
  else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBricks();
    drawBall();
    drawScore();
    drawLives();
    drawPaddle();
    brickCollision();

    if (x + dx < ball_radius || x + dx > canvas.width - ball_radius) {
      dx = -dx;
    }
    if (y + dy < ball_radius) {
      dy = -dy;
    }
    else if (y + dy > canvas.height - ball_radius) {
      if (x > paddle_x && x < paddle_x + paddle_width) {
        dy = -dy;
      }
      else {
        lives--;
        if (!lives) {
          alert("Game over.");
          document.location.reload();
        }
        else {
          x = canvas.width / 2;
          y = canvas.height - 30;
          dx = 5;
          dy = -5;
        }
      }
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
  requestAnimationFrame(draw);
}

draw();
