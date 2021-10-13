import React from "react";
import {UsersAPI} from "../api/Api";
import {Dispatch} from "redux";
import {UpdateObjectInArray} from "../utils/ObjectHelper";
import {InferActionsTypes} from "./redux-store";

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess:  (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowSuccess : (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers : (users: Array<InitialUsersType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage : (currentPage: number) => ({
        type: 'SET_CURRENT_PAGE',
        currentPage
    } as const),
    setTotalUsersCount : (totalCount: number) => ({
        type: 'SET_USERS_TOTAL_COUNT',
        totalCount
    } as const),
    setIsFetching : (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress : (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const),
}


export type PhotosType = {
    small: string
    large: string
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

        case "FOLLOW": {
            return {
                ...state,
                users: UpdateObjectInArray(state.users,action.userId, 'id', {followed: true})
            }
        }

        case "UNFOLLOW": {
            return {
                ...state,
                users: UpdateObjectInArray(state.users,action.userId, 'id', {followed: false})
            }
        }

        case "SET_USERS": {
            return {...state, users: action.users}
        }
        case "SET_CURRENT_PAGE": {
            return {...state, currentPage: action.currentPage}
        }
        case "SET_USERS_TOTAL_COUNT": {
            return {...state, totalUsersCount: action.totalCount}
        }
        case "TOGGLE_IS_FETCHING": {
            return {...state, isFetching: action.isFetching}
        }
        case "TOGGLE_IS_FOLLOWING_PROGRESS": {
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
        dispatch(actions.setIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        let data = await UsersAPI.getUsers(page, pageSize)
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    };
};

const FollowUnfollowFlow = async (dispatch: Dispatch, userID: number, apiMethod: any, actoinCreator: any ) => {
    dispatch(actions.toggleFollowingProgress(true, userID))
    let response = await apiMethod(userID)

    if (response.data.resultCode == 0) {
        dispatch(actoinCreator(userID))
    }
    dispatch(actions.toggleFollowingProgress(false, userID))
}

export const follow = (userID: number) => {
    return async (dispatch: Dispatch) => {
        FollowUnfollowFlow(dispatch, userID, UsersAPI.follow.bind(UsersAPI), actions.followSuccess)
    };
};

export const unfollow = (userID: number) => {
    return async (dispatch: Dispatch) => {
        FollowUnfollowFlow(dispatch, userID, UsersAPI.unfollow.bind(UsersAPI), actions.unfollowSuccess)
    };
};


export default UsersReducer;