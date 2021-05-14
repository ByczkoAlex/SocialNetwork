import React from "react";
import {ActionsTypes, rootReducerType} from "./redux-store";
import { ThunkDispatch } from 'redux-thunk'
import {AuthMeTC} from "./authReducer";

const SET_INITIALIZED = "SET_INITIALIZED"

export const SetInintialized = () :
    SetInitializedActionType => ({type: SET_INITIALIZED});

export type SetInitializedActionType = {
    type: typeof SET_INITIALIZED
}

let initialState= {
    initialized: false
};

export type InitialType = typeof  initialState

const AppReducer = (state: InitialType = initialState, action: ActionsTypes): InitialType => {
    switch (action.type) {

        case SET_INITIALIZED: {
            return {
                ...state,
                initialized: true
            }
        }
        default :
            return state;
    }
};

export const initializeApp = () => {
    return (dispatch: ThunkDispatch<rootReducerType, unknown, ActionsTypes>) => {
        let promise = dispatch(AuthMeTC());

        // promise.then(() => {
        //     dispatch(SetInintialized())
        // })

    };
};

export default AppReducer;