import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {RootStateRedux} from "../../redux/redux-store";
import {logout} from "../../redux/authReducer";

export type mapDispatchToProps = {
    logout: () => void
}


type HeaderContainerType = {
    id: number
    email: string
    login: string
    isAuth:boolean
    AuthMeTC:(id: number, email: string, login: string) => void
    logout: () => void
}

class HeaderContainer extends React.Component<HeaderContainerType> {

    render() {
        return( <>
            <Header
                isAuth={this.props.isAuth}
                login={this.props.login}
                logout={this.props.logout}
            />
            </>
        )
    }
}


let mapStateToProps = (state: RootStateRedux) => {
    return {
        isAuth: state.AuthReducer.isAuth,
        login: state.AuthReducer.login,
    }
};


export default connect<any, mapDispatchToProps, any, RootStateRedux>(mapStateToProps, {logout}) (HeaderContainer);