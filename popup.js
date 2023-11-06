let isRunning = false;
let pomodoroTime = 25 * 60; // 25 minutes
let countdown;

document.getElementById('start-btn').addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    countdown = setInterval(() => {
      pomodoroTime--;
      displayTime(pomodoroTime);
      if (pomodoroTime <= 0) {
        clearInterval(countdown);
        // Here you can also trigger a Chrome notification
      }
    }, 1000);
  }
});

document.getElementById('pause-btn').addEventListener('click', () => {
  clearInterval(countdown);
  isRunning = false;
});

document.getElementById('reset-btn').addEventListener('click', () => {
  clearInterval(countdown);
  pomodoroTime = 25 * 60;
  displayTime(pomodoroTime);
  isRunning = false;
});

function displayTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remSeconds = seconds % 60;
  document.getElementById('timer-display').textContent = 
    `${minutes}:${remSeconds < 10 ? '0' : ''}${remSeconds}`;
}
