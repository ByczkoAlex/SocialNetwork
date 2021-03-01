import Dialogs from "./dialogs";
import {connect} from "react-redux";
import {messagesPage1, SandMessageCreator, UpdateNewMessageBodyCreator} from "../../redux/dialogsReducer";
import {RootStateRedux} from "../../redux/redux-store";
import React, {ComponentClass} from "react";
import {WithAusRedirect} from "../HOC/WithAuthRedirect";
import {compose} from "redux";

export type MapStateToPropsType1 = {
    dialogsPage: messagesPage1
}

export type MapDispatchToPropsType1 = {
    UpdateNewMessageBody: (newText: string) => void
    sendMessage: () => void
}

let MapStateToProps = (state: RootStateRedux): MapStateToPropsType1 => {
    return {
        dialogsPage: state.DialogsReducer.dialogsPage,
    }
};

let MapDispatchToProps = (dispatch: any): MapDispatchToPropsType1 => {
    return {
        UpdateNewMessageBody: (newText: string) => {
            dispatch(UpdateNewMessageBodyCreator(newText));
        },
        sendMessage: () => {
            dispatch(SandMessageCreator());
        },
    }
};

export default compose(
    connect(MapStateToProps, MapDispatchToProps),
    WithAusRedirect
)(Dialogs) as ComponentClass


// let AuthRedirectComponent = WithAusRedirect(Dialogs)
//
// const DialogsContainer = connect(MapStateToProps, MapDispatchToProps)(AuthRedirectComponent);
//
// export default DialogsContainer;