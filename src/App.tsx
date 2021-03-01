import React from 'react';
import './App.css';
import {Nav} from "./components/Nav/Nav";
import {BrowserRouter, Route} from 'react-router-dom';
import NewsContainer from "./components/News/News";
import MusicContainer from "./components/Music/Music";
import SettingsContainer from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {Login} from "./components/Login/Login";
import DialogsContainer from "./components/Dialogs/dialogsContainer";

function App() {
    return (
        <BrowserRouter>
            <div className="app_wrapper">
                <HeaderContainer/>
                <Nav/>
                <div className="app_wrapper_content">
                    <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                    <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
                    <Route path="/users" render={() => <UsersContainer/>}/>
                    <Route path="/news" render={() => <NewsContainer/>}/>
                    <Route path="/music" render={() => <MusicContainer/>}/>
                    <Route path="/settings" render={() => <SettingsContainer/>}/>
                    <Route path="/login" render={() => <Login/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}


export default App;
