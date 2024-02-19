import { useCallback, useContext } from "react";
import { motion } from "framer-motion";

import { COLOURS, SOUNDS } from "../constants";
import { HintStates, Props } from "../types";
import { getValueFromTheme, playSound } from "../utils";

import { GameContext } from "../Game";

export function Tile({ letter, state, duration, delay, forceMute }: Props.Tile) {
    const { theme, allowSound } = useContext(GameContext);

    const onAnimationStart = useCallback(() => {
        const handler = setTimeout(() => (allowSound && !forceMute) && playSound(SOUNDS.HINT_APPEAR), delay * 1000);
        return () => clearTimeout(handler);
    }, [allowSound, delay, forceMute]);

    return (
        <motion.div
            className="aspect-square grid place-items-center h-16 max-md:h-12 text-5xl max-md:text-4xl font-bold uppercase rounded-lg"
            style={{ color: COLOURS.TEXT.DARK }}
            initial={{ backgroundColor: getValueFromTheme(theme, COLOURS.HINT.AWAITING) }}
            animate={{
                backgroundColor: getValueFromTheme(theme, 
                    (state === HintStates.Unavailable)
                        ? COLOURS.HINT.UNAVAILABLE
                        : (state === HintStates.Misplaced)
                            ? COLOURS.HINT.MISPLACED
                            : (state === HintStates.Aligned)
                                ? COLOURS.HINT.ALIGNED
                                : COLOURS.HINT.AWAITING
            )}}
            transition={{ duration, delay }}
            onAnimationStart={onAnimationStart}
        >{letter}</motion.div>
    );
}