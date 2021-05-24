import React from "react";
import {ActionsTypes, rootReducerType} from "./redux-store";
import {Dispatch} from "redux";
import {AuthAPI} from "../api/Api";
import {ThunkDispatch} from 'redux-thunk'

const SET_USERS_DATA = "social-network/auth/SET_USERS_DATA"

export const SetUsersData = (id: number | null, email: string | null, login: string | null, isAuth: boolean):
    SetUsersDataActionType => ({type: SET_USERS_DATA, data: {id, email, login, isAuth}});

export type SetUsersDataActionType = {
    type: typeof SET_USERS_DATA
    data: ActionDataType
}

export type ActionDataType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: null as boolean | null
};

export type InitialType = typeof initialState

const AuthReducer = (state: InitialType = initialState, action: ActionsTypes): InitialType => {
    switch (action.type) {

        case SET_USERS_DATA: {
            return {
                ...state,
                ...action.data,
            }
        }
        default :
            return state;
    }
};

export const AuthMeTC = () => async (dispatch: Dispatch) => {
    let response = await AuthAPI.me();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data
        dispatch(SetUsersData(id, email, login, true));
    }
};

export const login = (email: string, password: string, rememberMe = false) => async (dispatch: ThunkDispatch<rootReducerType, unknown, ActionsTypes> & any) => {
    let response = await AuthAPI.login(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        dispatch(AuthMeTC())
    }
};

// ThunkDispatch<rootReducerType, unknown, ActionsTypes>

export const logout = () => async (dispatch: Dispatch) => {
    let response = await AuthAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(SetUsersData(null, null, null, false));
    }
}

export default AuthReducer;