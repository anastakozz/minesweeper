// import winSound from '/assets/audio/mixkit-game-flute-bonus-2313.wav'
const audioWin = new Audio();
audioWin.src = 'mixkit-game-flute-bonus-2313.wav';

const audioLose = new Audio();
audioLose.src = 'mixkit-negative-guitar-tone-2324.wav';

const audioOpen = new Audio();
audioOpen.src = 'mixkit-flute-alert-2307.wav';

const audioFlag = new Audio();
audioFlag.src = 'mixkit-game-ball-tap-2073.wav';

export function playAudio(sound, state) {
  if (state) {
    switch (sound) {
      case 'win':
        audioWin.play();
        break;
      case 'lose':
        audioLose.play();
        break;
      case 'open':
        audioOpen.play();
        break;
      case 'flag':
        audioFlag.play();
        break;
    }
  }
}
