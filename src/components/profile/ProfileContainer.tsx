import React, {ComponentClass} from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import { RootStateRedux} from "../../redux/redux-store";
import {getStatus, getUserProfile, ProfileAPIType, updateStatus} from "../../redux/profileReducer";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {WithAusRedirect} from "../HOC/WithAuthRedirect";
import {compose} from "redux";


type MapStateToPropsType = {
    profile: ProfileAPIType | null
    status: string,
    authorizedUserId: number | null,
    isAuth: boolean | null

}

type MapDispatchToPropsType = {
    getUserProfile : (userId: number) => void
    getStatus: (userId : number) => void
    updateStatus: (status: string) => void
}

type ProfileContainerType = MapStateToPropsType & MapDispatchToPropsType  & RouteComponentProps<{userId: string}>

class ProfileContainer extends React.Component <ProfileContainerType>{

    componentDidMount() {
        let userId = Number(this.props.match.params.userId)
        if ( !userId ) {
            userId = 10938
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return (
            <div>
                {this.props.profile && <Profile
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                    profile={this.props.profile}/>}
            </div>
        )
    }
}

let mapStateToProps = (state: RootStateRedux): MapStateToPropsType => ({
    profile: state.ProfileReducer.profilePage.profile,
    status: state.ProfileReducer.profilePage.status,
    authorizedUserId: state.AuthReducer.id,
    isAuth: state.AuthReducer.isAuth
})

export default compose(
    connect <MapStateToPropsType,MapDispatchToPropsType, {}, RootStateRedux>(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
    WithAusRedirect
)(ProfileContainer) as ComponentClass;
