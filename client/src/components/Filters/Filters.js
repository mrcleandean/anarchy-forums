import React from 'react';
import './css/Filters.css';
export default function Filters(props) {
    React.useEffect(() => {
        clearTimeout(localStorage.getItem('filter-time'));
        localStorage.removeItem('filter-time');
        const timeout = setTimeout(() => {
            try {
                document.querySelector('.Filters').style.pointerEvents = 'auto';
                document.querySelector('.Filters').style.opacity = '1';
            } catch (e) {
                clearTimeout(timeout);
            }
        }, 7000);
        localStorage.setItem('filter-time', timeout);
    }, []);
    return (
        <div className='Filters'>
            <div className='filter-wrapper' id='newest-button' onClick={() => {
                if (props.filter !== 'newest') {
                    props.setFilter('newest');
                    props.refreshFunc('filter');
                    document.querySelector('#newest-button').style.backgroundColor = 'rgba(85, 208, 235, 0.3)';
                    document.querySelector('#popular-button').style.backgroundColor = 'white';
                    document.querySelector('#warning-button').style.backgroundColor = 'rgba(235, 85, 85, 0.3)';
                }
            }}>
                <h1 className='filter-text'>NEWEST</h1>
            </div>
            <div className='filter-wrapper' id='popular-button' onClick={() => {
                if (props.filter !== 'popular') {
                    props.setFilter('popular');
                    props.refreshFunc('filter');
                    document.querySelector('#newest-button').style.backgroundColor = 'white';
                    document.querySelector('#popular-button').style.backgroundColor = 'rgba(85, 208, 235, 0.3)';
                    document.querySelector('#warning-button').style.backgroundColor = 'rgba(235, 85, 85, 0.3)';
                }
            }}>
                <h1 className='filter-text'>POPULAR</h1>
            </div>
            <div className='filter-wrapper' id='warning-button' onClick={() => {
                if (props.filter !== 'warning') {
                    props.setFilter('warning');
                    props.refreshFunc('filter');
                    document.querySelector('#newest-button').style.backgroundColor = 'white';
                    document.querySelector('#popular-button').style.backgroundColor = 'white';
                    document.querySelector('#warning-button').style.backgroundColor = 'rgba(85, 208, 235, 0.3)';
                }
            }}>
                <h1 className='filter-text'>WARNING</h1>
            </div>
        </div>
    )
}