import './css/About.css';
import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import SickIcon from '@mui/icons-material/Sick';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import isMobileDevice from '../../functions/isMobileDevice';
export default function About() {
    const headerTitleLetter = 'ANARCHY'.split('');
    React.useEffect(() => {
        document.querySelector('#home').style.pointerEvents = 'auto';
        if (isMobileDevice()) {
            document.querySelector('.header-title').style.pointerEvents = 'none';
        }
        clearTimeout(localStorage.getItem('timeout-id'));
        clearInterval(localStorage.getItem('int-2'));
        clearInterval(localStorage.getItem('int-1'));
        clearTimeout(localStorage.getItem('time-1'));
        clearTimeout(localStorage.getItem('loader-timeout-id'));
        clearInterval(localStorage.getItem('render-amount-id'));
        clearInterval(localStorage.getItem('int-3'));
        clearTimeout(localStorage.getItem('time-2'));
        clearTimeout(localStorage.getItem('soft-alert-timeout-id'));
        clearTimeout(localStorage.getItem('filter-time'));
    }, []);
    return (
        <div className="About">
            <div className='Header'>
                <div className="inner-header">
                    <div className='header-left'>
                        <h1 className='header-title'>
                            {
                                headerTitleLetter.map((val, i) => {
                                    return (
                                        <span key={i} className='header-title-letter-a'>{val}</span>
                                    )
                                })
                            }
                        </h1>
                    </div>
                    <div className='header-right'>
                        <ul>
                            <li id='home'><Link to='/' className='link'>Home</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='about-wrapper'>
                <div className='section-1'>
                    <h1>What We Do</h1>
                    <p>This site is a social experiment to discover the outcomes
                        of a self-censoring social media platform without central policy.
                        <br />
                        <br />
                        Only one rule governs this place: Rule yourselves.
                        <br />
                        <br />
                        If enough dislikes accumulate on your post,
                        it will be banished from our server permanently. However, if the users of this site are not cooperative
                        enough to moderate themselves and collectively censor what comes through here, this site will likely descend into lawlessness and insanity.
                        In essence, it is anarchy, because all government and rule arose from a state of lawlessness at one point, and some places haven't established firm rules at all.
                        <br />
                        <br />
                        Dispite this, we encourage the users of this site to act in a peaceful and harmonious way. We hope to see a cooperative ecosystem of
                        thought and discussion take place here. Regardless of that, you are free to say whatever you want. Everything posted here is fully anonymous
                        and any record of you being here is erased from our servers a few minutes after you interact with any content. The reason that we temporarily log
                        information to identify you is to prevent users from spam posting or reacting.
                        <br />
                        <br />
                        Will there be order, or chaos?
                        <br />
                        <br />
                        Only time will tell.
                        <br />
                        <br />
                        (Please read disclaimer at bottom of page)
                    </p>
                </div>
                <div className='section-2'>
                    <h1>Convention</h1>
                    <h3>Icons:</h3>
                    <p><EmojiEmotionsIcon className='icon yellow' /> Happy Reaction: Indicates a post that makes you feel good.</p>
                    <p><LocalFireDepartmentIcon className='icon red' /> Fire Reaction: For when the post is spicy and cool.</p>
                    <p><FavoriteIcon className='icon pink' /> Love Reaction: For when you feel the awehs.</p>
                    <p><SickIcon className='icon green' /> Gross Reaction: Yuck! That's nasty!</p>
                    <p><DeleteIcon className='icon' /> Trash Reaction: Vote here if you want to throw a post in the garbage.</p>
                    <p><QuestionMarkIcon className='icon blue' /> Confused Reaction: What is this? Spam? Is it even coherent?</p>
                    <h3>Deletion:</h3>
                    <p>
                        There is two kinds of votes: Positive and negative.
                        <br />
                        <br />
                        Positive votes include: Happy, fire, love.
                        <br />
                        <br />
                        Negative votes include: Gross, trash, confused.
                        <br />
                        <br />
                        In order to delete a post, it must have at least 20 trash reactions, and additionally, the total negative reactions must make up at least over 50% of the total reactions, positive and negative.
                        If both of these prerequisites are satisfied, the post will be eliminated. That means vote up what you want to protect! Vote down what you don't!
                        <br />
                        <br />
                        Lastly, all posts and reactions you make on this website are permanent (although without idenfitying information). A regular user is unable to remove them, so make sure your post is free of 
                        typos and also be careful of what and how you react to others.
                    </p>
                    <h3>Cooldown: </h3>
                    <p>
                        There is currently two kinds of cooldown. The first being post cooldown, and the second being reaction cooldown.
                        <br />
                        <br />
                        Post Cooldown: When a user makes a post, they are required to wait at least 4 minutes before another post can be made. This is achieved by temporarily logging the users
                        IP and filtering it to prevent spam. Following the 4 minute cooldown period, all identifying information is deleted. Additionally, no user information is associated with a post whatsoever,
                        as it is only used for cooldown purposes.
                        <br />
                        <br />
                        Reaction Cooldown: The same logic applies here as it did in the post cooldown, but the cooldown for reactions is only 25 seconds as opposed to 4 minutes. If you want to protect a post,
                        it might be a good idea to like it multiple times, because someone else may dislike it multiple times in an effort to delete it by contrast.
                    </p>
                    <h3>Disclaimer: </h3>
                    <p>
                        Any content you post here is your own liability. Need we have to say, breaking the law is illegal and this site isn't meant for criminal activity, even if its called anarchy. Think of this place as a forum for intellectual anarchy rather than literal anarchy. You can face criminal consequences if you break your jurisdictions laws.
                        User discretion is advised.
                    </p>
                </div>
                <div className='section-3'>

                </div>
            </div>
        </div>
    )
}