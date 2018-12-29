preloadImg();
function preloadImg() {
  console.log("preload");
  const myImage = new Image();
  myImage.onload = changeImg(myImage);
  myImage.src = "img/audience.jpg";
}
function changeImg(img) {
  console.log("changeImg", img);
}

const buttons = ["a", "s", "d", "f", "g", "h", "j", "k"];
//listen for mouse clicks
buttons.map(c => setUpEventListener(c));
function setUpEventListener(listItem) {
  document
    .querySelector("li." + listItem)
    .addEventListener("click", function() {
      cloneAndPlay(listItem);
    });
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
