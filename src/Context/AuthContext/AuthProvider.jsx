import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut,GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/Firebase.init";



const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true)


  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
   
  };
  const signInUser =(email,password) =>{
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password);
  };

  const logOut = ()=>{
    setLoading(true)
        return signOut(auth)
  }

  const signInWithGoogle = ()=>{
    setLoading(true)
    return signInWithPopup(auth,googleProvider)
  }

  useEffect(()=>{
   const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
     
            setUser(currentUser);
            console.log('the user in Uth change ',currentUser);
            setLoading(false)
        
    });

    return() =>{
        unsubscribe();
    }
  },[])
  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    logOut,
    signInWithGoogle,


  };

  return <AuthContext value={authInfo}>
    {children}
    </AuthContext>;
};

export default AuthProvider;
