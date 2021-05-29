import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../../common/Preloader/Preloader";
import {ProfileAPIType} from "../../../redux/profileReducer";
import ProfileStatusWithHooks from "../ProfileStatus/ProfileStatusWithHooks";
import users from "../../../assets/images/users.png"

type profileType = {
    profile: ProfileAPIType | null
    status: string
    updateStatus: (status: string) => void
    isOwner:boolean
    savePhoto: (file: any)=> void
}

export function ProfileInfo(props: profileType) {

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e:any) => {
        if(e.target.files.length){
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div>
                <img className={s.image} src="https://onlinepngtools.com/images/examples-onlinepngtools/desert.jpg"/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || users} className={s.avatar}/>
                { props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                <ProfileStatusWithHooks
                    updateStatus={props.updateStatus}
                    status={props.status}/>
            </div>
        </div>
    )


}