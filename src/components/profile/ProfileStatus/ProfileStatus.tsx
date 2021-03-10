import React, {ChangeEvent} from 'react'

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

export default ProfileStatus;