import React from 'react';
import axios from 'axios';
import './css/CreatePost.css';
import triggerSoftAlert from '../../functions/triggerSoftAlert';
export default function CreatePost(props) {
    const [flair, setFlair] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [lengthUsed, setLengthUsed] = React.useState(0);
    const [totalLength, setTotalLength] = React.useState(0);
    function submit() {
        axios.post('https://anarchy-forums.herokuapp.com/api/userPost', {
            flair,
            title,
            content,
            date: (new Date()),
            reactions: {
                happy: 0,
                fire: 0,
                love: 0,
                gross: 0,
                trash: 0,
                confused: 0
            },
            net: 0
        }).then(res => {
            if (res.data.success) {
                props.setSearchQuery('');
                props.refreshFunc('post');
                setFlair('');
                setTitle('');
                setContent('');
                setTotalLength(0);
                setLengthUsed(0);
                document.querySelector('.create-post-flair-wrapper').style.opacity = '0';
                document.querySelector('.create-post-title-wrapper').style.opacity = '0';
                document.querySelector('.create-post-content-wrapper').style.opacity = '0';
                document.querySelector('.create-post-button-wrapper').style.opacity = '0';
                document.querySelector('.text-length-p').style.color = 'black';
                document.querySelector('.text-length-p').style.opacity = '0';
                document.querySelector('.create-post-flair-wrapper').style.pointerEvents = 'none';
                document.querySelector('.create-post-title-wrapper').style.pointerEvents = 'none';
                document.querySelector('.create-post-content-wrapper').style.pointerEvents = 'none';
                document.querySelector('.create-post-button-wrapper').style.pointerEvents = 'none';
                const timeout = setTimeout(() => {
                    document.querySelector('.create-post-wrapper').style.height = '0';
                    document.querySelector('.create-post-wrapper').style.boxShadow = 'none';
                }, 175)
                localStorage.setItem('interval-id', timeout);
            }
            triggerSoftAlert(res.data.msg);
        }).catch(err => {

        });
    }
    return (
        <div className='CreatePost'>
            <div className='create-post-wrapper'>
                <div className='flair-wrapper create-post-flair-wrapper'>
                    <input className='flair' placeholder='Flair' value={flair} onClick={(e) => {
                        setLengthUsed(e.target.value.length);
                        setTotalLength(20);
                        document.querySelector('.text-length-p').style.opacity = '1';
                        if (e.target.value.length > 20) {
                            document.querySelector('.text-length-p').style.color = 'red';
                        } else {
                            document.querySelector('.text-length-p').style.color = 'black';
                        }
                    }} onChange={(e) => {
                        setFlair(e.target.value);
                        setLengthUsed(e.target.value.length);
                        if (e.target.value.length > totalLength) {
                            document.querySelector('.text-length-p').style.color = 'red';
                        } else {
                            document.querySelector('.text-length-p').style.color = 'black';
                        }
                    }}></input>
                </div>
                <div className='title-wrapper create-post-title-wrapper'>
                    <input className='title' placeholder='Title' value={title} onClick={(e) => {
                        setLengthUsed(e.target.value.length)
                        setTotalLength(50);
                        document.querySelector('.text-length-p').style.opacity = '1';
                        if (e.target.value.length > 50) {
                            document.querySelector('.text-length-p').style.color = 'red';
                        } else {
                            document.querySelector('.text-length-p').style.color = 'black';
                        }
                    }} onChange={(e) => {
                        setTitle(e.target.value);
                        setLengthUsed(e.target.value.length);
                        if (e.target.value.length > totalLength) {
                            document.querySelector('.text-length-p').style.color = 'red';
                        } else {
                            document.querySelector('.text-length-p').style.color = 'black';
                        }
                    }}></input>
                </div>
                <div className='content-wrapper create-post-content-wrapper'>
                    <textarea className='content' placeholder='Content' value={content} onClick={(e) => {
                        setLengthUsed(e.target.value.length);
                        setTotalLength(4000);
                        document.querySelector('.text-length-p').style.opacity = '1';
                        if (e.target.value.length > 4000) {
                            document.querySelector('.text-length-p').style.color = 'red';
                        } else {
                            document.querySelector('.text-length-p').style.color = 'black';
                        }
                    }} onChange={(e) => {
                        setContent(e.target.value)
                        setLengthUsed(e.target.value.length);
                        if (e.target.value.length > totalLength) {
                            document.querySelector('.text-length-p').style.color = 'red';
                        } else {
                            document.querySelector('.text-length-p').style.color = 'black';
                        }
                    }}></textarea>
                </div>
                <div className='lower-flex'>
                    <div className='button-wrapper create-post-button-wrapper' onClick={() => {
                        submit()
                    }}>
                        <h1>Submit</h1>
                    </div>
                    <p className='text-length-p'>{lengthUsed}/{totalLength}</p>
                </div>

            </div>
        </div>
    )
}