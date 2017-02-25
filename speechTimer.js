class SpeechTimer {
    constructor(loop, options, text) { //options for loop timers must be {interval:number, indent:number}; options without a loop timers must be {indent:number};
        this.loop = loop;
        for (let i in options) {
            this[i] = options[i];
        }
        this.text = text;
    }
    start() {
        if (this.loop) {
            this.startTime = Date.now() % this.interval;
            setTimeout(function(timer) {
                textToSpeech(timer.text);
                timer.timerId = setInterval(textToSpeech, timer.interval, timer.text);
            }, this.interval - this.startTime + this.indent, this);
        } else {
            this.startTime = Date.now();
            this.timerId = setTimeout(textToSpeech, this.indent, this.text);
        }
    }
    appendToTimers() {
        sayWeatherUserData.timers.appendChild(this);
        sayWeatherUserData.save();
    }
    clear() {
        if (this.loop) clearInterval(this.timerId);
        else clearTimeout(this.timerId);
    }
}
function textToSpeech(text) {
    VoiceRSS.speech({
        key: sayWeatherUserData.voiceApiKey,
        src: text,
        hl: 'en-us',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}
function recommenceTimers() {
    let timers = sayWeatherUserData.timers;
    for (let in timers) {
        if (timers[i].loop) timers[i].start();
        else if (Date.Now <= timers[i].starTime + timers[i].indent) timers[i].timetId = setTimeout(textToSpeech, Date.now() % timers[i].indent, timers[i].text);
    }
}