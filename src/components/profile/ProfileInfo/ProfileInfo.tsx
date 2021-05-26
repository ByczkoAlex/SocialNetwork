import React from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../../common/Preloader/Preloader";
import {ProfileAPIType} from "../../../redux/profileReducer";
import ProfileStatusWithHooks from "../ProfileStatus/ProfileStatusWithHooks";

type profileType = {
    profile: ProfileAPIType
    status: string
    updateStatus: (status: string) => void
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
                <ProfileStatusWithHooks
                    updateStatus={props.updateStatus}
                    status={props.status}/>
            </div>
        </div>
    )


}