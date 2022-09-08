import React from 'react';
import './css/UserTools.css';
export default function UserTools(props) {
    const [expanded, setExpanded] = React.useState(false);
    React.useEffect(() => {
        setTimeout(() => {
            document.querySelector('.UserTools').style.opacity = 1;
            document.querySelector('.UserTools').style.pointerEvents = 'auto';
            document.querySelector('#about-us').style.pointerEvents = 'auto';
        }, 7000);
    }, []);
    function expandOrMinimize(expandTF) {
        clearTimeout(localStorage.getItem('timeout-id'));
        localStorage.removeItem('timeout-id');
        if (expandTF) {
            document.querySelector('.create-post-wrapper').style.height = '395px';
            document.querySelector('.create-post-wrapper').style.boxShadow = '0 0 1rem 0 rgba(0, 0, 0, .4)';
            const timeout = setTimeout(() => {
                document.querySelector('.create-post-flair-wrapper').style.opacity = '1';
                document.querySelector('.create-post-title-wrapper').style.opacity = '1';
                document.querySelector('.create-post-content-wrapper').style.opacity = '1';
                document.querySelector('.create-post-button-wrapper').style.opacity = '1';
                document.querySelector('.create-post-flair-wrapper').style.pointerEvents = 'auto';
                document.querySelector('.create-post-title-wrapper').style.pointerEvents = 'auto';
                document.querySelector('.create-post-content-wrapper').style.pointerEvents = 'auto';
                document.querySelector('.create-post-button-wrapper').style.pointerEvents = 'auto';
            }, 225);
            localStorage.setItem('timeout-id', timeout);
        } else {
            document.querySelector('.create-post-flair-wrapper').style.opacity = '0';
            document.querySelector('.create-post-title-wrapper').style.opacity = '0';
            document.querySelector('.create-post-content-wrapper').style.opacity = '0';
            document.querySelector('.create-post-button-wrapper').style.opacity = '0';
            document.querySelector('.text-length-p').style.opacity = '0';
            document.querySelector('.create-post-flair-wrapper').style.pointerEvents = 'none';
            document.querySelector('.create-post-title-wrapper').style.pointerEvents = 'none';
            document.querySelector('.create-post-content-wrapper').style.pointerEvents = 'none';
            document.querySelector('.create-post-button-wrapper').style.pointerEvents = 'none';
            const timeout = setTimeout(() => {
                document.querySelector('.create-post-wrapper').style.height = '0';
                document.querySelector('.create-post-wrapper').style.boxShadow = 'none';
            }, 175)
            localStorage.setItem('timeout-id', timeout);
        }
        setExpanded(expandTF);
    }
    return (
        <div className='UserTools'>
            <div className='add-post-wrapper' onClick={() => expandOrMinimize(!expanded)}>
                <h1>+</h1>
                <h1>Post</h1>
            </div>
            <div className='search-wrapper'>
                <input type='text' placeholder="Disclaimer: Crime is illegal." value={props.searchQuery} onChange={(e) => props.setSearchQuery(e.target.value)}></input>
            </div>
        </div>
    )
}