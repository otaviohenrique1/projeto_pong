let ball;
let player;
let computer;
let topBar;
let bottomBar;
let barThickness = 5;

function setup() {
  createCanvas(600, 400);
  ball = new Ball();
  player = new Paddle(true);
  computer = new Paddle(false);
  topBar = new Bar(width / 2, barThickness / 2);
  bottomBar = new Bar(width / 2, height - barThickness / 2);
}

function draw() {
  background(0);

  ball.update();
  ball.show();

  player.show();
  computer.show();
  topBar.show();
  bottomBar.show();
  
  player.update();
  computer.update();
  
  ball.checkCollision(player);
  ball.checkCollision(computer);
  
  ball.checkBarCollision(topBar);
  ball.checkBarCollision(bottomBar);
  
  ball.checkEdges();
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.radius = 10;
    this.xSpeed = random(3, 5) * (random() > 0.5 ? 1 : -1);
    this.ySpeed = random(2, 4) * (random() > 0.5 ? 1 : -1);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.radius * 2);
  }

  checkEdges() {
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }

    if (this.x - this.radius > width) {
      this.reset();
    }
    
    if (this.x + this.radius < 0) {
      this.reset();
    }
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = random(3, 5) * (random() > 0.5 ? 1 : -1);
    this.ySpeed = random(2, 4) * (random() > 0.5 ? 1 : -1);
  }

  checkCollision(paddle) {
    if (
      this.y - this.radius < paddle.y + paddle.height / 2 &&
      this.y + this.radius > paddle.y - paddle.height / 2 &&
      this.x - this.radius < paddle.x + paddle.width / 2
    ) {
      this.xSpeed *= -1;
    }
  }

  checkBarCollision(bar) {
    if (
      this.y - this.radius < bar.y + barThickness / 2 &&
      this.y + this.radius > bar.y - barThickness / 2
    ) {
      this.ySpeed *= -1;
    }
  }
}

class Paddle {
  constructor(isPlayer) {
    this.width = 10;
    this.height = 80;
    this.y = height / 2;
    this.isPlayer = isPlayer;
    
    if (this.isPlayer) {
      this.x = this.width;
    } else {
      this.x = width - this.width;
    }
  }

  update() {
    if (this.isPlayer) {
      this.y = mouseY;
    } else {
      this.y = ball.y;
    }
    this.y = constrain(this.y, this.height / 2, height - this.height / 2);
  }

  show() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
  }
}

class Bar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, width, barThickness);
  }
}
