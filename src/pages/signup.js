
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';

const  styles = (theme) => ({
    paper: {
        marginTop : theme.spacing(8),
        display : 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
    form: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3,0,2)
    },
    progress: {
        position: 'absolute'
    }
});

class signup extends Component{
    constructor(props){
        super(props);

        this.state = {
            firstName : '',
            lastName : '',
            phoneNumber : '',
            country : '',
            username : '',
            email: '',
            password: '',
            confirmPassword: '',
            error: [],
            loading: false
        };
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.UI.error) {
            this.setState({
                error: nextProps.UI.error
            });
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ loading : true});
        const newUserData = {
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            phoneNumber : this.state.phoneNumber,
            country : this.state.country,
            username : this.state.username,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };
        axios
            .post('/signup', newUserData)
            .then((response) => {
                localStorage.setItem('AuthToken', '${response.data.token}');
                this.setState({loading: false,});
                this.props.history.push('/');
            })
            .catch((error) => {
                this.setState({
                    error: error.response.data,
                    loading: false
                });
            });
    };

    render() {
        const { classes } = this.props;
        const { error, loading } = this.state;

        return (
            <Container  component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Daftarkan Dirimu!
                    </Typography>
                    <form className={classes.form} noValidate>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                variant ="outlined"
                                required
                                fullWidth
                                id = "firstName"
                                label = "First Name"
                                name = "firstName"
                                autoComplete = "firstName"
                                helperText = {error.firstName}
                                error = {error.firstName ? true : false}
                                onChange = {this.handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField 
                                variant ="outlined"
                                required
                                fullWidth
                                id = "lastName"
                                label = "Last Name"
                                name = "lastName"
                                autoComplete = "lastName"
                                helperText = {error.lastName}
                                error = {error.lastName ? true : false}
                                onChange = {this.handleChange}
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField 
                                variant ="outlined"
                                required
                                fullWidth
                                id = "username"
                                label = "username"
                                name = "username"
                                autoComplete = "username"
                                helperText = {error.username}
                                error = {error.username ? true : false}
                                onChange = {this.handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                variant ="outlined"
                                required
                                fullWidth
                                id = "phoneNumber"
                                label = "Phone Number"
                                name = "phoneNumber"
                                autoComplete = "phoneNumber"
                                pattern = "[7 - 9] {1} [0-9] {9}"
                                helperText = {error.phoneNumber}
                                error = {error.phoneNumber ? true : false}
                                onChange = {this.handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                variant ="outlined"
                                required
                                fullWidth
                                id = "email"
                                label = "Email"
                                name = "email"
                                autoComplete = "email"
                                helperText = {error.email}
                                error = {error.email ? true : false}
                                onChange = {this.handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                variant ="outlined"
                                required
                                fullWidth
                                id = "country"
                                label = "Country"
                                name = "country"
                                autoComplete = "country"
                                helperText = {error.country}
                                error = {error.country ? true : false}
                                onChange = {this.handleChange}
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField 
                                variant ="outlined"
                                required
                                fullWidth
                                id = "password"
                                label = "password"
                                name = "password"
                                autoComplete = "current-password"
                                helperText = {error.password}
                                error = {error.password ? true : false}
                                onChange = {this.handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                variant ="outlined"
                                required
                                fullWidth
                                id = "confirmPassword"
                                label = "Confirm Password"
                                name = "confirmPassword"
                                autoComplete = "current-password"
                                onChange = {this.handleChange}
                            />
                        </Grid>
                      </Grid>
                      <Button
                        type = "submit"
                        fullWidth
                        variant = "contained"
                        color = "primary"
                        className = {classes.submit}
                        onClick = {this.handleSubmit}
                        disabled = {loading 
                        || !this.state.firstName
                        || !this.state.lastName
                        || !this.state.email
                        || !this.state.password
                        || !this.state.country
                        || !this.state.username
                        || !this.state.phoneNumber} >
                            Sign up
                            {loading && <CircularProgress size={30} className={classes.progress} />}
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="login" variant="body2">
                                    Sudah punya akun? Masuk
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );

    }

}

export default withStyles(styles)(signup)




