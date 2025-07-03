# Developer Hangman

Welcome to Developer Hangman! Test your programming knowledge in a fun way by playing Hangman with questions from different programming languages.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Instructions for Local Setup](#instructions-for-local-setup)
  - [Clone the Repository](#1-clone-the-repository)
  - [Start the Game Locally](#2-start-the-game-locally)
  - [Open the Game in Your Browser](#3-open-the-game-in-your-browser)
- [How to Play](#how-to-play)
- [Contributing](#contributing)
- [License](#license)

## Features

- Choose a programming language to play (Python, Java, JavaScript, Ruby, HTML, CSS, etc.).
- Answer questions related to the selected language.
- Play in different difficulty levels: Easy, Medium, and Hard.

## Prerequisites

To play the game locally, you need:

- A web browser (Chrome, Firefox, Edge, etc.).
- Python 3 installed on your system (for running a local development server).

## Instructions for Local Setup

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Monnelisa/DevHangman_game.git
```

Navigate to the project directory:

```bash
cd DevHangman_game
```

### 2. Start the Game Locally

To run the game on your local machine, follow these steps:

#### Using Python 3 (Recommended)

Open your terminal and navigate to the project directory:

```bash
cd /path/to/DevHangman_game
```

Start a simple HTTP server on port 80 using Python:

```bash
sudo python3 -m http.server 80
```

The `sudo` command is necessary for using port 80, which is a privileged port on most systems.

Alternatively, if you don’t want to use `sudo`, you can run the server on a different port like 8080:

```bash
python3 -m http.server 8080
```

#### Using Python 2 (if Python 3 is unavailable)

If you're using Python 2, run the following command instead:

```bash
sudo 
```python -m SimpleHTTPServer 80

### 3. Open the Game in Your Browser

Once the server is running, open your web browser and visit:

- `http://localhost` if you are using port 80.
- `http://localhost:8080` if you are using port 8080.

You should see the game's `index.html` page, where you can choose a programming language and start playing!

## How to Play

1. Select a programming language by clicking on its corresponding icon.
2. The game will load questions from a JSON file based on the selected language.
3. Guess the word by typing in letters. You’ll have limited attempts to guess the correct word.
4. Once you guess the word correctly, the next question will appear.

## Contributing

Feel free to fork the project, make changes, and submit a pull request if you’d like to contribute.

## License

This project is open source and available under the MIT License.

