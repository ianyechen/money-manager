import React from 'react';
import { withStyles, 
        Table,
        TableContainer,
        TableBody,
        TableCell,
        TableRow,
        Typography,
        Paper } from '@material-ui/core';
        
const useStyles = theme => ({
    
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
    text_points: {
        marginLeft: theme.spacing(9),
    },
    text_fields: {
        marginLeft: theme.spacing(9),
    },
    bio: {
        align: "center",
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(3),
        fontSize: '1.3em',
    },
    name: {
        fontWeight: 'bold',
        fontSize: '1.6em',
        borderBottom: 'none',
    },
    card: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        backgroundColor: "#d1c4e9",
    }
})

class Done extends React.Component {
    render() {

        const { classes, username, name, email, occupation, birthday, bio, userLevel, FAName, FAIntro, FAFields, FAPoints } = this.props;
        return (
            <TableContainer>
                <Table className={classes.table} aria-label="profile table">
                    { userLevel == "Regular User" ?
                        <TableBody>
                            <TableRow>
                                <Typography align="center" className={classes.name}>{ name }</Typography>
                            </TableRow>
                            <TableRow>
                                <Typography align="center" className={classes.bio}>{ bio }</Typography> 
                            </TableRow>
                            
                            <TableRow>
                                <TableCell className={classes.tableCell}>Username: 
                                    <span className={classes.text_username}>{ username }</span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell}>Email: 
                                    <span className={classes.text_email}>{ email }</span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell}>Occupation: 
                                    <span className={classes.text_occupation}>{ occupation }</span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell}>Birthday: 
                                    <span className={classes.text_birthday}>{ birthday }</span>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        :
                        <TableBody>
                            <TableRow>
                                <Typography align="center" className={classes.name}>{ FAName }</Typography>
                            </TableRow>
                            <TableRow>
                                <Typography align="center" className={classes.bio}>{ FAIntro }</Typography> 
                            </TableRow>
                            
                            <TableRow>
                                <TableCell className={classes.tableCell}>Username: 
                                    <span className={classes.text_username}>{ username }</span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell}>Email: 
                                    <span className={classes.text_email}>{ email }</span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell}>Points: 
                                    <span className={classes.text_points}>{ FAPoints }</span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell}>Fields: 
                                    <span className={classes.text_fields}>{ FAFields }</span>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    }

                </Table>
            </TableContainer>   
        )
    }
}
export default withStyles(useStyles)(Done);