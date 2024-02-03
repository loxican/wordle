import { motion } from "framer-motion";
import { Hint, Props } from "../types";

export function Tile({ letter, state, duration, delay }: Props.Tile) {
    return (
        <motion.div
            className="aspect-square grid place-items-center w-12 h-12 text-4xl font-bold text-white uppercase rounded-lg"
            initial={{ backgroundColor: Hint.Colours.Awaiting }}
            animate={{
                backgroundColor: (() => {
                    switch (state) {
                        case Hint.States.Unavailable:
                            return Hint.Colours.Unavailable;

                        case Hint.States.Misplaced:
                            return Hint.Colours.Misplaced;

                        case Hint.States.Aligned:
                            return Hint.Colours.Aligned;
                        
                        default:
                            return Hint.Colours.Awaiting;
                    }
                })()
            }}
            transition={{ duration, delay }}
        >{letter}</motion.div>
    );
}