class MemoryGame {
  constructor(app, arr) {
    // pass the constructor arguments to properties of Class
    this.app = document.getElementById(app);

    // html elements
    this.msgBox = document.getElementById("msg-box");
    this.footer = document.querySelector("footer");
    this.playBtn = document.getElementById("play-btn");
    this.playBtn.addEventListener("click", this.playGame.bind(this));
    this.totalPics = document.getElementById("chooser").value;

    // keeping score:
    this.attempts = 0;
    this.matches = 0;
    this.average = 0;
    this.score = 0;
    this.scoreBox = document.getElementById("score-box");

    // keeping time
    this.seconds = 0;
    this.minutes = 0;
    this.totSec = 0;
    this.timerBox = document.getElementById("timer-box");
    this.gameTimer;

    // game pieces
    this.gameArray = [];
    this.allArr = new Array(23);
    for (let i = 0; i < 24; i++) {
      this.allArr[i] = i + 1;
    }
    this.yatesShuffle();

    console.log("constructor gameArray: ", this.gameArray);

    // an array to hold 2 clicked pics at a time for comparing them
    this.picChoices = [];
  }

  init() {
    this.picChoices = [];
    this.attempts = 0;
    this.matches = 0;
    this.average = 0;
    this.score = 0;
    this.seconds = 5;
    this.minutes = 0;
    this.totSec = 0;
    this.countdownInterval;
  }

  playGame() {
    if (this.playBtn.innerText === "Restart") {
      this.yatesShuffle();
      while (this.app.firstChild) {
        this.app.removeChild(this.app.firstChild);
      }
      clearInterval(this.gameTimer);
      this.seconds = 0;
      this.mintues = 0;
      this.totSec = 0;
      this.timerBox.innerText = "00:00";
    }

    this.disableBtn();
    this.yatesShuffle();
    console.log("playGame gameArray: ", this.gameArray);

    for (let i = 0; i < this.gameArray.length; i++) {
      let pic = new Image();
      pic.src = `images/${this.gameArray[i]}.jpg`;
      //pic.addEventListener("click", this.showPic.bind(this));
      pic.className = "pics";
      pic.name = this.gameArray[i];
      pic.id = i;
      this.app.appendChild(pic);
    }

    this.hideAll();
  } // playGame()

  showPic(event) {
    this.picChoices.push(event.target);
    // if less than 2 choices, show the just-clicked pic and push pic into array
    if (this.picChoices.length < 2) {
      event.target.src = "images/" + event.target.name + ".jpg";
    }

    if (this.picChoices.length == 2) {
      this.attempts++; // right or wrong, this counts as an attempt
      event.target.src = "images/" + event.target.name + ".jpg";
      // if names match, so far so good
      if (this.picChoices[0].name == this.picChoices[1].name) {
        // if the ID's do not match, that is a true match
        if (this.picChoices[0].id != this.picChoices[1].id) {
          // if you made it this far, you have a MATCH !!
          this.msgBox.innerHTML = "THAT'S A MATCH! GOOD JOB!";

          let matchzero = document.getElementById(this.picChoices[0].id);
          let matchone = document.getElementById(this.picChoices[1].id);
          let newPic0 = new Image();
          let newPic1 = new Image();

          newPic0.src = `images/${this.picChoices[0].name}.jpg`;
          newPic0.className = "pics";
          this.app.replaceChild(newPic0, this.picChoices[0]); //new thing, old thing

          newPic1.src = `images/${this.picChoices[1].name}.jpg`;
          newPic1.className = "pics";
          this.app.replaceChild(newPic1, this.picChoices[1]);

          this.matches++;

          this.picChoices = []; // empty the array

          if (this.matches == this.totalPics) {
            this.gameOver();
            let saveButton = document.createElement("button");
            saveButton.addEventListener("click", this.saveScore.bind(this));
            saveButton.id = "saveButton";
            saveButton.innerHTML = "Save Score";
            this.footer.appendChild(saveButton);
          }
        } else {
          // both ID's are the SAME !!

          // names match, but so do ID's so it's the exact SAME image !!
          this.msgBox.innerHTML = "Hey! You clicked the SAME pic twice!";
          this.hideChoices();
        }
      } else {
        // names don't match -- a total mis-match

        // names don't match, so turn these boxes gray again
        this.msgBox.innerHTML = "Oops! Choices don't match! Keep trying!";
        // make the bad choices blank again
        this.hideChoices();
      }

      // update the score and output it to the scoreBox span tag
      this.average = (this.matches / this.attempts).toFixed(3);

      // the complex score saved to High Scores in DB
      //  this.score = Math.floor(this.average * this.matches * (this.arr.length ** 2) / this.totSec)
      //totSec is the actual value of your seconds. Seconds is just the graphical representation
      this.score = Math.ceil(
        (this.average *
          (this.gameArray.length / 2) *
          (this.gameArray.length / 2) *
          this.matches *
          1000) /
          this.totSec
      );
      this.scoreBox.innerHTML = `Attempts: &nbsp; ${this.attempts} &nbsp; 
               Matches: &nbsp; ${this.matches} &nbsp;
               Average: &nbsp; ${this.average} &nbsp;
               Score: &nbsp; ${this.score} &nbsp;`;
    } // end if(this.picChoices == 2)
  } // end showPic()

