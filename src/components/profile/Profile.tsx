import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./myPosts/posts/myPostsContainer";
import {ProfileAPIType,} from "../../redux/profileReducer";

type ProfilePropsType = {
    profile: ProfileAPIType
    status: string
    updateStatus: (status: string) => void
}


export function Profile(props: ProfilePropsType) {
    return (
        <div>
            <ProfileInfo
                status={props.status}
                profile={props.profile}
                updateStatus={props.updateStatus}
            />
            <MyPostsContainer />
        </div>
    )
}