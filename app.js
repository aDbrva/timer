var time;
var timerId;

const timeAmountEl = document.querySelector('.time-amount');
const startTimerEl = document.querySelector('.start-timer');

const hoursEl = document.querySelector('.hours span');
const minutesEl = document.querySelector('.minutes span');
const secondsEl = document.querySelector('.seconds span');
const audioEl = document.querySelector('#audio');


const inputField = document.querySelector('.input-field');
const container = document.querySelector('.container');

const stopTimerEl = document.querySelector('.stop');
const pauseTimerEl = document.querySelector('.pause');
const continueTimerEl = document.querySelector('.continue');



function Timer() {
    return setInterval(() => {
        let timeLeft = time,
            timeTemp  = 0;
    
        if(time < 0) {
            audioEl.play();
            clearInterval(timerId);

            pauseTimerEl.style.display = 'none';
            stopTimerEl.style.width = '100%';

        }else {
            timeTemp = Math.floor(timeLeft / (60 * 60));
            timeLeft -= timeTemp * 60 * 60;
            if(timeTemp < 10) timeTemp = '0' + timeTemp;
            hoursEl.innerHTML = timeTemp;
        
            timeTemp = Math.floor(timeLeft / 60);
            timeLeft -= timeTemp * 60;
            if(timeTemp < 10) timeTemp = '0' + timeTemp;
            minutesEl.innerHTML  = timeTemp;
        
            if(timeLeft < 10) timeLeft = '0' + timeLeft;
            secondsEl.innerHTML = timeLeft;
        
            time--;
        }
    
    }, 1000);
}

function startTimer() {
    time = parseInt(timeAmountEl.value);

    timeAmountEl.value = "";
    
    if(time > 0) {
        pauseTimerEl.style.display = 'block';
        continueTimerEl.style.display = 'none';
        inputField.style.display = 'none';
        container.style.display = 'block';
        stopTimerEl.style.width = '48%';

        audioEl.currentTime = 0;
        audioEl.pause();

        timerId = Timer();
    }else {
        alert('Введіть коректні дані!');
    }
    
}

function stopTimer() {
    if(time >= 0) {
        clearInterval(timerId);
        hoursEl.innerHTML = '00';
        minutesEl.innerHTML = '00';
        secondsEl.innerHTML = '00';

        inputField.style.display = 'flex';
        container.style.display = 'none';
    }else {
        audioEl.currentTime = 0;
        audioEl.pause();

        inputField.style.display = 'flex';
        container.style.display = 'none';
    }
}

function pauseTimer() {
    if(time >= 0) {
        clearInterval(timerId);
        time = parseInt(secondsEl.textContent) + parseInt(minutesEl.textContent) * 60 + parseInt(hoursEl.textContent) * 60 * 60;

        time--;

        pauseTimerEl.style.display = 'none';
        continueTimerEl.style.display = 'block';
    }
}

function continueTimer() {
    timerId = Timer();

    continueTimerEl.style.display = 'none';
    pauseTimerEl.style.display = 'block';
}

startTimerEl.addEventListener('click', startTimer);
stopTimerEl.addEventListener('click', stopTimer);
pauseTimerEl.addEventListener('click', pauseTimer);
continueTimerEl.addEventListener('click', continueTimer);
