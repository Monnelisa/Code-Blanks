document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const correct = parseInt(params.get('correct')) || 0;
    const total = parseInt(params.get('total')) || 0;
    const currentDifficulty = params.get('difficulty') || "easy";
    const scorePercentage = (correct / total) * 100;

    const messageElement = document.getElementById('end-message');
    const resultText = document.getElementById('result-text');
    const restartBtn = document.getElementById('restart-btn');
    const nextLevelBtn = document.getElementById('next-level-btn');
    const homeBtn = document.getElementById('home-btn');

    // Determine the next difficulty
    const difficulties = ["easy", "medium", "hard"];
    const currentIndex = difficulties.indexOf(currentDifficulty);
    const nextDifficulty = currentIndex < 2 ? difficulties[currentIndex + 1] : null;

    if (scorePercentage >= 80) {
        if (currentDifficulty === "hard") {
            // Player completed Hard mode -> THEY WIN!
            messageElement.innerText = "🎉 You Won the Game! 🎉";
            resultText.innerText = `You got ${correct} out of ${total} correct!`;
            confetti();
        } else {
            // Player passed Easy or Medium -> Move to next level
            messageElement.innerText = `✅ Level Passed!`;
            resultText.innerText = `You got ${correct} out of ${total} correct! Moving to ${nextDifficulty} level.`;
            nextLevelBtn.style.display = "block"; // Show "Next Level" button
        }
    } else {
        // Player failed, retry or go home
        messageElement.innerText = "😢 You Did Not Pass!";
        resultText.innerText = `You only got ${correct} out of ${total} correct. You need at least 80% to move on.`;
    }

    restartBtn.addEventListener('click', () => {
        // Restart the same difficulty
        window.location.href = `index.html?file=python.json&difficulty=${currentDifficulty}`;
    });

    nextLevelBtn.addEventListener('click', () => {
        // Move to the next difficulty
        window.location.href = `index.html?file=python.json&difficulty=${nextDifficulty}`;
    });

    homeBtn.addEventListener('click', () => {
        window.location.href = "index.html";
    });

    function confetti() {
        var duration = 3 * 1000; 
        var end = Date.now() + duration;
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
