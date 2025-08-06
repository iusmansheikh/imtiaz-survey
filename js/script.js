let current = 0;
const screens = document.querySelectorAll('.screen');

// Object to store answers
let answers = {
  experience: "",
  consultant: "",
  clarity: "",
  nps: "",
  consultantName: "",
  suggestion: ""
};

// Move to next screen
function nextScreen() {
  if (current < screens.length - 1) {
    screens[current].classList.remove('active');
    current++;
    screens[current].classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const ratingOptions = document.querySelectorAll('.rating-option');
  const npsButtons = document.querySelectorAll('.nps-btn');

  // Handle clicks on rating options
  ratingOptions.forEach((option, index) => {
    option.addEventListener('click', () => {
      const selected = option.innerText.trim();

      // Save answer based on which screen we’re on
      if (current === 1) answers.experience = selected;
      else if (current === 2) answers.consultant = selected;
      else if (current === 3) answers.clarity = selected;

      nextScreen();
    });
  });

  // Handle NPS button selection
  npsButtons.forEach(button => {
    button.addEventListener('click', () => {
      const score = button.innerText.trim();
      answers.nps = score;
      nextScreen();
    });
  });
});

// Final submit to Google Sheet using GET
function submitSurvey() {
  // Capture consultant name and suggestion
  answers.consultantName = document.getElementById('consultantName').value.trim();
  answers.suggestion = document.getElementById('suggestion').value.trim();

  console.log("Submitting Answers:", answers);

  const baseURL = "https://script.google.com/macros/s/AKfycby5us29h_9aJ4q7I5ve4VBFiJjqLgiehydyYtCsEo4xIawjUqVYz4kZIgES0Ycc7Ab9/exec"; // <-- Replace this!
  const query = new URLSearchParams(answers).toString();
  const fullURL = `${baseURL}?${query}`;

  fetch(fullURL)
    .then(() => {
      // Show Thank You screen
      if (current < screens.length - 1) {
        screens[current].classList.remove('active');
        current++;
        screens[current].classList.add('active');
      }
    })
    .catch(error => {
      console.error("Submission Error:", error);
    });
}
