import { motion } from "framer-motion";

import { COLOURS } from "../constants";
import { HintStates, Props } from "../types";
import { getColourFromTheme } from "../utils";

export function Tile({ letter, state, duration, delay, theme }: Props.Tile) {
    return (
        <motion.div
            className="aspect-square grid place-items-center h-16 max-md:h-12 text-5xl max-md:text-4xl font-bold uppercase rounded-lg"
            style={{ color: COLOURS.TEXT.DARK }}
            initial={{ backgroundColor: getColourFromTheme(theme, COLOURS.HINT.AWAITING) }}
            animate={{
                backgroundColor: getColourFromTheme(theme, 
                    (state === HintStates.Unavailable)
                        ? COLOURS.HINT.UNAVAILABLE
                        : (state === HintStates.Misplaced)
                            ? COLOURS.HINT.MISPLACED
                            : (state === HintStates.Aligned)
                                ? COLOURS.HINT.ALIGNED
                                : COLOURS.HINT.AWAITING
            )}}
            transition={{ duration, delay }}
        >{letter}</motion.div>
    );
}