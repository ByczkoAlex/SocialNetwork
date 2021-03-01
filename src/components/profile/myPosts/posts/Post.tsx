import React from 'react';
import s from './Post.module.css'

type PropsType = {
    message: string
    likes: string
}

export function Post (props: PropsType) {
    return (
        <div className={s.item}>
            <img className={s.image} src="https://source.unsplash.com/random/800x600" alt=""/>
            <div>
                {props.message}
            </div>
            <div>
                {props.likes}
            </div>
        </div>
    )
}