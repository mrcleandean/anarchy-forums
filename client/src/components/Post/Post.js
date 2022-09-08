import './css/Post.css';
import React from 'react';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import SickIcon from '@mui/icons-material/Sick';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import triggerSoftAlert from '../../functions/triggerSoftAlert';
export default function Post(props) {
    const [happy, setHappy] = React.useState(0);
    const [fire, setFire] = React.useState(0);
    const [love, setLove] = React.useState(0);
    const [gross, setGross] = React.useState(0);
    const [trash, setTrash] = React.useState(0);
    const [confused, setConfused] = React.useState(0);
    const [flair, setFlair] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [date, setDate] = React.useState('');
    const [deleted, setDeleted] = React.useState(false);
    React.useEffect(() => {
        axios.get(`https://anarchy-forums.herokuapp.com/api/getPost/${props.id}`)
            .then(res => {
                if (res.data.success) {
                    setHappy(res.data.msg.reactions.happy);
                    setFire(res.data.msg.reactions.fire);
                    setLove(res.data.msg.reactions.love);
                    setGross(res.data.msg.reactions.gross);
                    setTrash(res.data.msg.reactions.trash);
                    setConfused(res.data.msg.reactions.confused);
                    setFlair(res.data.msg.flair);
                    setTitle(res.data.msg.title);
                    setContent(res.data.msg.content);
                    setDate((new Date(res.data.msg.date)).toDateString());
                    setDeleted(false);
                }
            }).catch(err => {
                setDeleted(true);
                document.querySelector(`#post-number-${props.i}`).style.backgroundColor = 'rgba(235, 85, 85, 0.3)';
            });
    });
    function sendReaction(reaction, postId) {
        if (!deleted) {
            axios.post('https://anarchy-forums.herokuapp.com/api/userReaction', { reaction, postId })
                .then(res => {
                    if (res.data.success) {
                        triggerSoftAlert(res.data.msg);
                        if (res.data.deleted) {
                            setDeleted(true);
                            document.querySelector(`#post-number-${props.i}`).style.backgroundColor = 'rgba(235, 85, 85, 0.3)';
                        }
                        switch (reaction) {
                            case 'happy': {
                                setHappy(happy + 1);
                                break;
                            }
                            case 'fire': {
                                setFire(fire + 1);

                                break;
                            }
                            case 'love': {
                                setLove(love + 1);
                                break;
                            }
                            case 'gross': {
                                setGross(gross + 1);
                                break;
                            }
                            case 'trash': {
                                setTrash(trash + 1);
                                break;
                            }
                            case 'confused': {
                                setConfused(confused + 1);
                            }
                        }
                    } else {
                        triggerSoftAlert(res.data.msg);
                        if (res.data.deleted) {
                            setDeleted(true);
                            document.querySelector(`#post-number-${props.i}`).style.backgroundColor = 'rgba(235, 85, 85, 0.3)';
                        }
                    }
                }).catch(err => {
                    triggerSoftAlert('Post was Previously Deleted');
                    setDeleted(true);
                    document.querySelector(`#post-number-${props.i}`).style.backgroundColor = 'rgba(235, 85, 85, 0.3)';
                });
        } else {
            triggerSoftAlert('Post was Previously Deleted');
            setDeleted(true);
            document.querySelector(`#post-number-${props.i}`).style.backgroundColor = 'rgba(235, 85, 85, 0.3)';
        }
    }
    return (
        <div className='post' id={`post-number-${props.i}`}>
            <div className='reactions-wrapper'>
                <div className='reactions'>
                    <p className='reaction' onClick={() => sendReaction('happy', props.id)}><EmojiEmotionsIcon className='icon yellow' /> {happy}</p>
                    <p className='reaction' onClick={() => sendReaction('fire', props.id)}><LocalFireDepartmentIcon className='icon red' /> {fire}</p>
                    <p className='reaction' onClick={() => sendReaction('love', props.id)}><FavoriteIcon className='icon pink' /> {love}</p>
                    <p className='reaction' onClick={() => sendReaction('gross', props.id)}><SickIcon className='icon green' /> {gross}</p>
                    <p className='reaction' onClick={() => sendReaction('trash', props.id)}><DeleteIcon className='icon none' /> {trash}</p>
                    <p className='reaction' onClick={() => sendReaction('confused', props.id)}><QuestionMarkIcon className='icon blue' /> {confused}</p>
                </div>
            </div>
            <div className='media'>
                <div className='flair-wrapper'>
                    <h3 className='flair-text'>{flair}</h3>
                </div>
                <h3 className='title'>{title}</h3>
                <p className='content'>{content}</p>
                <p className='date'>{date}</p>
            </div>
        </div>
    )
}