// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host

// Send a request to check if a user is logged in through the session cookie
export const checkSession = (app) => {
    const url = `${API_HOST}/users/check-session`;
    console.log(url)
    if (!ENV.use_frontend_test_user) {
        fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({ currentUser: json.currentUser });
            }
        })
        .catch(error => {
            console.log("check session does not work");
        });
    } else {
        app.setState({ currentUser: ENV.user });
    }
    
};

// A functon to update the login form state
export const updateLoginForm = (loginComp, field) => {
    const value = field.value;
    const name = field.name;

    loginComp.setState({
        [name]: value
    });
};

// A function to send a POST request with the user to be logged in
export const login = (loginComp, app) => {
    console.log(loginComp);
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/users/login`, {
        method: "post",
        body: JSON.stringify(loginComp.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json.currentUser !== undefined) {
                app.setState({ currentUser: json.currentUser });
                console.log("inside json");
                loginComp.props.history.push('/spendings')
            }
        })
        .catch(error => {
            console.log("inside login function");
        });
};

// A function to update the signup form state
export const updateSignupForm = (formComp, field) => {
    const value = field.value;
    const name = field.name;

    formComp.setState({
        [name]: value
    });
};

export const updateConfirmPassword = (formComp, field) => {
    const value = field.value;
    const name = field.name;
    
    formComp.setState({
        [name]: value
    });

    if(value !== formComp.state.createdPassword) {
        formComp.state.passwordConfirmError = true;
        console.log("password did not match");
    } else {
        formComp.state.passwordConfirmError = false;
        console.log("password match")
    }
}

// A function to send a POST request with a new student
export const addUser = (formComp, app) => {
    // the URL for the request
    const url = `${API_HOST}/users/signup`;

    // The data we are going to send in our request
    const user = formComp.state
    console.log("inside addUser: ", user);

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                console.log("Successfully signed up")
                formComp.props.history.push("/login");
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                console.log("Failed to sign up");
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to update the signup form state
export const updateProfile = (profileComp, field) => {
    const value = field.value;
    const name = field.name;

    profileComp.setState({
        [name]: value
    });
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
    const url = `${API_HOST}/users/logout`;

    fetch(url)
        .then(res => {
            app.setState({
                currentUser: null,
            });
        })
        .catch(error => {
            console.log(error);
        });
};