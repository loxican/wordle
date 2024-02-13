import { GAME } from ".";

export const TEXTS = {
    END_SCREEN: {
        HIDDEN: "Hiding screen...",
        WON: "You won!",
        LOST: "You lost!"
    },

    MESSAGE: {
        WORD_TOO_SHORT: `The word must be at least ${GAME.WORD_LENGTH} characters long.`,
        INVALID_WORD: "The word is not listed in the dictionary.",
    }
}