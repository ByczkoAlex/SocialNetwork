import React, {useState} from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../../common/Preloader/Preloader";
import {ProfileAPIType} from "../../../redux/profileReducer";
import ProfileStatusWithHooks from "../ProfileStatus/ProfileStatusWithHooks";
import users from "../../../assets/images/users.png"
import ProfileDataFormReduxForm from "./ProfileDataForm";
import Img from "../../../assets/images/img.jpg"

export type profileType = {
    profile: ProfileAPIType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: any) => void
    saveProfile: (FormData: any) => void
}


export function ProfileInfo(props: profileType) {

    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (FormData : any) => {
        props.saveProfile(FormData)
        setEditMode(false)
    }

    return (
        <div>
            <div>
                <img className={s.image} src={Img}/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || users} className={s.avatar}/>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                <div>
                    {editMode ? <ProfileDataFormReduxForm initialValues={props.profile}
                                                          onSubmit={onSubmit}
                                                          status={props.status}
                                                          updateStatus={props.updateStatus}
                                                          isOwner={props.isOwner}
                                                          goToEditMode={() => {
                                                              setEditMode(false)
                                                          }}
                                                          aboutMe={props.profile.aboutMe}/>
                        : <ProfileData profile={props.profile}
                                       status={props.status}
                                       updateStatus={props.updateStatus}
                                       isOwner={props.isOwner}
                                       goToEditMode={() => {
                                           setEditMode(true)
                                       }}/>}
                </div>
            </div>
        </div>
    )
}

const ProfileData = (props: any) => {

    return <div>
        {props.isOwner && <div>
            <button onClick={props.goToEditMode}>Edit</button>
        </div>}
        {props.profile && <div>
            <b>Full name</b>: {props.profile.fullName}
        </div>}
        <ProfileStatusWithHooks
            updateStatus={props.updateStatus}
            status={props.status}/>
        {props.profile && <div>
            <b>Looking for a job</b>: {props.profile.lookingForAJob ? "yes" : "no"}
        </div>}
        {props.profile.lookingForAJob &&
        <div>
            <b>My professional skills</b>: {props.profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>About Me</b>: {props.profile.aboutMe}
        </div>
        {props.profile && <div>
            <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
            // @ts-ignore
            return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
        })}
        </div>}
    </div>
}

const Contact = (props: any) => {
    return <div className={s.contact}><b>{props.contactTitle}</b> : {props.contactValue} </div>
}