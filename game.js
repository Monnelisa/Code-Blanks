let questions = [];
let currentQuestion = null;
let revealedIndices = new Set();
let attempts = 0;

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        file: params.get('file') || 'python.json',  
        difficulty: params.get('difficulty') || 'easy' 
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

    if (userInput.length !== 1 || !/[a-z]/.test(userInput)) {
        document.getElementById('message').innerText = 'Please enter a single letter.';
        return;
    }

    const answer = currentQuestion.answer.toLowerCase();
    let correctGuess = false;

    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === userInput) {
            revealedIndices.add(i); // Persist correct guesses
            correctGuess = true;
        }
    }

    if (correctGuess) {
        document.getElementById('message').innerText = `Correct! '${userInput}' is in the word.`;
    } else {
        attempts--;
        document.getElementById('message').innerText = `'${userInput}' is not in the word. Remaining attempts: ${attempts}`;
    }

    updateObscuredWord(answer);

    if (showAnswer(answer)) {
        document.getElementById('message').innerText = '🎉 Well done! You guessed the word!';
        setTimeout(() => startGame(), 2000); 
    } else if (attempts <= 0) {
        document.getElementById('message').innerText = `❌ Out of attempts! The correct word was: ${answer}`;
        setTimeout(() => startGame(), 2000);
    }
}

function startGame() {
    if (questions.length === 0) {
        document.getElementById('message').innerText = '🎮 Game Over! No more questions left.';
        return;
    }

    currentQuestion = selectRandomQuestion();
    document.getElementById('question').innerText = currentQuestion.question;
    revealedIndices.clear();
    selectRandomLettersFrom(currentQuestion.answer.toLowerCase());
    attempts = revealedIndices.size + 1;
    document.getElementById('attempts').innerText = `Remaining attempts: ${attempts}`;
    document.getElementById('message').innerText = '';
}



document.getElementById('guess-button').addEventListener('click', handleGuess);
window.onload = loadGameData;
