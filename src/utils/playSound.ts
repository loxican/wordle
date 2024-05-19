const audios: Record<string, HTMLAudioElement[]> = {};

export function playSound(s: string) {
    audios[s] ??= [new Audio(s)]
    
    let audio = audios[s].find(({ paused }) => paused);
    if (!audio) {
        audio = new Audio(s);
        audios[s].push(audio);
    }

    audio.play();
}