  hideChoices() {
    // delay hiding the choices -- hide 1st choice after 1.5 sec; hide 2nd choice after 3 seconds

    setTimeout(() => {
      this.picChoices[0].src = "images/blank.png";
    }, 500);

    setTimeout(() => {
      this.picChoices[1].src = "images/blank.png";
      // after hiding choices, empty out the array
      this.picChoices = [];
    }, 500);
  } // hideChoices()

  hideAll() {
    // hide all pics (turn them gray) 5 seconds after this hideAll method is called
    let seconds = 5;
    this.msgBox.innerHTML = "Hiding cards in " + seconds + " seconds";
    const countdown = setInterval(() => {
      seconds = seconds - 1;
      this.msgBox.innerHTML = "Hiding cards in " + seconds + " seconds";
      if (seconds === 0) {
        clearInterval(countdown);
        for (let i = 0; i < this.gameArray.length; i++) {
          this.app.children[i].src = "images/blank.png";
        }
        this.enableBtn();
        this.initTimer();
        this.resumeClicks();
        this.msgBox.innerHTML = "Good Luck!";
        if (this.seconds > 0) {
          this.seconds = 0;
        }
      }
    }, 1000);
  } // hideAll()

  initTimer() {
    // start the timer and update time every second until game over
    this.gameTimer = setInterval(() => {
      this.seconds++;
      this.totSec++;
      if (this.seconds == 60) {
        this.minutes++;
        this.seconds = 0;
      }
      // ouput the time, as 00:00
      let mySec = 0;
      if (this.seconds < 10) {
        mySec = "0" + this.seconds;
      } else {
        mySec = this.seconds;
      }
      let myMin = 0;
      if (this.minutes < 10) {
        myMin = "0" + this.minutes;
      } else {
        myMin = this.minutes;
      }

      this.timerBox.innerHTML = myMin + ":" + mySec;

      this.scoreBox.innerHTML = `Attempts: &nbsp; ${this.attempts} &nbsp; 
            Matches: &nbsp; ${this.matches} &nbsp;
            Average: &nbsp; ${this.average} &nbsp;
            Score: &nbsp; ${this.score} &nbsp;`;
    }, 1000);
  }

  saveScore() {
    console.log("Score Saved");
    //AJAX call to PHP

    //Not New Part:
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
        alert(xhr.responseText);
      } //end if
    }; //end onreadstatechange
    const url = "includes/save-load-score.php?";
    const urlVars = `attempts=${this.attempts}&matches=${this.matches}&average=${this.average}&seconds=${this.seconds}&score=${this.score}`;
    xhr.open("GET", url + urlVars, true);
    xhr.send();
  } //end saveScore()

  // TODO: Refactor to Btn Object
  enableBtn() {
    this.playBtn.disabled = false;
    this.playBtn.classList.add("hover:bg-blue-700");
    this.playBtn.classList.remove("cursor-not-allowed", "opacity-50");
    if (this.playBtn.innerText === "Hiding Cards...") {
      this.playBtn.innerText = "Restart";
    } else {
      this.playBtn.innerText = "Play";
    }
  }
  disableBtn() {
    this.playBtn.disabled = true;
    this.playBtn.classList.add("cursor-not-allowed", "opacity-50");
    this.playBtn.classList.remove("hover:bg-blue-700");
    this.playBtn.innerText = "Hiding Cards...";
  }
  pauseClicks() {
    for (let i = 0; i < this.gameArray.length; i++) {
      let pic = document.getElementById(i);
      //   pic.disabled = true;
      pic.removeEventListener("click", this.showPic, false);
    }
  }
  resumeClicks() {
    for (let i = 0; i < this.gameArray.length; i++) {
      let pic = document.getElementById(i);
      pic.addEventListener("click", this.showPic.bind(this), false);
    }
  }
  yatesShuffle() {
    //FISHER-YATES SHUFFLE
    for (let i = 0; i < this.allArr.length; i++) {
      let rando = Math.floor(Math.random() * this.allArr.length);
      let tempItem = this.allArr[i];
      this.allArr[i] = this.allArr[rando];
      this.allArr[rando] = tempItem;
    }

    if (this.totalPics == 12) {
      this.gameArray = this.allArr.slice(0, 12);
      this.gameArray = [...this.gameArray, ...this.gameArray];
      for (let i = 0; i < this.gameArray.length; i++) {
        let rando = Math.floor(Math.random() * this.gameArray.length);
        let tempItem = this.gameArray[i];
        this.gameArray[i] = this.gameArray[rando];
        this.gameArray[rando] = tempItem;
      }
    } else if (this.totalPics == 24) {
      this.gameArr = this.allArr;
    }
  }
  gameOver() {
    this.average = (this.matches / this.attempts).toFixed(3);
    this.score = Math.ceil(
      (this.average *
        (this.gameArray.length / 2) *
        (this.gameArray.length / 2) *
        this.matches *
        1000) /
        this.totSec
    );
    this.msgBox.innerHTML = `
    <p>Congrats!</p>
    <p>You have completed the game!</p>
    <p>Final Score: ${this.score}</p>
    <p>Save Score Below</p>`;
    clearInterval(this.gameTimer);
  }
} // close class MemoryGame
