const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 8000;
const lunr = require('lunr');
const PostModel = require('./models/PostModel');
const PostTimer = require('./models/PostTimer');
const ReactionTimer = require('./models/ReactionTimer');
mongoose.connect(process.env.SERVER_URI);
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Anarchy Forums API');
});
app.get('/api/getPost/:postId', async (req, res) => {
    try {
        const post = await PostModel.find({ _id: req.params.postId });
        if (post.length === 0) {
            throw res.json({
                success: 'False',
                msg: 'Could not load post'
            })
        } else {
            res.json({
                success: true,
                msg: post[0]
            });
        }
    } catch (e) {
        console.log('Error line 28');
    }
})
app.get('/api/search/:filter/:limit', async (req, res) => {
    try {
        if (req.query.searchquery === '') {
            const allPosts = await PostModel.find({});
            switch (req.params.filter) {
                case 'newest': {
                    const posts = await PostModel.find({}).limit(req.params.limit).sort({ _id: -1 }).exec();
                    res.json({
                        msg: posts,
                        success: true
                    });
                    break;
                }
                case 'popular': {
                    const posts = await PostModel.find({});
                    res.json({
                        msg: posts
                            .slice()
                            .filter(val => val.net >= 0)
                            .sort((a, b) => b.net - a.net)
                            .slice(0, req.params.limit),
                        success: true
                    })
                    break;
                }
                case 'warning': {
                    const posts = await PostModel.find({});
                    res.json({
                        msg: posts
                            .slice()
                            .filter(val => val.net <= 0)
                            .sort((a, b) => a.net - b.net)
                            .slice(0, req.params.limit),
                        success: true
                    })
                    break;
                }
            }
        } else {
            const allPosts = await PostModel.find({});
            switch (req.params.filter) {
                case 'newest': {
                    const index = await lunr(function () {
                        this.ref('_id');
                        this.field('title');
                        this.field('flair');
                        allPosts.forEach(function (doc) {
                            this.add(doc);
                        }, this);
                    })
                    const filteredIds = await index.search(req.query.searchquery);
                    const findIdArray = [];
                    for await (const key of filteredIds) {
                        findIdArray.push(key.ref);
                    }
                    const filteredPosts = await PostModel.find({
                        _id: {
                            $in: findIdArray
                        }
                    })
                    res.json({
                        success: true,
                        msg: filteredPosts.slice(0, req.params.limit)
                    })
                    break;
                }
                case 'popular': {
                    const index = await lunr(function () {
                        this.ref('_id');
                        this.field('title');
                        this.field('flair');
                        allPosts
                            .slice()
                            .filter(val => val.net >= 0)
                            .sort((a, b) => b.net - a.net)
                            .forEach(function (doc) {
                                this.add(doc);
                            }, this);
                    })
                    const filteredIds = await index.search(req.query.searchquery);
                    const findIdArray = [];
                    for await (const key of filteredIds) {
                        findIdArray.push(key.ref);
                    }
                    const filteredPosts = await PostModel.find({
                        _id: {
                            $in: findIdArray
                        }
                    })
                    res.json({
                        success: true,
                        msg: filteredPosts.slice(0, req.params.limit),
                    })
                    break;
                }
                case 'warning': {
                    const index = await lunr(function () {
                        this.ref('_id');
                        this.field('title');
                        this.field('flair');
                        allPosts
                            .slice()
                            .filter(val => val.net <= 0)
                            .sort((a, b) => a.net - b.net)
                            .forEach(function (doc) {
                                this.add(doc);
                            }, this);
                    })
                    const filteredIds = await index.search(req.query.searchquery);
                    const findIdArray = [];
                    for await (const key of filteredIds) {
                        findIdArray.push(key.ref);
                    }
                    const filteredPosts = await PostModel.find({
                        _id: {
                            $in: findIdArray
                        }
                    })
                    res.json({
                        success: true,
                        msg: filteredPosts.slice(0, req.params.limit)
                    })
                    break;
                }
                default: {
                    res.json({
                        success: false,
                        msg: 'Could not load posts'
                    })
                }
            }
        }
    } catch (e) {
        console.log(e.message);
        res.json({
            success: false,
            msg: 'Search Failed'
        })
    }

})
app.get('/api/getPosts/:filter/:limit', async (req, res) => {
    try {
        switch (req.params.filter) {
            case 'newest': {
                const posts = await PostModel.find({}).limit(req.params.limit).sort({ _id: -1 }).exec();
                res.json({
                    msg: posts,
                    success: true
                });
                break;
            }
            case 'popular': {
                const posts = await PostModel.find({});
                res.json({
                    msg: posts
                        .slice()
                        .filter(val => val.net >= 0)
                        .sort((a, b) => b.net - a.net)
                        .slice(0, req.params.limit),
                    success: true
                })
                break;
            }
            case 'warning': {
                const posts = await PostModel.find({});
                res.json({
                    msg: posts
                        .slice()
                        .filter(val => val.net <= 0)
                        .sort((a, b) => a.net - b.net)
                        .slice(0, req.params.limit),
                    success: true
                })
                break;
            }
        }
    } catch (e) {
        console.log(e.message);
        res.json({
            msg: 'Could not load posts',
            success: false,
        });
    }
});
app.post('/api/userPost', async (req, res) => {
    try {
        const postTimer = await PostTimer.find({ ip: req.socket.remoteAddress });
        if (postTimer.length > 0) {
            const ipRemovalDate = postTimer[0].seconds + 240;
            const currentDate = (new Date()).getTime() / 1000;
            const remainingTime = Math.floor(ipRemovalDate - currentDate);
            res.json({
                msg: `Re-post attempted too early, try again in ${remainingTime} seconds`,
                success: false
            })
        } else if (req.body.title.length < 8 || req.body.title.length > 50) {
            res.json({
                msg: 'Title should be between 8 and 50 characters',
                success: false
            });
        } else if (req.body.content.length < 100 || req.body.content.length > 4000) {
            res.json({
                msg: 'Content should be between 100 and 4000 characters',
                success: false
            });
        } else if (req.body.flair.length < 3 || req.body.flair.length > 20) {
            res.json({
                msg: 'Flair should be between 3 and 20 characters',
                success: false
            })
        } else {
            const addPost = await PostModel.create(req.body);
            await addPost.save();
            const addIp = await PostTimer.create({ ip: req.socket.remoteAddress, seconds: (new Date()).getTime() / 1000 });
            await addIp.save();
            setTimeout(async () => {
                await PostTimer.deleteOne({ ip: req.socket.remoteAddress });
            }, 1000 * 60 * 4);
            res.json({
                msg: 'Successfully posted',
                success: true
            })
        }
    } catch (e) {
        console.log(e.message);
        res.json({
            msg: 'An error has occured',
            success: false
        })
    }

});
app.post('/api/userReaction', async (req, res) => {
    try {
        const reactionTimer = await ReactionTimer.find({ ip: req.socket.remoteAddress });
        if (reactionTimer.length > 0) {
            const ipRemovalTime = reactionTimer[0].seconds + 26;
            const currentTime = (new Date()).getTime() / 1000;
            const remainingTime = Math.floor(ipRemovalTime - currentTime);
            res.json({
                msg: `Reaction attempted too early, try again in ${remainingTime} seconds`,
                success: false
            });
        } else {
            const post = await PostModel.find({ _id: req.body.postId });
            if (post.length === 0) {
                throw res.send({
                    success: false,
                    msg: 'Post was deleted',
                    deleted: true
                })
            } else {
                const addIp = await ReactionTimer.create({ ip: req.socket.remoteAddress, seconds: (new Date()).getTime() / 1000 })
                await addIp.save();
                setTimeout(async () => {
                    await ReactionTimer.deleteOne({ ip: req.socket.remoteAddress });
                }, 1000 * 25);
                switch (req.body.reaction) {
                    case 'happy': {
                        await PostModel.updateOne({ _id: req.body.postId }, {
                            $inc: {
                                'reactions.happy': 1,
                                'net': 1
                            }
                        });
                        res.json({
                            success: true,
                            msg: 'Reaction Successful'
                        })
                        break;
                    }
                    case 'fire': {
                        await PostModel.updateOne({ _id: req.body.postId }, {
                            $inc: {
                                'reactions.fire': 1,
                                'net': 1
                            }
                        });
                        res.json({
                            success: true,
                            msg: 'Reaction Successful'
                        })
                        break;
                    }
                    case 'love': {
                        await PostModel.updateOne({ _id: req.body.postId }, {
                            $inc: {
                                'reactions.love': 1,
                                'net': 1
                            }
                        });
                        res.json({
                            success: true,
                            msg: 'Reaction Successful'
                        })
                        break;
                    }
                    case 'gross': {
                        await PostModel.updateOne({ _id: req.body.postId }, {
                            $inc: {
                                'reactions.gross': 1,
                                'net': -1
                            }
                        });
                        const checker = await PostModel.findOne({ _id: req.body.postId });
                        const { happy, fire, love, gross, trash, confused } = checker.reactions;
                        if (trash >= 20 && ((gross + trash + confused) / (happy + fire + love + gross + trash + confused)) > 0.5) {
                            await PostModel.deleteOne({ _id: req.body.postId });
                            res.json({
                                success: true,
                                msg: 'Post Deleted',
                                deleted: true
                            })
                        } else {
                            res.json({
                                success: true,
                                msg: 'Reaction Successful',
                                deleted: false
                            })
                        }
                        break;
                    }
                    case 'trash': {
                        await PostModel.updateOne({ _id: req.body.postId }, {
                            $inc: {
                                'reactions.trash': 1,
                                'net': -1
                            }
                        });
                        const checker = await PostModel.findOne({ _id: req.body.postId });
                        const { happy, fire, love, gross, trash, confused } = checker.reactions;
                        if (trash >= 20 && ((gross + trash + confused) / (happy + fire + love + gross + trash + confused)) > 0.5) {
                            await PostModel.deleteOne({ _id: req.body.postId });
                            res.json({
                                success: true,
                                msg: 'Post Deleted',
                                deleted: true
                            })
                        } else {
                            res.json({
                                success: true,
                                msg: 'Reaction Successful',
                                deleted: false
                            })
                        }
                        break;
                    }
                    case 'confused': {
                        await PostModel.updateOne({ _id: req.body.postId }, {
                            $inc: {
                                'reactions.confused': 1,
                                'net': -1
                            }
                        });
                        const checker = await PostModel.findOne({ _id: req.body.postId });
                        const { happy, fire, love, gross, trash, confused } = checker.reactions;
                        if (trash >= 20 && ((gross + trash + confused) / (happy + fire + love + gross + trash + confused)) > 0.5) {
                            await PostModel.deleteOne({ _id: req.body.postId });
                            res.json({
                                success: true,
                                msg: 'Post Deleted',
                                deleted: true
                            })
                        } else {
                            res.json({
                                success: true,
                                msg: 'Reaction Successful',
                                deleted: false
                            })
                        }
                        break;
                    }
                }
            }
        }
    } catch (e) {
        console.log(e.message);
    }
})
app.listen(port, () => console.log(`Server listening on port ${port}`));