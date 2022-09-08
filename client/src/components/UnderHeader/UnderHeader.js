import React from 'react';
import './css/UnderHeader.css';
export default function UnderHeader() {
    const underHeaderLetters = ['R', 'U', 'L', 'E', ' ', 'Y', 'O', 'U', 'R', 'S', 'E', 'L', 'V', 'E', 'S', '.'];
    React.useEffect(() => {
        clearTimeout(localStorage.getItem('time-2'));
        clearInterval(localStorage.getItem('int-3'));
        localStorage.removeItem('time-2');
        localStorage.removeItem('int-3');
        const timeout = setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                try {
                    const elem = document.querySelector(`#under-header-letter-${i}`);
                    elem.style.opacity = 1;
                    i++;
                    if (i === underHeaderLetters.length) {
                        clearInterval(interval);
                    }
                } catch (e) {
                    clearInterval(interval);
                    console.log('k');
                }
            }, 70)
            localStorage.setItem('int-3', interval);
        }, 4000)
        localStorage.setItem('time-2', timeout);
    });
    return (
        <div className="UnderHeader">
            <h3>
                {
                    underHeaderLetters.map((letter, i) => {
                        return <span key={i} className="under-header-letters" id={`under-header-letter-${i}`}>{letter}</span>
                    })
                }
            </h3>
        </div>
    )
}