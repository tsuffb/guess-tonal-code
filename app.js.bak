import * as Tone from "https://cdn.jsdelivr.net/npm/tone";

const scales = ["C", "D", "E", "F", "G", "A", "B"];
const sequences = [
  { name: "7->8", steps: [6, 7] },
  { name: "6->5", steps: [5, 4] },
  { name: "4->3", steps: [3, 2] },
  { name: "2->1", steps: [1, 0] },
];

let currentScale = null;
let currentSequence = null;

const synth = new Tone.PolySynth().toDestination();

function generateMajorScale(root) {
  const notes = ["C", "D", "E", "F", "G", "A", "B"];
  const startIndex = notes.indexOf(root);
  const scale = [];
  for (let i = 0; i < 7; i++) {
    scale.push(Tone.Frequency(`${notes[(startIndex + i) % 7]}4`).toNote());
  }
  return scale;
}

function playChords(scale) {
  const chords = [
    [scale[0], scale[2], scale[4]],
    [scale[3], scale[5], scale[0]],
    [scale[4], scale[6], scale[1]],
    [scale[0], scale[2], scale[4]],
  ];
  chords.forEach((chord, i) => {
    setTimeout(() => synth.triggerAttackRelease(chord, "1n"), i * 1000);
  });
}

function playSequence(scale, sequence) {
  sequence.steps.forEach((step, i) => {
    setTimeout(() => synth.triggerAttackRelease(scale[step], "1n"), i * 1000);
  });
}

document.getElementById("start-game").addEventListener("click", () => {
  // Generate random scale and sequence
  const root = scales[Math.floor(Math.random() * scales.length)];
  currentScale = generateMajorScale(root);
  currentSequence = sequences[Math.floor(Math.random() * sequences.length)];

  // Update UI
  document.querySelector(".menu").classList.add("hidden");
  document.querySelector(".game").classList.remove("hidden");
  document.getElementById("scale-name").textContent = `${root} Major Scale`;

  // Play chords and sequence
  playChords(currentScale);
  setTimeout(() => playSequence(currentScale, currentSequence), 5000);

  // Generate buttons
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = ""; // Clear previous buttons
  sequences.forEach((seq) => {
    const button = document.createElement("button");
    button.textContent = seq.name;
    button.addEventListener("click", () => {
      const feedback = seq.steps === currentSequence.steps ? "Correct!" : "Wrong!";
      document.getElementById("feedback").textContent = feedback;
    });
    optionsDiv.appendChild(button);
  });
});

document.getElementById("replay-chords").addEventListener("click", () => {
  playChords(currentScale);
});

document.getElementById("replay-notes").addEventListener("click", () => {
  playSequence(currentScale, currentSequence);
});
