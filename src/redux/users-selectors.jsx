import {createSelector} from "reselect";

const GetUsersSelector = (state) => state.UsersReducer.users;

export const GetUsers = createSelector( GetUsersSelector, (users) => {
    return users.filter(u => true)});

export const GetPageSize = (state) => state.UsersReducer.pageSize;

export const GetTotalUsersCount = (state) => state.UsersReducer.totalUsersCount;

export const GetCurrentPage = (state) => state.UsersReducer.currentPage;

export const GetFollowingInProgress = (state) => state.UsersReducer.followingInProgress;

export const GetFollowed = (state) => state.UsersReducer.followed;

export const GetIsFetching = (state) => state.UsersReducer.isFetching;
