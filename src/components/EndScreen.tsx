import { motion } from "framer-motion";

import { ANIMATION_DURATION, COLOURS, GAME } from "../constants";
import { EndScreenStates, Props, Theme } from "../types";
import { getColourFromTheme, hexToHSL } from "../utils";
import { ScoreHistory } from ".";

export function EndScreen({ state, answer, scoreHistory, onProceed, skipDelay, theme }: Props.EndScreen) {
    const backgroundColour = hexToHSL(getColourFromTheme(theme, COLOURS.BACKGROUND));

    return (
        <motion.div
            className="grid absolute top-0 left-0 place-items-center w-full h-full"
            style={{ backgroundColor: `${getColourFromTheme((theme === Theme.States.Light) ? Theme.States.Dark : Theme.States.Light, COLOURS.BACKGROUND)}7f` }}
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
                    color: getColourFromTheme(theme, COLOURS.TEXT),
                    backgroundColor: `hsl(${backgroundColour.l} ${backgroundColour.s}% ${backgroundColour.l}%)`
                }}
            >
                <div className="text-center gap-2">
                    <p className="text-4xl">{
                        (state === EndScreenStates.Hidden)
                            ? "Restarting Game..."
                            : (state === EndScreenStates.Won)
                                ? "You won!"
                                : "You lost!"
                    }</p>
                    {(state === EndScreenStates.Lost) && <p>Correct Answer: {answer}</p>}
                </div>
                <ScoreHistory 
                    scoreHistory={scoreHistory}
                    backgroundColour={backgroundColour}
                    theme={theme}
                />
                <div className="flex flex-col gap-4">
                    <motion.a
                        href={GAME.REPOSITORY_URL}
                        target="#_blank"
                        className="text-center underline decoration-2"
                        style={{
                            color: getColourFromTheme(theme, COLOURS.TEXT),
                            fontSize: "1rem"
                        }}
                        transition={{ duration: ANIMATION_DURATION.LINK_HOVER }}
                        whileHover={{
                            color: getColourFromTheme(theme, COLOURS.LINK),
                            fontSize: "1.1rem"
                        }}
                    >Visit the repository</motion.a>
                    <motion.button
                        className="w-60 h-16 text-xl text-white rounded-2xl"
                        initial={{ backgroundColor: getColourFromTheme(theme, COLOURS.HINT.ALIGNED) }}
                        whileHover={{
                            backgroundColor: (() => {
                                const backgroundColour = hexToHSL(getColourFromTheme(theme, COLOURS.HINT.ALIGNED));
                                return `hsl(${backgroundColour.h} ${backgroundColour.s * 1.2}% ${backgroundColour.l - 10}%)`;
                            })()
                        }}
                        onClick={onProceed}
                    >Restart Game</motion.button>
                </div>    
            </div>
        </motion.div>
    );
}