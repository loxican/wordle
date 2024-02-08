import { motion } from "framer-motion";

import { ANIMATION_DURATION, COLOURS } from "../constants";
import { Props, HintStates, Theme } from "../types";
import { hexToHSL, getColourFromTheme } from "../utils";

export function Key({ letter, state, width = "9%", displayLetter, displayImageSrc, theme }: Props.Key) {
    const backgroundColour = hexToHSL(getColourFromTheme(theme, 
        (state === HintStates.Unavailable)
            ? COLOURS.HINT.UNAVAILABLE
            : (state === HintStates.Misplaced)
                ? COLOURS.HINT.MISPLACED
                : (state === HintStates.Aligned)
                    ? COLOURS.HINT.ALIGNED
                    : COLOURS.HINT.AWAITING
    ));

    function onClick() {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: letter }));
    }

    return (
        <motion.button
            className="grid place-items-center h-10 font-bold text-white uppercase rounded-lg"
            style={{ width }}
            animate={{ backgroundColor: `hsl(${backgroundColour.h} ${backgroundColour.s}% ${backgroundColour.l}%)` }}
            transition={{ duration: ANIMATION_DURATION.KEY_HOVER }}
            onClick={onClick}
            whileHover={{ backgroundColor: `hsl(${backgroundColour.h} ${backgroundColour.s * 1.2}% ${backgroundColour.l + ((1 - (+(theme === Theme.States.Light) * 2)) * 10)}%)` }}
        >{displayImageSrc ? <img
            src={displayImageSrc}
            className="aspect-square"
            style={{ width: "1.5rem" }}
            alt={`${letter} key`}
        /> : displayLetter || letter}</motion.button>
    );
}