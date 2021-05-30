import {ActionsTypes, AppStateType, rootReducerType, RootStateRedux} from "./redux-store";
import {PhotosType} from "./userReducer";
import {Dispatch} from "redux";
import {ProfileAPI, UsersAPI} from "../api/Api";
import {ThunkDispatch, ThunkAction} from "redux-thunk";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

export const AddPostActionCreator = (newPost: string): AddPostActionType => ({
    type: ADD_POST,
    newPost: newPost
});
export type AddPostActionType = {
    type: typeof ADD_POST
    newPost: string
}

export const DeletePost = (postId: number): DeletePostActionType => ({
    type: DELETE_POST,
    postId
});
export type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
};

export const setUserProfile = (profile: ProfileAPIType): SetUserProfileActionType => ({
    type: SET_USER_PROFILE,
    profile
});
export type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileAPIType
}

export const setStatus = (status: string): SetUserStatusActionType => ({
    type: SET_STATUS,
    status
});
export type SetUserStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}

export const savePhotoSuccess = (photos: PhotosType): savePhotoSuccessActionType => ({
    type: SAVE_PHOTO_SUCCESS,
    photos
});
export type savePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}

export type PostType = {
    id: number
    message: string
    likes: string
}
export type ProfileAPIType = {
    aboutMe : string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsProfileType
    photos: PhotosType
}
export type ContactsProfileType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}


export const getUserProfile = (userId: number) => async (dispatch: Dispatch) => {
    let response = await UsersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId: number) => async (dispatch: Dispatch) => {
    let response = await ProfileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    let response = await ProfileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file: any) => async (dispatch: Dispatch) => {
    let response = await ProfileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile: any):ThunkAction<Promise<void>,AppStateType, unknown, ActionsTypes> => async (dispatch, getState) => {
    const userId = getState().AuthReducer.id
    const state = getState()
    const response = await ProfileAPI.saveProfile(profile)
    debugger
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId!));
    }
}


let initialState = {
    profilePage: {
        postsData: [
            {id: 1, message: "Hi! How are you?", likes: "likes: 15"},
            {id: 2, message: "It is my first post", likes: "likes: 17"},
        ],
        profile: null as ProfileAPIType | null,
        status: '',
    },
};
export type InitialProfileType = typeof initialState

const ProfileReducer = (state: InitialProfileType = initialState, action: ActionsTypes): InitialProfileType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostType = {
                id: new Date().getTime(),
                message: action.newPost,
                likes: "Likes: 0"
            };
            return {
                ...state,
                profilePage: {
                    ...state.profilePage,
                    postsData: [newPost, ...state.profilePage.postsData],
                }

            };
        }
        case SET_USER_PROFILE : {
            return {
                ...state, profilePage: {
                    ...state.profilePage,
                    profile: action.profile
                }
            }
        }
        case SET_STATUS : {
            return {
                ...state, profilePage: {
                    ...state.profilePage,
                    status: action.status
                }
            }
        }
        case DELETE_POST : {
            return {
                ...state,
                profilePage: {
                    ...state.profilePage,
                    postsData: [...state.profilePage.postsData.filter(p => p.id != action.postId)],
                }
            }
        }
        case SAVE_PHOTO_SUCCESS : {
            if (state.profilePage.profile) {
                return {
                    ...state,
                    profilePage: {
                        ...state.profilePage,
                        profile: {
                            ...state.profilePage.profile,
                            photos: action.photos
                        }
                    }
                }
            } else {
                return state;
            }
        }
        default :
            return state;
    }
};


export default ProfileReducer;