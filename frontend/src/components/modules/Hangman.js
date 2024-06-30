import React, { useEffect, useState } from "react";
import "../styles/Hangman.css";
import clickSound from "../../assets/click-sound.mp3";
import HangmanWords from "../../data/hangmanWords.json";

export default function Hangman() {
  const [guessWord, setGuessWord] = useState("");
  const [currLevel, setCurrentLevel] = useState(1);
  const [blanks, setBlanks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [playerWon, setPlayerWon] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);
  const [clickedLetter, setClickedLetter] = useState([]);

  const highestLevel = HangmanWords.reduce((max, item) => {
    return item.level > max ? item.level : max;
}, 0);

  useEffect(() => {
    const data = HangmanWords.filter((item) => item.level === currLevel);
    if (data) {
      setGuessWord(data[0].word.toUpperCase());
      setBlanks(Array(data[0].word.length).fill("_"));
    }
  }, [currLevel]);

  const checkTheLetter = (letter) => {
    // play audio
    playaudio();
    // disable the clicked button
    setClickedLetter((prevClickedLetters) => [...prevClickedLetters, letter]);
    // scroll to the hangman
    scrollToHangman();

    // check if the guessed letter is in the word
    const newBlanks = [...blanks];
    const correctGuess = guessWord.split("").map((character, ind) => {
      if (character === letter) {
        newBlanks[ind] = character;
        return true;
      }
      return false;
    });
    if (correctGuess.includes(true)) {
      setBlanks(newBlanks);
      checkIfWon(newBlanks);
    } else {
      setWrongCount((prevCount) => {
        if (wrongCount < 7) {
          return prevCount + 1;
        } else {
          setShowPopup(true);
          return prevCount;
        }
      });
    }
  };

  const checkIfWon = (newBlanks) => {
    const allBlanksFilled = newBlanks.every((blank) => blank!== "_");
    if(allBlanksFilled) {
        setShowPopup(true);
        setPlayerWon(true);
    }
  }

  const playaudio = () => {
    const sound = new Audio(clickSound);
    sound.volume = 0.3;
    sound.play();
  };

  const scrollToHangman = () => {
    const hangpollPos = document.querySelector(
      ".hangman-container .hangman-display .hangman-poll"
    );
    if (hangpollPos) {
      hangpollPos.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextLevel = () => {
    setCurrentLevel((prevLevel) => prevLevel + 1);
    setWrongCount(0);
    setClickedLetter([]);
    setShowPopup(false);
    setPlayerWon(false);
  }

  const retryGame = () => {
    setBlanks(Array(guessWord.length).fill("_"));
    setWrongCount(0);
    setClickedLetter([]);
    setShowPopup(false);
  };

  const restartGame = () => {
    setCurrentLevel(1);
    setWrongCount(0);
    setClickedLetter([]);
    setShowPopup(false);
    setPlayerWon(false);
  };

  return (
    <>
      <div className="game-background"></div>
      {showPopup && (
        <>
          <div className="game-popup-backscreen"></div>
          <div className="game-popup">
            {
                currLevel === highestLevel? (
                  <h2>Congratulations! You've completed all levels. More Coming soon</h2>
                ) : (
                  <h2>
                    {playerWon? "You Won!" : "You Lost!"} Level {currLevel}
                  </h2>
                )
  
            }
            <div className="button-content">
                {
                    playerWon?
                    (currLevel===highestLevel?<button onClick={restartGame}>Restart</button>:<button onClick={nextLevel}>Next Level</button>):
              <button onClick={retryGame}>Retry</button>
                }
              <button onClick={restartGame}>Exit</button>
            </div>
          </div>
        </>
      )}
      <div className="hangman-container text-center">
        <div className="hangman-header">
          <h1>Hangman</h1>
        </div>
        <div className="hangman-display">
          <div
            className={`hangman-poll ${
              wrongCount > 0 ? "hang-" + wrongCount : ""
            }`}
          ></div>
        </div>
        <div className="hangman-word-guess">
          <div className="blank-block">
            {blanks.map((item, i) => {
              return (
                <span className="blank-space" key={`blank-${i}`}>
                  {item}
                </span>
              );
            })}
          </div>
          <div className="keyboard-block">
            {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => {
              return (
                <button
                  className={`${
                    clickedLetter.includes(letter) ? "isClicked" : ""
                  }`}
                  key={letter}
                  onClick={() => checkTheLetter(letter)}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
