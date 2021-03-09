import React from 'react';
import clsx from 'clsx';
import { Typography, 
        Grid,
        Paper,
        AppBar,
        Toolbar,
        Button,
        Drawer,
        withStyles, 
        createMuiTheme,
        Table,
        TableContainer,
        TableBody,
        TableCell,
        TableRow,
        Tab,
        Tabs,
        Avatar,
        ThemeProvider, 
        List,
        Divider,
        TextField } from '@material-ui/core';
import { deepPurple, grey } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import ForumListItem from '../Community/forumListItem';
import PostAddIcon from '@material-ui/icons/PostAdd';

const drawerWidth = 400;

const useStyles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        background: deepPurple[50],
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        marginTop: theme.spacing(3),
    },
    numberGroup: {
        paddingLeft: theme.spacing(15),
    },
    paper: {
        display: 'flex',
        flexDirection: 'row',  
        borderRadius: 10,
        backgroundColor: deepPurple[100],
        marginTop:  theme.spacing(3),
        paddingLeft: 50,
        paddingRight: 50,
        marginRight: theme.spacing(20),
    },
    tabs: {
        marginLeft: theme.spacing(3),
    },
    avatar: {
        height: '100px',
        width: '100px',
        fontSize: '2em',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(18.5),
        backgroundColor: deepPurple[800],
    },
    username: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(12),
    },
    email: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(5),
    },
    table: {
        marginTop: theme.spacing(1),
    },
    tableCell: {
        borderBottom: 'none',
        paddingLeft: theme.spacing(3),
        fontSize: '1em',
    },
    text_username: {
        marginLeft: theme.spacing(4),
    },
    text_email: {
        marginLeft: theme.spacing(9),
    },
    text_occupation: {
        marginLeft: theme.spacing(2.7),
    },
    text_birthday: {
        marginLeft: theme.spacing(6),
    },
    editButton: {
        float: 'right',
        marginRight: theme.spacing(3),
    },
    logoutButton: {
        float: 'right',
        marginTop: theme.spacing(20),
        marginRight: theme.spacing(3),
    },
    group: {
        float: 'right',
        marginRight: theme.spacing(30),
    },
    group1: {
        float: 'right',
        marginRight: theme.spacing(3),
    },
    name: {
        fontWeight: 'bold',
        fontSize: '1.6em',
        borderBottom: 'none',
    },
    textfield: {
        minWidth: 340,
    },
    bio: {
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(3),
    },
    number: {
        marginLeft: theme.spacing(3),
    },
    number1: {
        marginLeft: theme.spacing(2),
    },
    post: {
        marginTop: theme.spacing(10),
        marginLeft: theme.spacing(3),
    },
    nothing: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(30),
    },
    postIcon: {
        fontSize: '5em',
        position: 'relative',
        marginTop: theme.spacing(10),
        left: '50%',
    },
    forumList: {
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        margin: theme.spacing(3),
    },
})

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

class Profile extends React.Component {

    state = {
        // if false, display edit; if true, display Done
        edit: false,
        logout: false,
        userLevel: "",
        avatar: "",
        bio: "An individual that is pursuing one's passions.",
        username: "user",
        name: "User X",
        email: "user@123.com",
        occupation: "student",
        birthday: "2021-03-08",
        openNewPost: false,
        openManagePost: false,
        author: "",
        title: "",
        authorAvatar: "",
        content: "",
        category: "",
        postFilter: "",
        sortOrder: "",
        commenter: "",
        commentContent: "",
        userInfo: {
            username: "",
            usertype: "",
            userUpvotedPosts: [],
            userDownvotedPosts: [],
            userFollows: [],
        },
        posts:  "",
    }

    handleEdit = () => {
        this.setState({
            edit: !this.state.edit,
        })
    }

    handleInputChange = (event) => {
        console.log(event)
    
        // get the value we type in 
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(value);
        
        if(name == "username") {
            for(let i = 0; i < this.state.posts.length; i++) {
                this.state.posts[i].author = value;
                this.state.posts[i].authorAvatar = value.charAt(0).toUpperCase();
            }
            this.state.avatar = value.charAt(0).toUpperCase();
            this.state.author = value;
            this.state.commenter = value;
        }
        // state is updated and value is also updated in JSX
        // the square bracket dynamically changes the name 
        this.setState({
          [name]: value
        })
    };

    postComment = (target) => {
        const targetPostID = target.postID
        console.log(targetPostID)
        const targetPostIndex = this.state.posts.findIndex(post => post.postID === targetPostID)
        
        const targetPost = this.state.posts.filter((p) => { return p.postID === targetPostID })
        const targetPostComments = targetPost[0].comments
    
        const newComment = {
          commenter: this.state.commenter,
          commentContent: target.comment
        }
    
        targetPostComments.push(newComment)
        targetPost[0].comments = targetPostComments
        
        const otherPosts = this.state.posts.filter((p) => { return p.postID !== targetPostID })
    
        otherPosts.splice(targetPostIndex, 0, targetPost[0])
    
        this.setState({ posts: otherPosts })
    }

