import {ChangeEvent} from "react";
import {ActionsTypes} from "./redux-store";

const UPDATE_NEW_MESSAGE_BODY = "UPDATE_NEW_MESSAGE_BODY";
const SEND_MESSAGE = "SEND_MESSAGE";

export type SendMessageActionType = {
    type: typeof SEND_MESSAGE,
}
export type UpdateNewMessageActionType = {
    type: typeof UPDATE_NEW_MESSAGE_BODY,
    payload: string
}

export const SandMessageCreator = (): SendMessageActionType => ({type: SEND_MESSAGE,});
export const UpdateNewMessageBodyCreator = (newText: string): UpdateNewMessageActionType => ({
    type: UPDATE_NEW_MESSAGE_BODY,
    payload: newText
});


export type MessageType = {
    id: number
    message: string
}
export type DialogType = {
    id: number
    name: string
}

export type messagesPage1 = {
    dialogData: Array<DialogType>
    messagesData: Array<MessageType>
    newMessageBody: string
}


let initialState = {
    dialogsPage: {
        dialogData: [
            {id: 1, name: "Anastasia"},
            {id: 2, name: "ilya"},
            {id: 3, name: "Evgeniy"},
            {id: 4, name: "Katya"},
            {id: 5, name: "Alena"},
        ],
        messagesData: [
            {id: 1, message: "Hi"},
            {id: 2, message: "privet"},
            {id: 3, message: "Hello"},
            {id: 4, message: "Gutten Tag"},
            {id: 5, message: "yo"}
        ],
        newMessageBody: ""
    },
};

const DialogsReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case "UPDATE_NEW_MESSAGE_BODY":
            return {
                ...state,
                dialogsPage: {
                    ...state.dialogsPage,
                    newMessageBody: action.payload,
                },

            };
        case "SEND_MESSAGE":
            let body = state.dialogsPage.newMessageBody;
            return {
                ...state,
                dialogsPage: {
                    ...state.dialogsPage,
                    messagesData: [...state.dialogsPage.messagesData, {id: 6, message: state.dialogsPage.newMessageBody}],
                    newMessageBody: ""
                }

            };
        default:
            return state;
    }
};


export default DialogsReducer;