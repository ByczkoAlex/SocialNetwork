import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormControll/FormControll";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";

type FormDataType = {
    newMessageBody: string
}

const maxLength50 = maxLengthCreator(50)

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props:any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       validate={[requiredField, maxLength50]}
                       name={"newMessageBody"} placeholder={"enter your message"} />
            </div>
            <div><button>send</button></div>
        </form>
    )
}

export  const AddMessageFormRedux = reduxForm<any>({form: "DialogAddMessageForm"})(AddMessageForm)

