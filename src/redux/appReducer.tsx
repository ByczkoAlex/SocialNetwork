import React from "react";
import {InferActionsTypes, rootReducerType} from "./redux-store";
import { ThunkDispatch } from 'redux-thunk'
import {AuthMeTC} from "./authReducer";

type ActionsTypes = InferActionsTypes<typeof actions>


export const actions = {
    SetInintialized : () => ({type: 'SET_INITIALIZED'} as const)
}



let initialState= {
    initialized: false
};

export type InitialType = typeof  initialState

const AppReducer = (state: InitialType = initialState, action: ActionsTypes): InitialType => {
    switch (action.type) {

        case 'SET_INITIALIZED': {
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

        promise.then(() => {
            dispatch(actions.SetInintialized())
        })

    };
};

export default AppReducer;