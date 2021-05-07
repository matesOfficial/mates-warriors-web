import firebase from 'firebase';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { auth } from '../firebase';

const AuthContext = createContext();

auth.settings.isAppVerificationDisabledForTesting = true

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

  const [curUser, setCurUser] = useState();
  const [otpSent, setOtpSent] = useState(false);

  const [codeId, setCodeId] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const history = useHistory()


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authData => {
      setCurUser(authData);
    })
    return unsubscribe;
  }, [])

  const login = (payload) => {
    setOtpSent(false);
    setIsLoading(true);
    let number = payload.trim()

    const recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-verifier-container', {
      'size': 'invisible',
      'callback': () => {
        setOtpSent(true);
        setIsLoading(false)
      }
    });

    return auth.signInWithPhoneNumber(number, recaptcha)
      .then((confirmationResult) => {
        setCodeId(confirmationResult.verificationId)
      }).catch((e) => {
        // Error; SMS not sent
        console.log(e);
        alert("SMS not sent, try again later")
        history.go(0)
      });
  }

  const signInWithOtp = (codeId, otp) => {
    let credential = firebase.auth.PhoneAuthProvider.credential(codeId, otp);
    auth.signInWithCredential(credential)
      .then((res) => {
        history.push('/')
        console.log(res)
        setOtpSent(false);
      }).catch((e) => {
        console.log(e);
        alert("Invalid OTP")
        setOtpSent(false);
      })
  }

  const submitOtp = (otp) => {
    signInWithOtp(codeId, otp)
  }



  const logout = () => {
    auth.signOut()
    setCurUser(null);
  }

  const value = { curUser, otpSent, isLoading, login, submitOtp, logout };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
