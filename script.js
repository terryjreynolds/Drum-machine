//check if touchscreen
let USER_IS_TOUCHING = window.addEventListener(
  "touchstart",
  function onFirstTouch() {

    return true;
  }

    window.removeEventListener(onFirstTouch);
);
if (USER_IS_TOUCHING) {document.getElementsByTagName("h1").innerhtml = "touching";}


//---------------SERVICE WORKERS TO CACHE SOUND EFFECTS----------

//Register the Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw_sound_effects.js").then(() => {
      console.log("Service Worker Registered");
      console.log("github2");
    });
  });
}
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
  if (isTouchScreen) {
    console.log(document.querySelector(`#${listItem}`));
    document
      .querySelector(`#${listItem}`)
      .addEventListener("touchend", function() {
        playAudio(listItem);
      });
  }
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
  let clip = newSound.cloneNode(true);
  clip.play();
  key.classList.add("playing");
}
function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("transitionend", removeTransition));
