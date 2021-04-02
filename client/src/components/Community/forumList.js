import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import ForumListItem from "./forumListItem.js"

import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import { withStyles } from "@material-ui/core/styles";

import AddIcon from '@material-ui/icons/Add';

import { addPostdb, getPostsdb } from './actions.js';

// define styles
const styles =  theme => ({
  root: {
    flexGrow: 1,
    marginLeft: 50,
  },
  forumList: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    margin: 10,
  },
  forumTopBar: {
    backgroundColor: deepPurple[50],
    borderRadius: 5,
    spacing: '100',
  },
  forumTopChunk: {
    margin: 10,
  },
  addPostPanel: {
    backgroundColor: '#f0f0f0',
  },
  filter: {
    minWidth: 200,
  },
  forumBarButton: {
    padding: 10,
    marginLeft: 10,
    marginRight: 0,
  },
  purpleText: {
    color: deepPurple[500],
    fontSize: 30
  }
});

// define theme
const theme = createMuiTheme({
  palette: {
      primary: {
          main: deepPurple[800],
      },
      secondary: {
          main: deepPurple[100],
      }
  },
  typography: {
      fontFamily: [
          'Poppins',
          'sans-serif',
      ].join(','),
  },
});

// class defintion
class ForumList extends React.Component {

  // ===state===
  // openNewPost: determines if the newPost drop down is opened
  // openManagePost: determines if user is managing posts
  // author: holds the username of the current user if they decide to create a new post
  // title: holds the new post's title
  // authorAvatar: the user avatar of the user, currently set to null to display default user icon, later will be fetched from a database
  // content: holds the new post's content
  // category: holds the new post's category
  // postFilter: decides which category of post to display on screen
  // sortOrder: determines which order the posts are displayed
  // commenter: holds the username of the current user if they decide to comment on a post
  // commentContent: holds the new comment's content
  // posts: stores information about all the posts posted on the website, will be fetched from a database
  //    author: holds the post's author
  //    authorUsertype: holds the post's author's user type (regular for financial advisor)
  //    title: holds the title of the post
  //    content: holds the content of the post
  //    authorAvatar: holds the avatar of the post's author, currently null, will be fetched from a database
  //    category: holds the category of the post
  //    postID: unique id for the post, used to identify post (IMPORTANT)
  //    numUpvotes: holds the number of upvotes of the post
  //    numDownvotes: holds the number of downvotes of the post
  //    comments: holds the list of comments in the post
  //        commenter: the username of the commenter
  //        commentContent: the content of the comment
  state = {
    openNewPost: false,
    openManagePost: false,
    author: "",
    title: "",
    // authorAvatar: "",
    content: "",
    category: "",
    postFilter: "",
    sortOrder: "",
    commenter: "",
    commentContent: "",
    posts: [
      {author: 'Angus Wang', 
        authorUsertype: "FA",
        title: 'welcome to communtiy', 
        content: 'this is the first community thread', 
        // authorAvatar: null,
        category: "Announcement",
        postID: 1,
        numUpvotes: 5,
        numDownvotes: 1,
        comments: [
        {commenter: "Angus Wang",
          commentContent: "a great start to a great forum!"},
        {commenter: "Ian Chen",
          commentContent: "Is there a way to upvote this thread twice? This is honestly the best thing ever"}
        ]
      },
      {author: 'Winston Churchil', 
        authorUsertype: "RU",
        title: 'victory is at hand', 
        content: "We are weeks away from winning the war, thanks to my personal genius and our nation's strength. Brothers and sisters, we will soon be remembered as heros of our time, the greatest generation if I might add!", 
        // authorAvatar: null,
        category: "Announcement",
        postID: 2,
        numUpvotes: 4,
        numDownvotes: 2,
        comments: [
        {commenter: "Joseph Stalin",
          commentContent: "The Soviet Union is the reason this war is won! How dare you not include us is this post"},
        {commenter: "Anne Xie",
          commentContent: "How are you guys still alive? I thought you guys died decades ago"}
        ]
      },
      {author: 'Angela Merkel', 
        authorUsertype: "FA",
        title: 'Bitcoin is gonna fail', 
        content: "There's no way that bitcoin is going to grow much longer. I predict that bitcoin value will collapse by the end of this year!", 
        // authorAvatar: null,
        category: "Opinion",
        postID: 3,
        numUpvotes: 30,
        numDownvotes: 5,
        comments: [
        {commenter: "Emily Huang",
          commentContent: "Where did you get to this conclusion? In my opinion bitcoin is far from failing, in fact, I think it'll grow another 10 fold!"},
        {commenter: "Carl Marx",
          commentContent: "Stop talking about capitalism in the posts. We all know that all nations will eventually become communist as they develop to their final form. Communism is inevitable and most desirable!"}
        ]
      },
      {author: 'Bill Gates', 
        authorUsertype: "FA",
        title: 'What do you think about the future of Microsoft?', 
        content: "Microsoft has been a great company all these year, but we are running out of steam in the recent years. Does anyone have some suggestions for Windows 10 and Microsoft's other products?", 
        // authorAvatar: null,
        category: "Question",
        postID: 4,
        numUpvotes: 40,
        numDownvotes: 20,
        comments: [
        {commenter: "Ian Chen",
          commentContent: "Windows 10 really sucks. Anyone who values productivity should switch to macOS!"},
        {commenter: "Claude Debussy",
          commentContent: "I honestly think Microsoft should just focus on Minecraft. The game is awesome and honestly it seems to be the best Microsoft product now"}
        ]
      },
      {author: 'The Queen', 
        authorUsertype: "RU",
        title: 'How should I get into stocks?', 
        content: 'I know I am really old, but I am still interested in getting into stocks and other ways of investing? Any experts on this platform willing to help your queen? You rewards will be in the millions!', 
        // authorAvatar: null,
        category: "Question",
        postID: 5,
        numUpvotes: 1,
        numDownvotes: 50,
        comments: [
        {commenter: "Prince Charles",
          commentContent: "How are you still alive and kicking?"}
        ]
      }
    ]
  }

