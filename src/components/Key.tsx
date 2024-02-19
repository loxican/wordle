import { useContext } from "react";
import { motion } from "framer-motion";

import { ANIMATION_DURATION, COLOURS, SOUNDS } from "../constants";
import { Props, HintStates, Theme } from "../types";
import { hexToHSL, getValueFromTheme, playSound } from "../utils";

import { GameContext } from "../Game";

export function Key({ letter, state, width = "9%", displayLetter, displaySrc }: Props.Key) {
    const { theme, allowSound } = useContext(GameContext);
    const backgroundColour = hexToHSL(getValueFromTheme(theme, 
        (state === HintStates.Unavailable)
            ? COLOURS.HINT.UNAVAILABLE
            : (state === HintStates.Misplaced)
                ? COLOURS.HINT.MISPLACED
                : (state === HintStates.Aligned)
                    ? COLOURS.HINT.ALIGNED
                    : COLOURS.HINT.AWAITING
    ));

    function onPointerDown() {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: letter }));
        allowSound && playSound(SOUNDS.CLICK);
    }

    return (
        <motion.button
            className="grid place-items-center h-10 font-bold text-white uppercase rounded-lg"
            style={{ width }}
            animate={{ backgroundColor: `hsl(${backgroundColour.h} ${backgroundColour.s}% ${backgroundColour.l}%)` }}
            transition={{ duration: ANIMATION_DURATION.KEY_HOVER }}
            onPointerDown={onPointerDown}
            whileHover={{ backgroundColor: `hsl(${backgroundColour.h} ${backgroundColour.s * 1.2}% ${backgroundColour.l + ((1 - (+(theme === Theme.States.Light) * 2)) * 10)}%)` }}
        >{displaySrc ? <img
            className="h-4"
            src={displaySrc}
            alt={letter}
        /> : displayLetter || letter}</motion.button>
    );
}