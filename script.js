//---------------SERVICE WORKERS TO CACHE SOUND EFFECTS----------

//Register the Service Worker
//create a hash map to store buffers
window.myClips = new Map();
window.audioCont = window.AudioContext || window.webkitAudioContext;

window.audioCtx = new audioCont();
//create audio context on initial user interaction
if (audioCtx.state !== "suspended") {
  document.querySelector(".power").addEventListener("click", () => {
    document.querySelector(".power").className = "audienceHidden";

    startHashingBuffers();
  });
} else {
  webAudioTouchUnlock();
  startHashingBuffers();
}
function webAudioTouchUnlock() {
  window.addEventListener(
    "touchstart",
    function() {
      // create empty buffer
      var buffer = audioCtx.createBuffer(1, 1, 22050);
      var source = audioCtx.createBufferSource();
      source.buffer = buffer;

      // connect to output (your speakers)
      source.connect(audioCtx.destination);

      // play the file
      source.noteOn(0);
    },
    false
  );
  window.addEventListener(
    "touchend",
    function() {
      // create empty buffer
      var buffer = audioCtx.createBuffer(1, 1, 22050);
      var source = audioCtx.createBufferSource();
      source.buffer = buffer;

      // connect to output (your speakers)
      source.connect(audioCtx.destination);

      // play the file
      source.noteOn(0);
      document.querySelector("h1").innerHTML = audioCtx.state;
    },
    false
  );
}
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
// fetch each file and convert to Array

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
  source.start();
  document.querySelector(`#${audioSource}`).classList.add("playing");
}

//remove the class once transition ends
function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("transitionend", removeTransition));
