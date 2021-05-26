import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/users.png";
import {InitialUsersType} from "../../redux/userReducer";
import {NavLink} from "react-router-dom";

type UsersType = {
    user: InitialUsersType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

export let User =({user, followingInProgress, unfollow, follow}: UsersType) => {
    return (
        <div>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                            <img className={styles.photo} src={user.photos.small ? user.photos.small : userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {user.followed
                                ? <button disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              unfollow(user.id)
                                          }}>unfollow</button>

                                : <button disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => {
                                              follow(user.id)
                                          }}>follow</button>}
                        </div>
                    </span>
                <div>
                    <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{'user.location.city'}</div>
                            <div>{'user.location.country'}</div>
                        </span>
                    </span>
                </div>
        </div>
    )
}