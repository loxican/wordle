import { useContext } from "react";

import { Props } from "../types";
import { Row } from ".";

import { GameContext } from "../Game";

export function Wordle({ answer, attempts, attemptIndex }: Props.Wordle) {
    const { firstLoad } = useContext(GameContext);

    return (
        <div className="flex flex-col gap-2 justify-center h-[calc(100%-12rem)]">
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
    )
}