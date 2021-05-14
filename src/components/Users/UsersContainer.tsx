import React, {ComponentClass} from "react";
import {connect} from "react-redux";
import {RootStateRedux} from "../../redux/redux-store";
import {
    follow,
    InitialUsersType,
    setCurrentPage,
    unfollow, toggleFollowingProgress, GetUsersTC,
} from "../../redux/userReducer";
import {Users} from "./Users";
import Preloader from "../../common/Preloader/Preloader";
import {WithAusRedirect} from "../HOC/WithAuthRedirect";
import {compose} from "redux";
import {
    GetCurrentPage, GetFollowed,
    GetFollowingInProgress,
    GetIsFetching,
    GetPageSize,
    GetTotalUsersCount,
    GetUsers,
} from "../../redux/users-selectors";


type APIUsersType = {
    users: Array<InitialUsersType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    GetUsersTC: (currentPage:number,pageSize: number) => void;
    followed: any
}

class UsersAPIComponent extends React.Component<APIUsersType> {
    componentDidMount() {
        this.props.GetUsersTC(this.props.currentPage,this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.GetUsersTC(pageNumber,this.props.pageSize)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    users={this.props.users}
                    followingInProgress={this.props.followingInProgress}
                    followed={this.props.followed}
                />
            </>
        )
    }
}


let mapStateToProps = (state: RootStateRedux) => {
    return {
        users: GetUsers(state),
        pageSize: GetPageSize(state),
        totalUsersCount: GetTotalUsersCount(state),
        currentPage: GetCurrentPage(state),
        isFetching: GetIsFetching(state),
        followingInProgress: GetFollowingInProgress(state),
        followed:GetFollowed(state),
    }
};

export default compose(
    connect(mapStateToProps,{follow,unfollow,setCurrentPage,toggleFollowingProgress,GetUsersTC}),
    WithAusRedirect
)(UsersAPIComponent) as ComponentClass



