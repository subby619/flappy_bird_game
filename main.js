document.addEventListener("DOMContentLoaded", () => {
  const bird = document.querySelector(".bird");
  const gameDisplay = document.querySelector(".game-container");
  const ground = document.querySelector(".ground");
  const counter = document.querySelector("#counter");

  let birdLeft = 220;
  let birdBottom = 100;
  let gravity = 2;
  let isGameOver = false;
  let gap = 440

  function gameStart() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + "px";
    bird.style.left = birdLeft + "px";
  }
  let gameTimerId = setInterval(gameStart, 20);

  function up() {
    if (birdBottom < 500) birdBottom += 50;
    bird.style.bottom = birdBottom + "px";
  }
  document.addEventListener("click", up);

  function addObstacle() {
    let obstacleleft = 500;
    let randomHeight = Math.random() * 60;
    let obstacleBottom = randomHeight;

    const obstacle = document.createElement("div");
    const topObstacle = document.createElement("div");
    if (!isGameOver) {
      obstacle.classList.add("obstacle");
      topObstacle.classList.add("topObstacle");
    }

    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);
    obstacle.style.left = obstacleleft + "px";
    topObstacle.style.left = obstacleleft + "px";
    obstacle.style.bottom = obstacleBottom + "px";
    topObstacle.style.bottom = obstacleBottom + gap + "px";

    function moveObstacle() {
      obstacleleft -= 2;
      obstacle.style.left = obstacleleft + "px";
      topObstacle.style.left = obstacleleft + "px";

      if (obstacleleft === -60) {
        clearInterval(timerId);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle)
        counter.textContent = Number(counter.textContent) + 1
      }
      if (
        obstacleleft > 200 &&
          obstacleleft < 280 &&
          birdLeft === 220 &&
          (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200)||
        birdBottom === 0
      ) {
        gameOver();
        clearInterval(timerId);
      }
    }
    let timerId = setInterval(moveObstacle, 20);
    if (!isGameOver) setTimeout(addObstacle, 3000);
  }
  addObstacle();

  function gameOver() {
    clearInterval(gameTimerId);
    isGameOver = true;
    document.removeEventListener("click", up);
  }
  // clearInterval(timerId)
});