  componentDidMount() {
    getPostsdb(this)
  }

  // called when opening write new post
  handleClickOpen = () => {
    this.setState({ openNewPost: true })
  }

  // called when closing write new post
  handleClose = () => {

    this.setState({
      openNewPost: false,
      openManagePost: false,

      author: "",
      title: "",
      // authorAvatar: "",
      content: "",
      category: "",
      postID: null
    })
  }

  // called when opening manage post
  handleClickManage = () => {
    this.setState({ openManagePost: true })
  }

  // called when finished manage post
  handleClickManageDone = () => {
    this.setState({ openManagePost: false })
  }

  // called when user types into a textbox
  handleInputChange = (event) => {
    const value = event.target.value
    const name = event.target.name
    this.setState({ [name]: value })
  }

  // called when user chooses a post filter
  handleFilterInputChange = (event) => {
    const value = event.target.value
    this.setState({ postFilter: value })
  }

  // called when user chooses a sort by option
  handleSortInputChange = (event) => {
    const value = event.target.value
    this.setState({ sortOrder: value }, () => this.sortPosts(value))
  }

  // helper that sort the list of posts
  sortPosts = (order) => {

    const posts = this.state.posts

    switch(order) {
      case "Oldest":
        posts.sort((a, b) => a.postID > b.postID ? 1 : -1)
        break;
      case "Newest":
        posts.sort((a, b) => a.postID < b.postID ? 1 : -1)
        break;
      case "MostUpvotes":
        posts.sort((a, b) => a.numUpvotes < b.numUpvotes ? 1 : -1)
        break;
      case "BestRated":
        posts.sort((a, b) => a.numUpvotes-a.numDownvotes < b.numUpvotes-b.numDownvotes ? 1 : -1)

    }

    this.setState({ posts: posts })
  }

  // called when a new post is created
  addPost = (username, callback) => {

    const postList = this.state.posts
    const maxValue = Math.max.apply(Math, postList.map(function(p) { return p.postID; }))
    const newID = (postList.length === 0) ? 1 : maxValue + 1

    const newPost = {
      author: username,
      authorUsertype: this.props.userInfo.usertype,
      title: this.state.title,
      // authorAvatar: null,
      content: this.state.content,
      category: this.state.category,
      postID: newID,
      numUpvotes: 0,
      numDownvotes: 0,
      comments: []
    }

    postList.unshift(newPost)

    this.setState({
      posts: postList,

      author: "",
      title: "",
      // authorAvatar: "",
      content: "",
      category: "",
      postID: null
    })

    this.handleClose()
    this.sortPosts(this.state.sortOrder)
    callback(this.state.posts[0])
  }

