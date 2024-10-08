'use client'
import { auth, db } from '@/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { useContext, useState, useEffect } from 'react'


const AuthContext = React.createContext()


// A custom hook (useAuth) to access the authentication context. Instead of calling useContext(AuthContext) in each component that needs authentication data, you can just call useAuth().
export function useAuth() {
    return useContext(AuthContext)
}


//AuthProvider -> React component that wraps around the part of your app that needs access to the authentication state. The children prop refers to all components nested inside the AuthProvider component.
export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null)
    const [userDataObj, setUserDataObj] = useState(null)
    const [loading, setLoading] = useState(true)    

    // AUTH HANDLERS
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        setUserDataObj(null)
        setCurrentUser(null)
        return signOut(auth)
    }

    useEffect(()=>{
        // onAuthStateChanged is a Firebase function that listens for changes in the authentication state (login, logout, or user persistence). It fires whenever the user state changes, allowing the app to react to those changes (e.g., fetch user data or handle when no user is logged in).
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                // Set the user to our local context state
                setLoading(true)
                setCurrentUser(user)
                if (!user) {
                    console.log('No User Found')
                    return
                }

                // if user exists, fetch data from firestore database
                console.log('Fetching User Data')
                const docRef = doc(db, 'users', user.uid)  // doc: To refer to a specific document in the Firestore database.
                const docSnap = await getDoc(docRef)  // getDoc: To retrieve a document from Firestore.
                let firebaseData = {}
                if (docSnap.exists()) {
                    console.log('Found User Data')
                    firebaseData = docSnap.data()
                    console.log(firebaseData)
                }
                setUserDataObj(firebaseData)
            } catch (err) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        })
        return unsubscribe  // ensures that the listener is properly cleaned up when the component unmounts.

    },[])

    const value = {
        currentUser,
        userDataObj,
        setUserDataObj,
        signup,
        logout,
        login,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}