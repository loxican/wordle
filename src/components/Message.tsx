import { motion, useAnimate } from "framer-motion";

import { ANIMATION_DURATION, COLOURS } from "../constants";
import { Props } from "../types";
import { getColourFromTheme } from "../utils";
import { useEffect } from "react";

export function Message({ text, theme }: Props.Message) {
    const [scope, animate] = useAnimate();
    
    async function animateElement() {
        await animate(scope.current, { opacity: [0, 0.9] }, { duration: ANIMATION_DURATION.MESSAGE_TRANSITION });
        await animate(scope.current, { opacity: 0 }, {
            duration: ANIMATION_DURATION.MESSAGE_TRANSITION,
            delay: ANIMATION_DURATION.MESSAGE_HIDE_DELAY,
            onComplete() {
                animate(scope.current, { display: "none" });
            }
        });
    }

    useEffect(() => {
        animateElement();
    });

    return (
        <motion.div
            ref={scope}
            className="grid place-items-center p-2 w-64 h-16 text-white rounded-md"
            style={{ backgroundColor: getColourFromTheme(theme, COLOURS.HINT.UNAVAILABLE) }}
        >
            <p className="text-sm font-bold text-center text-white">{text}</p>
        </motion.div>
    )
}