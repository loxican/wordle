import { useEffect, useState, useCallback } from "react";

import { ANIMATION_DURATION, COLOURS, GAME, IMAGES, KEYS, TEXTS } from "./constants";
import { EndScreenStates, HintStates, LocalStorageKeys, Theme } from "./types";
import { answers, validWords } from "./data";
import { Wordle, EndScreen, Keyboard, Icon, MessageList } from "./components";
import { chooseRandomFromArray, countOccurrencesOfCharacters, getCharactersWithOverlap, getColourFromTheme } from "./utils";

export function Game() {
    const [answer, setAnswer] = useState((localStorage.getItem(LocalStorageKeys.Answer) === null) ? chooseRandomFromArray(answers) : localStorage.getItem(LocalStorageKeys.Answer)!);
    const [attempts, setAttempts] = useState((localStorage.getItem(LocalStorageKeys.Attempts) === null) ? Array<string>(GAME.MAX_ATTEMPTS).fill("") : JSON.parse(localStorage.getItem(LocalStorageKeys.Attempts)!) as string[]);
    const [attemptIndex, setAttemptIndex] = useState((localStorage.getItem(LocalStorageKeys.AttemptIndex) === null) ? 0 : +localStorage.getItem(LocalStorageKeys.AttemptIndex)!);
    const [scoreHistory, setScoreHistory] = useState((localStorage.getItem(LocalStorageKeys.ScoreHistory) === null) ? Array<number>(GAME.MAX_ATTEMPTS + 1).fill(0) : JSON.parse(localStorage.getItem(LocalStorageKeys.ScoreHistory)!) as number[]);
    const [keyStates, setKeyStates] = useState<Record<string, HintStates>>(Object.fromEntries(KEYS.join("").split("").map((c) => [c, HintStates.Awaiting])));
    const [endScreenState, setEndScreenState] = useState(
        (attempts[Math.min(attemptIndex - 1, GAME.MAX_ATTEMPTS - 1)] === answer)
            ? EndScreenStates.Won
            : (attemptIndex >= GAME.MAX_ATTEMPTS)
                ? EndScreenStates.Lost
                : EndScreenStates.Hidden
    );

    const [firstLoad, setFirstLoad] = useState(true);
    const [messageTexts, setMessageTexts] = useState<string[]>([]);
    const [theme, setTheme] = useState<Theme.States>(
        (localStorage.getItem(LocalStorageKeys.Theme) === null)
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
                ? Theme.States.Dark
                : Theme.States.Light
            : +(localStorage.getItem(LocalStorageKeys.Theme)!)
    );

    const handleKeyStates = useCallback((i: number) => {
        const newKeyStates = keyStates;
        const attempt = attempts[Math.min(i, GAME.MAX_ATTEMPTS - 1)];

        const overlappedCharacters = getCharactersWithOverlap(attempt, answer);
        const characterOccurrences = countOccurrencesOfCharacters(answer);

        for (const c of overlappedCharacters) {
            if (!c) {
                continue;
            }

            characterOccurrences[c]--;

            newKeyStates[c] = HintStates.Aligned;
        }

        for (const c of [...attempt]) {
            if ([HintStates.Misplaced, HintStates.Aligned].includes(newKeyStates[c])) {
                continue;
            }

            if (answer.includes(c) && characterOccurrences[c]) {
                characterOccurrences[c]--;
                
                newKeyStates[c] = HintStates.Misplaced;
                continue;
            }
            
            newKeyStates[c] = HintStates.Unavailable;
        }

        setKeyStates(newKeyStates);
    }, [answer, attempts, keyStates]);  

    const handleKeyPress = useCallback(({ key }: KeyboardEvent) => {
        if (attemptIndex >= GAME.MAX_ATTEMPTS) {
            return;
        }

        const newAttempts = Array.from(attempts);
        const currentAttempt = attempts[attemptIndex];

        if (key === "Enter") {
            if ((currentAttempt.length < 5)) {
                const newMessageTexts = Array.from(messageTexts);
                newMessageTexts.push(TEXTS.MESSAGE.WORD_TOO_SHORT);
                setMessageTexts(newMessageTexts);

                return;
            }

            if (!validWords.includes(currentAttempt) && !answers.includes(currentAttempt)) {
                const newMessageTexts = Array.from(messageTexts);
                newMessageTexts.push(TEXTS.MESSAGE.INVALID_WORD);
                setMessageTexts(newMessageTexts);

                return;
            }

            const keyStateHandler = setTimeout(() => {
                handleKeyStates(attemptIndex);
                setFirstLoad(true);
            }, (ANIMATION_DURATION.HINT_REVEAL * (GAME.MAX_ATTEMPTS - 1)) * 1000);
            const newScoreHistory = Array.from(scoreHistory);

            if (attempts[attemptIndex] === answer) {
                newScoreHistory[attemptIndex]++;
                setEndScreenState(EndScreenStates.Won);
            } else if (attemptIndex >= (GAME.MAX_ATTEMPTS - 1)) {
                newScoreHistory[GAME.MAX_ATTEMPTS]++;
                setEndScreenState(EndScreenStates.Lost);
            }

            setScoreHistory(newScoreHistory);
            localStorage.setItem(LocalStorageKeys.ScoreHistory, JSON.stringify(newScoreHistory));

            setAttemptIndex(attemptIndex + 1);
            localStorage.setItem(LocalStorageKeys.AttemptIndex, `${attemptIndex + 1}`);

            return () => {
                clearTimeout(keyStateHandler);
            };
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
    }, [answer, attempts, attemptIndex, handleKeyStates, scoreHistory, setFirstLoad, messageTexts]);

    useEffect(() => {
        localStorage.setItem(LocalStorageKeys.Answer, answer);
        localStorage.setItem(LocalStorageKeys.Attempts, JSON.stringify(attempts));
        localStorage.setItem(LocalStorageKeys.AttemptIndex, `${attemptIndex}`);

        window.addEventListener("keydown", handleKeyPress);

        for (const i of Array(attemptIndex).keys()) {
            handleKeyStates(i);
        }

        setFirstLoad(false);

        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [answer, attempts, attemptIndex, handleKeyStates, handleKeyPress]);

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

        setKeyStates(Object.fromEntries(KEYS.join("").split("").map((c) => [c, HintStates.Awaiting])));
        setEndScreenState(EndScreenStates.Hidden);
        setFirstLoad(true);
    }

    function toggleTheme() {
        const newTheme = (theme === Theme.States.Light) ? Theme.States.Dark : Theme.States.Light;
        
        setTheme(newTheme);
        localStorage.setItem(LocalStorageKeys.Theme, `${newTheme}`);
        
        setFirstLoad(true);
    }

    return (
        <div 
            className="overflow-hidden relative p-4 w-screen max-md:w-[100svw] max-w-full h-screen max-md:h-[100svh] max-h-full select-none"
            style={{ backgroundColor: getColourFromTheme(theme, COLOURS.BACKGROUND) }}
        >
            <Wordle
                answer={answer}
                attempts={attempts}
                attemptIndex={attemptIndex}
                firstLoad={firstLoad}
                theme={theme}
            />
            <Keyboard
                keyStates={keyStates}
                firstLoad={firstLoad}
                theme={theme}
            />
            <EndScreen
                state={endScreenState}
                answer={answer}
                scoreHistory={scoreHistory}
                onProceed={resetGame}
                skipDelay={firstLoad}
                theme={theme}
            />
            <Icon
                src={(theme === Theme.States.Light) ? IMAGES.ICONS.DARK : IMAGES.ICONS.LIGHT}
                className="absolute top-2 left-2 w-8 max-md:w-6"
                onClick={toggleTheme}
            />
            <MessageList
                texts={messageTexts}
                theme={theme}
            />
        </div>
    );
}