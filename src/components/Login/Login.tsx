import React from 'react'
import {Field, InjectedFormProps, reduxForm, SubmitHandler} from "redux-form";
import {createField, Input} from "../../common/FormControll/FormControll";
import {requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import { Redirect } from 'react-router-dom';
import {RootStateRedux} from "../../redux/redux-store";

type FormDataType = {
    login: string,
    password: string,
    rememberMe: boolean,
    error?: any,

}

type LoginFormType = {
    captchaUrl:string
}

export const LoginForm : React.FC<InjectedFormProps<FormDataType, LoginFormType> & LoginFormType> = ({handleSubmit, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
                {createField('email', [requiredField], 'email', Input, null,null)}
                {createField('password', [requiredField], 'password', Input, {type:'password'},null)}
                {createField('checkbox', [requiredField], 'rememberMe', Input, {type:'checkbox'}, 'Remember Me')}

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField('Symbols from image', [requiredField], 'captcha', Input, null, null) }

            <div>
                <button type={"submit"}>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType, {captchaUrl: string}>({form: 'email'})(LoginForm)

export const Login = (props:any) => {

    const onSubmit = (FormData : any) => {
        props.login(FormData.email, FormData.password, FormData.rememberMe, FormData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to ={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit = {onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

const mapStateToProps = (state: RootStateRedux) => ({
        isAuth: state.AuthReducer.isAuth,
        captchaUrl : state.AuthReducer.captchaUrl
})

export default connect( mapStateToProps,{login})(Login)