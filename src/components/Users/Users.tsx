import React from "react";
import {InitialUsersType} from "../../redux/userReducer";
import Paginator from "../../common/PaginationComponent/PaginationComponent";
import {User} from "./OneUser";

type UsersType = {
    users: Array<InitialUsersType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    followingInProgress: Array<number>
    followed: any
}

export let Users = (props: UsersType) => {
    return (
        <div>
            <Paginator currentPage={props.currentPage} pageSize={props.pageSize} onPageChanged={props.onPageChanged}
                       portionSize={10} totalItemsCount={props.totalItemsCount}/>

            <div>
                {props.users.map((u) => <User user={u}
                                              followingInProgress={props.followingInProgress}
                                              key={u.id}
                                              unfollow={props.unfollow}
                                              follow={props.follow}
                />)}
            </div>
        </div>
    )
}