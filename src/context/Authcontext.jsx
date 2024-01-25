import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword ,signOut, onAuthStateChanged } from 'firebase/auth'
import {auth ,db} from "../services/firebase";
import {doc , setDoc} from 'firebase/firestore';


const Authcontext = createContext();

export function AuthContextProvider({children}){


    const [user,setUser] = useState({});
    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth , (currentuser)=> {
            setUser(currentuser);
        } )

        return () => {
            unsubscribe();
        }
    },[])

    function signUp(email,password){
        createUserWithEmailAndPassword(auth,email,password);
        setDoc(doc(db,"users",email),{
            favShows : [],
        })
    }

    function logIn(email,password){
        signInWithEmailAndPassword(auth,email,password);
    }

    function logOut(){
        return signOut(auth);
    }

    return(
        <Authcontext.Provider value={{user,signUp,logIn,logOut}}>
            {children}
        </Authcontext.Provider>
    )

}

export function UserAuth(){
    return useContext(Authcontext);
}