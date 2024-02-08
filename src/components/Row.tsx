import { motion } from "framer-motion";

import { ANIMATION_DURATION, GAME } from "../constants";
import { Props, HintStates } from "../types";
import { Tile } from ".";
import { countOccurrencesOfCharacters, getCharactersWithOverlap } from "../utils";

export function Row({ word, answer, revealStates = false, skipAnimations = false, theme }: Props.Row) {
    const tileStates: HintStates[] = [];

    if (revealStates) {
        const overlappedCharacters = getCharactersWithOverlap(word, answer);
        const characterOccurrences = countOccurrencesOfCharacters(answer);

        for (const i of overlappedCharacters.keys()) {
            if (!overlappedCharacters[i]) {
                continue;
            }

            characterOccurrences[overlappedCharacters[i]]--;

            tileStates[i] = HintStates.Aligned;
        }

        for (const i of [...word].keys()) {
            if (tileStates[i] === HintStates.Aligned) {
                continue;
            }

            if (answer.includes(word[i]) && characterOccurrences[word[i]]) {
                characterOccurrences[overlappedCharacters[i]]--;
                
                tileStates[i] = HintStates.Misplaced;
                continue;
            }
            
            tileStates[i] = HintStates.Unavailable
        }
    }

    return (
        <motion.div
            className="flex flex-row gap-2 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: ANIMATION_DURATION.ROW_APPEAR }}
        >
            {Array.from(Array(GAME.WORD_LENGTH).keys()).map((i) =>
                <Tile
                    key={i}
                    letter={word[i] || ""}
                    state={revealStates ? tileStates[i] : HintStates.Awaiting}
                    duration={ANIMATION_DURATION.HINT_REVEAL * +!skipAnimations}
                    delay={(i * ANIMATION_DURATION.HINT_REVEAL) * +!skipAnimations}
                    theme={theme}
                />
            )}
        </motion.div>
    );
}