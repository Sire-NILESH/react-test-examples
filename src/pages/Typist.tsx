import React, { useState } from "react";
import { wordBank } from "../dummyData/wordbank";
import { cn } from "../utils/cn";
import Button from "../components/Button";
import { ListRestart } from "lucide-react";

function getRandomWord() {
  return wordBank[Math.floor(Math.random() * wordBank.length - 1)];
}

function generateRandomWordBank(wordLength: number = 40) {
  const randomWordBank = [];
  for (let i = 0; i < wordLength; i++) {
    randomWordBank.push(getRandomWord());
  }
  //   return randomWordBank.join(" ");
  return randomWordBank;
}

type IncorrectLettersType = {
  [wordIndex: number]: {
    [letterIndex: number]: boolean;
  };
};

const Typist = () => {
  const [words, setWords] = useState(generateRandomWordBank());

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  const [userInput, setUserInput] = useState("");

  const [incorrectLetters, setIncorrectLetters] =
    useState<IncorrectLettersType>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    setUserInput(input);

    const currentWord = words[currentWordIndex];
    const currentLetter = currentWord[currentLetterIndex];

    if (input.endsWith(" ")) {
      // End of word
      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentLetterIndex(0);
      setUserInput("");

      //end of sentence
      if (currentWordIndex === words.length - 1) {
        setWords(generateRandomWordBank());
        setCurrentWordIndex(0);
      }
    } else if (input.length <= currentLetterIndex + 1) {
      // Check if the letter is correct
      if (input[currentLetterIndex] !== currentLetter) {
        // setIncorrectLetters((prev) => prev + 1);

        // Mark the letter as incorrect in the incorrectLetters state
        setIncorrectLetters((prev) => {
          return {
            ...prev,
            [currentWordIndex]: {
              ...prev[currentWordIndex],
              [currentLetterIndex]: true,
            },
          };
        });
      }
      setCurrentLetterIndex((prev) => prev + 1);
    }
  };

  // Calculate total incorrect letters
  const totalIncorrectLetters = Object.values(incorrectLetters).reduce(
    (acc, letters) => acc + Object.keys(letters).length,
    0
  );

  const totalIncorrectWords = Object.values(incorrectLetters).flat().length;

  return (
    <div className="mx-auto container p-2">
      <header className="mt-10 sm:mt-0 mb-10">
        <h2 className="font-semibold text-lg">Typist</h2>
        <p className="text-muted-foreground max-w-lg">
          A small copy of the 'monkey type' app to check your typing.
        </p>
      </header>

      <div className="max-w-lg rounded-md border border-border p-4 font-mono font-bold text-lg text-muted-foreground">
        {/* WORD */}
        {words.map((word, wordIndex) => (
          <span
            key={wordIndex}
            className={cn(
              "inline-block",
              currentWordIndex > wordIndex ? "text-foreground" : ""
            )}
          >
            {/* LETTER */}
            {word.split("").map((letter, letterIndex) => {
              const isCurrentLetter =
                wordIndex === currentWordIndex &&
                letterIndex === currentLetterIndex;

              const isIncorrectLetter =
                incorrectLetters[wordIndex]?.[letterIndex];

              return (
                <span
                  key={wordIndex + "-" + letterIndex}
                  className={cn(
                    isCurrentLetter ? "current-letter" : "",
                    isIncorrectLetter ? "incorrect-letter" : "",
                    currentLetterIndex > letterIndex &&
                      currentWordIndex === wordIndex
                      ? "text-foreground"
                      : ""
                  )}
                >
                  {letter}
                </span>
              );
            })}
            <span
              className={cn(
                // "inline-block",
                currentWordIndex === wordIndex &&
                  currentLetterIndex === words[currentWordIndex].length
                  ? "underline"
                  : ""
              )}
            >
              {"\u00A0"}
            </span>
          </span>
        ))}
      </div>

      <div className="max-w-lg mt-10 flex flex-col md:flex-row md:items-center gap-4">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          // autoFocus
          placeholder={
            currentWordIndex > 0 || currentLetterIndex > 0
              ? undefined
              : "start typing..."
          }
          className="w-full px-4 py-2 border border-border rounded-full bg-secondary"
        />

        <Button
          className="w-auto py-2"
          onClick={() => setWords(generateRandomWordBank())}
        >
          <ListRestart className="size-4 mr-2" />
          <span>Reset</span>
        </Button>
      </div>

      <div className="mt-6">
        <p className="font-bold uppercase tracking-wide">Mistakes</p>
        <p>Letters: {totalIncorrectLetters}</p>
        <p>Words: {totalIncorrectWords}</p>
      </div>
    </div>
  );
};

export default Typist;
