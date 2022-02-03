import React, { useEffect } from "react";
import { Button } from "react-native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'

async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

export const googleLogin =async () => {
         // Get the users ID token
         try{
         const { idToken } = await GoogleSignin.signIn();
         
         // Create a Google credential with the token
         const googleCredential = auth.GoogleAuthProvider.credential(idToken);
         
         // Sign-in the user with the credential
         const authUser = await auth().signInWithCredential(googleCredential);
         console.log('googlecred', authUser.additionalUserInfo?.profile?.email)

         }catch(error){
             console.log({error})
         }
}

const GoogleButton = () => {

    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: '238441650397-5v30tk4vuga1od1n9lujufvd4g5gj6g2.apps.googleusercontent.com',
          });
    },[])

    return (
        <Button title='google login'
            onPress={() => {
             googleLogin()         
            }}
        ></Button>
    )
}

export default GoogleButton