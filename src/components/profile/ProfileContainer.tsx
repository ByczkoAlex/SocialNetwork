import React, {ComponentClass} from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import { RootStateRedux} from "../../redux/redux-store";
import {
    getStatus,
    getUserProfile,
    ProfileAPIType,
    savePhoto,
    saveProfile,
    updateStatus
} from "../../redux/profileReducer";
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
    savePhoto: (file: any)=> void
    saveProfile: (FormData: any) => void
}

type ProfileContainerType = MapStateToPropsType & MapDispatchToPropsType  & RouteComponentProps<{userId: string}>

class ProfileContainer extends React.Component <ProfileContainerType>{

    refreshProfile() {
        let userId = Number(this.props.match.params.userId)
        if ( !userId ) {
            userId = 10938
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfileContainerType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <div>
                {this.props.profile && <Profile
                    saveProfile={this.props.saveProfile}
                    isOwner={!this.props.match.params.userId}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                    profile={this.props.profile}
                    savePhoto={this.props.savePhoto}
                />}
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
    connect <MapStateToPropsType,MapDispatchToPropsType, {}, RootStateRedux>(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    WithAusRedirect
)(ProfileContainer) as ComponentClass;
