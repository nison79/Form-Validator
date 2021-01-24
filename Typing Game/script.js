const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game

const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'quince',
  'eight',
  'admit',
  'drag',
  "loving"
];

//Init words
let randomWord;

//Init Score
let score = 0;

//Init Time
let time = 10;

//Set  Difficulty to value in LS or medium
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//Set  Difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//Focus on Text on Start
text.focus();

//Start counting down
const timeInterval = setInterval(updateTime , 1000);


//Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

//Update Score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

//Update Time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if(time === 0 ) {
    clearInterval(timeInterval);
    //end game
    gameOver();
  }
}

// game Over , show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time Ran Out</h1>
    <p>Your Final Score Is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;
  endgameEl.style.display = 'flex';
}

addWordToDOM();

//Event listeners

//Typing
text.addEventListener('input' , e => {
  const insertedText = e.target.value;

  if(insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    //clear
    e.target.value ='';

    if(difficulty === 'hard'){
      time +=2;
    } else if(difficulty==='medium') {
      time +=3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

//settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

//settings select click
settingsForm.addEventListener('change' , e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty' , difficulty);
})

