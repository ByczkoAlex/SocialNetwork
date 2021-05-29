import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./myPosts/posts/myPostsContainer";
import {ProfileAPIType,} from "../../redux/profileReducer";

type ProfilePropsType = {
    profile: ProfileAPIType | null
    status: string
    updateStatus: (status: string) => void
    isOwner:boolean
    savePhoto: (file: any)=> void
}


export function Profile(props: ProfilePropsType) {
    return (
        <div>
            <ProfileInfo
                isOwner={props.isOwner}
                status={props.status}
                profile={props.profile}
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
            />
            <MyPostsContainer />
        </div>
    )
}