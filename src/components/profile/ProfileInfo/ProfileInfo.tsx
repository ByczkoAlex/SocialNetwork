import React from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../../common/Preloader/Preloader";
import {ProfileAPIType} from "../../../redux/profileReducer";
import ProfileStatus from "../ProfileStatus/ProfileStatus";

type profileType = {
    profile: ProfileAPIType
}

export function ProfileInfo(props: profileType) {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img className={s.image} src="https://onlinepngtools.com/images/examples-onlinepngtools/desert.jpg"/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}
                />
                <ProfileStatus status={'Hello!!!'}/>
            </div>
        </div>
    )


}