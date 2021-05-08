import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import firebase from 'firebase';

import { auth, db } from '../firebase';

const AuthContext = createContext();

auth.settings.isAppVerificationDisabledForTesting = true


export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

  const [curUser, setCurUser] = useState();
  const [otpSent, setOtpSent] = useState(false);
  const [firebaseError, setFirebaseError] = useState(null)

  const [codeId, setCodeId] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const history = useHistory()


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authData => {
      setCurUser(authData?.toJSON());
    })
    return unsubscribe;
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setFirebaseError(null), 2000)
    return clearInterval(interval)
  }, [firebaseError])

  const signInWithOtp = (codeId, otp) => {
    let credential = firebase.auth.PhoneAuthProvider.credential(codeId, otp);
    setIsLoading(true)
    return auth.signInWithCredential(credential)
      .then((res) => {
        if (res.additionalUserInfo.isNewUser) {
          db.ref('users/' + res.user.uid).set({
            name: res.user.displayName,
            email: res.user.email,
            photo_url: res.user.photoURL,
            uid: res.user.uid,
            phone_number: res.user.phoneNumber
          });
        }
        history.push('/')
      }).catch((e) => {
        setFirebaseError(e.message)
      }).finally(() => setIsLoading(false))
  }


  // hooks fn's
  const login = (payload) => {
    setOtpSent(false);
    setIsLoading(true);
    let number = payload.trim()

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-verifier-container', {
      'size': 'invisible',
      'callback': () => {
        setIsLoading(false);
      }
    });

    const appVerifier = window.recaptchaVerifier;
    return auth.signInWithPhoneNumber(number, appVerifier)
      .then((confirmationResult) => {
        setOtpSent(true);
        setCodeId(confirmationResult.verificationId)
      }).catch((e) => {
        // Error; SMS not sent
        setFirebaseError(e.message)
        setOtpSent(false);
      }).finally(() => {
        setIsLoading(false);
      })
  }


  const submitOtp = (otp) => {
    return signInWithOtp(codeId, otp)
  }

  const logout = () => {
    auth.signOut()
    setOtpSent(false);
  }

  const value = { curUser, otpSent, isLoading, firebaseError, login, submitOtp, logout };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
