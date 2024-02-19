import { useContext } from "react";
import { motion } from "framer-motion";

import { ANIMATION_DURATION, COLOURS, GAME, SOUNDS, TEXTS } from "../constants";
import { EndScreenStates, Props, Theme } from "../types";
import { getValueFromTheme, hexToHSL, playSound } from "../utils";
import { ScoreHistory } from ".";

import { GameContext } from "../Game";


export function EndScreen({ state, answer, scoreHistory, onProceed, skipDelay }: Props.EndScreen) {
    const { theme, allowSound } = useContext(GameContext);
    const backgroundColour = hexToHSL(getValueFromTheme(theme, COLOURS.BACKGROUND));

    function onPointerDown() {
        onProceed();
        allowSound && playSound(SOUNDS.CLICK);
    }

    return (
        <motion.div
            className="grid absolute top-0 left-0 place-items-center w-full h-full"
            style={{ backgroundColor: `${getValueFromTheme((theme === Theme.States.Light) ? Theme.States.Dark : Theme.States.Light, COLOURS.BACKGROUND)}7f` }}
            initial={{
                display: "none",
                opacity: 0,
                y: "-8rem"
            }}
            animate={{
                display: "grid",
                opacity: +(state !== EndScreenStates.Hidden),
                y: `${+(state === EndScreenStates.Hidden) * -8}rem`,
                transitionEnd: { display: (state === EndScreenStates.Hidden) ? "none" : "grid" }
            }}
            transition={{
                duration: ANIMATION_DURATION.END_SCREEN_TRANSITION,
                delay: +((state !== EndScreenStates.Hidden) && !skipDelay) * (ANIMATION_DURATION.HINT_REVEAL * GAME.WORD_LENGTH)
            }}
        >
            <div
                className="flex flex-col gap-6 justify-center items-center w-80 max-md:w-full h-[32rem] max-md:h-full rounded-2xl max-md:rounded-none"
                style={{
                    color: getValueFromTheme(theme, COLOURS.TEXT),
                    backgroundColor: `hsl(${backgroundColour.l} ${backgroundColour.s}% ${backgroundColour.l}%)`
                }}
            >
                <div className="text-center gap-2">
                    <p className="text-4xl">{
                        (state === EndScreenStates.Won)
                            ? TEXTS.END_SCREEN.WON
                            : (state === EndScreenStates.Lost)
                                ? TEXTS.END_SCREEN.LOST
                                : TEXTS.END_SCREEN.HIDDEN
                    }</p>
                    {(state === EndScreenStates.Lost) && <p>Correct Answer: {answer}</p>}
                </div>
                <ScoreHistory scoreHistory={scoreHistory} />
                <div className="flex flex-col gap-4">
                    <motion.a
                        href={GAME.REPOSITORY_URL}
                        target="#_blank"
                        className="text-center underline decoration-2"
                        style={{
                            color: getValueFromTheme(theme, COLOURS.TEXT),
                            fontSize: "1rem"
                        }}
                        transition={{ duration: ANIMATION_DURATION.LINK_HOVER }}
                        whileHover={{
                            color: getValueFromTheme(theme, COLOURS.LINK),
                            fontSize: "1.1rem"
                        }}
                    >Visit the repository</motion.a>
                    <motion.button
                        className="w-60 h-16 text-xl text-white rounded-2xl"
                        initial={{ backgroundColor: getValueFromTheme(theme, COLOURS.HINT.ALIGNED) }}
                        whileHover={{
                            backgroundColor: (() => {
                                const backgroundColour = hexToHSL(getValueFromTheme(theme, COLOURS.HINT.ALIGNED));
                                return `hsl(${backgroundColour.h} ${backgroundColour.s * 1.2}% ${backgroundColour.l - 10}%)`;
                            })()
                        }}
                        onPointerDown={onPointerDown}
                    >Restart Game</motion.button>
                </div>    
            </div>
        </motion.div>
    );
}