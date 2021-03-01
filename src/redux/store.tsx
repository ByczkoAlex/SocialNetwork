import ProfileReducer, {PostType} from "./profileReducer";
import DialogsReducer from "./dialogsReducer";
import * as React from "react";
import {ActionsTypes} from "./redux-store";


export type MessageType = {
    id: number
    message: string
}
export type DialogType = {
    id: number
    name: string
}

export type myPosts = {
    postsData: Array<PostType>
    newPostText: string

}
export type messagesPage = {
    dialogData: Array<DialogType>
    messagesData: Array<MessageType>
    newMessageBody: string
}
export type RootStateType = {
    profilePage: myPosts
    dialogsPage: messagesPage
    updateNewPostText?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    dispatch?: (action: ActionsTypes) => void
    newPostText?: string
}

export type StoreType = {
    profilePage: myPosts
    dialogsPage: messagesPage
    updateNewPostText?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    dispatch?: (action: ActionsTypes) => void
    newPostText?: string
    _state: RootStateType;
    subscribe:() => void;
}


let store : any = {
    _state:{
        profilePage: {
            postsData: [
                {id: 1, message: "Hi! How are you?", likes: "likes: 15"},
                {id: 2, message: "It is my first post", likes: "likes: 17"},
            ],
            newPostText: ""
        },
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
        // sidebarPage: {}
    },

    subscribe() {

    },

    dispatch( action: ActionsTypes) {

        this._state.profilePage = ProfileReducer(this._state.profilePage, action);
        this._state.dialogsPage = DialogsReducer(this._state.dialogsPage, action);
        // this._state.sidebarPage = SidebarReducer(this._state.sidebarPage, action);

    }

};




export default store;


//
// Перенести все actionCreators в редьюсеры.
//     типизировать store , state , dispatch в контейнерных компонентах