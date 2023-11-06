// Ensure the DOM content is loaded before trying to access the elements
document.addEventListener('DOMContentLoaded', function() {
  let isRunning = false;
  let pomodoroTime = 0.5 * 60; // 25 minutes
  let countdown;

  const toggleBtn = document.getElementById('toggle-btn');
  const resetBtn = document.getElementById('reset-btn');

  toggleBtn.addEventListener('click', function() {
    if (isRunning) {
      this.textContent = 'Start';
      clearInterval(countdown);
      isRunning = false;
    } else {
      this.textContent = 'Pause';
      isRunning = true;
      countdown = setInterval(function() {
        pomodoroTime--;
        displayTime(pomodoroTime);
        if (pomodoroTime <= 0) {
          clearInterval(countdown);
          isRunning = false;
          this.textContent = 'Start';
          //Trigger Chrome notification here
          showNotification();
        }
      }, 1000);
    }
  });

  resetBtn.addEventListener('click', function() {
    clearInterval(countdown);
    pomodoroTime = 0.5 * 60;
    displayTime(pomodoroTime);
    toggleBtn.textContent = 'Start';
    isRunning = false;
  });

  function displayTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remSeconds = seconds % 60;
    document.getElementById('timer-display').textContent =
      `${minutes}:${remSeconds < 10 ? '0' : ''}${remSeconds}`;
  }
});

function showNotification() {
    chrome.notifications.create('', {
      title: 'Pomodoro Timer',
      message: 'Time is up! Take a break!',
      iconUrl: 'images/icon.png',
      type: 'basic'
    });
  }
  
