import { createContext } from "react";
import PropTypes from 'prop-types';
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider  } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { useEffect } from "react";

export const AuthContext = createContext(null)

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return ()=> unSubscribe()
    }, [])

    const authInfo = {user, signInWithGoogle, createUser, signInUser, logOut, loading}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthProvider;



/***
 * 1. create context and export it
 * 2. set provider with value
 * 3. use the Auth Provider in the main.jsx file
 * 4. access children in the AuthProvider component as children and use it in the middle of the Provider
 * ****/