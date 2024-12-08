import React, { useState } from "react";
import * as Tone from "tone";
import { generateMajorScale, notesFromSequence, generateChordProgression } from "../utils/scaleUtils";
import { playChord, playSequence, playChordProgression, initializeSynth } from "../utils/audioUtils";
import { SEQUENCE_OPTIONS } from "../constants";  // Import the sequence options
import "./../assets/styles/Game.css";

const Game = () => {
  const [feedback, setFeedback] = useState("");
  const [scale, setScale] = useState([]);
  const [root, setRoot] = useState("");  // State to store the random root
  const [progression, setProgression] = useState([]);
  const [sequence, setSequence] = useState([]);
  const [sequenceNotes, setSequenceNotes] = useState([]);
  const [quizOptions, setQuizOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  
  const playQuizChordProgression = async () => {
	console.log("Playing chord progression", progression);
	playChordProgression(progression);  
  };
  
  const playQuizSequence = async () => {
	console.log("Playing the sequence:", sequence, sequenceNotes);
    playSequence(sequenceNotes);
  };
  
  // Helper function to start the game
  const startGame = async () => {
	initializeSynth();
	
    // Choose a random root for the scale
    const roots = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const randomRoot = roots[Math.floor(Math.random() * roots.length)];
    setRoot(randomRoot);
	console.log("Random Root Selected:", randomRoot);
	
    // Generate a major scale for the chosen root
    const majorScale = generateMajorScale(randomRoot);
    setScale(majorScale);
	console.log("Major Scale Generated:", majorScale);
	
    // Generate the 1-4-5-1 chord progression
    const chordProgression = generateChordProgression([1, 4, 5, 1], majorScale);
    setProgression(chordProgression);
	console.log("Chord Progression Generated:", chordProgression);
	await playChordProgression(chordProgression); // Play the chord progression
	
    // Generate a random sequence of notes
	const randomIndex = Math.floor(Math.random() * SEQUENCE_OPTIONS.length);
    const sequenceIndices = SEQUENCE_OPTIONS[randomIndex];
	console.log("Random Sequence Generated:", sequenceIndices);
	setSequence(sequenceIndices);
	
	const notesToPlay = notesFromSequence(sequenceIndices, majorScale);
    console.log("Sequence Notes Generated:", notesToPlay);
	setSequenceNotes(notesToPlay);
	await playSequence(notesToPlay);
	
    // Present options to the player based on the random sequence
    setQuizOptions(SEQUENCE_OPTIONS);

    // Set the game state to "started"
    setGameStarted(true);
  };

  // Helper function to check if the selected option is correct
  const checkAnswer = (option) => {
	console.log("Checking answer for option:", option);
	console.log("Correct Answer:", sequence);
    if (JSON.stringify(option) === JSON.stringify([sequence[0], sequence[1]])) {
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect, try again.");
    }
    setSelectedOption(option);
  };

  // Helper function to regenerate the quiz
  const regenerateQuiz = () => {
    setSelectedOption(null);
    setFeedback("");
    startGame();
  };

  
  // Dynamically style the chosen option
  const getOptionStyle = (option) => {
    if (selectedOption && JSON.stringify(option) === JSON.stringify([sequence[0], sequence[1]])) {
      return { backgroundColor: "green" }; // Correct answer
    } else if (selectedOption && JSON.stringify(option) !== JSON.stringify([sequence[0], sequence[1]])) {
      return { backgroundColor: "red" }; // Incorrect answer
    }
    return {}; // Default style if not selected
  };

  return (
    <div className="game-container">
      {!gameStarted ? (
        <button onClick={startGame}>Start Game</button>
      ) : (
        <div>
          <h2>Root: {root}</h2>    
          <button onClick={playQuizChordProgression}>Play Chord Progression Again</button>
          <button onClick={playQuizSequence}>Play Sequence Again</button>
          <button onClick={regenerateQuiz}>Next Quiz</button>
          <div>
            <h3>Select the correct sequence:</h3>
            <div className="options">
              {quizOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  style={getOptionStyle(option)} // Apply dynamic styles based on the player's choice
                >
                  {option[0] + 1} -> {option[1] + 1}
                </button>
              ))}
            </div>
            <div>{feedback && <p>{feedback}</p>}</div>
          </div>
        </div>
      )}
    </div>
  );
};


export default Game;