# Developer Hangman

Welcome to Developer Hangman! Test your programming knowledge in a fun way by playing Hangman with questions from different programming languages.

## Features

- Choose a programming language to play (Python, Java, JavaScript, Ruby, HTML, CSS, etc.).
- Answer questions related to the selected language.
- Play in different difficulty levels: Easy, Medium, and Hard.

## Prerequisites

To play the game locally, you need:

- A web browser (Chrome, Firefox, Edge, etc.)
- Python 3 installed on your system (for local development server)

## Instructions for Local Setup

### 1. Clone the Repository

First, clone the repository to your local machine:
  ```bash
  git clone https://github.com/Monnelisa/DevHangman_game.git
Navigate to the project directory:


bash
Copy code
cd DevHangman_game

2. Start the Game Locally
To run the game on your local machine, follow these steps:

Using Python 3 (Recommended)
Open your terminal and navigate to the project directory:

bash
Copy code
cd /path/to/DevHangman_game
Start a simple HTTP server on port 80 using Python:

bash
Copy code
sudo python3 -m http.server 80
The sudo command is necessary for using port 80, which is a privileged port on most systems.
Alternatively, if you don’t want to use sudo, you can run the server on a different port like 8080:
bash
Copy code
python3 -m http.server 8080
Using Python 2 (if Python 3 is unavailable)
If you're using Python 2, run the following command instead:

bash
Copy code
sudo python -m SimpleHTTPServer 80
3. Open the Game in Your Browser
Once the server is running, open your web browser and visit:

http://localhost if you are using port 80.
http://localhost:8080 if you are using port 8080.
You should see the game's index.html page, where you can choose a programming language and start playing!

How to Play
Select a programming language by clicking on its corresponding icon.
The game will load questions from a JSON file based on the selected language.
Guess the word by typing in letters. You’ll have limited attempts to guess the correct word.
Once you guess the word correctly, the next question will appear.
Contributing
Feel free to fork the project, make changes, and submit a pull request if you’d like to contribute.

License
This project is open source and available under the MIT License.

markdown
Copy code

### Summary of Fixes:
- Corrected the formatting issues (missing closing code blocks and sections).
- Added proper Markdown syntax for headers, code blocks, and lists.
- Included the missing closing code blocks for the Bash commands.

Now, this file is properly formatted and ready to be copied and pasted into your project’s `README.md` file.





