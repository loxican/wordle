import { motion } from "framer-motion";

import { Tile as TileTypes, RowProps } from "../types";
import { Tile } from ".";
import { countOccurrencesOfCharacters, getCharactersWithOverlap } from "../utils";

export function Row({ word, answer, revealStates }: RowProps) {
    const tileStates: TileTypes.States[] = [];

    if (word.length === 5) {
        const overlappedCharacters = getCharactersWithOverlap(word, answer);
        const characterOccurences = countOccurrencesOfCharacters(answer);

        for (const i of overlappedCharacters.keys()) {
            if (!overlappedCharacters[i]) {
                continue;
            }

            characterOccurences[overlappedCharacters[i]]--;

            tileStates[i] = TileTypes.States.Aligned;
        }

        for (const i of [...word].keys()) {
            if (tileStates[i] === TileTypes.States.Aligned) {
                continue;
            }

            if (answer.includes(word[i]) && characterOccurences[word[i]]) {
                characterOccurences[overlappedCharacters[i]]--;
                
                tileStates[i] = TileTypes.States.Misplaced;
                continue;
            }
      
            tileStates[i] = TileTypes.States.Unavaliable
        }
    }

    return (
        <motion.div
            className="flex flex-row gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {Array.from(Array(5).keys()).map((i) =>
                <Tile
                    key={i}
                    letter={word[i] || ""}
                    state={revealStates ? tileStates[i] : TileTypes.States.Unassigned}
                    delay={i * 0.3}
                />
            )}
        </motion.div>
    );
}