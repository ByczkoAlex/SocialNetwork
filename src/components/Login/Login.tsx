import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../../common/FormControll/FormControll";
import {requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import { Redirect } from 'react-router-dom';
import {RootStateRedux} from "../../redux/redux-store";
import s from "../../common/FormControll/FormControll.module.css";

type FormDataType = {
    login: string,
    password: string,
    rememberMe: boolean,
    error?: any
}

export const LoginForm : React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
                {createField('email', [requiredField], 'email', Input, null,null)}
                {createField('password', [requiredField], 'password', Input, {type:'password'},null)}
                {createField('checkbox', [requiredField], 'rememberMe', Input, {type:'checkbox'}, 'Remember Me')}
            <div>
                <button type={"submit"}>Login</button>
            </div>
        </form>
    )
}


const LoginReduxForm = reduxForm<FormDataType>({form: 'email'})(LoginForm)

export const Login = (props:any) => {

    const onSubmit = (FormData : any) => {
        props.login(FormData.email, FormData.password, FormData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to ={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit = {onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state: RootStateRedux) => ({
        isAuth: state.AuthReducer.isAuth
})

export default connect( mapStateToProps,{login})(Login)