    deletePosts = (target) => {
        console.log("deleting post")
        const targetPostID = target.postID
        const otherPosts = this.state.posts.filter((p) => { return p.postID !== targetPostID })
        console.log("posts length: ", otherPosts.length)
        this.setState({ posts: otherPosts })

        const userInfo = this.state.userInfo
        const index = userInfo.userUpvotedPosts.indexOf(targetPostID)
        if (index !== -1) {
            userInfo.userUpvotedPosts.splice(index, 1)
            this.setState({ userInfo: userInfo })
    }
    }

    addUpvote = (target) => {
        console.log("adding upvotes")
        const targetPostID = target.postID
        const targetPostIndex = this.state.posts.findIndex(post => post.postID === targetPostID)
        const targetPost = this.state.posts.filter((p) => { return p.postID === targetPostID })
        targetPost[0].numUpvotes = targetPost[0].numUpvotes + 1
        const otherPosts = this.state.posts.filter((p) => { return p.postID !== targetPostID })
        otherPosts.splice(targetPostIndex, 0, targetPost[0])
        this.setState({ posts: otherPosts })

        const userInfo = this.state.userInfo
        userInfo.userUpvotedPosts.push(targetPostID)
        this.setState({ userInfo: userInfo })
    }

    minusUpvote = (target) => {
        console.log("subtracting upvotes")
        const targetPostID = target.postID
        const targetPostIndex = this.state.posts.findIndex(post => post.postID === targetPostID)
        const targetPost = this.state.posts.filter((p) => { return p.postID === targetPostID })
        targetPost[0].numUpvotes = targetPost[0].numUpvotes - 1
        const otherPosts = this.state.posts.filter((p) => { return p.postID !== targetPostID })
        otherPosts.splice(targetPostIndex, 0, targetPost[0])
        this.setState({ posts: otherPosts })

        const userInfo = this.state.userInfo
        const index = userInfo.userUpvotedPosts.indexOf(targetPostID)
        if (index !== -1) userInfo.userUpvotedPosts.splice(index, 1)
        this.setState({ userInfo: userInfo })
    }

    addDownvote = (target) => {
        console.log("adding downvotes")
        const targetPostID = target.postID
        const targetPostIndex = this.state.posts.findIndex(post => post.postID === targetPostID)
        const targetPost = this.state.posts.filter((p) => { return p.postID === targetPostID })
        targetPost[0].numDownvotes = targetPost[0].numDownvotes + 1
        const otherPosts = this.state.posts.filter((p) => { return p.postID !== targetPostID })
        otherPosts.splice(targetPostIndex, 0, targetPost[0])
        this.setState({ posts: otherPosts })

        const userInfo = this.state.userInfo
        userInfo.userDownvotedPosts.push(targetPostID)
        this.setState({ userInfo: userInfo })
    }

    minusDownvote = (target) => {
        console.log("subtracting downvotes")
        const targetPostID = target.postID
        const targetPostIndex = this.state.posts.findIndex(post => post.postID === targetPostID)
        const targetPost = this.state.posts.filter((p) => { return p.postID === targetPostID })
        targetPost[0].numDownvotes = targetPost[0].numDownvotes - 1
        const otherPosts = this.state.posts.filter((p) => { return p.postID !== targetPostID })
        otherPosts.splice(targetPostIndex, 0, targetPost[0])
        this.setState({ posts: otherPosts })

        const userInfo = this.state.userInfo
        const index = userInfo.userDownvotedPosts.indexOf(targetPostID)
        if (index !== -1) userInfo.userDownvotedPosts.splice(index, 1)
        this.setState({ userInfo: userInfo })
    }

    componentDidMount() {
        this.changeUserState();
    }