  // called when user chooses a category for new post
  changeCategory = (_category) => {
    this.setState({ category: _category })
  }

  // called when user adds a comment to a post
  postComment = (target, callback) => {

    const targetPostID = target.postID
    const targetPostIndex = this.state.posts.findIndex(post => post.postID === targetPostID)
    const targetPost = this.state.posts.filter((p) => { return p.postID === targetPostID })
    const targetPostComments = targetPost[0].comments

    const newComment = {
      commenter: this.props.userInfo.username,
      commentContent: target.comment
    }

    targetPostComments.unshift(newComment)
    targetPost[0].comments = targetPostComments
    const otherPosts = this.state.posts.filter((p) => { return p.postID !== targetPostID })
    otherPosts.splice(targetPostIndex, 0, targetPost[0])

    this.setState({ posts: otherPosts })
    callback({targetPostID, newComment})
  }

  // called when user deletes a post
  deletePosts = (target, callback) => {

    const targetPostID = target.postID
    const otherPosts = this.state.posts.filter((p) => { return p.postID !== targetPostID })
    this.setState({ posts: otherPosts })

    const userInfo = this.props.userInfo
    const indexu = userInfo.userUpvotedPosts.indexOf(targetPostID)
    const indexd = userInfo.userDownvotedPosts.indexOf(targetPostID)
    const indexs = userInfo.userSavedPosts.indexOf(targetPostID)

    if (indexu !== -1) {
      userInfo.userUpvotedPosts.splice(indexu, 1)
      this.props.userInfoUpdater(userInfo)
    }
    if (indexd !== -1) {
      userInfo.userDownvotedPosts.splice(indexd, 1)
      this.props.userInfoUpdater(userInfo)
    }
    if (indexs !== -1) {
      userInfo.userSavedPosts.splice(indexs, 1)
      this.props.userInfoUpdater(userInfo)
    }

    callback(targetPostID)
  }

  // called when user upvotes a post
  addUpvote = (target, callback) => {

    const targetPostID = target.postID
    const targetPostIndex = this.state.posts.findIndex(post => post.postID === targetPostID)
    const targetPost = this.state.posts.filter((p) => { return p.postID === targetPostID })
    targetPost[0].numUpvotes = targetPost[0].numUpvotes + 1
    const otherPosts = this.state.posts.filter((p) => { return p.postID !== targetPostID })
    otherPosts.splice(targetPostIndex, 0, targetPost[0])
    this.setState({ posts: otherPosts })

    const userInfo = this.props.userInfo
    userInfo.userUpvotedPosts.push(targetPostID)
    this.props.userInfoUpdater(userInfo)

    callback({postID: targetPostID, path: "numUpvotes", value: targetPost[0].numUpvotes})
  }

  // called when user deletes their upvote from a post
  minusUpvote = (target, callback) => {

    const targetPostID = target.postID
    const targetPostIndex = this.state.posts.findIndex(post => post.postID === targetPostID)
    const targetPost = this.state.posts.filter((p) => { return p.postID === targetPostID })
    targetPost[0].numUpvotes = targetPost[0].numUpvotes - 1
    const otherPosts = this.state.posts.filter((p) => { return p.postID !== targetPostID })
    otherPosts.splice(targetPostIndex, 0, targetPost[0])
    this.setState({ posts: otherPosts })

    const userInfo = this.props.userInfo
    const index = userInfo.userUpvotedPosts.indexOf(targetPostID)
    if (index !== -1) userInfo.userUpvotedPosts.splice(index, 1)
    this.props.userInfoUpdater(userInfo)

    callback({postID: targetPostID, path: "numUpvotes", value: targetPost[0].numUpvotes})
  }

