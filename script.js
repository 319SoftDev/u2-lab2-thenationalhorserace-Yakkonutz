console.log("Script Running");

// Function to change the position of a horse on the grid
const changePosition = (horse, position) => {
  // Ensure the horse's position doesn't exceed the track limit
  if (position <= 5) {
    horse.style.setProperty('grid-column', position); // Update the horse's position in the grid
  }
};

// Horse positions
let horses = {
  blue: { position: 1, button: document.querySelector("#blue-button"), horse: document.querySelector("#blue-horse") },
  pink: { position: 1, button: document.querySelector("#pink-button"), horse: document.querySelector("#pink-horse") },
  brown: { position: 1, button: document.querySelector("#brown-button"), horse: document.querySelector("#brown-horse") }
};

// Query Selector for winner announcement
const winnerDiv = document.querySelector("#winner");

// Check for a winner
const checkWinner = (position, color) => {
  if (position === 5) {
    winnerDiv.innerHTML = `${color} is the Winner!`; // Announce the winner
    
    for (let horseColor in horses) {
      horses[horseColor].button.disabled = true; // Disable buttons for all horses
    }
  }
};

// Advance functions
const advance = (e) => {
  const color = e.target.value; // Get the color from the button value
  horses[color].position += 1; 
  changePosition(horses[color].horse, horses[color].position); // Update the horse's position on the UI
  checkWinner(horses[color].position, color.charAt(0).toUpperCase() + color.slice(1)); // Check for a winner
  // Update alt text for accessibility
  horses[color].horse.alt = `${color} horse at position ${horses[color].position} out of 5`;
};

// Reset function
const resetGame = () => {
  for (let horseColor in horses) {
    horses[horseColor].position = 1; // Reset position to start
    changePosition(horses[horseColor].horse, horses[horseColor].position); // Update the display position
    horses[horseColor].button.disabled = false; // Re-enable buttons for all horses
    horses[horseColor].horse.alt = `${horseColor} horse at position 1 out of 5`; // Reset alt text
  }
  winnerDiv.innerHTML = ""; // Clear any winner message
};

// Event Listeners
for (let horseColor in horses) {
  horses[horseColor].button.addEventListener("click", advance); // Add click event to advance the horse
  // Set aria-label for buttons
  horses[horseColor].button.setAttribute("aria-label", `Advance ${horseColor} horse`);
}

// Accessibility improvements
for (let horseColor in horses) {
  horses[horseColor].horse.setAttribute("aria-live", "polite"); // Notify screen readers about updates
  horses[horseColor].horse.setAttribute("aria-atomic", "true"); // Ensure complete updates are read
  horses[horseColor].horse.alt = `${horseColor} horse at position 1 out of 5`; 
}

// Winner announcement div
winnerDiv.setAttribute("aria-live", "assertive"); // Announce winner updates 
winnerDiv.setAttribute("aria-atomic", "true"); 

// Add reset button functionality
document.querySelector("#reset-button").addEventListener("click", resetGame); // Reset the game when the button is clicked
