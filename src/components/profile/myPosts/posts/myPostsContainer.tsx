import React, {Dispatch} from 'react';
import {MyPosts} from "../myPosts";
import {connect} from "react-redux";
import {ActionsTypes, RootStateRedux} from "../../../../redux/redux-store";
import {AddPostActionCreator, OnPostChangeActionCreator} from "../../../../redux/profileReducer";

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
    newPostText: string
}

export type MapDispatchToPropsType = {
    addPost: () => void
    updateNewPostText: (newPost: string) => void
}


const mapStateToProps = (state:RootStateRedux) => {
    return {
        posts: state.ProfileReducer.profilePage.postsData,
        newPostText: state.ProfileReducer.profilePage.newPostText,
    };
};

const mapDispatchToProps = (dispatch:  Dispatch<ActionsTypes>) => {
    return {

        addPost: () => {
            dispatch(AddPostActionCreator());
        },
        updateNewPostText: (newPost: string) => {
            debugger
            let action = OnPostChangeActionCreator(newPost);
            dispatch(action);
        }
    }
};

export const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, RootStateRedux>(mapStateToProps, mapDispatchToProps)(MyPosts);

