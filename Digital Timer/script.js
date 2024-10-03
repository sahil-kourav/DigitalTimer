// Timer and Alarm Logic
const setTimerBtn = document.getElementById('setTimerBtn');
const stopTimerBtn = document.getElementById('stopTimerBtn');
const countdownElement = document.getElementById('countdown');
const alarmSound = document.getElementById('alarmSound');
const stopAlarmBtn = document.getElementById('stopAlarmBtn');

let countdownInterval;

setTimerBtn.addEventListener('click', () => {
    const selectedDate = document.getElementById('calendarInput').value;
    const hours = parseInt(document.getElementById('hoursInput').value) || 0;
    const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
    const seconds = parseInt(document.getElementById('secondsInput').value) || 0;

    // Calculate total time in seconds
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

    if (selectedDate && totalSeconds > 0) {
        countdownElement.textContent = formatTime(hours, minutes, seconds);
        startCountdown(totalSeconds);
        stopTimerBtn.style.display = 'inline-block';
    } else {
        alert('Please enter a valid date and time!');
    }
});

stopTimerBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    countdownElement.textContent = "00:00:00";
    stopTimerBtn.style.display = 'none';
    document.getElementById('hoursInput').value = '';
    document.getElementById('minutesInput').value = '';
    document.getElementById('secondsInput').value = '';
});

function startCountdown(totalSeconds) {
    clearInterval(countdownInterval); // Clear any existing interval
    const endTime = Date.now() + totalSeconds * 1000; // Calculate end time

    countdownInterval = setInterval(() => {
        const now = Date.now();
        const remainingTime = endTime - now;

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = "Time's up!";
            playAlarm(); // Call function to play alarm
            stopAlarmBtn.style.display = 'inline-block';
        } else {
            const totalRemainingSeconds = Math.floor(remainingTime / 1000);
            const seconds = totalRemainingSeconds % 60;
            const minutes = Math.floor((totalRemainingSeconds / 60) % 60);
            const hours = Math.floor(totalRemainingSeconds / 3600);
            countdownElement.textContent = formatTime(hours, minutes, seconds);
        }
    }, 1000);
}

function playAlarm() {
    alarmSound.play();
    alarmSound.loop = true; // Set to loop if you want continuous sound
}

function formatTime(hours, minutes, seconds) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

stopAlarmBtn.addEventListener('click', () => {
    alarmSound.pause();
    alarmSound.currentTime = 0; // Reset alarm sound
    stopAlarmBtn.style.display = 'none';
});
