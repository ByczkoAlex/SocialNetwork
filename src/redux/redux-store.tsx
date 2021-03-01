import {applyMiddleware, combineReducers, createStore} from "redux";
import ProfileReducer, {AddPostActionType, ChangePostActionType, SetUserProfileActionType} from "./profileReducer";
import DialogsReducer, {SendMessageActionType, UpdateNewMessageActionType} from "./dialogsReducer";
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
    ChangePostActionType |
    SendMessageActionType |
    UpdateNewMessageActionType |
    FollowActionType |
    UnfollowActionType |
    SetUsersActionType |
    SetCurrentPageActionType |
    setUsersTotalCountActionType |
    setIsFetchingActionType |
    SetUserProfileActionType |
    SetUsersDataActionType |
    setIsFollowingToggleActionType





let RootReducer = combineReducers({
    ProfileReducer,
    DialogsReducer,
    UsersReducer,
    AuthReducer
    // SidebarReducer
});

export type rootReducerType = typeof RootReducer;
export type AppStateType = ReturnType<rootReducerType>



export type RootStateRedux = ReturnType<typeof RootReducer>

export let store = createStore(RootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store