    changeUserState = () => {
        if(this.state.userLevel === "User") {
            this.state.avatar = "U";
            this.state.bio = "An individual that is pursuing one's passions.";
            this.state.username = "user";
            this.state.name = "User X";
            this.state.email = "user@123.com";
            this.state.occupation = "Student";
            this.state.birthday = "2021-03-08";
            this.state.posts = [
                {author: 'User', 
                authorUsertype: "RU",
                title: 'Welcome to communtiy', 
                content: 'this is the first community thread', 
                authorAvatar: "U",
                category: "Announcement",
                postID: 1,
                numUpvotes: 5,
                numDownvotes: 1,
                comments: [
                {commenter: "User2",
                    commentContent: "This is a great post"},
                {commenter: "User3",
                    commentContent: "This is a bad post"}
                ]
                },
                {author: 'User', 
                authorUsertype: "RU",
                title: 'My second post', 
                content: 'This is the second post ever!!!!!!!', 
                authorAvatar: "U",
                category: "Opinion",
                postID: 2,
                numUpvotes: 4,
                numDownvotes: 2,
                comments: [
                {commenter: "Financial Advisor3",
                    commentContent: "You should come to my page to learn about financials"},
                {commenter: "User4",
                    commentContent: "Go buy GME!"}
                ]
                }
            ];
            this.setState({
                avatar: this.state.avatar,
                bio: this.state.bio,
                username: this.state.username,
                name: this.state.name,
                email: this.state.email,
                occupation: this.state.occupation,
                birthday: this.state.birthday,
                posts: this.state.posts
            })
            
        } else if(this.state.userLevel === "Financial Advisor") {
            this.state.avatar = "FA";
            this.state.bio = "A certified financial advisor, dedicated to help others";
            this.state.username = "admin";
            this.state.name = "Admin X";
            this.state.email = "admin@123.com";
            this.state.occupation = "Financial advisor";
            this.state.birthday = "2021-03-08";
            this.state.posts = [
                {author: 'Admin', 
                authorUsertype: "FA",
                title: 'Welcome to communtiy', 
                content: 'I am the financial advisor', 
                authorAvatar: "FA",
                category: "Announcement",
                postID: 1,
                numUpvotes: 5,
                numDownvotes: 1,
                comments: [
                {commenter: "User2",
                    commentContent: "This is a great post"},
                {commenter: "User3",
                    commentContent: "This is a bad post"}
                ]
                },
                {author: 'Admin', 
                authorUsertype: "FA",
                title: 'My second post', 
                content: 'I am here to provide you guys with some help in financing', 
                authorAvatar: "FA",
                category: "Opinion",
                postID: 2,
                numUpvotes: 4,
                numDownvotes: 2,
                comments: [
                {commenter: "Financial Advisor3",
                    commentContent: "You should come to my page to learn about financials"},
                {commenter: "User4",
                    commentContent: "Go buy GME!"}
                ]
                }
            ];
            this.setState({
                avatar: this.state.avatar,
                bio: this.state.bio,
                username: this.state.username,
                name: this.state.name,
                email: this.state.email,
                occupation: this.state.occupation,
                birthday: this.state.birthday,
                posts: this.state.posts
            })
        }
    }

