import { Props } from "../types";
import { Row } from ".";

export function Wordle({ answer, attempts, attemptIndex, firstLoad, theme }: Props.Wordle) {
    return (
        <div className="flex flex-col gap-2 justify-center h-[calc(100%-12rem)]">
            {attempts.map((a, i) => 
                <Row
                    key={i}
                    word={a}
                    answer={answer}
                    revealStates={i < attemptIndex}
                    skipAnimations={firstLoad}
                    theme={theme}
                />
            )}
        </div>
    )
}