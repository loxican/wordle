import { useEffect, useRef, useState } from "react";
import { Row } from "./components";
import { answers, validWords } from "./data";

export function Game() {
    const answer = useRef(answers[Math.floor(Math.random() * answers.length)]);
    const [attempts, setAttempts] = useState<string[]>([]);
    const [currentAttempt, setCurrentAttempt] = useState("");

    useEffect(() => {
        window.addEventListener("keydown", keyDown);
        return () => window.removeEventListener("keydown", keyDown);
    });

    function keyDown({ key }: KeyboardEvent) {
        if (key === "Enter") {
            if ((currentAttempt.length < 5) || !validWords.includes(currentAttempt)) {
                return;
            }

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
        <div className="flex flex-col gap-2">
            {attempts.map((a, i) => 
                <Row
                    key={i}
                    word={a}
                    answer={answer.current}
                />
            )}
            <Row
                word={currentAttempt}
                answer=""    
            />
            <input />
        </div>
    );
}