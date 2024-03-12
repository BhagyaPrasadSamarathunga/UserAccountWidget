export const padZero = (time: number) => {
    return time < 10 ? `0${time}` : time;
}

export const formatTime = (millisecs:number) => {
    let milliseconds = Math.round((millisecs % 1000)/10);
    let seconds = Math.floor((millisecs / 1000) % 60);

    return `${padZero(seconds)}:${padZero(milliseconds)}`;
}