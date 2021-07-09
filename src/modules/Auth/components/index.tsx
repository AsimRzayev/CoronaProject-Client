import React, { useState } from "react";
import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
} from "@material-ui/core";
import Input from "./Input";
import Icon from "./Icon";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import useStyles from "./styles";
import { AUTH_ACTIONS } from "../actions/consts";
import { useHistory } from "react-router-dom";
import { signin, signup } from "../actions/index";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
};
const Auth = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const classes = useStyles();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(form, history));
        } else {
            dispatch(signin(form, history));
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    let history = useHistory();
    const googleSuccess = async (res: any) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: AUTH_ACTIONS.AUTH, payload: { result, token } });
            history.push("/memories");
        } catch (error) {
            console.log(error);
        }
    };

    const googleError = () =>
        console.log("Google Sign In was unsuccessful. Try again later");
    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {isSignup ? "Sign Up" : "Sign in"}
                </Typography>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input
                                    name="firstName"
                                    label="First Name"
                                    handleChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ): void => handleChange(e)}
                                    autoFocus
                                    half
                                />
                                <Input
                                    name="lastName"
                                    label="Last Name"
                                    handleChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ): void => handleChange(e)}
                                    half
                                />
                            </>
                        )}
                        <Input
                            name="email"
                            label="Email Address"
                            handleChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ): void => handleChange(e)}
                            type="email"
                        />
                        <Input
                            name="password"
                            label="Password"
                            handleChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ): void => handleChange(e)}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignup && (
                            <Input
                                name="confirmPassword"
                                label="Repeat Password"
                                handleChange={(e: any): void => handleChange(e)}
                                type="password"
                            />
                        )}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>

                    <GoogleLogin
                        clientId="392673941542-sh4k5geqn7qshkd2bieouhhg6gutvcbr.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup
                                    ? "Already have an account? Sign in"
                                    : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};
export default Auth;
