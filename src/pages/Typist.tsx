import { ListRestart } from "lucide-react";
import React, { useMemo, useState } from "react";
import Button from "../components/Button";
import {
  Page,
  PageBody,
  PageDescription,
  PageHeader,
  PageTitle,
} from "../components/Page";
import { wordBank } from "../dummyData/wordbank";
import { cn } from "../utils/cn";

function getRandomWord() {
  return wordBank[Math.floor(Math.random() * wordBank.length - 1)];
}

function generateRandomWordBank(wordLength: number = 40) {
  const randomWordBank = [];
  for (let i = 0; i < wordLength; i++) {
    randomWordBank.push(getRandomWord());
  }

  return randomWordBank;
}

interface IncorrectLettersType {
  [wordIndex: number]: {
    [letterIndex: number]: boolean;
  };
}

const Typist = () => {
  const [words, setWords] = useState(generateRandomWordBank());

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  const [userInput, setUserInput] = useState("");

  const [incorrectLetters, setIncorrectLetters] =
    useState<IncorrectLettersType>({});

  function resetGame() {
    setWords(generateRandomWordBank());
    setCurrentWordIndex(0);
    setCurrentLetterIndex(0);
    setIncorrectLetters({});
    setUserInput("");
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    setUserInput(input);

    const currentWord = words[currentWordIndex];
    const currentLetter = currentWord[currentLetterIndex];

    if (input.endsWith(" ") || input.length > currentWord.length) {
      // End of word
      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentLetterIndex(0);
      setUserInput("");

      // when user skips the word by pressing space, mark the skipped letters into incorrect state
      if (currentLetterIndex < currentWord.length) {
        for (let i = currentLetterIndex; i < currentWord.length; i++) {
          // Mark the letter as incorrect in the incorrectLetters state
          setIncorrectLetters((prev) => {
            return {
              ...prev,
              [currentWordIndex]: {
                ...prev[currentWordIndex],
                [i]: true,
              },
            };
          });
        }
      }

      //end of sentence
      if (currentWordIndex === words.length - 1) {
        resetGame();
      }
    } else if (input.length <= currentLetterIndex + 1) {
      // Check if the letter is correct
      if (input[currentLetterIndex] !== currentLetter) {
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

  // Memoize total incorrect letters calculation
  const totalIncorrectLetters = useMemo(() => {
    return Object.values(incorrectLetters).reduce(
      (acc, letters) => acc + Object.keys(letters).length,
      0
    );
  }, [incorrectLetters]);

  // Memoize total incorrect words calculation
  const totalIncorrectWords = useMemo(() => {
    return Object.keys(incorrectLetters).length;
  }, [incorrectLetters]);

  return (
    <Page>
      <PageHeader>
        <PageTitle>Typist</PageTitle>
        <PageDescription>
          A small copy of the 'monkey type' app to check your typing.
        </PageDescription>
      </PageHeader>

      <PageBody>
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

          <Button className="w-auto py-2" onClick={resetGame}>
            <ListRestart className="size-5 mr-2" />
            <span className="text-lg">Reset</span>
          </Button>
        </div>

        <div className="mt-6">
          <p className="font-bold uppercase tracking-wide">Mistakes</p>
          <p>Letters: {totalIncorrectLetters}</p>
          <p>Words: {totalIncorrectWords}</p>
        </div>
      </PageBody>
    </Page>
  );
};

export default Typist;
