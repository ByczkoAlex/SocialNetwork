import React, {ComponentClass} from 'react';
import s from './Music.module.css'
import {WithAusRedirect} from "../HOC/WithAuthRedirect";
import {connect} from "react-redux";
import {compose} from "redux";


export function Music() {
    return <div>
        Music
    </div>
}


export default compose(
    connect(),
    WithAusRedirect
)(Music) as ComponentClass