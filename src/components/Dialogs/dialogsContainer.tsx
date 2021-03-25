import Dialogs from "./dialogs";
import {connect} from "react-redux";
import {messagesPage1, SandMessageCreator} from "../../redux/dialogsReducer";
import {RootStateRedux} from "../../redux/redux-store";
import React, {ComponentClass} from "react";
import {WithAusRedirect} from "../HOC/WithAuthRedirect";
import {compose} from "redux";

export type MapStateToPropsType1 = {
    dialogsPage: messagesPage1
}

export type MapDispatchToPropsType1 = {
    sendMessage: (newMessageBody: string) => void
}

let MapStateToProps = (state: RootStateRedux) => {
    return {
        dialogsPage: state.DialogsReducer.dialogsPage,
    }
};

let MapDispatchToProps = (dispatch: any): MapDispatchToPropsType1 => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(SandMessageCreator(newMessageBody));
        },
    }
};

export default compose(
    connect(MapStateToProps, MapDispatchToProps),
    WithAusRedirect
)(Dialogs) as ComponentClass