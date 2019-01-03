isTouchDevice = false;

//check if touchscreen
if ("ontouchstart" in document.documentElement) {
  isTouchDevice = true;
}
//---------------SERVICE WORKERS TO CACHE SOUND EFFECTS----------

//Register the Service Worker

//----------------Page Logic----------------------

//loading HD background image
const bigPic = document.getElementById("HDBgd");
bigPic.addEventListener("load", showHDImage);

function showHDImage() {
  const little = document.getElementById("LRBgd");
  const big = document.getElementById("HDBgd");
  little.className = "audienceHidden";
  big.className = "mainBackground";
}
const buttons = ["a", "s", "d", "f", "g", "h", "j", "k"];
//listen for mouse clicks
buttons.map(c => setUpEventListener(c));

function setUpEventListener(listItem) {
  if (isTouchDevice) {
    console.log(document.querySelector(`#${listItem}`));
    document
      .querySelector(`#${listItem}`)
      .addEventListener("touchstart", function() {
        playAudio(listItem);
      });
  } else {
    console.log("its a desktop");
    document
      .querySelector(`#${listItem}`)
      .addEventListener("click", function() {
        playAudio(listItem);
      });
  }
}

//listen for key presses
document.addEventListener("keydown", function(e) {
  const key = e.key;
  console.log("key", key);
  if (
    key === "a" ||
    key === "s" ||
    key === "d" ||
    key === "f" ||
    key === "g" ||
    key === "h" ||
    key === "j" ||
    key === "k"
  ) {
    playAudio(key);
  }
});

function playAudio(letter) {
  console.log("letter", letter);

  let newSound = document.querySelector(`.${letter}`);
  let key = document.querySelector(`#${letter}`);
  console.log("key", key);
  newSound.currentTime = 0;
  newSound.play();
  key.classList.add("playing");
}
function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("transitionend", removeTransition));
