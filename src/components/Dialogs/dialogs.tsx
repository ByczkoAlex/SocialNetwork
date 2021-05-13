import React from 'react';
import s from './Dialogs.module.css'
import Dialog from "./DialogsItem/DialogsItem";
import Message from "./Messages/Messages";
import {MapStateToPropsType1, MapDispatchToPropsType1} from './dialogsContainer';
import {InjectedFormProps, Field} from "redux-form";
import {reduxForm} from "redux-form";
import {Textarea} from "../../common/FormControll/FormControll";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import {AddMessageFormRedux} from "./AddMessageForm/AddMessageForm";

export type MessageType = {
    id: number
    message: string
}
export type DialogType = {
    id: number
    name: string
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

export default Dialogs