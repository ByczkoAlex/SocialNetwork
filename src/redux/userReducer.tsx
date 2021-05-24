import React from "react";
import {ActionsTypes} from "./redux-store";
import {UsersAPI} from "../api/Api";
import {Dispatch} from "redux";
import {UpdateObjectInArray} from "../utils/ObjectHelper";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_USERS_TOTAL_COUNT = "SET_USERS_TOTAL_COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"

export const followSuccess = (userId: number): FollowActionType => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId: number): UnfollowActionType => ({type: UNFOLLOW, userId});
export const setUsers = (users: Array<InitialUsersType>): SetUsersActionType => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage
});
export const setTotalUsersCount = (totalCount: number): setUsersTotalCountActionType => ({
    type: SET_USERS_TOTAL_COUNT,
    totalCount
});
export const setIsFetching = (isFetching: boolean): setIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching: boolean, userId: number): setIsFollowingToggleActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

export type setIsFollowingToggleActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export type setUsersTotalCountActionType = {
    type: typeof SET_USERS_TOTAL_COUNT
    totalCount: number
}
export type FollowActionType = {
    type: typeof FOLLOW
    userId: number
};
export type UnfollowActionType = {
    type: typeof UNFOLLOW
    userId: number
};
export type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<InitialUsersType>
};
export type setIsFetchingActionType = {
    isFetching: boolean
    type: typeof TOGGLE_IS_FETCHING
}
export type PhotosType = {
    small: string | undefined
    large: string | undefined
}
export type LocationType = {
    city: string
    country: string
}

export type InitialUsersType = {
    id: number
    name: string
    followed: any
    status: string
    location: LocationType
    photos: PhotosType
    isFetching: boolean
    followingInProgress: []
}

let initialState = {
    users: [] as Array<InitialUsersType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>,
    followed: null as boolean | null
};

export type InitialType = typeof initialState

const UsersReducer = (state: InitialType = initialState, action: ActionsTypes): InitialType => {
    switch (action.type) {

        case FOLLOW: {
            return {
                ...state,
                users: UpdateObjectInArray(state.users,action.userId, 'id', {followed: true})
            }
        }

        case UNFOLLOW: {
            return {
                ...state,
                users: UpdateObjectInArray(state.users,action.userId, 'id', {followed: false})
            }
        }

        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_USERS_TOTAL_COUNT: {
            return {...state, totalUsersCount: action.totalCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default :
            return state;
    }
};

export const GetUsersTC = (page: number, pageSize: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsFetching(true));
        dispatch(setCurrentPage(page));
        let data = await UsersAPI.getUsers(page, pageSize)
        dispatch(setIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    };
};

const FollowUnfollowFlow = async (dispatch: Dispatch, userID: number, apiMethod: any, actoinCreator: any ) => {
    dispatch(toggleFollowingProgress(true, userID))
    let response = await apiMethod(userID)

    if (response.data.resultCode == 0) {
        dispatch(actoinCreator(userID))
    }
    dispatch(toggleFollowingProgress(false, userID))
}

export const follow = (userID: number) => {
    return async (dispatch: Dispatch) => {
        FollowUnfollowFlow(dispatch, userID, UsersAPI.follow.bind(UsersAPI), followSuccess)
    };
};

export const unfollow = (userID: number) => {
    return async (dispatch: Dispatch) => {
        FollowUnfollowFlow(dispatch, userID, UsersAPI.unfollow.bind(UsersAPI), unfollowSuccess)
    };
};


export default UsersReducer;