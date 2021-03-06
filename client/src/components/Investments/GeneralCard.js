import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import InvestmentImage from './financialmanagement.png';
import { withStyles } from '@material-ui/core'

//For the card's background colour
const useStyles = () => ({
  generalCard: {
    backgroundColor: deepPurple[100],
  },
  removeLine: {
    textDecoration: 'none',
    color: 'black'
  }
});


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

//Shows some general account information
class GeneralCard extends React.Component {
  //the account name, accounr number, currency here are all hardcoded. This will need to be linked to 
  //some database in phase 2. 
  //the total amount invested is also based on hard coded entries(in index.js's state)
    render(){
        const {total,classes, accountName, accountNumber, currency} = this.props;
        return(
            <ThemeProvider theme={ theme }>
            <Card variant="outlined" className = {classes.generalCard}>
            <CardContent>
              <Typography variant="h3">
                Account overview
              </Typography>
              <br/>
              <Typography variant="h5" display="block"gutterBottom>
                Account name: <br/>
                <Typography variant="h5" gutterBottom>
                {accountName}
                </Typography>
              </Typography>
              <Typography variant="h5" display="block" gutterBottom>
                Account number: <br/>
                <Typography variant="h5" gutterBottom>
                  {accountNumber}
                </Typography>
              </Typography>
              <Typography variant="h5" display="block" gutterBottom>
                  Currency: <br/>
                <Typography variant="h5" gutterBottom>
                  {currency}
                </Typography>
              </Typography>
              <Typography variant="h5" display="block" gutterBottom>
                Total amount invested: <br/>
                <Typography variant="h5" gutterBottom>
                ${total}
                </Typography>
              </Typography>
              <br/>
              <br/>
              <Typography variant="h6" display="block">
                If you'd like to learn more about saving and investing, visit our community page
                <Link to={'/community'} className = {classes.removeLine}>
                  <Button color="primary" >
                    <Typography variant="h6" >
                      here.
                    </Typography>
                  </Button>
                </Link>
              </Typography>
            </CardContent>
            <img className = "InvestmentImage" src = {InvestmentImage}/> 
          </Card> 
          
          </ThemeProvider>
        )
    }
}

export default  withStyles(useStyles)(GeneralCard);