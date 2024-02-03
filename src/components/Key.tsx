import { motion } from "framer-motion";
import { Props, Hint } from "../types";
import { ANIMATION_DURATION, GAME } from "../constants";
import { hexToHSL } from "../utils";

export function Key({ letter, state, width = "9%", displayLetter }: Props.Key) {
    // TODO: add animations
    const backgroundColour = hexToHSL(
        (state === Hint.States.Unavailable)
            ? Hint.Colours.Unavailable
            : (state === Hint.States.Misplaced)
                ? Hint.Colours.Misplaced
                : (state === Hint.States.Aligned)
                    ? Hint.Colours.Aligned
                    : Hint.Colours.Awaiting
    );

    function onClick() {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: letter }));
    }

    return (
        <motion.button
            className="grid place-items-center h-10 font-bold text-white uppercase rounded-lg"
            style={{ width, backgroundColor: `hsl(${backgroundColour.h} ${backgroundColour.s}% ${backgroundColour.l}%)` }}
            transition={{
                duration: ANIMATION_DURATION.HINT_REVEAL,
                delay: GAME.WORD_LENGTH * ANIMATION_DURATION.HINT_REVEAL
            }}
            onClick={onClick}
            whileHover={{ backgroundColor: `hsl(${backgroundColour.h} ${backgroundColour.s}% ${backgroundColour.l - 20}%)` }}
        >{displayLetter || letter}</motion.button>
    );
}