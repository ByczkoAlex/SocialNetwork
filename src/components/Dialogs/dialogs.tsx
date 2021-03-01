import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import Dialog from "./DialogsItem/DialogsItem";
import Message from "./Messages/Messages";
import {MapStateToPropsType1, MapDispatchToPropsType1} from './dialogsContainer';
import { Redirect } from 'react-router-dom';

export type MessageType = {
    id: number
    message: string
}
export type DialogType = {
    id: number
    name: string
}

export type messagesPage = {
    dialogData: Array<DialogType>
    messagesData: Array<MessageType>
    newMessageBody: string
    UpdateNewMessageBody: () => void
    sendMessage: () => void
}


function Dialogs(props: MapStateToPropsType1 & MapDispatchToPropsType1) {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogData.map((d: DialogType) => <Dialog id={d.id} key={d.id} name={d.name}/>);
    let messagesElements = state.messagesData.map((m: MessageType) => <Message key={m.id} message={m.message}/>);

    let NewPostElement = React.createRef<HTMLTextAreaElement>();

    let onSendMessageClick = () => {
        if (NewPostElement.current) {
            props.sendMessage();
        }
    };


    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (NewPostElement.current) {
            props.UpdateNewMessageBody(e.currentTarget.value);
        }
    };



    return (

        <div className={s.dialogs}>
            <div className={s.dialogs_item}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea placeholder="enter your message"
                                   value={props.dialogsPage.newMessageBody}
                                   onChange={onNewMessageChange}
                                   ref={NewPostElement}>
                         </textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>send</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Dialogs