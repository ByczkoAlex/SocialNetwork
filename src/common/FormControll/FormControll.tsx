import React from "react";
import styles from "./FormControll.module.css"
import {fieldValidatorsType} from "../../utils/validators/validators";
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";

type formControlPropsType = {
    meta: WrappedFieldMetaProps
}

export const FormControl: React.FC<formControlPropsType> = ({meta: {touched, error}, children}) => {

    const hasError = touched && error

    return (
        <div className={`${styles.form_control} ${hasError ? styles.error : ""}`}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, children, ...restProps} = props;
    return <FormControl {...props}> <textarea {...input} {...restProps}/></FormControl>
}

export const Input: React.FC<WrappedFieldProps>  = (props) => {
    const {input, meta, children, ...restProps} = props;
    return <FormControl {...props}> <input {...input} {...restProps}/></FormControl>
}

export function createField<FormKeysType extends string> (placeholder: string | null,
                            validate: fieldValidatorsType[],
                            name: FormKeysType,
                            component: React.FC<WrappedFieldProps>,
                            props: any,
                            text: string | null) {
    return (
        <div>
            <Field placeholder={placeholder}
                   validate={validate}
                   name={name} component={component}
                   {...props}
            />{text}
        </div>
    );
}