import * as Tone from "tone";
import { SEQUENCE_OPTIONS, SEQUENCE_TO_SEMITONES } from "../constants";

export function generateMajorScale(root) {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const scaleSteps = [0, 2, 4, 5, 7, 9, 11];
  const rootIndex = notes.indexOf(root);
  return scaleSteps.map(step => notes[(rootIndex + step) % notes.length]);
}

export function notesFromSequence(sequence, scale) {
  // Randomly select a register from the options
  const registers = [3, 4, 5];
  const randomRegister = registers[Math.floor(Math.random() * registers.length)];

  // Map the indices to the notes in the scale
  const firstNote = `${scale[sequence[0] % scale.length]}${randomRegister}`
  const frequency = new Tone.Frequency(firstNote); // Create Tone.Frequency object for the note
  const semitones = SEQUENCE_TO_SEMITONES[sequence[0]]
  const secondNote = frequency.transpose(semitones).toNote(); // Transpose the note by the number of semitones
  return [firstNote, secondNote]

}

export function generateChordProgression(chordNumbers, scale) {
  // Chord intervals (relative to the root of each chord)
  const chordIntervals = [0, 2, 4]; // Root, Major third, Perfect fifth (for major triads)

  // Helper function to generate a chord with 4 voices
  const generateChord = (chordNumber, scale) => {
    const chordRootIndex = (chordNumber - 1) % scale.length; // Get the root note index for the chord
    const chord = chordIntervals.map(interval => 
      scale[(chordRootIndex + interval) % scale.length] // Map intervals onto the scale
    );
    
    // Double the root in the 2nd register (octave)
    const rootWithRegister = chord[0] + "3"; // Root note in the second octave

    return [rootWithRegister, ...chord.map(note => note + "4")]; // Root in 2nd register, others in 3rd
  };

  // Generate the chord progression by applying the `generateChord` function
  const progression = chordNumbers.map(chordNumber => {
    return generateChord(chordNumber, scale);
  });

  return progression;
}