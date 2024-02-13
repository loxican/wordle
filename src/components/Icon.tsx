import { Props } from "../types";

export function Icon({ src, alt, className, onClick }: Props.Icon) {
    return (
        <button
            className={className}
            onClick={onClick}
        >
            <img src={src} alt={alt} />
        </button>
    );
}