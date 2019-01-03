forceLoad();

function forceLoad() {
  console.log("in forceload");
  const a = document.querySelector(".a");
  console.log("a", a);
  a.play();
  setTimeout(function() {
    console.log("paused");
    console.log("a ready state:", a.readyState);
  }, 1000);
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
  console.log("its a desktop");
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

  newSound.play();
  newSound.currentTime = 0.1;
  const readyState = newSound.readyState;
  console.log("readyState:", readyState);
  document.getElementsByTagName("h1")[0].innerHTML = `${readyState}`;
  key.classList.add("playing");
}
function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("transitionend", removeTransition));
