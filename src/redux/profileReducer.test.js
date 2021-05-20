import React from "react";
import ProfileReducer, {AddPostActionCreator, DeletePost} from "./profileReducer";

let State = {
    profilePage: {
        postsData: [
            {id: 1, message: "Hi! How are you?", likes: "likes: 15"},
            {id: 2, message: "It is my first post", likes: "likes: 17"},
        ],
    },
};

test('length of posts should be incremented', () => {
    let action = AddPostActionCreator('New post text')
    let newState = ProfileReducer(State, action);
    expect(newState.profilePage.postsData.length).toBe(3)
});

test('New post text should be correct', () => {
    let action = AddPostActionCreator('New post text')
    let newState = ProfileReducer(State, action);
    expect(newState.profilePage.postsData[0].message).toBe('New post text')
});

test('after deleting length of messages should be decrement', () => {
    let action = DeletePost(1)
    let newState = ProfileReducer(State, action);
    expect(newState.profilePage.postsData.length).toBe(1)
});

test('after deleting length should not be decrement if id is incorrect', () => {
    let action = DeletePost(1000)
    let newState = ProfileReducer(State, action);
    expect(newState.profilePage.postsData.length).toBe(2)
});
