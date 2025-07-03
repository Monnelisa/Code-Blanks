🐞 DevHangman – Bug Report

Project: DevHangman
Environment: Localhost (Tested on Windows 10, Python3 local server)
Date Logged: July 3, 2025
Status: In Development
Reported By: Monnelisa Mangalie

🔍 Summary
During local testing of the DevHangman game, several functional and UI/UX bugs were identified. These issues affect gameplay logic, progression across levels, and interface consistency.

🧪 Detailed Issues
1. ✅ Incorrect Feedback for Already Revealed Letters
Issue: When a player guesses a letter that is already revealed in the word, the system responds with:

“Correct! ‘{letter}’ is in the word.”

Expected Behavior: The game should acknowledge that the letter is correct but already displayed, and prompt the user to try a different letter.

Suggested Message:

“The letter ‘{letter}’ is in the word, but it’s already been revealed. Try another letter.”

2. 🔢 Numeric Inputs Blocked
Issue: The game currently does not accept numeric input, even though some correct answers contain numbers (e.g., "P2P", "HTML5").

Expected Behavior: Users should be allowed to input numbers as valid guesses.

Suggested Fix: Update the input validation logic to include alphanumeric characters.

3. ❌ Incorrect Guess – Attempts Not Updating
Issue: When a player inputs an incorrect guess, the remaining attempts counter does not decrement.

Expected Behavior: The number of remaining attempts should reduce by 1 for each incorrect guess.


4. 🎨 “Next Level” Button Styling Inconsistent
Issue: The "Next Level" button lacks consistent styling with other UI buttons (e.g., padding, font, hover effect).

Expected Behavior: All buttons should follow the same design system for a cohesive UI.

5. 🧩 Question-Level Mismatch
Issue: Questions assigned to different difficulty levels are appearing in the incorrect level:

Medium-level questions are found in the Easy level.
Hard-level questions appear while still in Medium.

Expected Behavior: Questions should be categorized and served in their respective difficulty tiers.

6. 🔁 Level Progression Not Advancing
Issue: After successfully completing the Medium level, the game does not progress to the Hard level. Instead, it loops Medium-level questions.

Expected Behavior: On clicking “Next Level” after Medium, the game should transition to Hard level questions.

✅ Next Steps

 1. Refactor input validation to accept both letters and numbers.
 2. Update feedback messaging for already revealed letters.
 3. Fix logic to decrement attempts on incorrect guesses.
 4. Apply consistent CSS to the "Next Level" button.
 5. Reclassify and reorder question sets per difficulty.
 6. Review and correct level transition logic.