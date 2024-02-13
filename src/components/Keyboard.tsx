import { IMAGES, KEYS } from "../constants";
import { HintStates, Props } from "../types";
import { Key } from ".";

export function Keyboard({ keyStates, theme }: Props.Keyboard) {
    return (
        <div className="flex flex-col absolute left-1/2 max-md:left-0 bottom-0 gap-2 p-2 w-[32rem] max-md:w-full h-48 md:-translate-x-1/2">
            <div className="flex flex-col gap-1 h-36">
                {KEYS.map((keys, i) =>
                    <div
                        key={i}
                        className="flex flex-row gap-[1%] justify-center w-full"
                    >
                        {keys.split("").map((c, i) =>
                            <Key 
                                key={i}
                                letter={c}
                                state={keyStates[c]}                  
                                theme={theme}
                            />
                        )}
                    </div>
                )}
            </div>
            <div className="flex flex-row justify-between h-10">
                <Key
                    letter="Backspace"
                    state={HintStates.Awaiting}
                    width="20%"
                    displayLetter="⌫"
                    displaySrc={IMAGES.KEYS.BACKSPACE}
                    theme={theme}
                />
                <Key
                    letter="Enter"
                    state={HintStates.Awaiting}
                    width="20%"
                    displayLetter="⏎"
                    displaySrc={IMAGES.KEYS.ENTER}
                    theme={theme}
                />
            </div>
        </div>
    );
}