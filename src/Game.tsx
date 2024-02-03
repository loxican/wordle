import { useEffect, useState, useCallback } from "react";

import { GAME, KEYS } from "./constants";
import { answers, validWords } from "./data";
import { EndScreenStates, Hint, LocalStorageKeys } from "./types";
import { Row, Key, EndScreen } from "./components";
import { chooseRandomFromArray, countOccurrencesOfCharacters, getCharactersWithOverlap } from "./utils";

export function Game() {
    // TODO: add score history
    const [answer, setAnswer] = useState((localStorage.getItem(LocalStorageKeys.Answer) === null) ? chooseRandomFromArray(answers) : localStorage.getItem(LocalStorageKeys.Answer)!);
    const [attempts, setAttempts] = useState((localStorage.getItem(LocalStorageKeys.Attempts) === null) ? Array<string>(GAME.MAX_ATTEMPTS).fill("") : JSON.parse(localStorage.getItem(LocalStorageKeys.Attempts)!) as string[]);
    const [attemptIndex, setAttemptIndex] = useState((localStorage.getItem(LocalStorageKeys.AttemptIndex) === null) ? 0 : +localStorage.getItem(LocalStorageKeys.AttemptIndex)!);
    const [keyStates, setKeyStates] = useState<Record<string, Hint.States>>(Object.fromEntries(KEYS.join("").split("").map((c) => [c, Hint.States.Awaiting])));
    const [endScreenState, setEndScreenState] = useState(
        (attempts[Math.min(attemptIndex, GAME.MAX_ATTEMPTS - 1)] === answer)
            ? EndScreenStates.Won
            : (attemptIndex >= GAME.MAX_ATTEMPTS)
                ? EndScreenStates.Lost
                : EndScreenStates.Hidden
    );

    const [firstLoad, setFirstLoad] = useState(true);
    const keyStateHandler = useCallback((i: number) => {
        handleKeyStates(i);
    }, [handleKeyStates]);

    localStorage.setItem(LocalStorageKeys.Answer, answer);
    localStorage.setItem(LocalStorageKeys.Attempts, JSON.stringify(attempts));
    localStorage.setItem(LocalStorageKeys.AttemptIndex, `${attemptIndex}`);

    useEffect(() => {
        for (const i of Array(attemptIndex).keys()) {
            keyStateHandler(i);
        }

        setFirstLoad(false);
    }, [attemptIndex, keyStateHandler]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    });

    function handleKeyPress({ key }: KeyboardEvent) {
        if (attemptIndex >= GAME.MAX_ATTEMPTS) {
            return;
        }

        const newAttempts = Array.from(attempts);
        const currentAttempt = attempts[attemptIndex];

        if (key === "Enter") {
            if ((currentAttempt.length < 5) || (!validWords.includes(currentAttempt) && !answers.includes(currentAttempt))) {
                return;
            }

            handleKeyStates(attemptIndex);

            if (attempts[attemptIndex] === answer) {
                setEndScreenState(EndScreenStates.Won);
            } else if ((attemptIndex + 1) >= GAME.MAX_ATTEMPTS) {
                setEndScreenState(EndScreenStates.Lost);
            }

            setAttemptIndex(attemptIndex + 1);
            localStorage.setItem(LocalStorageKeys.AttemptIndex, `${attemptIndex + 1}`);

            return;
        }

        if (key === "Backspace") {
            if (!currentAttempt.length) {
                return;
            }

            newAttempts[attemptIndex] = newAttempts[attemptIndex].substring(0, currentAttempt.length - 1);
            
            setAttempts(newAttempts);
            localStorage.setItem(LocalStorageKeys.Attempts, JSON.stringify(newAttempts));
            
            return;
        }

        if (!/[a-zA-Z]/.test(key) || (key.length > 1) || (currentAttempt.length >= 5)) {
            return;
        }

        newAttempts[attemptIndex] = currentAttempt + key;

        setAttempts(newAttempts);
        localStorage.setItem(LocalStorageKeys.Attempts, JSON.stringify(newAttempts));
    }

    function handleKeyStates(attemptIndex: number) {
        const newKeyStates = keyStates;
        const attempt = attempts[Math.min(attemptIndex, GAME.MAX_ATTEMPTS - 1)];

        const overlappedCharacters = getCharactersWithOverlap(attempt, answer);
        const characterOccurrences = countOccurrencesOfCharacters(answer);

        for (const c of overlappedCharacters) {
            if (!c) {
                continue;
            }

            characterOccurrences[c]--;

            newKeyStates[c] = Hint.States.Aligned;
        }

        for (const c of [...attempt]) {
            if (newKeyStates[c] === Hint.States.Aligned) {
                continue;
            }

            if (answer.includes(c) && characterOccurrences[c]) {
                characterOccurrences[c]--;
                
                newKeyStates[c] = Hint.States.Misplaced;
                continue;
            }
            
            newKeyStates[c] = Hint.States.Unavailable;
        }

        setKeyStates(newKeyStates);
    }

    function resetGame() {
        const newAnswer = chooseRandomFromArray(answers);
        setAnswer(newAnswer);
        localStorage.setItem(LocalStorageKeys.Answer, newAnswer);

        const newAttempts = Array(GAME.MAX_ATTEMPTS).fill("");
        setAttempts(newAttempts);
        localStorage.setItem(LocalStorageKeys.Attempts, JSON.stringify(newAttempts));

        const newAttemptIndex = 0;
        setAttemptIndex(newAttemptIndex);
        localStorage.setItem(LocalStorageKeys.AttemptIndex, `${newAttemptIndex}`);

        setKeyStates(Object.fromEntries(KEYS.join("").split("").map((c) => [c, Hint.States.Awaiting])));
        setEndScreenState(EndScreenStates.Hidden);
        setFirstLoad(true);
    }

    // TODO: put elements into separate components
    return (
        <div className="overflow-hidden relative p-4 w-screen max-md:w-[100svw] h-screen max-md:h-[100svh]">
            <div className="flex flex-col gap-2">
                {attempts.map((a, i) => 
                    <Row
                        key={i}
                        word={a}
                        answer={answer}
                        revealStates={i < attemptIndex}
                        skipAnimations={firstLoad}
                    />
                )}
            </div>
            <div className="flex flex-col absolute left-1/2 max-md:left-0 bottom-0 gap-2 p-2 w-[24rem] max-md:w-full md:-translate-x-1/2">
                <div className="flex flex-col gap-1">
                    {KEYS.map((keys, i) =>
                        <div
                            key={i}
                            className="flex flex-row gap-[1%] justify-center w-full"
                        >
                            {keys.split("").map((c, i) =>
                                <Key 
                                    key={i}
                                    letter={c}
                                    state={keyStates[c]}
                                />
                            )}
                        </div>
                    )}
                </div>
                <div className="flex flex-row justify-between h-10">
                    <Key
                        letter="Backspace"
                        state={Hint.States.Awaiting}
                        width="20%"
                        displayLetter="⌫"
                    />
                    <Key
                        letter="Enter"
                        state={Hint.States.Awaiting}
                        width="20%"
                        displayLetter="⏎"
                    />
                </div>
            </div>
            <EndScreen
                state={endScreenState}
                answer={answer}
                onProceed={resetGame}
                skipDelay={firstLoad}
            />
        </div>
    );
}