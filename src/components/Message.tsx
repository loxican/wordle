import { useContext, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";

import { ANIMATION_DURATION, COLOURS } from "../constants";
import { Props } from "../types";
import { getValueFromTheme } from "../utils";

import { GameContext } from "../Game";

export function Message({ text }: Props.Message) {
    const { theme } = useContext(GameContext);
    const [scope, animate] = useAnimate();

    useEffect(() => {
        async function animateElement() {
            await animate(scope.current, { opacity: 0.9 }, { duration: ANIMATION_DURATION.MESSAGE_TRANSITION });
            await animate(scope.current, { opacity: 0 }, {
                duration: ANIMATION_DURATION.MESSAGE_TRANSITION,
                delay: ANIMATION_DURATION.MESSAGE_HIDE_DELAY,
            });
        }

        animateElement();
    }, [animate, scope]);

    return (
        <motion.div
            ref={scope}
            className="grid absolute top-4 left-1/2 place-items-center p-2 w-64 h-16 text-white rounded-md -translate-x-1/2"
            style={{ backgroundColor: getValueFromTheme(theme, COLOURS.HINT.UNAVAILABLE) }}
            initial={{ opacity: 0 }}
        >
            <p className="text-sm font-bold text-center text-white">{text}</p>
        </motion.div>
    )
}