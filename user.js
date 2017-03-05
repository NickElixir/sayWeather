class UserData {
    constructor(options) {
        for (let i in options) {
            this[i] = options[i];
        }
    }
}
class SayWeatherUserData extends UserData{
    constructor(language, options) {
        super();
        this.language = language;
        this.voiceApiKey = "4f2153e7bff44d83ab8436be4500b476";
        this.weatherApiKey = "bbeb94a0d34c88951a762a3585cf1b1c";
        this.timers = [];
        this.units = metric;
    }
    save() {
        localStorage.sayWeatherUserData = JSON.stringify(sayWeatherUserData);
    }
}
function readSayWeatherUserData() {
    return localStorage.sayWeatherUserData ? JSON.parse(localStorage.sayWeatherUserData) : {};
}