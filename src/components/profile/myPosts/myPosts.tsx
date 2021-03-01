import React, {ChangeEvent} from 'react';
import s from './myPosts.module.css'
import {Post} from "./posts/Post";
import {MapDispatchToPropsType, MapStateToPropsType} from "./posts/myPostsContainer";

export type PostType = {
    id: number
    message: string
    likes: string
}

export function MyPosts(props: MapStateToPropsType & MapDispatchToPropsType) {

    let posts = props.posts;

    let postsElements = posts.map((p: PostType) => <Post key={p.id} message={p.message}
                                                         likes={p.likes}/>);

    let NewPostElement = React.createRef<HTMLTextAreaElement>();

    let onAddPost = () => {
        props.addPost();
    };


    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        debugger
        props.updateNewPostText(e.currentTarget.value)
    };


    return (
        <div className={s.postsBlock}>
            <h2>My Posts</h2>
            <div>
                New post
            </div>
            <div>
                <textarea ref={NewPostElement} onChange={onPostChange} value={props.newPostText}/>
            </div>
            <div>
                <button onClick={onAddPost}>Add post</button>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}