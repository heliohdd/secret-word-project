import "./App.css";

import { useCallback, useEffect, useState } from "react";

import { wordsList } from "./data/words";

import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedCategory, setPickedCategory] = useState("");
  const [pickedWord, setPickedWord] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0);

  // Etapa 1.1 - Definir categoria e palavra do jogo
  const pickWordAndCategory = () => {
    // 1.1.1 - Selecionar categoria
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // 1.1.2 - Selecionar palavra
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { category, word };
  };

  // Etapa 1 - Começar o jogo (Tela Game)
  const startGame = () => {
    // 1.2 - Armazenar categoria e palavra para iniciar jogo
    const { category, word } = pickWordAndCategory();

    // 1.3 - Criar array com as letras
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    console.log(`As letras são: ${wordLetters}`);

    // 1.4 - Atribuir valores dos estados (States)
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  };

  // Etapa 2 - Terminar o jogo
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  };

  // Etapa 3 - Reiniciar o jogo
  const retry = () => {
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
