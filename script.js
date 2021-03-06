//create a hash map to store buffers
window.myClips = new Map();
//create an audioContext on window initialization
//webkit choosen for ios
window.audioCont = window.AudioContext || window.webkitAudioContext;

window.audioCtx = new audioCont();

startHashingBuffers();

function startHashingBuffers() {
  let soundNames = [
    "clap",
    "hi-hat",
    "kick",
    "openhat",
    "orchhit",
    "ride",
    "snare",
    "tom"
  ];

  soundNames.forEach(name => {
    prepareToHash(name);
  });
}
//decode sound files and store in hash
function prepareToHash(soundName) {
  let soundFile = `sounds/${soundName}.wav`;
  console.log(soundFile);
  fetch(soundFile)
    .then(response => response.arrayBuffer())
    .then(buffer => {
      //decode the arrayBuffer as an AudioBuffer
      audioCtx.decodeAudioData(buffer, decoded => {
        //add each resulting sound to the hashmap

        updateHash(soundName, decoded);
      });
    });
}
function updateHash(name, buffer) {
  console.log(name, buffer);
  myClips.set(name, buffer);
}

//loading HD background image
const bigPic = document.getElementById("HDBgd");
bigPic.addEventListener("load", showHDImage);

function showHDImage() {
  const little = document.getElementById("LRBgd");
  const big = document.getElementById("HDBgd");
  little.className = "audienceHidden";
  big.className = "mainBackground";
}

//listen for mouse clicks
const buttons = [
  "clap",
  "hi-hat",
  "kick",
  "openhat",
  "orchhit",
  "ride",
  "snare",
  "tom"
];

buttons.map(c => setUpEventListener(c));

function setUpEventListener(listItem) {
  document.querySelector(`#${listItem}`).addEventListener("click", () => {
    playAudio(listItem);
  });
}

//listen for key presses
document.addEventListener("keydown", e => {
  let sound = "";
  const key = e.key;
  console.log("key", key);
  switch (key) {
    case "a":
      sound = "clap";
      break;
    case "s":
      sound = "hi-hat";
      break;
    case "d":
      sound = "kick";
      break;
    case "f":
      sound = "openhat";
      break;
    case "g":
      sound = "orchhit";
      break;
    case "h":
      sound = "ride";
      break;
    case "j":
      sound = "snare";
      break;
    case "k":
      sound = "tom";
      break;
    default:
      break;
  }

  playAudio(sound);
});

function playAudio(audioSource) {
  console.log("letter", audioSource);
  console.log(myClips.size);
  //find the audiobuffer in hash and store in variable
  let requestedSound = myClips.get(audioSource);
  console.log("requestedSound", requestedSound);
  //create an AudioBufferSourceNode
  let source = audioCtx.createBufferSource();
  console.log("source", source);
  //set buffer in the ABSN
  source.buffer = requestedSound;
  //connect ABSN to destination so we can hear it
  source.connect(audioCtx.destination);
  document.querySelector(`#${audioSource}`).classList.add("playing");
  source.start(0);
}

//remove the class once transition ends
function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("transitionend", removeTransition));
