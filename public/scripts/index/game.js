// 상수, 변수 선언
const Y = 15, X = 20;
const startY = 9, startX = 14;
const SPEED = 80;
let score = 0;
let feed;
let snake;
let direction = [1, 0];

//실행
initialize();
moveSnake();
function initialize() {
    let table = document.getElementsByTagName("table");
    if (table[0] != null )  table[0].parentNode.removeChild(table[0]);
    drawMap();
    snake = new Array();
    snake.push(new Array(startY, startX));
    createFeed();    
}

// 맵 생성
//(untrusted data를 받는 부분이 없기 때문에, innerHTML로 하였음.)
function drawMap() {
    const game = document.getElementById("game");
    let htmlTag = `<table border=0>`;
    for (let y = 0; y < Y; y++) {
        htmlTag += `<tr>`;
        for (let x = 0; x < X; x++) {
            htmlTag += `<td id="${y} ${x}"></td>`;
        }
    }
    htmlTag += "</table>"
    game.innerHTML += htmlTag;

    let border;
    for (let i = 0; i < Y; i++) {
        border = document.getElementById(`${i} 0`);
        border.style.background = "black";
        border = document.getElementById(`${i} ${X - 1}`);
        border.style.background = "black";
    }
    for (let i = 0; i < X; i++) {
        border = document.getElementById(`0 ${i}`);
        border.style.background = "black";
        border = document.getElementById(`${Y - 1} ${i}`);
        border.style.background = "black";
    }
}
//뱀 움직임 구현:
//뱀을 계속 이동방향으로 움직임 + 뱀이 있는 부분은 파란색으로 칠하기 
//맵을 넘어가면 다시 돌아올 수 있도록 + 죽는 것 까지
//먹이를 먹으면 점수가 1오르고, 뱀이 길어진다.
function moveSnake() {
    let table;
    setInterval(() => {
        let nextX = (snake[0][1] + direction[1] + X - 1) % (X - 1);
        let nextY = (snake[0][0] + direction[0] + Y - 1) % (Y - 1);
        if (nextX == 0) {
            nextX += (direction[1] + X - 1);
            nextX %= (X - 1);
        }
        if (nextY == 0) {
            nextY += (direction[0] + Y - 1);
            nextY %= (Y - 1);
        }
        snake.unshift(new Array(nextY, nextX));
        table = document.getElementById(`${snake[0][0]} ${snake[0][1]}`);

        if (table.style.background == "blue") {//게임이 끝날 때,
            uploadScore();
            alert("게임 오버");
            initialize();
            return;
        } else if (snake[0][0] == feed[0] && snake[0][1] == feed[1]) {//뱀이 길어질 때,
            createFeed();
            score++;
            table.style.background = "blue";
            return;
        }

        table.style.background = "blue";
        table = document.getElementById(`${snake[snake.length - 1][0]} ${snake[snake.length - 1][1]}`);
        if(table.style.background !== "red") table.style.background = "none";
        snake.pop();
    }, SPEED)
}
//방향 바꾸는 이벤트 이벤트 구현하기
document.onkeydown = (e) => {
    if (e.key == "ArrowUp" && (direction[0] != 1 && direction[1] != 0)) direction = [-1, 0];
    else if (e.key == "ArrowDown" && (direction[0] != -1 && direction[1] != 0)) direction = [1, 0];
    else if (e.key == "ArrowLeft" && (direction[0] != 0 && direction[1] != 1)) direction = [0, -1];
    else if (e.key == "ArrowRight" && (direction[0] != 0 && direction[1] != -1)) direction = [0, 1];
}
const up = document.getElementById("up");
const down = document.getElementById("down");
const left = document.getElementById("left");
const right = document.getElementById("right");
up.onclick = () => {
    if (direction[0] != 1 && direction[1] != 0) direction = [-1, 0];
}
down.onclick = () => {
    if (direction[0] != -1 && direction[1] != 0) direction = [1, 0];
}
left.onclick = () => {
    if (direction[0] != 0 && direction[1] != 1) direction = [0, -1];
}
right.onclick = () => {
    if (direction[0] != 0 && direction[1] != -1) direction = [0, 1];
}

//뱀 먹이 구현:
//맵에서 랜덤으로 생성됨 + 색은 빨간색
function createFeed() {
    let feedY = Math.floor(Math.random() * (Y - 2)) + 1;
    let feedX = Math.floor(Math.random() * (X - 2)) + 1;
    feed = [feedY, feedX];
    let table = document.getElementById(`${feed[0]} ${feed[1]}`);
    table.style.background = "red";
}

//점수 POST 구현:
function uploadScore() {
    let form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", '/');

    let hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "score");
    hiddenField.setAttribute("value", score);
    form.appendChild(hiddenField);
 
    document.body.appendChild(form);
    form.submit();
}