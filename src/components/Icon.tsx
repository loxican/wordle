import { motion } from "framer-motion";
import { Props } from "../types";

export function Icon({ svg, className, viewBox, onClick }: Props.Icon) {
    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox}
            className={className}
            onClick={onClick}
        >
            {svg}
        </motion.svg>
    );
}