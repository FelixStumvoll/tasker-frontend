import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { login } from './loginActions';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
`;

const LoginPanel = styled.form`
    width: 500px;
    height: 300px;
    padding: 20px;
    background-color: ${({ theme }) => theme.primaryColor};
    border-radius: 10px;
    margin: 50px auto auto auto;
    display: grid;
    grid-template-areas:
        'Label Label'
        'UsernameLabel Username'
        'PasswordLabel Password'
        '. .'
        'LoginButton LoginButton';
    grid-template-columns: 100px 1fr;
    grid-template-rows: 70px 50px 50px 50px 50px;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    font-family: ${({ theme }) => theme.defaultFont};
`;

const PageLabel = styled.h1`
    grid-area: Label;
    font-family: inherit;
    margin: auto;
`;

const LoginLabel = styled.label`
    grid-area: ${props => props.gridArea};
    font-family: inherit;
    font-weight: bold;
    margin: auto;
`;

const LoginInput = styled.input`
    grid-area: ${props => props.gridArea};
    padding-left: 5px;
    width: 100%;
    height: 30px;
    margin: auto;
    border-radius: 10px;
    border: none;
    font-family: inherit;
`;

const LoginButton = styled.button`
    grid-area: LoginButton;
    background-color: ${({ theme }) => theme.positiveColor};
    border-radius: 10px;
    border: none;
    color: white;
    font-size: 20px;
    font-weight: bolder;
    font-family: inherit;
    cursor: pointer;
`;

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = { username: '', password: '' };
    }

    onUsernameInput = e => {
        this.setState({ username: e.target.value });
    };

    onPasswordInput = e => {
        this.setState({ password: e.target.value });
    };

    onLoginClick = e => {
        e.preventDefault();

        let { username, password } = this.state;

        this.props.login(username, password);
    };

    render() {
        let { username, password } = this.state;

        return (
            <Wrapper>
                <LoginPanel>
                    <LoginLabel gridArea={'UsernameLabel'} htmlFor="username">
                        Username:
                    </LoginLabel>
                    <LoginInput
                        type="text"
                        id="username"
                        gridArea="Username"
                        placeholder="Username"
                        value={username}
                        onChange={this.onUsernameInput}
                    />
                    <LoginInput
                        type="password"
                        id="password"
                        gridArea="Password"
                        placeholder="Password"
                        value={password}
                        onChange={this.onPasswordInput}
                    />
                    <LoginLabel gridArea={'PasswordLabel'} htmlFor="password">
                        Password:
                    </LoginLabel>
                    <PageLabel>Login to access your Tasks</PageLabel>
                    <LoginButton type="submit" onClick={this.onLoginClick}>
                        Login
                    </LoginButton>
                </LoginPanel>
            </Wrapper>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
    login
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
