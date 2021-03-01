import React from 'react';
import s from './../Dialogs.module.css'

type propsTypeMessages = {
    message: string
    key:number
}

function Message(props: propsTypeMessages) {
    return <div className={s.message}>{props.message}</div>
}

export default Message