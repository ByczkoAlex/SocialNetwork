import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import { reducer as formReducer } from 'redux-form'
import ProfileReducer, {
    AddPostActionType, DeletePostActionType, savePhotoSuccessActionType,
    SetUserProfileActionType,
    SetUserStatusActionType
} from "./profileReducer";
import DialogsReducer, {SendMessageActionType} from "./dialogsReducer";
import UserReducer, {
    FollowActionType,
    SetCurrentPageActionType, setIsFetchingActionType, setIsFollowingToggleActionType,
    SetUsersActionType, setUsersTotalCountActionType,
    UnfollowActionType
} from "./userReducer";
import UsersReducer from "./userReducer";
import AuthReducer, {GetCaptchaUrlActionType, SetUsersDataActionType} from "./authReducer";
import thunkMiddleware from 'redux-thunk';
import AppReducer, {SetInitializedActionType} from "./appReducer";

export type ActionsTypes = AddPostActionType |
    SendMessageActionType |
    FollowActionType |
    UnfollowActionType |
    SetUsersActionType |
    SetCurrentPageActionType |
    setUsersTotalCountActionType |
    setIsFetchingActionType |
    SetUserProfileActionType |
    SetUsersDataActionType |
    setIsFollowingToggleActionType |
    SetUserStatusActionType |
    SetInitializedActionType |
    DeletePostActionType |
    savePhotoSuccessActionType |
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



export type RootStateRedux = ReturnType<typeof RootReducer>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
