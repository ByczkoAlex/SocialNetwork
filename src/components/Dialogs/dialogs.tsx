import React from 'react';
import s from './Dialogs.module.css'
import Dialog from "./DialogsItem/DialogsItem";
import Message from "./Messages/Messages";
import {MapStateToPropsType1, MapDispatchToPropsType1} from './dialogsContainer';
import {InjectedFormProps, Field} from "redux-form";
import {reduxForm} from "redux-form";

export type MessageType = {
    id: number
    message: string
}
export type DialogType = {
    id: number
    name: string
}

type FormDataType = {
    newMessageBody: string
}

function Dialogs(props: MapStateToPropsType1 & MapDispatchToPropsType1) {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogData.map((d: DialogType) => <Dialog id={d.id} key={d.id} name={d.name}/>);
    let messagesElements = state.messagesData.map((m: MessageType) => <Message key={m.id} message={m.message}/>);

    let addNewMessage = (values:any) => {
        props.sendMessage(values.newMessageBody)
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_item}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div>
                        <AddMessageFormRedux onSubmit={addNewMessage}/>
                    </div>
                </div>
            </div>
        </div>

    )
}

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props:any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"textarea"} name={"newMessageBody"} placeholder={"enter your message"} />
            </div>
            <div><button>send</button></div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<any>({form: "DialogAddMessageForm"})(AddMessageForm)


export default Dialogs