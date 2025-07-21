document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const correct = parseInt(params.get('correctAnswers')) || 0;
    const total = 10;     
    const currentDifficulty = params.get('difficulty');
    const scorePercentage = (correct / total) * 100;

    const messageElement = document.getElementById('end-message');
    const resultText = document.getElementById('result-text');
    const restartBtn = document.getElementById('restart-btn');
    const nextLevelBtn = document.getElementById('next-level-btn');
    const homeBtn = document.getElementById('home-btn');
    const winSound = new Audio('sounds/win.mp3');
    const victorySound = new Audio('sounds/victory.mp3')


    // Determine the next difficulty
    const difficulties = ["easy", "medium", "hard"];
    const currentIndex = difficulties.indexOf(currentDifficulty);

    // Ensure progression to the next level
    let nextDifficulty = null;
    if (currentIndex !== -1 && currentIndex < difficulties.length - 1) {
        nextDifficulty = difficulties[currentIndex + 1];
    }

    // Handle score and messages
    if (scorePercentage >= 80) {
        if (currentDifficulty === "hard") {
            victorySound.play();
            messageElement.innerText = "🎉 You Won the Game! 🎉";
            resultText.innerText = `You got ${correct} out of ${total} correct!`;
            triggerConfetti();
            restartBtn.style.display = "none";      
            nextLevelBtn.style.display = "none"; 
            
            
        } else {
            winSound.play();
            messageElement.innerText = `✅ Level Passed!`;
            resultText.innerText = `You got ${correct} out of ${total} correct! Moving to ${nextDifficulty} level.`;
            nextLevelBtn.style.display = "block";
        }
    } else {
        messageElement.innerText = "😢 You Did Not Pass!";
        resultText.innerText = `You only got ${correct} out of ${total} correct. You need at least 80% to move on.`;
    }

    // Restart Button - Restart the same level
    restartBtn.addEventListener('click', () => {
        const file = params.get('file') || 'python.json';
        window.location.href = `gameplay.html?file=${file}&difficulty=${currentDifficulty}&correctAnswers=0&totalQuestions=10`;
    });

    // Next Level Button - Move to the next difficulty
    nextLevelBtn.addEventListener('click', () => {
        const file = params.get('file') || 'python.json';
        if (nextDifficulty) {
            console.log(`Moving to next level: ${nextDifficulty}`);
            window.location.href = `gameplay.html?file=${file}&difficulty=${nextDifficulty}&correctAnswers=0&totalQuestions=10`;
        } else {
            console.log("No next level found");
        }
    });

    // Home Button - Go back to home page
    homeBtn.addEventListener('click', () => {
        window.location.href = "index.html";
    });

    function triggerConfetti() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            spread: 160,
            origin: { y: 0.6 }
        });
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

});
