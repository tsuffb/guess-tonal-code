import * as Tone from "tone";

let synth; // Synth will be initialized once here

// Function to initialize the synth
export function initializeSynth() {
  if (!synth) { // Only initialize if it's not already initialized
    synth = new Tone.PolySynth(Tone.Synth).toDestination();
  }
}

// Function to play a single chord
export async function playChord(chordNotes) {
  await Tone.start();
  await synth.triggerAttackRelease(chordNotes, "2n");
}

// Function to play a chord progression
export async function playChordProgression(chords) {
  for (let i = 0; i < chords.length; i++) {
    await playChord(chords[i]); // Wait for the chord to finish before playing the next one
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay between chords
  }
}

// Function to play a sequence of notes
export async function playSequence(sequence) {
  const now = Tone.now();

  for (let i = 0; i < sequence.length; i++) {
    const convertedNote = Tone.Frequency(sequence[i]).toFrequency(); // Convert note name to frequency
    const time = now + i * 0.5; // Schedule notes every 0.5 seconds
    await synth.triggerAttackRelease(convertedNote, "8n", time); // Trigger note
  }
}
