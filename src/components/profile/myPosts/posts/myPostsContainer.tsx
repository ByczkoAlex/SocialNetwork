import React from 'react';
import {MyPosts} from "../myPosts";
import {connect} from "react-redux";
import {RootStateRedux} from "../../../../redux/redux-store";
import {actions} from "../../../../redux/profileReducer";

export type myPosts = {
    postsData: Array<PostType>
    newPostText: string

}

export type PostType = {
    id: number
    message: string
    likes: string
}

export type OwnProps = {

}

export type MapStateToPropsType = {
    posts: Array<PostType>
}

export type MapDispatchToPropsType = {
    addPost: (newPostText:string) => void
}


const mapStateToProps = (state:RootStateRedux) => {
    return {
        posts: state.ProfileReducer.profilePage.postsData,
    };
};
//
// const mapDispatchToProps = (dispatch:  Dispatch<InferActionsTypes>) => {
//     return {
//         addPost: (newPost: string) => {
//             dispatch(actions.AddPostActionCreator(newPost));
//         },
//     }
// };
const addPost = actions.AddPostActionCreator
const deletePost = actions.DeletePost

export const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, RootStateRedux>(mapStateToProps, {addPost})(MyPosts);

