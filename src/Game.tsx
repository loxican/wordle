import { useEffect, useState } from "react";

import { KEYS } from "./consts";
import { answers, validWords } from "./data";
import { Key as KeyTypes } from "./types";
import { Row, Key } from "./components";
import { chooseRandomFromArray, countOccurrencesOfCharacters, getCharactersWithOverlap } from "./utils";

export function Game() {
    const [answer, setAnswer] = useState(chooseRandomFromArray(answers));
    const [attempts, setAttempts] = useState<string[]>([]);
    const [currentAttempt, setCurrentAttempt] = useState("");
    const [keyStates, setKeyStates] = useState<Record<string, KeyTypes.States>>(Object.fromEntries(KEYS.join("").split("").map((c) => [c, KeyTypes.States.Unassigned])))

    useEffect(() => {
        window.addEventListener("keydown", keyDown);
        return () => window.removeEventListener("keydown", keyDown);
    });

    function keyDown({ key }: KeyboardEvent) {
        if (key === "Enter") {
            if ((currentAttempt.length < 5) || !validWords.includes(currentAttempt) || !answers.includes(currentAttempt)) {
                return;
            }

            const newKeyStates = keyStates;
            const overlappedCharacters = getCharactersWithOverlap(currentAttempt, answer);
            const characterOccurences = countOccurrencesOfCharacters(answer);

            for (const c of overlappedCharacters) {
                if (!c) {
                    continue;
                }

                characterOccurences[c]--;

                newKeyStates[c] = KeyTypes.States.Aligned;
            }

            for (const c of [...currentAttempt]) {
                if (newKeyStates[c] === KeyTypes.States.Aligned) {
                    continue;
                }

                if (answer.includes(c) && characterOccurences[c]) {
                    characterOccurences[c]--;
                    
                    newKeyStates[c] = KeyTypes.States.Misplaced;
                    continue;
                }
                
                newKeyStates[c] = KeyTypes.States.Unavaliable;
            }

            setKeyStates(newKeyStates);  

            setAttempts([...attempts, currentAttempt]);
            setCurrentAttempt("");

            return;
        }

        if (key === "Backspace") {
            if (!currentAttempt.length) {
                return;
            }

            setCurrentAttempt(currentAttempt.substring(0, currentAttempt.length - 1));

            return;
        }

        if (!/[a-zA-Z]/.test(key) || (key.length > 1) || (currentAttempt.length >= 5)) {
            return;
        }

        setCurrentAttempt(currentAttempt + key.toLowerCase());
    }
 
    return (
        <>
            <div className="flex flex-col gap-2">
                {attempts.map((a, i) => 
                    <Row
                        key={i}
                        word={a}
                        answer={answer}
                        revealStates
                    />
                )}
                <Row
                    word={currentAttempt}
                    answer={answer}
                />
            </div>
            <div className="absolute bottom-0 flex flex-col gap-2 w-full">
                <div className="h-12">
                    <Key
                        letter="Backspace"
                        state={KeyTypes.States.Unassigned}
                        classes="absolute left-0 w-32"
                        displayLetter="⌫"
                    />
                    <Key
                        letter="Enter"
                        state={KeyTypes.States.Unassigned}
                        classes="absolute right-0 w-32"
                        displayLetter="⏎"
                    />
                </div>
                <div className="flex flex-col h-36">
                    {KEYS.map((keys, i) =>
                        <div
                            key={i}
                            className="flex flex-row justify-center"
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
            </div>
        </>
    );
}