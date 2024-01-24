import { Tile } from ".";
import { Tile as TileTypes, RowProps } from "../types";
import { countOccurrencesOfCharacters, getCharactersWithOverlap } from "../utils";

export function Row({ word, answer }: RowProps) {
    const tileStates: TileTypes.States[] = [];

    if (answer) {
        const overlappedCharacters= getCharactersWithOverlap(word, answer);
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

            tileStates[i] = TileTypes.States.Unavaliable;
        }
    }

    return (
        <div className="flex flex-row gap-2">
            {Array.from(Array(5).keys()).map((i) =>
                <Tile
                    key={i}
                    letter={word[i] || ""}
                    state={answer ? tileStates[i] : TileTypes.States.Awaiting}
                />
            )}
        </div>
    );
}