  // called when user downvotes a post
  addDownvote = (target, callback) => {

    const targetPostID = target.postID
    const targetPostIndex = this.state.posts.findIndex(post => post.postID === targetPostID)
    const targetPost = this.state.posts.filter((p) => { return p.postID === targetPostID })
    targetPost[0].numDownvotes = targetPost[0].numDownvotes + 1
    const otherPosts = this.state.posts.filter((p) => { return p.postID !== targetPostID })
    otherPosts.splice(targetPostIndex, 0, targetPost[0])
    this.setState({ posts: otherPosts })

    const userInfo = this.props.userInfo
    userInfo.userDownvotedPosts.push(targetPostID)
    this.props.userInfoUpdater(userInfo)

    callback({postID: targetPostID, path: "numDownvotes", value: targetPost[0].numDownvotes})
  }

  // called when user deletes a downvote from a post
  minusDownvote = (target, callback) => {

    const targetPostID = target.postID
    const targetPostIndex = this.state.posts.findIndex(post => post.postID === targetPostID)
    const targetPost = this.state.posts.filter((p) => { return p.postID === targetPostID })
    targetPost[0].numDownvotes = targetPost[0].numDownvotes - 1
    const otherPosts = this.state.posts.filter((p) => { return p.postID !== targetPostID })
    otherPosts.splice(targetPostIndex, 0, targetPost[0])
    this.setState({ posts: otherPosts })

    const userInfo = this.props.userInfo
    const index = userInfo.userDownvotedPosts.indexOf(targetPostID)
    if (index !== -1) userInfo.userDownvotedPosts.splice(index, 1)
    this.props.userInfoUpdater(userInfo)
    
    callback({postID: targetPostID, path: "numUpvotes", value: targetPost[0].numDownvotes})
  }

