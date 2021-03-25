import {ActionsTypes} from "./redux-store";
const SEND_MESSAGE = "SEND_MESSAGE";

export type SendMessageActionType = {
    type: typeof SEND_MESSAGE,
    newMessageBody:string
}

export const SandMessageCreator = (newMessageBody:string): SendMessageActionType => ({
    type: SEND_MESSAGE,
    newMessageBody: newMessageBody
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
    },
};

export type InitialProfileType = typeof initialState

const DialogsReducer = (state: InitialProfileType = initialState, action: ActionsTypes): InitialProfileType => {
    switch (action.type) {
        case "SEND_MESSAGE":
            let body = action.newMessageBody;
            return {
                ...state,
                dialogsPage: {
                    ...state.dialogsPage,
                    messagesData: [...state.dialogsPage.messagesData, {id: 6, message: body}],
                }
            };
        default:
            return state;
    }
};


export default DialogsReducer;