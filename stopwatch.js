let startTime;
let interval;
let running = false;
let lapCount = 0;

function startStopwatch() {
    if (!running) {
        startTime = Date.now() - (elapsedTime || 0);
        interval = setInterval(updateDisplay, 10);
        running = true;
    }
}

function pauseStopwatch() {
    if (running) {
        clearInterval(interval);
        elapsedTime = Date.now() - startTime;
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(interval);
    document.getElementById("display").textContent = "00:00:00:000";
    document.getElementById("lapTimes").innerHTML = "";
    running = false;
    lapCount = 0;
    elapsedTime = 0;
}

function updateDisplay() {
    const time = Date.now() - startTime;
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)));

    document.getElementById("display").textContent =
        `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
}

function recordLap() {
    if (!running) return;

    const time = document.getElementById("display").textContent;
    const lapItem = document.createElement("li");
    lapCount++;
    lapItem.textContent = `Lap ${lapCount}: ${time}`;
    document.getElementById("lapTimes").prepend(lapItem);
}

function pad(number, digits = 2) {
    return number.toString().padStart(digits, "0");
}