  // main render function
  render() {

    // pass in props
    const { userInfo, FAInfo, userInfoUpdater, sidebarToggle } = this.props
    const { classes } = this.props

    // mainList is the list of posts to display, here we display different versions of the list based on some parameters
    let mainList;

    // case when the side bar is set to home
    if (sidebarToggle === "Home") {
      mainList = <List className={ classes.forumList }>
        { this.state.posts.map((thread) => {
            if (this.state.openManagePost ? (userInfo.usertype === "FA" ? this.state.postFilter === "" : this.state.postFilter === "" && thread.author === userInfo.username) : this.state.postFilter === "") {
              return (
                <div>
                  <ForumListItem postTitle={ thread.title }
                                postAuthor={ thread.author }
                                postAuthorUsertype={ thread.authorUsertype}
                                postTextContent={ thread.content }
                                // avatar={ thread.authorAvatar }
                                category={ thread.category }
                                comments={ thread.comments }
                                postID={ thread.postID }
                                openManagePost={ this.state.openManagePost ? true : false }
                                numUpvotes={ thread.numUpvotes }
                                numDownvotes={ thread.numDownvotes }
                                userInfo={ userInfo }
                                FAInfo={ FAInfo }
                                userInfoUpdater={ userInfoUpdater }
                                addUpvote={ this.addUpvote }
                                minusUpvote={ this.minusUpvote }
                                addDownvote={ this.addDownvote }
                                minusDownvote={ this.minusDownvote }
                                deletePosts={ this.deletePosts }
                                postComment={ this.postComment }/>
                  { this.state.posts[this.state.posts.length - 1] === thread ? null : <Divider variant="inset" component="li" />}
                </div>
              )
            }
            else if (this.state.openManagePost ? (userInfo.usertype === "FA" ? this.state.postFilter === thread.category : this.state.postFilter === thread.category && thread.author === userInfo.username) : this.state.postFilter === thread.category) {
              return (
                <div>
                  <ForumListItem postTitle={ thread.title }
                                postAuthor={ thread.author }
                                postAuthorUsertype={ thread.authorUsertype}
                                postTextContent={ thread.content }
                                // avatar={ thread.authorAvatar }
                                category={ thread.category }
                                comments={ thread.comments }
                                postID={ thread.postID }
                                openManagePost={ this.state.openManagePost ? true : false }
                                numUpvotes={ thread.numUpvotes }
                                numDownvotes={ thread.numDownvotes }
                                userInfo={ userInfo }
                                FAInfo={ FAInfo }
                                userInfoUpdater={ userInfoUpdater }
                                addUpvote={ this.addUpvote }
                                minusUpvote={ this.minusUpvote }
                                addDownvote={ this.addDownvote }
                                minusDownvote={ this.minusDownvote }
                                deletePosts={ this.deletePosts }
                                postComment={ this.postComment }/>
                  { this.state.posts[this.state.posts.length - 1] === thread ? null : <Divider variant="inset" component="li" />}
                </div>
              )
            }
          })
        }
      </List>
    }

    // case when the side bar is set to Followed Posts
    else if (sidebarToggle === "Followed Posts") {
      mainList = <List className={ classes.forumList }>
        { this.state.posts.map((thread) => {
            if (this.state.postFilter === "" && userInfo.userFollows.includes((FAInfo.filter((FA) => {return FA.FAName === thread.author}))[0])) {
              return (
                <div>
                  <ForumListItem postTitle={ thread.title }
                                postAuthor={ thread.author }
                                postAuthorUsertype={ thread.authorUsertype}
                                postTextContent={ thread.content }
                                // avatar={ thread.authorAvatar }
                                category={ thread.category }
                                comments={ thread.comments }
                                postID={ thread.postID }
                                openManagePost={ this.state.openManagePost ? true : false }
                                numUpvotes={ thread.numUpvotes }
                                numDownvotes={ thread.numDownvotes }
                                userInfo={ userInfo }
                                FAInfo={ FAInfo }
                                userInfoUpdater={ userInfoUpdater }
                                addUpvote={ this.addUpvote }
                                minusUpvote={ this.minusUpvote }
                                addDownvote={ this.addDownvote }
                                minusDownvote={ this.minusDownvote }
                                deletePosts={ this.deletePosts }
                                postComment={ this.postComment }/>
                  { this.state.posts[this.state.posts.length - 1] === thread ? null : <Divider variant="inset" component="li" />}
                </div>
              )
            }
            else if (this.state.postFilter === thread.category && userInfo.userFollows.includes((FAInfo.filter((FA) => {return FA.FAName === thread.author}))[0])) {
              return (
                <div>
                  <ForumListItem postTitle={ thread.title }
                                postAuthor={ thread.author }
                                postAuthorUsertype={ thread.authorUsertype}
                                postTextContent={ thread.content }
                                // avatar={ thread.authorAvatar }
                                category={ thread.category }
                                comments={ thread.comments }
                                postID={ thread.postID }
                                openManagePost={ this.state.openManagePost ? true : false }
                                numUpvotes={ thread.numUpvotes }
                                numDownvotes={ thread.numDownvotes }
                                userInfo={ userInfo }
                                FAInfo={ FAInfo }
                                userInfoUpdater={ userInfoUpdater }
                                addUpvote={ this.addUpvote }
                                minusUpvote={ this.minusUpvote }
                                addDownvote={ this.addDownvote }
                                minusDownvote={ this.minusDownvote }
                                deletePosts={ this.deletePosts }
                                postComment={ this.postComment }/>
                  { this.state.posts[this.state.posts.length - 1] === thread ? null : <Divider variant="inset" component="li" />}
                </div>
              )
            }
          })
        }
      </List>
    }

    // case when the side bar is set to Liked Posts
    else if (sidebarToggle === "Liked Posts") {
      mainList = <List className={ classes.forumList }>
        { this.state.posts.map((thread) => {
            if (this.state.postFilter === "" && userInfo.userUpvotedPosts.includes(thread.postID)) {
              return (
                <div>
                  <ForumListItem postTitle={ thread.title }
                                postAuthor={ thread.author }
                                postAuthorUsertype={ thread.authorUsertype}
                                postTextContent={ thread.content }
                                // avatar={ thread.authorAvatar }
                                category={ thread.category }
                                comments={ thread.comments }
                                postID={ thread.postID }
                                openManagePost={ this.state.openManagePost ? true : false }
                                numUpvotes={ thread.numUpvotes }
                                numDownvotes={ thread.numDownvotes }
                                userInfo={ userInfo }
                                FAInfo={ FAInfo }
                                userInfoUpdater={ userInfoUpdater }
                                addUpvote={ this.addUpvote }
                                minusUpvote={ this.minusUpvote }
                                addDownvote={ this.addDownvote }
                                minusDownvote={ this.minusDownvote }
                                deletePosts={ this.deletePosts }
                                postComment={ this.postComment }/>
                  { this.state.posts[this.state.posts.length - 1] === thread ? null : <Divider variant="inset" component="li" />}
                </div>
              )
            }
            else if (this.state.postFilter === thread.category && userInfo.userUpvotedPosts.includes(thread.postID)) {
              return (
                <div>
                  <ForumListItem postTitle={ thread.title }
                                postAuthor={ thread.author }
                                postAuthorUsertype={ thread.authorUsertype}
                                postTextContent={ thread.content }
                                // avatar={ thread.authorAvatar }
                                category={ thread.category }
                                comments={ thread.comments }
                                postID={ thread.postID }
                                openManagePost={ this.state.openManagePost ? true : false }
                                numUpvotes={ thread.numUpvotes }
                                numDownvotes={ thread.numDownvotes }
                                userInfo={ userInfo }
                                FAInfo={ FAInfo }
                                userInfoUpdater={ userInfoUpdater }
                                addUpvote={ this.addUpvote }
                                minusUpvote={ this.minusUpvote }
                                addDownvote={ this.addDownvote }
                                minusDownvote={ this.minusDownvote }
                                deletePosts={ this.deletePosts }
                                postComment={ this.postComment }/>
                  { this.state.posts[this.state.posts.length - 1] === thread ? null : <Divider variant="inset" component="li" />}
                </div>
              )
            }
          })
        }
      </List>
    }

    // case when the side bar is set to Saved Posts
    else if (sidebarToggle === "Saved Posts") {
      mainList = <List className={ classes.forumList }>
        { this.state.posts.map((thread) => {
            if (this.state.postFilter === "" && userInfo.userSavedPosts.includes(thread.postID)) {
              return (
                <div>
                  <ForumListItem postTitle={ thread.title }
                                postAuthor={ thread.author }
                                postAuthorUsertype={ thread.authorUsertype}
                                postTextContent={ thread.content }
                                // avatar={ thread.authorAvatar }
                                category={ thread.category }
                                comments={ thread.comments }
                                postID={ thread.postID }
                                openManagePost={ this.state.openManagePost ? true : false }
                                numUpvotes={ thread.numUpvotes }
                                numDownvotes={ thread.numDownvotes }
                                userInfo={ userInfo }
                                FAInfo={ FAInfo }
                                userInfoUpdater={ userInfoUpdater }
                                addUpvote={ this.addUpvote }
                                minusUpvote={ this.minusUpvote }
                                addDownvote={ this.addDownvote }
                                minusDownvote={ this.minusDownvote }
                                deletePosts={ this.deletePosts }
                                postComment={ this.postComment }/>
                  { this.state.posts[this.state.posts.length - 1] === thread ? null : <Divider variant="inset" component="li" />}
                </div>
              )
            }
            else if (this.state.postFilter === thread.category && userInfo.userSavedPosts.includes(thread.postID)) {
              return (
                <div>
                  <ForumListItem postTitle={ thread.title }
                                postAuthor={ thread.author }
                                postAuthorUsertype={ thread.authorUsertype}
                                postTextContent={ thread.content }
                                // avatar={ thread.authorAvatar }
                                category={ thread.category }
                                comments={ thread.comments }
                                postID={ thread.postID }
                                openManagePost={ this.state.openManagePost ? true : false }
                                numUpvotes={ thread.numUpvotes }
                                numDownvotes={ thread.numDownvotes }
                                userInfo={ userInfo }
                                FAInfo={ FAInfo }
                                userInfoUpdater={ userInfoUpdater }
                                addUpvote={ this.addUpvote }
                                minusUpvote={ this.minusUpvote }
                                addDownvote={ this.addDownvote }
                                minusDownvote={ this.minusDownvote }
                                deletePosts={ this.deletePosts }
                                postComment={ this.postComment }/>
                  { this.state.posts[this.state.posts.length - 1] === thread ? null : <Divider variant="inset" component="li" />}
                </div>
              )
            }
          })
        }
      </List>
    }

    return (
        <div className={ classes.root }>
          <Container maxWidth="xl">

            {/* {top bar of forum list} */}
            <Card className={ classes.forumTopChunk }>

              <CardActions className={ classes.forumTopBar }>

                {/* {page title} */}
                <CardContent>
                  <span className={ classes.purpleText } > { sidebarToggle } </span>
                </CardContent>

                {/* {drop down to filter posts based on category} */}
                <FormControl className={ classes.filter }> 
                  <InputLabel>Filter Posts</InputLabel>
                  <Select onChange={ this.handleFilterInputChange }>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Announcement">Announcement</MenuItem>
                    <MenuItem value="Question">Question</MenuItem>
                    <MenuItem value="Opinion">Opinion</MenuItem>
                  </Select>
                </FormControl>

                {/* {drop down to reorder posts} */}
                <FormControl className={ classes.filter }>
                  <InputLabel>Sort By</InputLabel>
                  <Select onChange={ this.handleSortInputChange }>
                    <MenuItem value="Oldest">Oldest</MenuItem>
                    <MenuItem value="Newest">Newest</MenuItem>
                    <MenuItem value="MostUpvotes">Most Upvotes</MenuItem>
                    <MenuItem value="BestRated">Best Rated</MenuItem>
                  </Select>
                </FormControl>

                <Grid Container justify="flex-end">

                  {/* {add post button} */}
                  { this.state.openManagePost === true || this.state.openNewPost === true || sidebarToggle !== "Home" ? 
                    <Tooltip title="Add Post">
                      <Fab color="primary" size="small" onClick={ this.handleClickOpen } disabled>
                        <AddIcon fontSize="large"/>
                      </Fab>
                    </Tooltip>
                    :
                    <Tooltip title="Add Post">
                      <Fab color="primary" size="small" onClick={ this.handleClickOpen }>
                        <AddIcon fontSize="large"/>
                      </Fab>
                    </Tooltip>
                  }

                  {/* {manage post button} */}
                  { this.state.openManagePost ? 
                    <Button className={ classes.forumBarButton } color="primary" variant="contained" onClick={ this.handleClickManageDone }>
                      Done
                    </Button> : (sidebarToggle === "Home" ? 
                    <Button className={ classes.forumBarButton } color="primary" variant="contained" onClick={ this.handleClickManage }>
                      Manage Posts
                    </Button> : 
                    <Button className={ classes.forumBarButton } color="primary" variant="contained" disabled>
                      Manage Posts
                    </Button> )
                  }

                </Grid>
                
              </CardActions>
              
              {/* {new post drop down entries} */}
              { this.state.openNewPost ? 
              <React.Fragment>

                <CardContent>

                  {/* {enter post title} */}
                  <TextField
                    value={ this.state.title }
                    onChange={ this.handleInputChange }
                    size="small"
                    variant="outlined"
                    margin="dense"
                    name="title"
                    label="Post Title"
                    fullWidth
                  />

                  <br></br>
                  <br></br>
                  <Typography>Category:</Typography>
                  <br></br>
                  
                  {/* {enter post category} */}
                  <ButtonGroup color="primary" aria-label="outlined primary button group" fullWidth>
                    <Button variant={ this.state.category === "Announcement" ? "contained" : "outlined"} onClick={ () => this.changeCategory("Announcement") }>Announcement</Button>
                    <Button variant={ this.state.category === "Question" ? "contained" : "outlined"} onClick={ () => this.changeCategory("Question") }>Question</Button>
                    <Button variant={ this.state.category === "Opinion" ? "contained" : "outlined"} onClick={ () => this.changeCategory("Opinion") }>Opinion</Button>
                  </ButtonGroup>

                  <br></br>
                  <br></br>

                  {/* {enter post contents} */}
                  <TextField
                    value={ this.state.content }
                    onChange={ this.handleInputChange }
                    multiline
                    rows="5"
                    variant="outlined"
                    margin="dense"
                    name="content"
                    label="Say something here..."
                    fullWidth
                  />

                </CardContent>

                {/* {cancel and post buttons} */}
                <CardActions>

                  <Button onClick={ this.handleClose } color="primary">
                    Cancel
                  </Button>

                  <Button onClick={ () => this.addPost(userInfo.username, addPostdb) } color="primary" disabled={ this.state.title !== "" && this.state.content !== "" && this.state.category !== "" ? false : true}>
                    Post
                  </Button>

                </CardActions>

              </React.Fragment>
              : null }
              
            </Card>

            {/* {list of posts as defined above} */}
            {mainList}
              
          </Container>
        </div>
    )
  }
}

export default withStyles(styles)(ForumList);