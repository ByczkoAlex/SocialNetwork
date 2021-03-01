import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./myPosts/posts/myPostsContainer";
import {InitialProfileType, ProfileAPIType} from "../../redux/profileReducer";

type ProfilePropsType = {
    profile: ProfileAPIType
}


export function Profile(props: ProfilePropsType) {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer />
        </div>
    )
}