import React from "react";
import ProfileStatusWithHooks from "../ProfileStatus/ProfileStatusWithHooks";
import {Form, reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../../common/FormControll/FormControll";
import s from './ProfileInfo.module.css'


export const ProfileDataForm = (props: any) => {
    return <Form onSubmit={props.handleSubmit}>
        <div>
            <button>Save</button>
        </div>
        <div>
            <b>Full name</b>: {createField("Full name", [], "FullName", Input, null, null)}
        </div>
        <ProfileStatusWithHooks
            updateStatus={props.updateStatus}
            status={props.status}/>
        <div>
            <b>Looking for a job</b>:
            {createField("lookingForAJob", [], "lookingForAJob", Input, {type: "checkbox"}, null)}
        </div>
        <div>
            <b>My professional skills</b>:
            {createField("My professional skills", [], "lookingForAJobDescription", Textarea, null, null)}
        </div>
        <div>
            <b>About Me</b> : {props.aboutMe}
            {createField("About Me", [], "aboutMe", Textarea, null, null)}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(props.initialValues.contacts).map(key => {
            debugger
            return <div key={key} className={s.contact}>
                <b>{key}: {createField(key, [], "contacts." + key, Input, null, null)}</b>
            </div>
        })}
        </div>
    </Form>
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm) as any

export default ProfileDataFormReduxForm