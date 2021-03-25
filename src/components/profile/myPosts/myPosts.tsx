import React, {ChangeEvent} from 'react';
import s from './myPosts.module.css'
import {Post} from "./posts/Post";
import {MapDispatchToPropsType, MapStateToPropsType} from "./posts/myPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

export type PostType = {
    id: number
    message: string
    likes: string
}

export function MyPosts(props: MapStateToPropsType & MapDispatchToPropsType) {

    let posts = props.posts;

    let postsElements = posts.map((p: PostType) => <Post key={p.id} message={p.message}
                                                         likes={p.likes}/>);


    const AddNewPost = (values:any) => {
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
}

const AddPostForm: React.FC<InjectedFormProps<any>> = (props:any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"textarea"} name={"newPost"} placeholder={"enter your post"} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddPostFormRedux = reduxForm<any>({form: "DialogAddMessageForm"})(AddPostForm)
