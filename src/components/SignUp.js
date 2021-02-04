import React, { useState } from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Link } from "@reach/router";
import {auth, generateUserDocument} from '../firebase/config';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { SettingsInputComponent } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const SignUp = () => {

  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [position, setPostion] = useState("Student");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorEmpty, setErrorEmpty] = useState(null);
  // const [open, setOpen] = useState(false);

  const createUserWithEmailAndPasswordHandler = async (event, email, password, position) => {
    setLoading(true)
    event.preventDefault();
    if(email === "" || password === ""){
      setErrorEmpty("Enter all fields correctly");
      setLoading(false)
      console.error('ERROR: ENTER ALL FIELDS CORRECTLY')
    }
    if(password.length < 6){
      setErrorEmpty("Password should be at least six characters");
      setLoading(false)
      console.error('ERROR: ENTER ALL FIELDS CORRECTLY')
    }
    else{
      try{
        const {user} = await auth.createUserWithEmailAndPassword(email, password);
        generateUserDocument(user, {displayName, position});
      }
      catch(error){
        setError('Incorrect email or password');
        setLoading(false)
        console.error('ERROR: INCORRECT USERNAME OR PASSWORD')
      }
    }
    setEmail("");
    setPassword("");
    setDisplayName("");
    setPostion("Student");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    
    // console.log(event.currentTarget.value)
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
    else{
      setPostion(event.currentTarget.value);
    }
  };


  return (
    <div className="min-h-screen flex justify-center bg-gray-100 px-4 sm:px-6 lg:px-8 font-sans">
    <div className="max-w-lg w-full space-y-2">
        <div>
    <img class="mx-auto mt-6 mb-1 h-12 w-auto" src="https://upload.wikimedia.org/wikipedia/en/f/ff/Manipal_University_logo.png" alt="Workflow"></img>      
    <h1 className="text-xl text-center">Sign Up</h1>
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
          <label htmlFor="displayName" className="block text-gray-700">
            Your Name:
          </label>
          <input
            type="text"
            className="my-1 p-2 rounded-sm border border-gray-300 w-full focus:outline-none focus:ring focus:border-blue-300"
            name="displayName"
            value={displayName}
            placeholder="Enter your name"
            id="displayName"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userEmail" className="block text-gray-700">
            Email:
          </label>
          <input
            type="email"
            className="my-1 p-2 rounded-sm border border-gray-300 w-full focus:outline-none focus:ring focus:border-blue-300"
            name="userEmail"
            value={email}
            placeholder="Your university email address"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block text-gray-700">
            Password:
          </label>
          <input
            type="password"
            className="my-1 p-2 rounded-sm border border-gray-300 w-full focus:outline-none focus:ring focus:border-blue-300"
            name="userPassword"
            value={password}
            placeholder="At least 6 characters"
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          <div className="flex flex-row items-end items-center mt-2 mb-3">
            <div className="p-2">
              <label className="black text-gray-700 my-1 w-1/2">You are a</label>
            </div>
            <select name="position" className="form-select w-1/2 rounded-sm border border-gray-300 p-2" onChange={event => onChangeHandler(event)} value = {position}>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>
          {loading === false && <button
            className="bg-blue-400 hover:bg-blue-500 w-full py-2 text-white"
            onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password, position);
            }}
          >
            Sign up
          </button>}

          {loading === true && <button
            className="bg-blue-300 w-full py-2 text-white disabled"
            onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password, position);
            }}
          >
            Signing up...
          </button>}

        </form>
        {/* <p className="text-center my-3">or</p>
        <button
          className="bg-gray-500 hover:bg-gray-600 w-full py-2 text-white flex-row"
        >
          Sign In with Github
        </button> */}
        <p className="text-center my-3">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            Sign in here
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
export default SignUp;


