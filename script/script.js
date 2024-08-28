document.addEventListener("DOMContentLoaded", function () {
    const screen = document.querySelector(".screen");
    const player1 = document.querySelector(".player1");
    const player2 = document.querySelector(".player2");
    const ball = document.querySelector(".ball");
    const hud = document.querySelector(".hud");

    let player1Y = screen.clientHeight / 2 - player1.clientHeight / 2;
    let player2Y = screen.clientHeight / 2 - player2.clientHeight / 2;
    let ballX = screen.clientWidth / 2 - ball.clientWidth / 2;
    let ballY = screen.clientHeight / 2 - ball.clientHeight / 2;
    let ballSpeedX = 5;
    let ballSpeedY = 5;
    let player1Score = 0;
    let player2Score = 0;

    // Controle dos jogadores
    document.addEventListener("keydown", function (e) {
        if (e.key === "w") player1Y -= 10;
        if (e.key === "s") player1Y += 10;
        if (e.key === "ArrowUp") player2Y -= 10;
        if (e.key === "ArrowDown") player2Y += 10;

        player1.style.top = `${player1Y}px`;
        player2.style.top = `${player2Y}px`;
    });

    // Função para mover a bola
    function moveBall() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Verifica colisão com o topo e a base da tela
        if (ballY <= 0 || ballY + ball.clientHeight >= screen.clientHeight) {
            ballSpeedY *= -1;
        }

        // Verifica colisão com os paddles
        if (
            (ballX <= player1.offsetLeft + player1.clientWidth && ballY + ball.clientHeight >= player1.offsetTop && ballY <= player1.offsetTop + player1.clientHeight) ||
            (ballX + ball.clientWidth >= player2.offsetLeft && ballY + ball.clientHeight >= player2.offsetTop && ballY <= player2.offsetTop + player2.clientHeight)
        ) {
            ballSpeedX *= -1;
        }

        // Verifica se a bola passou dos jogadores (pontuação)
        if (ballX <= 0) {
            player2Score++;
            resetBall();
        } else if (ballX + ball.clientWidth >= screen.clientWidth) {
            player1Score++;
            resetBall();
        }

        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;
        hud.textContent = `${player1Score} | ${player2Score}`;
    }

    // Função para resetar a posição da bola
    function resetBall() {
        ballX = screen.clientWidth / 2 - ball.clientWidth / 2;
        ballY = screen.clientHeight / 2 - ball.clientHeight / 2;
        ballSpeedX *= -1; // Altera a direção da bola
    }

    // Atualiza o jogo a cada frame
    setInterval(moveBall, 7); // Aproximadamente 60 FPS
});
