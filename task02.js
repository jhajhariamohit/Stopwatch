let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = [];

const displayElement = document.getElementById('display');
const lapsElement = document.getElementById('laps');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');

function updateTime() {
    elapsedTime = Date.now() - startTime;
    displayElement.innerHTML = formatTime(elapsedTime);
}

function formatTime(time) {
    let date = new Date(time);
    let minutes = String(date.getUTCMinutes()).padStart(2, '0');
    let seconds = String(date.getUTCSeconds()).padStart(2, '0');
    let milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
}

function pause() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    displayElement.innerHTML = "00:00:00.000";
    laps = [];
    lapsElement.innerHTML = "";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function lap() {
    laps.push(elapsedTime);
    const lapElement = document.createElement('li');
    lapElement.textContent = `Lap ${laps.length}: ${formatTime(elapsedTime)}`;
    lapsElement.appendChild(lapElement);
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

pauseBtn.disabled = true;
lapBtn.disabled = true;

