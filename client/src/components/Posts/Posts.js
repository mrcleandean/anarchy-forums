import React from 'react';
import './css/Posts.css';
import axios from 'axios';
import triggerSoftAlert from '../../functions/triggerSoftAlert';
import Post from '../Post/Post';
import isMobileDevice from '../../functions/isMobileDevice';
export default function Posts(props) {
    const hook1ref = React.useRef(false);
    const hook2ref = React.useRef(false);
    const [posts, setPosts] = React.useState([]);
    const [prevPostDisplayLength, setPrevPostDisplayLength] = React.useState(0);
    //hook1
    React.useEffect(() => {
        const numOfPosts = props.refresh.rule === 'initial' || props.refresh.rule === 'filter'
            ? 10
            : props.refresh.rule === 'post'
                ? posts.length
                : props.refresh.rule === 'load-more'
                    ? posts.length + 10
                    : 0
        if (numOfPosts === 10) {
            setPrevPostDisplayLength(0);
        } else if (numOfPosts === posts.length) {
            setPrevPostDisplayLength(posts.length - 10);
        } else if (numOfPosts === posts.length + 10) {
            setPrevPostDisplayLength(posts.length);
        }
        if (props.searchQuery !== '') {
            if (props.refresh.rule === 'filter') {
                const elems = document.querySelectorAll('.post');
                for (let i = 0; i < posts.length; i++) {
                    elems[i].style.opacity = '0';
                }
                document.querySelector('.load-more-button').style.opacity = '0';
                clearTimeout(localStorage.getItem('loader-timeout-id'));
                clearInterval(localStorage.getItem('render-amount-id'));
                localStorage.removeItem('loader-timeout-id');
                localStorage.removeItem('render-amount-id');
                const loaderTimeout = setTimeout(() => {
                    axios.get(`https://anarchy-forums.herokuapp.com/api/search/${props.filter}/${posts.length + 10}/?searchquery=${props.searchQuery}`)
                        .then(res => {
                            if (res.data.success) {
                                setPosts(res.data.msg);
                            }
                        }).catch(err => {
                            console.log(err.message);
                            triggerSoftAlert('Unknown Error');
                        })
                }, 500);
                localStorage.setItem('loader-timeout-id', loaderTimeout);
            } else {
                axios.get(`https://anarchy-forums.herokuapp.com/api/search/${props.filter}/${posts.length + 10}/?searchquery=${props.searchQuery}`)
                    .then(res => {
                        if (res.data.success) {
                            setPosts(res.data.msg);
                        }
                    }).catch(err => {
                        console.log(err.message);
                        triggerSoftAlert('Unknown Error')
                    })
            }
        } else {
            if (props.refresh.rule === 'filter') {
                const elems = document.querySelectorAll('.post');
                for (let i = 0; i < posts.length; i++) {
                    elems[i].style.opacity = '0';
                }
                document.querySelector('.load-more-button').style.opacity = '0';
                clearTimeout(localStorage.getItem('loader-timeout-id'));
                clearInterval(localStorage.getItem('render-amount-id'));
                localStorage.removeItem('loader-timeout-id');
                localStorage.removeItem('render-amount-id');
                const loaderTimeout = setTimeout(() => {
                    axios.get(`https://anarchy-forums.herokuapp.com/api/getPosts/${props.filter}/${numOfPosts}`)
                        .then(res => {
                            if (res.data.success) {
                                setPosts(res.data.msg);
                            } else {
                                triggerSoftAlert('Could not load posts');
                            }
                        })
                        .catch(err => {
                            console.log(err.message);
                            triggerSoftAlert('Unknown Error')
                        });
                }, 600);
                localStorage.setItem('loader-timeout-id', loaderTimeout);
            } else {
                axios.get(`https://anarchy-forums.herokuapp.com/api/getPosts/${props.filter}/${numOfPosts}`)
                    .then(res => {
                        if (res.data.success) {
                            setPosts(res.data.msg);
                        } else {
                            triggerSoftAlert('Could not load posts');
                        }
                    })
                    .catch(err => {
                        console.log(err.message);
                        triggerSoftAlert('Unknown Error')
                    });
            }

            if (!hook1ref.current) {
                hook1ref.current = true;
            }
        }
        // eslint-disable-next-line
    }, [props.refresh]);
    //hook2
    React.useEffect(() => {
        document.querySelector('.load-more-button').style.opacity = '0';
        setTimeout(() => {
            if (posts.length === 0) {
                const elem = document.querySelector('.no-posts');
                if(typeof(elem) != 'undefined' && elem != null){
                    elem.style.opacity = '1';
                }
            }
            let i = prevPostDisplayLength < 0 ? 0 : prevPostDisplayLength;
            if (i !== posts.length) {
                clearInterval(localStorage.getItem('render-amount-id'));
                let interval = setInterval(() => {
                    try {
                        document.querySelector(`#post-number-${i}`).style.opacity = '1';
                        document.querySelector(`#post-number-${i}`).style.backgroundColor = 'white';
                        i++;
                        if (i === posts.length) {
                            document.querySelector('.load-more-button').style.opacity = '1';
                            setPrevPostDisplayLength(posts.length);
                            clearInterval(interval);
                        }
                    } catch (e) {
                        clearInterval(interval);
                    }
                }, 200);
                localStorage.setItem('render-amount-id', interval);
            } else {
                if (posts.length === 0 && hook2ref.current === true) {
                    document.querySelector('.load-more-button').style.opacity = '0';
                } else {
                    document.querySelector('.load-more-button').style.opacity = '1';
                }
            }
            if (!hook2ref.current) {
                hook2ref.current = true;
            }
        }, hook2ref.current ? 0 : 7000);
        // eslint-disable-next-line
    }, [posts]);
    // hook3
    React.useEffect(() => {
        if (!isMobileDevice()) {
            function mouseMove(e, elem) {
                const positioner = elem.getBoundingClientRect();
                const pTag = document.querySelector('#icon-tooltip-p')
                const x = positioner.left;
                document.querySelector('#IconTooltip').style.opacity = '1';
                document.querySelector('#IconTooltip').style.left = `${x - 10}px`;
                document.querySelector('#IconTooltip').style.top = `${e.pageY - 45}px`;
                if (elem.classList.contains('yellow')) {
                    pTag.textContent = 'Happy';
                } else if (elem.classList.contains('red')) {
                    pTag.textContent = 'Fire';
                } else if (elem.classList.contains('pink')) {
                    pTag.textContent = 'Love';
                } else if (elem.classList.contains('green')) {
                    pTag.textContent = 'Gross';
                } else if (elem.classList.contains('none')) {
                    pTag.textContent = 'Trash';
                } else if (elem.classList.contains('blue')) {
                    pTag.textContent = 'Confused';
                } else {
                    document.querySelector('#IconTooltip').style.opacity = '0';
                }
            }
            function mouseOut() {
                document.querySelector('#IconTooltip').style.opacity = '0';
            }
            const elems = document.querySelectorAll('.icon');
            for (let i = 0; i < elems.length; i++) {
                const newElem = elems[i].cloneNode(true);
                elems[i].parentNode.replaceChild(newElem, elems[i]);
                newElem.addEventListener('mousemove', (e) => mouseMove(e, newElem));
                newElem.addEventListener('mouseout', mouseOut);
            }
        }
        // eslint-disable-next-line
    }, [posts]);
    //hook4 
    React.useEffect(() => {
        axios.get(`https://anarchy-forums.herokuapp.com/api/search/${props.filter}/10/?searchquery=${props.searchQuery}`)
            .then(res => {
                if (res.data.success) {
                    setPrevPostDisplayLength(0);
                    setPosts(res.data.msg);
                }
            }).catch(err => {
                console.log(err.message);
                triggerSoftAlert('Unknown Error');
            })
    }, [props.searchQuery])
    return (
        <div className='Posts'>
            {
                posts.length === 0
                    ? (
                        <div className='no-posts' id='post-number-0'>
                            <div className='media'>
                                <h3 className='title'>No Results Yet</h3>
                            </div>
                        </div>
                    )
                    : (
                        posts.map((post, i) => {
                            return (
                                <Post id={post._id} key={i} i={i} />
                            )
                        })
                    )
            }
            <div className='load-more-wrapper'>
                <div className='load-more-button' onClick={() => props.refreshFunc('load-more')}>
                    <h1>Load More</h1>
                </div>
            </div>
        </div>
    )
}