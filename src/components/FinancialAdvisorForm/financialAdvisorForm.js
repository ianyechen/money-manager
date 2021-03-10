import React from 'react';
import { withStyles,
        RadioGroup,
        FormControlLabel,
        FormControl,
        Radio,
        TextField,
        Grid,
        createMuiTheme} from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250,
    },
    radio: {
      marginRight: theme.spacing(3),
    },
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

  
class FinancialAdvisorForm extends React.Component {

    render() {
        const { classes, firstName, lastName, userName, birthday, gender, adminPasscode, email, 
                createdPassword, checkLength, passwordLengthError, passwordConfirmError, 
                confirmPassword, handleConfirmPassword, handleInputChange } = this.props;
        return (
            <div>
                <Grid container direction="row" spacing={1}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField required 
                                value={ firstName } 
                                onChange={ handleInputChange }
                                id="outlined-required" 
                                label="First Name" 
                                name="firstName"
                                variant="outlined" 
                                />
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                        <TextField required
                                value={ lastName } 
                                onChange={ handleInputChange }
                                id="outlined-required" 
                                label="Last Name" 
                                name="lastName"
                                variant="outlined" 
                                />
                        </FormControl>
                    </Grid>
                    
                    <Grid container direction="row" spacing={1}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField required
                                value={ userName } 
                                onChange={ handleInputChange }
                                id="outlined-required" 
                                label="User Name" 
                                name="userName"
                                variant="outlined" 
                                />
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField 
                                value={ birthday } 
                                onChange={ handleInputChange }
                                id="date" 
                                label="Birthday" 
                                type="date"
                                name="date"
                                variant="outlined" 
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                />
                    </FormControl>
                    </Grid>
                    
                    <RadioGroup aria-label="gender" value={ gender } onChange={ handleInputChange } name="gender" row >
                    <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" className={classes.radio}/>
                    <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" className={classes.radio}/>
                    <FormControlLabel value="other" control={<Radio color="primary" />} label="Other" className={classes.radio}/>
                    </RadioGroup>

                    <Grid container direction="column" spacing={1}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField required 
                                fullWidth
                                value={ email } 
                                onChange={ handleInputChange }
                                id="outlined-required" 
                                label="Email@example.com" 
                                name="email"
                                variant="outlined" 
                                />
                        </FormControl>
                    
                    { passwordLengthError ? 
                        <FormControl variant="outlined" className={classes.formControl}>
                        <TextField error
                                    helperText="The minimum number of characters is 8!"
                                    value={ createdPassword } 
                                    onChange={ checkLength }
                                    id="outlined-error" 
                                    label="Error" 
                                    type="password"
                                    name="createdPassword"
                                    variant="outlined" 
                                />
                        </FormControl>
                        :
                        <FormControl variant="outlined" className={classes.formControl}>
                        <TextField required 
                                    value={ createdPassword } 
                                    onChange={ checkLength }
                                    id="outlined-required" 
                                    label="Create password" 
                                    type="password"
                                    name="createdPassword"
                                    variant="outlined" 
                                />
                        </FormControl>
                    }
                    { passwordConfirmError ? 
                        <FormControl variant="outlined" className={classes.formControl}>
                        <TextField error
                                    helperText="The password does not match!"
                                    value={ confirmPassword } 
                                    onChange={ handleConfirmPassword }
                                    id="outlined-error" 
                                    label="Error" 
                                    type="password"
                                    name="confirmPassword"
                                    variant="outlined" 
                                    />
                        </FormControl>
                        :
                        <FormControl variant="outlined" className={classes.formControl}>
                        <TextField required 
                                value={ confirmPassword } 
                                onChange={ handleConfirmPassword }
                                id="outlined-required" 
                                label="Confirm password" 
                                type="password"
                                name="confirmPassword"
                                variant="outlined" 
                                />
                        </FormControl>
                    }
                    </Grid>

                    <Grid container direction="row" spacing={1}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField required 
                                value={ adminPasscode } 
                                onChange={ handleInputChange }
                                id="outlined-required" 
                                label="Admin Passcode" 
                                name="adminPasscode"
                                variant="outlined" 
                                /> 
                    </FormControl>
                </Grid>
            </div>
            
        )
    }
}

export default withStyles(useStyles)(FinancialAdvisorForm);