import React from "react";
import styles from "./FormControll.module.css"
import {ValidateFunc} from "../../utils/validators/validators";
import {Field} from "redux-form";

export const FormControl = ({input, meta: {touched, error}, ...props}: any) => {

    const hasError = touched && error

    return (
        <div className={`${styles.form_control} ${hasError ? styles.error : ""}`}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props: any) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}> <textarea {...input} {...restProps}/></FormControl>
}

export const Input = (props: any) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}> <input {...input} {...restProps}/></FormControl>
}

export const createField = (placehoder: string, validate: ValidateFunc[], name: string, component: any, props: any, text: string | null) => (
    <div>
        <Field placeholder={placehoder}
               validate={validate}
               name={name} component={component}
               {...props}
        />{text}
    </div>
)