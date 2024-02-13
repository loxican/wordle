import { Props } from "../types";
import { Message } from ".";

export function MessageList({ texts, theme }: Props.MessageList) {
    return (
        <div className="absolute top-6 left-1/2 flex flex-col gap-2 -translate-x-1/2">
            {Object.entries(texts).slice(-3).map(([k, t]) =>
                <Message
                    key={k}
                    text={t}
                    theme={theme}
                />
            )}
        </div>
    );
}