    render() {
        const { classes, username, handleLogOut, password, userLevel } = this.props;

        if(userLevel === "User") {
            this.state.userLevel = "User"
        } else if(userLevel === "Financial Advisor") {
            this.state.userLevel = "Financial Advisor"
        }

        return ( 
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <AppBar color="secondary" position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant='h6' noWrap>
                                Profile
                            </Typography>

                            <Tabs inkBarStyle={{background: 'black'}} centered>
                
                                <Link to={'/spendings'} style={{ textDecoration: 'none', color: 'black' }} className={classes.tabs}>
                                    <Tab label="Spendings"/>
                                </Link>

                                <Link to={'/investments'} style={{ textDecoration: 'none', color: 'black' }} className={classes.tabs}>
                                    <Tab label="Investments"/>
                                </Link>
                                
                                <Link to={'/community'} style={{ textDecoration: 'none', color: 'black' }} className={classes.tabs}>
                                    <Tab label="Community"/>
                                </Link>

                            </Tabs>
                        </Toolbar>
                    </AppBar>
                    <Drawer className={classes.drawer} 
                            variant="permanent"
                            anchor="left"
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                    >
                        <Toolbar />
                        <div className={classes.drawerContainer}>
                            <Avatar align="center"
                                    name="avatar"
                                    value={this.state.avatar}
                                    className={classes.avatar}>{ this.state.avatar }</Avatar>

                            { this.state.edit ? 
                                <TableContainer>
                                    <Table className={classes.table} aria-label="profile table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>
                                                    <TextField onChange={ this.handleInputChange }
                                                            value={ this.state.username }
                                                            defaultValue="user"
                                                            id="outlined" 
                                                            label="username" 
                                                            name="username"
                                                            variant="outlined" 
                                                            className={classes.textfield}
                                                            />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>
                                                    <TextField onChange={ this.handleInputChange }
                                                                value={ this.state.name }
                                                                defaultValue="User X"
                                                                id="outlined" 
                                                                label="name" 
                                                                name="name"
                                                                variant="outlined" 
                                                                className={classes.textfield}
                                                                />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>
                                                    <TextField onChange={ this.handleInputChange }
                                                                    value={ this.state.email }
                                                                    defaultValue="user@123.com"
                                                                    id="outlined" 
                                                                    label="email" 
                                                                    name="email"
                                                                    variant="outlined" 
                                                                    className={classes.textfield}
                                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>
                                                    <TextField onChange={ this.handleInputChange }
                                                                    value={ this.state.occupation }
                                                                    defaultValue="student"
                                                                    id="outlined" 
                                                                    label="occupation" 
                                                                    name="occupation"
                                                                    variant="outlined" 
                                                                    className={classes.textfield}
                                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>
                                                    <TextField 
                                                        value={ this.state.birthday } 
                                                        onChange={ this.handleInputChange }
                                                        defaultValue="2021-03-08"
                                                        id="date" 
                                                        label="Birthday" 
                                                        type="date"
                                                        name="birthday"
                                                        variant="outlined" 
                                                        InputLabelProps={{
                                                        shrink: true,
                                                        }}
                                                        className={classes.textfield}
                                                        />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>
                                                    <TextField 
                                                        value={ this.state.bio } 
                                                        onChange={ this.handleInputChange }
                                                        multiline
                                                        defaultValue="An individual that is pursuing one's passions."
                                                        id="bio" 
                                                        label="Bio"
                                                        name="bio"
                                                        variant="outlined" 
                                                        className={classes.textfield}
                                                        />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                :
                                <TableContainer>
                                    <Table className={classes.table} aria-label="profile table">
                                        <TableBody>
                                            <TableRow>
                                                <Typography align="center" className={classes.name}>{ this.state.name }</Typography>
                                            </TableRow>
                                            <TableRow>
                                                <Typography className={classes.bio}>{ this.state.bio }</Typography>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>Username: 
                                                    <span className={classes.text_username}>{ this.state.username }</span>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>Email: 
                                                    <span className={classes.text_email}>{ this.state.email }</span>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>Occupation: 
                                                    <span className={classes.text_occupation}>{ this.state.occupation }</span>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>Birthday: 
                                                    <span className={classes.text_birthday}>{ this.state.birthday }</span>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>       
                            }
                            
                            { this.state.edit ? 
                            <Button onClick={ this.handleEdit }
                                    color="primary" 
                                    variant="contained" 
                                    className={classes.editButton}>
                                Done
                            </Button>
                            :
                            <div>
                                <Button onClick={ this.handleEdit }
                                        color="primary" 
                                        variant="contained" 
                                        className={classes.editButton}>
                                    Edit Profile
                                </Button>
                                <Link to={"/"}>
                                    <Button onClick={ () => handleLogOut() }
                                            color="primary" 
                                            variant="contained" 
                                            className={classes.logoutButton}>
                                        Log Out
                                    </Button>
                                </Link>
                            </div>
                            }
                        </div>
                    </Drawer>

                   
                    <main className={classes.content}>
                        <Grid container direction="row" className={classes.numberGroup}>
                            <Paper color="primary" elevation={3} className={classes.paper}>
                                <div className={classes.group}>
                                    <Typography variant='h6'>
                                        Followers
                                    </Typography>
                                    <Typography variant='h6' className={classes.number1}>
                                        250
                                    </Typography>
                                </div>
                                <div className={classes.group}>
                                    <Typography variant='h6'>
                                        Following
                                    </Typography>
                                    <Typography variant='h6' className={classes.number}>
                                        300
                                    </Typography>
                                </div>
                                <div className={classes.group1}>
                                    <Typography variant='h6'>
                                        Posts
                                    </Typography>
                                    <Typography variant='h6' className={classes.number}>
                                        { this.state.posts.length }
                                    </Typography>
                                </div>
                                </Paper>
                        </Grid>

                        <div>
                            <Typography variant='h5' className={classes.post}>
                                My posts:
                            </Typography>

                            { this.state.posts == "" ? 
                                <div>
                                    <PostAddIcon className={classes.postIcon}/>
                                    <Typography variant='h5' className={classes.nothing}>
                                        You don't have anything posted yet. Go post something!
                                    </Typography>
                                </div>
                                :
                                <List className={ classes.forumList }>
                                    { this.state.posts.map((thread) => {
                                        if (this.state.openManagePost ? this.state.postFilter === "" && thread.author === username : this.state.postFilter === "") {
                                            return (
                                            <div>
                                                <ForumListItem postTitle={ thread.title }
                                                            postAuthor={ thread.author }
                                                            postAuthorUsertype={ thread.authorUsertype}
                                                            postTextContent={ thread.content }
                                                            avatar={ thread.authorAvatar }
                                                            category={ thread.category }
                                                            comments={ thread.comments }
                                                            postID={ thread.postID }
                                                            openManagePost={ this.state.openManagePost ? true : false }
                                                            numUpvotes={ thread.numUpvotes }
                                                            numDownvotes={ thread.numDownvotes }
                                                            userInfo={ this.state.userInfo }
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
                            
                        </div>
                    </main> 
                </div>
            </ThemeProvider>
        )
    }
}

export default withStyles(useStyles)(Profile);