// eslint-disable
import './css/Header.css';
import React from 'react';
import { Link } from 'react-router-dom';
import isMobileDevice from '../../functions/isMobileDevice';
export default function Header() {
    const titleLetters = 'ANARCHY'.split('');
    const li1Letters = 'About Us'.split('');
    const li2Letters = 'Dev Portfolio'.split('');
    const li3Letters = 'Dev Contact'.split('');
    React.useEffect(() => {
        if (isMobileDevice()) {
            document.querySelector('.header-title').style.pointerEvents = 'none';
        }
    }, []);
    React.useEffect(() => {
        let i = 0;
        clearInterval(localStorage.getItem('int-1'));
        clearInterval(localStorage.getItem('int-2'));
        clearTimeout(localStorage.getItem('time-1'));
        localStorage.removeItem('time-1');
        localStorage.removeItem('int-1');
        localStorage.removeItem('int-2');
        const interval = setInterval(() => {
            let elem = document.querySelector(`#header-title-letter-${i}`);
            elem.style.opacity = 1;
            elem.style.transform = 'rotate(0deg)';
            i++;
            if (i === titleLetters.length) {
                clearInterval(interval);
                const timeout = setTimeout(() => {
                    let i1 = 0;
                    let li1 = setInterval(() => {
                        const elem = document.querySelector(`#li1-letter-${i1}`);
                        elem.style.opacity = 1;
                        i1++;
                        if (i1 === li1Letters.length) {
                            clearInterval(li1);
                            // setTimeout(() => {
                            //     let i2 = 0;
                            //     const li2 = setInterval(() => {
                            //         const elem = document.querySelector(`#li2-letter-${i2}`);
                            //         elem.style.opacity = 1;
                            //         i2++;
                            //         if (i2 === li2Letters.length) {
                            //             clearInterval(li2);
                            //             setTimeout(() => {
                            //                 let i3 = 0;
                            //                 const li3 = setInterval(() => {
                            //                     const elem = document.querySelector(`#li3-letter-${i3}`);
                            //                     elem.style.opacity = 1;
                            //                     i3++;
                            //                     if (i3 === li3Letters.length) {
                            //                         clearInterval(li3);
                            //                     }
                            //                 }, 0)
                            //             }, 0) //220
                            //         }
                            //     }, 0); //60
                            // }, 0) //220
                        }
                    }, 60);
                    localStorage.setItem('int-2', li1);
                }, 850);
                localStorage.setItem('time-1', timeout);
            }
        }, 200);
        localStorage.setItem('int-1', interval);
        // eslint-disable-next-line
    }, []);
    return (
        <div className='Header'>
            <div className="header-left-extra">

            </div>
            <div className='inner-header'>
                <div className='header-left'>
                    <h1 className='header-title'>
                        {
                            titleLetters.map((letter, i) => {
                                return <span key={i} className='header-title-letter' id={`header-title-letter-${i}`}>{letter}</span>
                            })
                        }
                    </h1>
                </div>
                <div className="header-right">
                    <ul>
                        <li id='about-us'>
                            <Link to='/About' className='link'>
                                {
                                    li1Letters.map((letter, i) => {
                                        return <span key={i} className='li-letter' id={`li1-letter-${i}`}>{letter}</span>
                                    })
                                }
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="header-right-extra">

            </div>
        </div>
    )
}