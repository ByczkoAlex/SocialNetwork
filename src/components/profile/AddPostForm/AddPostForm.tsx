import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormControll/FormControll";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";

const maxLength10 = maxLengthCreator(10);

const AddPostForm: React.FC<InjectedFormProps<any>> = (props:any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"newPost"} placeholder={"enter your post"}
                       validate={[requiredField, maxLength10]}/>
            </div>
            <div>
                <button type="submit">Add post</button>
            </div>
        </form>
    )
}

export const AddPostFormRedux = reduxForm<any>({form: "DialogAddMessageForm"})(AddPostForm)
