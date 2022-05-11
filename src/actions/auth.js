import Swal from "sweetalert2";
import { types } from "../types/types"
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { finishLoading, startLoading } from "./ui";
import { noteLogout } from "./notes";

export const startLoginWithEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
            })
            .catch((error) => {
                console.log(error);
                dispatch(finishLoading());
                Swal.fire('Error', error.message, 'error');
            });

    }
}



export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name });
                dispatch(login(user.uid, name))
            })
            .catch(error => {
                console.log(error)
                Swal.fire('Error', error.message, 'error');
            })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))
            })
    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut()
            .then(() => {
                dispatch(logout())
                dispatch(noteLogout())
            })
    }
}

export const logout = () => {
    return {
        type: types.logout
    }
}

