import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import HomePage from "./HomePage";
import PasswordReset from "./PasswordReset";
import { UserContext } from '../providers/UserProvider';

function Application() {
  const user = useContext(UserContext);
  console.log(user)
  return (
        user ?
        <HomePage />
      :
        <Router basepath={process.env.PUBLIC_URL}>
          <SignUp path="signUp" />
          <SignIn path="/" />
          <PasswordReset path = "passwordReset" />
        </Router>

  )}
export default Application