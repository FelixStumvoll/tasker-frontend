import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import MediaQuery from 'react-responsive';
import AuthWrapper from '../authPages/AuthWrapper';
import checkUsername from './checkUsername';
import validate from './validateInput';

const RegisterForm = styled.form`
    display: grid;
    grid-template-areas:
        'Label'
        'Username'
        'Password'
        'PasswordRepeat'
        'RegisterButton';
    grid-template-rows: 70px repeat(3, auto) 50px;
    grid-row-gap: 20px;
    grid-column-gap: 10px;
    font-family: ${({ theme }) => theme.defaultFont};
    transition: ${({ theme }) => theme.transitionDuration};
    background-color: ${({ theme }) => theme.primaryColor};
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: 10px;
`;

const PageLabel = styled.h1`
    grid-area: Label;
    color: ${({ theme }) => theme.textColor};
    margin: auto;
    transition: inherit;
`;

const InputArea = styled.div`
    grid-area: ${props => props.gridArea};
    display: grid;
    grid-template-areas: 'RegisterLabel RegisterInput' 'Error Error';
    grid-template-columns: 150px 1fr;
    grid-template-rows: 30px auto;
    grid-column-gap: 10px;
    transition: inherit;

    @media screen and (max-width: ${({ theme }) => theme.stage2responsive}) {
        grid-template-areas: 'RegisterInput' 'Error';
        grid-template-columns: 1fr;
        grid-template-rows: 30px auto;
    }
`;

const RegisterLabel = styled.label`
    color: ${({ theme }) => theme.textColor};
    grid-area: RegisterLabel;
    font-weight: bold;
    margin: auto;
    transition: inherit;
`;

const RegisterInput = styled.input`
    grid-area: RegisterInput;
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 2px solid ${({ theme }) => theme.textColor};
    padding-left: 5px;
    height: 30px;
    width: 100%;
    box-sizing: border-box;
    font-family: inherit;
    transition: inherit;
`;

const ErrorMessage = styled.div`
    margin-top: 10px;
    grid-area: Error;
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: ${({ theme }) => theme.negativeColor};
    color: ${({ theme }) => theme.textColor};
    padding: 5px;
    text-align: center;
    margin-left: 160px;
    transition: inherit;

    @media screen and (max-width: ${({ theme }) => theme.stage2responsive}) {
        margin-left: 0px;
    }
`;

const RegisterButton = styled.button`
    grid-area: RegisterButton;
    width: 100%;
    height: 100%;
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
    background-color: ${({ theme }) => theme.positiveColor};
    color: ${({ theme }) => theme.textColor};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    font-family: inherit;

    :disabled {
        /* background-color: gray; */
        cursor: not-allowed;
    }
`;

export class RegisterPage extends Component {
    renderInputField = ({
        input,
        label,
        gridArea,
        type,
        meta: { touched, error }
    }) => (
        <InputArea gridArea={gridArea}>
            <MediaQuery minWidth={450}>
                <RegisterLabel>{`${label}:`}</RegisterLabel>
            </MediaQuery>
            <RegisterInput {...input} type={type} placeholder={label} />
            {touched && error && <ErrorMessage>{error}</ErrorMessage>}
        </InputArea>
    );

    submitRegister = values => {
        
    };

    render() {
        let formInvalid = this.props.invalid;
        return (
            <AuthWrapper>
                <RegisterForm
                    onSubmit={this.props.handleSubmit(this.submitRegister)}
                >
                    <PageLabel>Register</PageLabel>
                    <Field
                        name="username"
                        type="text"
                        component={this.renderInputField}
                        label="Username"
                        gridArea="Username"
                    />
                    <Field
                        name="password"
                        type="password"
                        component={this.renderInputField}
                        label="Password"
                        gridArea="Password"
                    />
                    <Field
                        name="passwordRepeat"
                        type="password"
                        component={this.renderInputField}
                        label="Repeat Password"
                        gridArea="PasswordRepeat"
                    />
                    <RegisterButton type="submit" disabled={formInvalid}>
                        Register
                    </RegisterButton>
                </RegisterForm>
            </AuthWrapper>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    reduxForm({
        form: 'registerForm',
        validate,
        asyncValidate: checkUsername,
        asyncChangeFields: ['username']
    })(RegisterPage)
);
