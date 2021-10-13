import {AppStateType, InferActionsTypes} from "./redux-store";
import {PhotosType} from "./userReducer";
import {Dispatch} from "redux";
import {ProfileAPI, UsersAPI} from "../api/Api";
import {ThunkAction} from "redux-thunk";


type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    AddPostActionCreator: (newPost: string) => ({
        type: 'ADD_POST',
        newPost
    } as const),
    DeletePost: (postId: number) => ({
        type: 'DELETE_POST',
        postId
    } as const),
    setUserProfile: (profile: ProfileAPIType) => ({
        type: 'SET_USER_PROFILE',
        profile
    } as const),
    setStatus: (status: string) => ({
        type: 'SET_STATUS',
        status
    } as const),
    savePhotoSuccess: (photos: PhotosType) => ({
        type: 'SAVE_PHOTO_SUCCESS',
        photos
    } as const)
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
    dispatch(actions.setUserProfile(response.data));
}

export const getStatus = (userId: number) => async (dispatch: Dispatch) => {
    let response = await ProfileAPI.getStatus(userId)
    dispatch(actions.setStatus(response.data));
}

export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    let response = await ProfileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(actions.setStatus(status));
    }
}

export const savePhoto = (file: any) => async (dispatch: Dispatch) => {
    let response = await ProfileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(response.data.data.photos));
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
        case 'ADD_POST': {
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
        case 'SET_USER_PROFILE' : {
            return {
                ...state, profilePage: {
                    ...state.profilePage,
                    profile: action.profile
                }
            }
        }
        case 'SET_STATUS' : {
            return {
                ...state, profilePage: {
                    ...state.profilePage,
                    status: action.status
                }
            }
        }
        case 'DELETE_POST' : {
            return {
                ...state,
                profilePage: {
                    ...state.profilePage,
                    postsData: [...state.profilePage.postsData.filter(p => p.id != action.postId)],
                }
            }
        }
        case 'SAVE_PHOTO_SUCCESS' : {
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