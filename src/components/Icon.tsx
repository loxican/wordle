import { Props } from "../types";

export function Icon({ src, alt, className, onPointerDown }: Props.Icon) {
    return (
        <button
            className={className}
            onPointerDown={onPointerDown}
        >
            <img
                src={src}
                alt={alt}
            />
        </button>
    );
}