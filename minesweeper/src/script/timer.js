
let t;
let sec;
let min;
let printSec;

export function startStopTimer(timeOn) {
const timer = document.querySelector('.timer');


function tick() {
    sec += 1;
    if (sec >= 60){
        sec = 0;
        min += 1;
    }
    printSec = sec.toString().padStart(2,'0');
    timer.textContent = `${min}:${printSec}`;
}
function start(){
   t = setInterval(tick, 1000);
}

function stop(){
    clearInterval(t);
}

if (timeOn) {
    sec = 0;
    min = 0;
    start();
} else {
    stop();
    let result = (min * 60 + sec);
    timer.textContent = '0:00';
    return (result);
}

}

// export function stopTimer() {
//     timer.textContent = '0:00';
// }