import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import { reducer as formReducer } from 'redux-form'
import ProfileReducer from "./profileReducer";
import DialogsReducer from "./dialogsReducer";
import UsersReducer from "./userReducer";
import AuthReducer, {GetCaptchaUrlActionType, SetUsersDataActionType} from "./authReducer";
import thunkMiddleware from 'redux-thunk';
import AppReducer from "./appReducer";

export type ActionsTypes =
    SetUsersDataActionType |
    GetCaptchaUrlActionType


let RootReducer = combineReducers({
    ProfileReducer,
    DialogsReducer,
    UsersReducer,
    AuthReducer,
    AppReducer,
    form: formReducer
    // SidebarReducer
});

export type rootReducerType = typeof RootReducer;
export type AppStateType = ReturnType<rootReducerType>

export type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never

export type InferActionsTypes<T extends {[key: string]: (...args: any[])=> any }> = ReturnType<PropertiesTypes<T>>

export type RootStateRedux = ReturnType<typeof RootReducer>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
