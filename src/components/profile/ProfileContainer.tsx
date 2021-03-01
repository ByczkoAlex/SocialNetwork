import React, {ComponentClass} from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import { RootStateRedux} from "../../redux/redux-store";
import {getUserProfile, ProfileAPIType} from "../../redux/profileReducer";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {WithAusRedirect} from "../HOC/WithAuthRedirect";
import {compose} from "redux";


type MapStateToPropsType = {
    profile: ProfileAPIType | null
}

type MapDispatchToPropsType = {
    getUserProfile : (userId: number) => void
}

type ProfileContainerType = MapStateToPropsType & MapDispatchToPropsType  & RouteComponentProps<{userId: string}>

class ProfileContainer extends React.Component <ProfileContainerType>{

    componentDidMount() {
        let userId = Number(this.props.match.params.userId)
        if ( !userId ) {
            userId =2
        }
        this.props.getUserProfile(userId)
    }

    render() {
        return (
            <div>
                {this.props.profile && <Profile profile={this.props.profile}/>}
            </div>
        )
    }
}

let mapStateToProps = (state: RootStateRedux): MapStateToPropsType => ({
    profile: state.ProfileReducer.profilePage.profile
})

export default compose(
    connect <MapStateToPropsType,MapDispatchToPropsType, {}, RootStateRedux>(mapStateToProps, {getUserProfile}),
    withRouter,
    WithAusRedirect
)(ProfileContainer) as ComponentClass;
