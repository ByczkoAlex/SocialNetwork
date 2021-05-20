import React from 'react';
import s from './myPosts.module.css'
import {Post} from "./posts/Post";
import {MapDispatchToPropsType, MapStateToPropsType} from "./posts/myPostsContainer";
import {AddPostFormRedux} from "../AddPostForm/AddPostForm";

export const MyPosts = React.memo((props: MapStateToPropsType & MapDispatchToPropsType) => {
    let posts = props.posts;
    let postsElements = posts.map((p: PostType) => <Post key={p.id} message={p.message}
                                                         likes={p.likes}/>);


    const AddNewPost = (values: any) => {
        props.addPost(values.newPost)
    }

    return (
        <div className={s.postsBlock}>
            <h2>My Posts</h2>
            <div>
                New post
            </div>
            <div>
                <AddPostFormRedux onSubmit={AddNewPost}/>
            </div>

            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

export type PostType = {
    id: number
    message: string
    likes: string
}
