import React, {ComponentClass} from 'react';
import s from './News.module.css'
import {WithAusRedirect} from "../HOC/WithAuthRedirect";
import {connect} from "react-redux";
import {compose} from "redux";


export function News() {
    return <div>
        News
    </div>
}

export default compose(
    connect(),
    WithAusRedirect
)(News) as ComponentClass