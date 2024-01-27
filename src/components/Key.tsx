import { motion } from "framer-motion";
import { Key as KeyTypes } from "../types";

export function Key({ letter, state, classes, displayLetter }: KeyTypes.Props) {
    function onClick() {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: letter }));
    }

    return (
        <motion.button
            className={`grid place-items-center h-12 font-bold text-white uppercase rounded ${classes || "w-[10%]"}`}
            style={{
                backgroundColor:
                    (state === KeyTypes.States.Unassigned)
                        ? KeyTypes.BackgroundColours.Default
                        : (state === KeyTypes.States.Unavaliable)
                            ? KeyTypes.BackgroundColours.Unavaliable
                            : (state === KeyTypes.States.Misplaced)
                                ? KeyTypes.BackgroundColours.Misplaced
                                : KeyTypes.BackgroundColours.Aligned
            }}
            onClick={onClick}
        >{displayLetter || letter}</motion.button>
    )
}