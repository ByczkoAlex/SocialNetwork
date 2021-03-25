import {applyMiddleware, combineReducers, createStore} from "redux";
import { reducer as formReducer } from 'redux-form'
import ProfileReducer, {
    AddPostActionType,
    SetUserProfileActionType,
    SetUserStatusActionType
} from "./profileReducer";
import DialogsReducer, {SendMessageActionType} from "./dialogsReducer";
import UserReducer, {
    FollowActionType,
    SetCurrentPageActionType, setIsFetchingActionType, setIsFollowingToggleActionType,
    SetUsersActionType, setUsersTotalCountActionType,
    UnfollowActionType
} from "./UserReducer";
import UsersReducer from "./UserReducer";
import AuthReducer, {SetUsersDataActionType} from "./AuthReducer";
import thunkMiddleware from 'redux-thunk';

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
    SetUserStatusActionType





let RootReducer = combineReducers({
    ProfileReducer,
    DialogsReducer,
    UsersReducer,
    AuthReducer,
    form: formReducer
    // SidebarReducer
});

export type rootReducerType = typeof RootReducer;
export type AppStateType = ReturnType<rootReducerType>



export type RootStateRedux = ReturnType<typeof RootReducer>

export let store = createStore(RootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store
