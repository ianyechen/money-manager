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
import { updateSignupForm, updateConfirmPassword } from '../../actions/user.js';
const useStyles = theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250,
    },
    radio: {
      marginRight: theme.spacing(3),
    },
    textField: {
        '& p':{
            color:'green',
        },
    },
    floatingLabelFocusStyle: {
        color: "green"
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

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'green',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'green',
          borderWidth: 2,
        },
        '&:hover fieldset': {
          borderColor: 'green',
          borderWidth: 2,
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green',
        },
      },
    },
})(TextField);
  
class FinancialAdvisorForm extends React.Component {

    render() {
        const { classes, signup, firstName, lastName, userName, birthday, gender, adminPasscode, email, 
                createdPassword, checkLength, passwordLengthError, passwordConfirmError, firstTime, firstTimeConfirm,
                confirmPassword, handleConfirmPassword, handleInputChange } = this.props;
        return (
            <div>
                <Grid container direction="row" spacing={1}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField required 
                                value={ firstName } 
                                onChange={ e => updateSignupForm(signup, e.target) }
                                id="outlined-required" 
                                label="First Name" 
                                name="firstName"
                                variant="outlined" 
                                />
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                        <TextField required
                                value={ lastName } 
                                onChange={ e => updateSignupForm(signup, e.target) }
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
                                onChange={ e => updateSignupForm(signup, e.target) }
                                id="outlined-required" 
                                label="User Name" 
                                name="userName"
                                variant="outlined" 
                                />
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField 
                                value={ birthday } 
                                onChange={ e => updateSignupForm(signup, e.target) }
                                id="date" 
                                label="Birthday" 
                                type="date"
                                name="birthday"
                                variant="outlined" 
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                />
                    </FormControl>
                    </Grid>
                    
                    <RadioGroup aria-label="gender" value={ gender } onChange={ e => updateSignupForm(signup, e.target) } name="gender" row >
                    <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" className={classes.radio}/>
                    <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" className={classes.radio}/>
                    <FormControlLabel value="other" control={<Radio color="primary" />} label="Other" className={classes.radio}/>
                    </RadioGroup>

                    <Grid container direction="column" spacing={1}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField required 
                                fullWidth
                                value={ email } 
                                onChange={ e => updateSignupForm(signup, e.target) }
                                id="outlined-required" 
                                label="Email@example.com" 
                                name="email"
                                variant="outlined" 
                                />
                        </FormControl>
                    
                    { passwordLengthError ? 
                        <FormControl variant="outlined" className={classes.formControl}>
                        <TextField fullWidth
                                    error
                                    helperText="The minimum number of characters is 4!"
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
                        firstTime ?
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
                            :
                            <FormControl variant="outlined" className={classes.formControl}>
                            <CssTextField 
                                    autoFocus
                                    value={ createdPassword } 
                                    onChange={ checkLength }
                                    id="outlined-required" 
                                    helperText="Good password!"
                                    label="Success" 
                                    type="password"
                                    name="createdPassword"
                                    variant="outlined" 
                                    className={classes.textField}
                                    InputLabelProps={{
                                        className: classes.floatingLabelFocusStyle,
                                    }}
                                    />
                            </FormControl>
                        }
                
                        { passwordConfirmError ? 
                            <FormControl variant="outlined" className={classes.formControl}>
                            <TextField error
                                        fullWidth
                                        helperText="The password does not match!"
                                        value={ confirmPassword } 
                                        onChange={ e => updateConfirmPassword(signup, e.target) }
                                        id="outlined-error" 
                                        label="Error" 
                                        type="password"
                                        name="confirmPassword"
                                        variant="outlined" 
                                        />
                            </FormControl>
                            :
                            firstTimeConfirm ?
                                <FormControl variant="outlined" className={classes.formControl}>
                                <TextField required
                                        fullWidth
                                        value={ confirmPassword } 
                                        onChange={ e => updateConfirmPassword(signup, e.target) }
                                        id="outlined-required" 
                                        label="Confirm password" 
                                        type="password"
                                        name="confirmPassword"
                                        variant="outlined" 
                                        />
                                </FormControl>
                                : 
                                <FormControl variant="outlined" className={classes.formControl}>
                                <CssTextField 
                                        autoFocus
                                        fullWidth
                                        value={ confirmPassword } 
                                        onChange={ e => updateConfirmPassword(signup, e.target) }
                                        id="outlined-required" 
                                        label="Success" 
                                        helperText="The password matches!"
                                        type="password"
                                        name="confirmPassword"
                                        variant="outlined" 
                                        className={classes.textField}
                                        InputLabelProps={{
                                            className: classes.floatingLabelFocusStyle,
                                        }}
                                        />
                                </FormControl>
                        }
                    </Grid>

                    <Grid container direction="row" spacing={1}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField 
                                value={ adminPasscode } 
                                onChange={ e => updateSignupForm(signup, e.target) }
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