let questions = [];
let currentQuestion = null;
let revealedIndices = new Set();
let attempts = 0;
let correctAnswers = 0;
let totalQuestions = 0;
let difficultyLevels = ["easy", "medium", "hard"];
let currentLevelIndex = 0;

const correctSound = new Audio('sounds/correct.mp3');
const wrongSound = new Audio('sounds/incorrect.mp3');


function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const difficulty = params.get('difficulty') || 'easy';  
    currentLevelIndex = difficultyLevels.indexOf(difficulty); 
    return {
        file: params.get('file') || 'python.json',
        difficulty
    };
}

async function loadGameData() {
    const { file, difficulty } = getQueryParams();
    if (file) {
        try {
            const response = await fetch(file);
            const data = await response.json();
            questions = filterQuestionsByDifficulty(data, difficulty);
            startGame();
        } catch (error) {
            console.error('Error loading game data:', error);
        }
    }
}

function filterQuestionsByDifficulty(questions, difficulty) {
    return questions.filter(q => q.difficulty === difficulty);
}

function selectRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions.splice(randomIndex, 1)[0]; 
}

function selectRandomLettersFrom(word) {
    const wordLength = word.length;
    let numMissing = wordLength <= 3 ? 1 : wordLength > 6 ? 3 : 2;

    revealedIndices.clear(); // Ensure a fresh set per word
    while (revealedIndices.size < numMissing) {
        revealedIndices.add(Math.floor(Math.random() * wordLength));
    }

    updateObscuredWord(word);
}

function updateObscuredWord(word) {
    const obscuredWordContainer = document.getElementById('obscured-word');
    obscuredWordContainer.innerHTML = ''; // Clear previous content

    word.split('').forEach((letter, index) => {
        const letterBlock = document.createElement('span');
        letterBlock.classList.add('letter-block');
        letterBlock.innerText = revealedIndices.has(index) ? letter : '_';
        obscuredWordContainer.appendChild(letterBlock);
    });
}

function showAnswer(word) {
    const currentWord = word.split('').map((letter, index) => 
        revealedIndices.has(index) ? letter : '_'
    ).join('');

    return !currentWord.includes('_'); // True if all letters are revealed
}

function handleGuess() {
    const userInput = document.getElementById('guess-input').value.toLowerCase();
    document.getElementById('guess-input').value = '';

    // Allow single letters or numbers only
    if (userInput.length !== 1 || !/[a-z0-9]/.test(userInput)) {
        document.getElementById('message').innerText = 'Please enter a single letter or number.';
        return;
    }

    const answer = currentQuestion.answer.toLowerCase();
    let foundInWord = false;
    let revealedSomethingNew = false;

    // Check each letter in the word
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === userInput) {
            foundInWord = true;
            if (!revealedIndices.has(i)) {
                revealedIndices.add(i);
                revealedSomethingNew = true;
            }
        }
    }

    // Show message based on guess logic
    if (foundInWord && revealedSomethingNew) {
        correctSound.play();
        document.getElementById('message').innerText = `✅ Correct! '${userInput}' is in the word.`;
    } else if (foundInWord && !revealedSomethingNew) {
        document.getElementById('message').innerText = `ℹ️ The letter '${userInput}' is already revealed. Try a different letter.`;
    } else {
        wrongSound.play();
        attempts--;
        document.getElementById('message').innerText = `❌ '${userInput}' is not in the word. Remaining attempts: ${attempts}`;
    }

    // Update word and check game state
    updateObscuredWord(answer);

    if (showAnswer(answer)) {
        correctSound.play();
        correctAnswers++;
        document.getElementById('message').innerText = '🎉 Well done! You guessed the word!';
        setTimeout(() => startGame(), 2000); 
    } else if (attempts <= 0) {
        wrongSound.play();
        document.getElementById('message').innerText = `❌ Out of attempts! The correct word was: ${answer}`;
        setTimeout(() => startGame(), 2000);
    }

    // Update attempts display
    document.getElementById('attempts').innerText = `Remaining attempts: ${attempts}`;
}

function startGame() {
    if (questions.length === 0) {
        window.location.href = `end.html?correctAnswers=${correctAnswers}&totalQuestions=${totalQuestions}&difficulty=${difficultyLevels[currentLevelIndex]}&file=${getQueryParams().file}`;
        return;
    }

    currentQuestion = selectRandomQuestion();
    totalQuestions++; 

    document.getElementById('question').innerText = currentQuestion.question;
    revealedIndices.clear();
    selectRandomLettersFrom(currentQuestion.answer.toLowerCase());
    attempts = revealedIndices.size + 1;
    document.getElementById('attempts').innerText = `Remaining attempts: ${attempts}`;
    document.getElementById('message').innerText = '';

    document.getElementById('current-level-text').innerText =
    difficultyLevels[currentLevelIndex].charAt(0).toUpperCase() + difficultyLevels[currentLevelIndex].slice(1);
    document.getElementById('question-number').innerText = totalQuestions;


}

document.getElementById('guess-button').addEventListener('click', handleGuess);
window.onload = loadGameData;

document.getElementById('footer-home-btn').addEventListener('click', () => {
  const userConfirmed = confirm("Are you sure you want to go home? All progress will be lost.");
  if (userConfirmed) {
    window.location.href = "index.html";
  }
});

