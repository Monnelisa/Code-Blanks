let questions = [];
let currentQuestion = null;
let revealedIndices = new Set();
let attempts = 0;

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        file: params.get('file') || 'python.json',  // Default to 'python.json' if no file param is provided
        difficulty: params.get('difficulty') || 'easy' // Default to 'easy' if no difficulty param is provided
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
    return questions.splice(randomIndex, 1)[0]; // Remove and return the question
}

function selectRandomLettersFrom(word) {
    const wordLength = word.length;
    let numMissing;
    if (wordLength <= 3) {
        numMissing = 1;
    } else if (wordLength > 6) {
        numMissing = 3;
    } else {
        numMissing = 2;
    }

    const lettersIndices = [];
    while (lettersIndices.length < numMissing) {
        const randomIndex = Math.floor(Math.random() * wordLength);
        if (!lettersIndices.includes(randomIndex)) {
            lettersIndices.push(randomIndex);
        }
    }

    revealedIndices = new Set(lettersIndices);
    updateObscuredWord(word);
}

function updateObscuredWord(word) {
    const obscuredWord = word.split('').map((letter, index) => revealedIndices.has(index) ? '_' : letter).join('');
    document.getElementById('obscured-word').innerText = `Guess the word: ${obscuredWord}`;
}

function showAnswer(word) {
    const currentWord = word.split('').map((letter, index) => revealedIndices.has(index) ? letter : '_').join('');
    document.getElementById('obscured-word').innerText = `Current word: ${currentWord}`;
    return !currentWord.includes('_'); // True if fully revealed
}

function handleGuess() {
    const userInput = document.getElementById('guess-input').value.toLowerCase();
    document.getElementById('guess-input').value = '';

    if (userInput.length !== 1 || !/[a-z]/.test(userInput)) {
        document.getElementById('message').innerText = 'Please enter a single letter.';
        return;
    }

    const answer = currentQuestion.answer.toLowerCase();
    let correctGuess = false; // Track if the guess was correct

    if (answer.includes(userInput)) {
        for (let i = 0; i < answer.length; i++) {
            if (answer[i] === userInput) {
                revealedIndices.add(i); // Add the index of the correct letter
                correctGuess = true; // Mark that we had a correct guess
            }
        }
        document.getElementById('message').innerText = `Correct! '${userInput}' is in the word.`;
        updateObscuredWord(answer); // Update the displayed word
    } else {
        attempts--;
        document.getElementById('message').innerText = `'${userInput}' is not in the word. Remaining attempts: ${attempts}`;
    }

    if (showAnswer(answer)) {
        document.getElementById('message').innerText = 'Well done! You guessed the word!';
        setTimeout(startGame, 2000); // Start the next question after a delay
    } else if (attempts <= 0) {
        document.getElementById('message').innerText = `Out of attempts! The correct word was: ${answer}`;
        setTimeout(startGame, 2000); // Start the next question after a delay
    }
}

function startGame() {
    if (questions.length === 0) {
        document.getElementById('message').innerText = 'Game Over!';
        return;
    }

    currentQuestion = selectRandomQuestion();
    document.getElementById('question').innerText = currentQuestion.question;
    revealedIndices.clear();
    selectRandomLettersFrom(currentQuestion.answer.toLowerCase());
    attempts = revealedIndices.size + 2;
    document.getElementById('attempts').innerText = `Remaining attempts: ${attempts}`;
    document.getElementById('message').innerText = '';
}

document.getElementById('guess-button').addEventListener('click', handleGuess);
window.onload = loadGameData;
