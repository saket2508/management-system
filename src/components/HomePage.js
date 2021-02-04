import React, { useState, useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import {auth} from "../firebase/config";
import Avatar from '@material-ui/core/Avatar';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple, pink } from '@material-ui/core/colors';
import { NavigateBeforeRounded } from "@material-ui/icons";
import Navbar from './Navbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    avatar:{
        width: theme.spacing(18),
        height: theme.spacing(18),
        color: theme.palette.getContrastText(pink[300]),
        backgroundColor:pink[300],
        fontSize:80
    }
  }));


const HomePage = () => {
    const classes = useStyles();
    const [dateState, setDateState] = useState(new Date())
    const changeDate = (e) => {
        setDateState(e)
    }
    const user = useContext(UserContext);
    const {photoURL, displayName, email, position} = user;
    return (
       <div className="min-h screen">
            <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8 rounded-lg bg-white shadow mt-3">
    <div className="flex flex-col items-center justify-center md:flex-row md:items-center justify-center px-3 py-3">
        <Avatar className={classes.avatar} alt={displayName}>{displayName[0].toUpperCase()}</Avatar>
      <div className = "md:mx-auto">
      <h2 className = "text-2xl font-semibold md:mx-auto">{displayName}</h2>
      <h4 className="text-gray-500 md:mx-auto italic">{position}</h4>
      <div className="flex flex-row md:mx-auto">
      <div className="pr-1">
        <MailOutlineIcon fontSize="default"/>
      </div>
      <div children="pl-1">
        <h3 className="italic">{email}</h3>
      </div>
      </div>
     <button onClick={() => auth.signOut()} type="button" class="bg-red-500 text-white md:text-sm text-xs mt-2 rounded-sm focus:outline-none p-1">Sign out</button>
      </div>
      
    </div>
    <div className="font-sans text-sm font-semibold text-gray-700 mx-auto flex flex-col items-center justify-center md:flex-row p-3 md:items-center">
        Hi {displayName}, You have no events lined up this week.
    </div>
    {/* <button className = "w-full py-3 bg-red-600 mt-4 text-white" onClick = {() => {auth.signOut()}}>Sign out</button> */}
    <div className="w-full mt-4 flex items-center justify-center">
        <Calendar value={dateState}
      onChange={changeDate}/>
    </div>
  </div>
       </div>

    );
}

export default HomePage