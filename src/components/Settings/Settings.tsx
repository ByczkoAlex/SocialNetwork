import React, {ComponentClass} from 'react';
import s from './Settings.module.css'
import {WithAusRedirect} from "../HOC/WithAuthRedirect";
import {connect} from "react-redux";
import {compose} from "redux";
import {Music} from "../Music/Music";


export function Settings() {
    return <div>
        Settings
    </div>
}

export default compose(
    connect(),
    WithAusRedirect
)(Settings) as ComponentClass