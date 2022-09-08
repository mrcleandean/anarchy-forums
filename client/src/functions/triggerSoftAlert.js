export default function triggerSoftAlert(msg) {
    clearTimeout(localStorage.getItem('soft-alert-timeout-id'));
    localStorage.removeItem('soft-alert-timeout-id');
    const softAlert = document.querySelector('.SoftAlert');
    const softAlertP = document.querySelector('.soft-alert-p');
    const timerBar = document.querySelector('.timer-bar');
    const style = window.getComputedStyle(timerBar);
    const width = style.getPropertyValue('width');
    if (width === '0px') {
        softAlert.style.bottom = '-50px';
        timerBar.style.transition = 'none';
        timerBar.style.opacity = '0';
        timerBar.style.width = 'calc(100% + 10px)';
    } else {
        softAlert.style.bottom = '50px';
        softAlertP.textContent = msg;
        timerBar.style.transition = 'width 4.5s';
        timerBar.style.opacity = '1';
        timerBar.style.width = '0';
        const timeout = setTimeout(() => {
            softAlert.style.bottom = '-50px';
            timerBar.style.transition = 'none';
            timerBar.style.opacity = '0';
            timerBar.style.width = 'calc(100% + 10px)';
        }, 4500);
        localStorage.setItem('soft-alert-timeout-id', timeout);
    }
}