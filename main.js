const MAX_MIN = 99;
const MAX_SEC = 59;
const SEC_IN_MIN = 60;
const PI = 3.14;

const AUDIO = new Audio('./media/sound.mp3');

class Timer {
  constructor() {
    this.startBtn = document.getElementById('start-btn');
    this.settingsBtn = document.getElementById('settings-btn');
    this.minInput = document.getElementById('input-min');
    this.secInput = document.getElementById('input-sec');
    this.ringWrap = document.getElementById('ring-wrap');
    this.circle = document.getElementById('ring');
    this._seconds = this.getSeconds();
    this.seconds = this.getSeconds();
    this.counterId = null;
    this.circleLength = Math.round(PI * this.circle.getBoundingClientRect().width);
    this.weightOfOneSec = this.circleLength / this._seconds;

    this.startBtn.addEventListener('click', this.start, {once: true});
    this.settingsBtn.addEventListener('click', this.handleSettingsClick);
    this.minInput.addEventListener('change', this.handleMinChange);
    this.secInput.addEventListener('change', this.handleSecChange);
  }

  init = () => {
    this.setSeconds(this.getSeconds());
    this._seconds = this.getSeconds();
    this.weightOfOneSec = this.circleLength / this._seconds;
  }

  setSeconds = (seconds) => {
    this.seconds = seconds;
    this.minInput.value = `${Math.floor(this.seconds / SEC_IN_MIN)}`.padStart(2, '0');
    this.secInput.value = `${this.seconds % SEC_IN_MIN}`.padStart(2, '0');
  }

  getSeconds = () => {
    return this.minInput.value * SEC_IN_MIN + +this.secInput.value;
  }

  start = () => {
    this.ringWrap.classList.remove('ending');
    this.circle.setAttribute('stroke-dasharray', this.circleLength);
    this.circle.setAttribute('stroke-dashoffset', this.getSectorLength());
    this.settingsBtn.disabled = true;
    this.deactivateInputs();
    this.startBtn.innerText = 'Stop';
    this.counterId = setInterval(() => {
      if(this.seconds <= 0) {
        clearInterval(this.counterId);
        AUDIO.play();
        this.stop();
        this.ringWrap.classList.add('ending');
        return
      }
      this.setSeconds(this.seconds - 1);
      this.circle.setAttribute('stroke-dashoffset', this.getSectorLength());
    }, 1000);
    this.startBtn.addEventListener('click', this.stop, {once: true});
  }

  getSectorLength = () => {
    return (this.circleLength - (this._seconds - this.seconds) * this.weightOfOneSec);
  }

  stop = () => {
    this.settingsBtn.disabled = false;
    this.deactivateInputs();
    clearInterval(this.counterId);
    this.startBtn.innerText = 'Start';
    this.startBtn.addEventListener('click', this.start, {once: true});
  }

  handleSettingsClick = () => {
    if(this.minInput.disabled && this.secInput.disabled) {
      return this.activateInputs();
    }
    return this.deactivateInputs();
  }

  handleMinChange = (evt) => {
    const value = parseInt(evt.target.value);
    if(isNaN(value)) {
      evt.target.value = `${Math.floor(this.seconds / SEC_IN_MIN)}`.padStart(2, '0');
      return
    }
    const newValue = value > MAX_MIN ? MAX_MIN : value;
    evt.target.value = `${newValue}`.padStart(2, '0');
    this.init();
  }

  handleSecChange = (evt) => {
    const value = parseInt(evt.target.value);
    if(isNaN(value)) {
      evt.target.value = `${this.seconds % SEC_IN_MIN}`.padStart(2, '0');
      return
    }
    const newValue = value > MAX_SEC ? MAX_SEC : value;
    evt.target.value = `${newValue}`.padStart(2, '0');
    this.init();
  }

  activateInputs = () => {
    this.minInput.disabled = false;
    this.secInput.disabled = false;
  }

  deactivateInputs = () => {
    this.minInput.disabled = true;
    this.secInput.disabled = true;
  }
}

const timer = new Timer();
