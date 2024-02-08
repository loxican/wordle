export function hexToHSL(c: string) {
    const [r, g, b, a] = c.slice(1).padEnd(8, "f").match(/.{1,2}/g)!.map((v) => parseInt(v, 16) / 255);

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const sum = min + max;
    const delta = max - min;

    return {
        get h() {
            if (!delta) {
                return 0;
            }

            let h = 0;
    
            switch(max) {
                case r: {
                    h = (g - b) / delta;
                    break;
                }

                case g: {
                    h = ((b - r) / delta) + 2;
                    break;
                }

                default: h = ((r - g) / delta) + 4;
            }

            return (h * 60) % 360;
        },

        s: (delta / sum) * 100,
        l: (sum / 2) * 100,
        a: a * 100
    };
}