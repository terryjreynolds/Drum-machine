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
  if (deviceIsTouch) {
    document
      .querySelector("li." + listItem)
      .addEventListener("touchstart", function() {
        cloneAndPlay(listItem);
      });
  } else {
    document
      .querySelector("li." + listItem)
      .addEventListener("click", function() {
        cloneAndPlay(listItem);
      });
  }
}

//listen for key presses
document.addEventListener("keypress", function(e) {
  const key = e.key;
  console.log(key);
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
    cloneAndPlay(key);
  }
});

//the idea here is on every click or keypress the sound clip node
//gets cloned so a new one can fire even while the first one
//plays on
function cloneAndPlay(letter) {
  console.log("clone");
  let newSound = document.querySelector("#" + letter);
  console.log("newSound", newSound);
  let clip = newSound.cloneNode(true);
  console.log("clip", clip);
  clip.play();
}
