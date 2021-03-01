import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {RootStateRedux} from "../../redux/redux-store";
import {AuthMeTC,} from "../../redux/AuthReducer";

export type mapDispatchToProps = {
    AuthMeTC:(id: number, email: string, login: string) => void
}


type HeaderContainerType = {
    id: number
    email: string
    login: string
    isAuth:boolean
    AuthMeTC:(id: number, email: string, login: string) => void
}

class HeaderContainer extends React.Component<HeaderContainerType> {

    componentDidMount() {
        this.props.AuthMeTC(this.props.id, this.props.email, this.props.login)
    }

    render() {
        return( <>
            <Header
                isAuth={this.props.isAuth}
                login={this.props.login}
            />
            </>
        )
    }
}

const OwnProps = {

}

export type mapStateToPropsType = {
    isAuth:boolean
    login: string
}


let mapStateToProps = (state: RootStateRedux) => {
    return {
        isAuth: state.AuthReducer.isAuth,
        login: state.AuthReducer.login
    }
};


export default connect<any, mapDispatchToProps, any, RootStateRedux>(mapStateToProps, {AuthMeTC}) (HeaderContainer);