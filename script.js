document.addEventListener("keydown", function(e) {
  var key = e.key;
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
    playClip(key);
  }
});

function playClip(letter) {
  console.log("letter", letter);
  let x = document.getElementById(letter);

  x.play();
}
