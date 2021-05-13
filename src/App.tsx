import React, {ComponentClass} from 'react';
import './App.css';
import {Nav} from "./components/Nav/Nav";
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import NewsContainer from "./components/News/News";
import MusicContainer from "./components/Music/Music";
import SettingsContainer from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import DialogsContainer from "./components/Dialogs/dialogsContainer";
import {connect} from "react-redux";
import {RootStateRedux} from "./redux/redux-store";
import {AuthMeTC} from "./redux/authReducer";
import {AnyAction, compose, Dispatch} from "redux";
import {initializeApp} from "./redux/appReducer";

export type mapDispatchToProps = {
    // initializeApp: () => (dispatch: Dispatch<AnyAction>) => void
}


class App extends React.Component {

    // componentDidMount() {
    //     this.props.initializeApp();
    // }

    render() {
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
}

const mapStateToProps = (state: RootStateRedux) => {
    // initialized: state.AppReducer.initialized
}


export default compose(
    withRouter,
    connect<any, mapDispatchToProps, any, RootStateRedux>(mapStateToProps,{})) (App)  as ComponentClass;
