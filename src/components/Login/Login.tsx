import React from 'react'
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../../common/FormControll/FormControll";
import {requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import { Redirect } from 'react-router-dom';
import {RootStateRedux} from "../../redux/redux-store";

type LoginFormType = {
    captchaUrl:string | null
}

type mapStateToPropsType = {
    isAuth: boolean | null
    captchaUrl: string | null
}
type mapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export const LoginForm : React.FC<InjectedFormProps<loginFormValuesType, LoginFormType> & LoginFormType> = ({handleSubmit, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
                {createField<LoginFormValueTypeKeys>('email', [requiredField], "email", Input, null,null)}
                {createField<LoginFormValueTypeKeys>('password', [requiredField], 'password', Input, {type:'password'},null)}
                {createField<LoginFormValueTypeKeys>('checkbox', [requiredField], 'rememberMe', Input, {type:'checkbox'}, 'Remember Me')}

            {captchaUrl && <img alt='captcha' src={captchaUrl}/>}
            {captchaUrl && createField<LoginFormValueTypeKeys>('Symbols from image', [requiredField], 'captcha', Input, null, null) }

            <div>
                <button type={"submit"}>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<loginFormValuesType,LoginFormType>({form: 'email'})(LoginForm)

type loginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValueTypeKeys = Extract<keyof loginFormValuesType, string>

export const Login : React.FC<mapStateToPropsType & mapDispatchToPropsType> = (props) => {

    const onSubmit = (FormData : loginFormValuesType) => {
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

const mapStateToProps = (state: RootStateRedux) : mapStateToPropsType => ({
        isAuth: state.AuthReducer.isAuth,
        captchaUrl : state.AuthReducer.captchaUrl
})

export default connect( mapStateToProps,{login})(Login)