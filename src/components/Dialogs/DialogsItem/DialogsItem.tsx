import React from 'react';
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

type propsTypeDialogs = {
    name: string
    id: number
}



function Dialog(props: propsTypeDialogs) {
    return <div className={s.dialog}>
        <NavLink to={"/dialogs/" + props.id} activeClassName={s.active}> {props.name} </NavLink>
    </div>
}

export default Dialog