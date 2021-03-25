import React, {ChangeEvent} from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

class ProfileStatus extends React.Component <PropsType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode () {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    OnStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status:e.currentTarget.value
        });
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status ? this.props.status : 'No Status' }</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.OnStatusChange} autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={this.state.status}></input>
                    </div>
                }
            </div>
        )

    }
}

const UpdateStatusForm: React.FC<InjectedFormProps<any>> = (props:any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"textarea"} name={"newStatus"} placeholder={"enter your status"} />
            </div>
        </form>
    )
}

const UpdateStatusFormRedux = reduxForm<any>({form: "DialogAddMessageForm"})(UpdateStatusForm)


export default ProfileStatus;