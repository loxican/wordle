import { motion } from "framer-motion";
import { EndScreenStates, Props } from "../types";
import { ANIMATION_DURATION, GAME } from "../constants";

export function EndScreen({ state, answer, onProceed, skipDelay }: Props.EndScreen) {
    return (
        <motion.div
            className="grid absolute top-0 left-0 place-items-center w-full h-full"
            style={{ backgroundColor: "#0000007f" }}
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
            <div className="flex flex-col gap-6 justify-center items-center w-80 h-48 bg-white rounded-2xl">
                <div className="text-center">
                    <p className="text-4xl">{
                        (state === EndScreenStates.Hidden)
                            ? "Restarting Game..."
                            : (state === EndScreenStates.Won)
                                ? "You won!"
                                : "You lost!"
                    }</p>
                    {(state === EndScreenStates.Lost) && <p>Correct Answer: {answer}</p>}
                </div>
                <motion.button
                    className="justify-center items-center w-60 h-16 text-xl text-white bg-green-500 rounded-2xl"
                    onClick={onProceed}
                >Restart Game</motion.button>
            </div>
        </motion.div>
    );
}