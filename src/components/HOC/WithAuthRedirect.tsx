import React from 'react'
import { Redirect } from 'react-router-dom'
import {RootStateRedux} from "../../redux/redux-store";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state: RootStateRedux) => ({
    isAuth: state.AuthReducer.isAuth
})

export const WithAusRedirect = (Component: any) => {
    class RedirectComponent extends React.Component<any, any> {
        render() {
            if (!this.props.isAuth) return <Redirect to='/login'/>

            return <Component {...this.props}/>
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect) (RedirectComponent);


    return ConnectedAuthRedirectComponent;
}