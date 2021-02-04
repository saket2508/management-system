import React, {useState} from "react";
import { Link } from "@reach/router";
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { SettingsInputComponent } from "@material-ui/icons";
import {auth, generateUserDocument} from '../firebase/config';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

const SignIn = () => {

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [error, setError] = useState(null);
    const [ errorEmpty, setErrorEmpty ] = useState(null);

    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        setLoading(true)
        auth.signInWithEmailAndPassword(email, password).catch(error => {
            setLoading(false)
            if(email==="" || password===""){
                setErrorEmpty("Enter all fields correctly");
                console.error("Error signing in with password and email", error);
            }
            else{
                if(errorEmpty){
                    setErrorEmpty(null);
                }
                setError("Incorrect email or password");
                console.error("Error signing in with password and email", error);
            }
            // setError("Error signing in with password and email!");
            // console.error("Error signing in with password and email", error);
            });
  };

      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;

          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-lg w-full space-y-8">
            <div>
            <img class="mx-auto mt-6 mb-1 h-12 w-auto" src="https://upload.wikimedia.org/wikipedia/en/f/ff/Manipal_University_logo.png" alt="Workflow"></img>
            <h1 className="text-xl text-center">Sign in to your account</h1>
            <div className={classes.root}>
                <Snackbar open={error != null} autoHideDuration={6000} onClose={() => setError(null)}>
                <MuiAlert elevation={6} onClose={() => {
                    setError(null);
                }} variant="filled" severity="error">
                    {error}
                    </MuiAlert>
                </Snackbar>

                <Snackbar open={errorEmpty != null} autoHideDuration={6000} onClose={() => setErrorEmpty(null)}>
                <MuiAlert elevation={6} onClose={() => {
                    setErrorEmpty(null);
                }} variant="filled" severity="error">
                    {errorEmpty}
                    </MuiAlert>
                </Snackbar>
            </div>
            <div className="rounded-lg shadow-md bg-white w-full px-8 py-6 mt-3">
                <form className="">
                <label htmlFor="userEmail" className="block text-gray-700">
                    Email:
                </label>
                <input
                    type="email"
                    className="my-1 p-2 rounded-sm border border-gray-300 w-full focus:outline-none focus:ring focus:border-blue-300"
                    name="userEmail"
                    value = {email}
                    placeholder="Your university email address"
                    id="userEmail"
                    onChange = {(event) => onChangeHandler(event)}
                />
                <label htmlFor="userPassword" className="block text-gray-700">
                    Password:
                </label>
                <input
                    type="password"
                    className="mt-1 mb-3 p-2 rounded-sm border border-gray-300 w-full focus:outline-none focus:ring focus:border-blue-300"
                    name="userPassword"
                    value = {password}
                    placeholder="Your password"
                    id="userPassword"
                    onChange = {(event) => onChangeHandler(event)}
                />
                {loading === false && <button className="bg-blue-400 hover:bg-blue-500 w-full py-2 text-white rounded-sm focus:outline-none" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
                    Sign in
                </button>}
                {loading === true && <button className="bg-blue-300 w-full py-2 text-white rounded-sm focus:outline-none disabled" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
                    Signing in...
                </button>}
                </form>
                {/* <p className="text-center my-3">or</p>
                <button className="bg-gray-500 hover:bg-gray-600 w-full py-2 text-white flex-row rounded-sm">
                Sign in with Github
                </button> */}
                <p className="text-center my-3">
                Don't have an account?{" "}
                <Link to="signUp" className="text-blue-500 hover:text-blue-600">
                    Sign up here
                </Link>{" "}
                <br />{" "}
                <Link to = "passwordReset" className="text-blue-500 hover:text-blue-600">
                    Forgot Password?
                </Link>
                </p>
            </div>
            <div className="mt-2 text-sm text-center text-gray-500 w-full font-light">
                    ©2017 Manipal University
                </div>
            </div>
        </div>
    </div>
  );
};
export default SignIn;