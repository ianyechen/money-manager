const routes = require('express').Router()

const actions = require('./actions')
const mongoChecker = actions.mongoChecker
const authenticate = actions.authenticate
const isMongoError = actions.isMongoError

const { mongoose } = require("../db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

const log = console.log

const { Post } = require("../models/posts");

// get all posts
routes.get('/posts', mongoChecker, authenticate, async (req, res) => {

    try {
        const allPosts = await Post.find()
        console.log(allPosts)
        res.send(allPosts)
    }
    catch (error) {
        log(error)
        res.status(500).send("Internal server error")
    }
})

// add new post
routes.post('/posts', mongoChecker, authenticate, async (req, res) => {

    const newPost = new Post({
        postID: req.body.postID,
        author: req.session.username,
        authorUsertype: req.body.authorUsertype,
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        numUpvotes: req.body.numUpvotes,
        numDownvotes: req.body.numDownvotes,
        time: req.body.time,
        comments: []
    })

    // console.log("im here", newPost)

    try {
        const result = await newPost.save()
        console.log(result)
        res.status(200).send(result)
    }
    catch (error) {
        log(error)
        if (isMongoError(error)) {
            res.status(500).send("Internal server error")
        }
        else {
            res.status(400).send("bad request")
        }
    }
})

// delete a post
routes.delete('/posts/:postID', mongoChecker, authenticate, async (req, res) => {

    const targetPostID = req.params.postID

    console.log("delete id:", targetPostID)

    try {
        let targetPost = await Post.findOneAndDelete({ postID: targetPostID })
        // targetPost = Post.find()
        if (!targetPost) {
            res.status(404).send('resource not found')
        }
        else {
            res.send(targetPost)
        }
    }
    catch (error) {
        log(error)
        res.status(500).send('Internal server error')
    }
})

// edit the post (upvotes and downvotes)
/*
[
 { "op": "replace", "path": "/numUpvotes", "value": 4 },
 { "op": "replace", "path": "/numDownvotes", "value": 5 },
 ...
]
*/
routes.patch('/posts/:postID', mongoChecker, authenticate, async (req, res) => {

    const targetPostID = req.params.postID

    console.log("in patch", targetPostID)

    // Find the fields to update and their values.
    const fieldsToUpdate = {}
    req.body.map((change) => {
        const propertyToChange = change.path.substr(1) // getting rid of the '/' character
        fieldsToUpdate[propertyToChange] = change.value
    })

    // Update the student by their id.
    try {
        const retPost = await Post.findOneAndUpdate({ postID: targetPostID }, { $set: fieldsToUpdate }, { new: true, useFindAndModify: false })
        if (!retPost) {
            res.status(404).send('Resource not found')
        } else {
            res.send(retPost)
        }
    } catch (error) {
        log(error)
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

// add new comment to a post
routes.post('/posts/:postID', mongoChecker, authenticate, async (req, res) => {

    const targetPostID = req.params.postID

    console.log(targetPostID)

    try {
        let targetPost = await Post.find({ postID: targetPostID })
        if (!targetPost) {
            res.status(404).send('resouce not found')
        }
        else {
            // console.log("check", req.body.commenter)
            // console.log("check", req.body.commentContent)
            // console.log("check1", targetPost)
            let ret = await targetPost[0].comments.unshift({ commenter: req.body.commenter, commentContent: req.body.commentContent })
            ret = await targetPost[0].save()
            let comment = targetPost[0].comments[0]
            res.status(200).send(comment)
        }
    }
    catch (error) {
        log(error)
        if (isMongoError(error)) {
            res.status(500).send('Internal server error')
        }
        else {
            res.status(400).send('bad request')
        }
    }
})

module.exports = routes