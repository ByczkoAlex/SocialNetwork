import React, {ChangeEvent, useState} from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks = (props: PropsType) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    const activateMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const OnStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateMode}>{props.status ? props.status : 'No Status'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onChange={OnStatusChange} onBlur={deactivateEditMode} autoFocus={true} value={status}></input>
            </div>
            }
        </div>
    )


}

const UpdateStatusForm: React.FC<InjectedFormProps<any>> = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"textarea"} name={"newStatus"} placeholder={"enter your status"}/>
            </div>
        </form>
    )
}

const UpdateStatusFormRedux = reduxForm<any>({form: "DialogAddMessageForm"})(UpdateStatusForm)


export default ProfileStatusWithHooks;