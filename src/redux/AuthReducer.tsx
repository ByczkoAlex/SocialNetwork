import React from "react";
import {ActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {AuthAPI} from "../api/Api";

const SET_USERS_DATA = "SET_USERS_DATA"

export const SetUsersData = (id: number, email: string, login: string): SetUsersDataActionType => ({type: SET_USERS_DATA, data : {id, email, login}});

export type SetUsersDataActionType = {
    type: typeof SET_USERS_DATA
    data: ActionDataType
}

export type ActionDataType = {
    id: number
    email: string
    login: string
}

let initialState= {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: null as boolean | null
};

export type InitialType = typeof  initialState

const AuthReducer = (state: InitialType = initialState, action: ActionsTypes): InitialType => {
    switch (action.type) {

        case SET_USERS_DATA: {
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        }
        default :
            return state;
    }
};

export const AuthMeTC = () => {
    return (dispatch: Dispatch) => {
        AuthAPI.me()
            .then(response => {
                if (response.data.resultCode === 0 ) {
                    let {id, email, login} = response.data
                    dispatch(SetUsersData(id, email, login));
                }
            });
    };
};

export default AuthReducer;