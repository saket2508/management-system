import React, { useState } from "react";
import { Link } from "@reach/router";
import {auth, generateUserDocument} from '../firebase/config';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const PasswordReset = () => {

  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);
  const [ errorEmpty, setErrorEmpty ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
  };

const sendResetEmail = event => {
  event.preventDefault();
  if(email === ""){
    setErrorEmpty("Email cannot be empty")
  }
  else{
    setLoading(true)
    auth
    .sendPasswordResetEmail(email)
    .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
        setLoading(false)
    })
    .catch(() => {
        setLoading(false)
        setError("Error resetting password");
    });
  }
} 
  return (
    <div className="min-h-screen flex justify-center bg-gray-100 px-4 sm:px-6 lg:px-8 font-sans">
       <div className="max-w-lg w-full space-y-4">
       <img class="mx-auto mt-6 mb-1 h-12 w-auto" src="https://upload.wikimedia.org/wikipedia/en/f/ff/Manipal_University_logo.png" alt="Workflow"></img>
       <h1 className="text-xl text-center">Reset your password</h1>
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

          <Snackbar open={emailHasBeenSent == true} autoHideDuration={6000} onClose={() => setEmailHasBeenSent(false)}>
          <MuiAlert elevation={6} onClose={() => {
            setEmailHasBeenSent(false);
          }} variant="filled" severity="info">
              {error}
            </MuiAlert>
          </Snackbar>

        </div>
      <div className="rounded-lg shadow-md bg-white w-full px-8 py-6 mt-3">
        <form action="">
          {/* {emailHasBeenSent && (
            <div className="py-3 bg-green-400 w-full text-white text-center mb-3">
              An email has been sent to you!
            </div>
          )} */}
          {/* {error !== null && (
            <div className="py-3 bg-red-600 w-full text-white text-center mb-3">
              {error}
            </div>
          )} */}
          <label htmlFor="userEmail" className="w-full block">
            Email:
          </label>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            value={email}
            placeholder="Input your email"
            onChange={onChangeHandler}
            className="my-1 p-2 mb-2 rounded-sm border border-gray-300 w-full focus:outline-none focus:ring focus:border-blue-300"
          />
          {loading === false && <button
            className="bg-blue-400 hover:bg-blue-500 w-full py-2 text-white focus:outline-none"
            onClick={event => {sendResetEmail(event);}}
          >
            Send me a reset link
          </button>}

          {loading === true && <button
            className="bg-blue-300 w-full py-2 text-white focus:outline-none disabled"
            onClick={event => {sendResetEmail(event);}}
          >
            Loading...
          </button>}
        </form>
        <Link
         to={process.env.PUBLIC_URL}
          className="my-2 text-blue-700 hover:text-blue-800 text-center block"
        >
          back to sign in page
        </Link>
      </div>
      <div className="mt-2 text-sm text-center text-gray-500 w-full font-light">
        ©2017 Manipal University
      </div>
      </div>
    </div>

  );
};
export default PasswordReset;