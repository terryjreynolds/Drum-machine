//---------------SERVICE WORKERS TO CACHE SOUND EFFECTS----------

//Register the Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw_sound_effects.js").then(() => {
      console.log("Service Worker Registered");
    });
  });
}
//----------------Page Logic----------------------

//check if is a touchscreen device
var deviceIsTouch = "ontouchstart" in window || navigator.msMaxTouchPoints > 0;
console.log("deviceistouch", deviceIsTouch);

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
  console.log(document.querySelector(`#${listItem}`));
  document.querySelector(`#${listItem}`).addEventListener("click", function() {
    playAudio(listItem);
  });
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
  newSound.currentTime = 0; //rewind to the start of the clip
  newSound.play();
  key.classList.add("playing");
}
function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("transitionend", removeTransition));
