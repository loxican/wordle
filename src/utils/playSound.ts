const audios: HTMLAudioElement[] = [];

export function playSound(s: string) {
    let audio = audios.find(({ paused }) => paused);

    if (!audio) {
        audio = new Audio(s);
        audios.push(audio);
    }
    
    audio.src = s;
    audio.play();
}