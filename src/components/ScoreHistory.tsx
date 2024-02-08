import { motion } from "framer-motion";

import { COLOURS, GAME } from "../constants";
import { Props, Theme } from "../types";
import { getColourFromTheme } from "../utils";

export function ScoreHistory({ scoreHistory, backgroundColour, theme}: Props.ScoreHistory) {
    return (
        <div
            className="flex flex-col gap-2 p-4 rounded-xl"
            style={{ backgroundColor: `hsl(${backgroundColour.l} ${backgroundColour.s}% ${backgroundColour.l + ((1 - (+(theme === Theme.States.Light) * 2)) * 10)}%)`}}
        >
            {scoreHistory.map((s, i, a) =>
                <div
                    key={i}
                    className="relative flex flex-row w-52"
                >
                    <p className="w-2">{(i >= GAME.MAX_ATTEMPTS) ? "L" : i + 1}</p>
                    <motion.div
                        className="absolute left-4 h-6 rounded-r-md"
                        style={{ backgroundColor: getColourFromTheme(theme, (i >= GAME.MAX_ATTEMPTS) ? COLOURS.HINT.UNAVAILABLE : COLOURS.HINT.ALIGNED) }}
                        animate={{ width: ["0", `${(s / Math.max(...a, 1)) * 12}rem`] }}
                        transition={{ duration: 1 }}
                    >
                        <p
                            className="pr-1 text-end"
                            style={{
                                paddingRight: `${`${s}`.length * 0.3}rem`,
                                color:
                                    ((s / Math.max(...a, 1)) > (`${s}`.length * 0.05))
                                        ? "white"
                                        : getColourFromTheme(theme, COLOURS.TEXT)
                            }}
                        >{s}</p>
                    </motion.div>
                </div>
            )}
        </div>
    )
}