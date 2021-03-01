import {ActionsTypes} from "./redux-store";
import {PhotosType} from "./UserReducer";
import {Dispatch} from "redux";
import {UsersAPI} from "../api/Api";

export type PostType = {
    id: number
    message: string
    likes: string
}


export type ProfileAPIType = {
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

export type profilePageType = {
    newPostText: string
    postsData: Array<PostType>
    profile: ProfileAPIType
}

export const AddPostActionCreator = (): AddPostActionType => ({type: ADD_POST});
export const setUserProfile = (profile: ProfileAPIType): SetUserProfileActionType => ({
    type: SET_USER_PROFILE,
    profile
});

export const getUserProfile = (userId: number) => (dispatch : Dispatch) =>  {
    UsersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data));
    });
}

export const OnPostChangeActionCreator = (newPost: string): ChangePostActionType => ({
    type: UPDATE_NEW_POST_TEXT,
    payload: newPost
});


export type AddPostActionType = {
    type: typeof ADD_POST
}
export type ChangePostActionType = {
    type: typeof UPDATE_NEW_POST_TEXT,
    payload: string
}

export type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileAPIType
}

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";


let initialState = {
    profilePage: {
        postsData: [
            {id: 1, message: "Hi! How are you?", likes: "likes: 15"},
            {id: 2, message: "It is my first post", likes: "likes: 17"},
        ],
        newPostText: "",
        profile: null as ProfileAPIType | null
    },
};
export type InitialProfileType = typeof initialState

const ProfileReducer = (state: InitialProfileType = initialState, action: ActionsTypes): InitialProfileType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostType = {
                id: new Date().getTime(),
                message: state.profilePage.newPostText,
                likes: "Likes: 0"
            };
            return {
                ...state,
                profilePage: {
                    ...state.profilePage,
                    postsData: [newPost, ...state.profilePage.postsData],
                    newPostText: '',
                }

            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                profilePage: {
                    ...state.profilePage,
                    newPostText: action.payload,
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
        default :
            return state;
    }
};


export default ProfileReducer;