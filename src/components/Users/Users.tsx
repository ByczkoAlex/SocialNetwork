import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/users.png";
import {InitialUsersType} from "../../redux/UserReducer";
import {NavLink} from "react-router-dom";

type UsersType = {
    users: Array<InitialUsersType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    followingInProgress:Array<number>
    followed: any
}

export let Users = (props: UsersType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i < pagesCount; i++) {
        pages.push(i);
    }


    return (
        <div>
            <div className={styles.pointer}>
                {pages.map(p => {
                    return <span className={props.currentPage === p ? styles.selected : ""}
                                 onClick={(e) => {
                                     props.onPageChanged(p)
                                 }}> {p} </span>
                })}
            </div>
            {props.users.map((u) => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                            <img className={styles.photo} src={u.photos.small ? u.photos.small : userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                          onClick={() => {props.unfollow(u.id)}}>unfollow</button>

                                : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                          onClick={() => {props.follow(u.id)}}>follow</button>}
                        </div>
                    </span>
                <div>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{'u.location.city'}</div>
                            <div>{'u.location.country'}</div>
                        </span>
                    </span>
                </div>
            </div>)
            }
        </div>
    )
}