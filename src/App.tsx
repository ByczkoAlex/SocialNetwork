import React, {ComponentClass} from 'react';
import './App.css';
import {Nav} from "./components/Nav/Nav";
import {BrowserRouter, Route, withRouter, Switch} from 'react-router-dom';
import NewsContainer from "./components/News/News";
import MusicContainer from "./components/Music/Music";
import SettingsContainer from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import DialogsContainer from "./components/Dialogs/dialogsContainer";
import {connect, Provider} from "react-redux";
import {RootStateRedux, store} from "./redux/redux-store";
import {compose} from "redux";
import {AuthMeTC} from "./redux/authReducer";


export type mapDispatchToProps = {
    // initializeApp: () => (dispatch: Dispatch<AnyAction>) => void
}


class App extends React.Component<any> {

    componentDidMount() {
        this.props.AuthMeTC()
    }

    render() {
        return (
            <div className="app_wrapper">
                <HeaderContainer/>
                <Nav/>
                <div className="app_wrapper_content">
                    <Switch>
                        <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                        <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
                        <Route path="/users" render={() => <UsersContainer/>}/>
                        <Route path="/news" render={() => <NewsContainer/>}/>
                        <Route path="/music" render={() => <MusicContainer/>}/>
                        <Route path="/settings" render={() => <SettingsContainer/>}/>
                        <Route path="/login" render={() => <Login/>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootStateRedux) => {
    // initialized: state.AppReducer.initialized
}


let AppContainer = compose(
    withRouter,
    connect<any, mapDispatchToProps, any, RootStateRedux>(mapStateToProps, {AuthMeTC}))(App) as ComponentClass;

const MainApp = () => {
    return <BrowserRouter basename="">
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp