import { motion } from "framer-motion";
import { Tile as TileTypes } from "../types";

export function Tile({ letter, state, delay }: TileTypes.Props) {
    return (
        <motion.div
            className="aspect-square grid place-items-center w-16 h-16 text-4xl font-bold text-white uppercase rounded-lg"
            initial={{ backgroundColor: TileTypes.BackgroundColours.Default }}
            animate={{
                backgroundColor:
                    (state === TileTypes.States.Unassigned)
                        ? TileTypes.BackgroundColours.Default
                        : (state === TileTypes.States.Unavaliable)
                            ? TileTypes.BackgroundColours.Unavaliable
                            : (state === TileTypes.States.Misplaced)
                                ? TileTypes.BackgroundColours.Misplaced
                                : TileTypes.BackgroundColours.Aligned
            }}
            transition={{ delay }}
        >{letter}</motion.div>
    )
}