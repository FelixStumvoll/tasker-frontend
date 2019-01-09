import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import { login } from '../../redux/reducers/authReducer/authActions';
import { GridLoader } from 'react-spinners';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    overflow: hidden;

    @media screen and (max-width: ${({ theme }) => theme.stage1responsive}) {
        margin: 10px;
        width: calc(100% - 20px);
    }
`;

const LoginPanel = styled.form`
    width: 500px;
    height: 300px;
    padding: 20px;
    background-color: ${({ theme }) => theme.primaryColor};
    border-radius: 10px;
    margin: 150px auto auto auto;
    display: grid;
    grid-template-areas:
        'Label Label'
        'UsernameLabel Username'
        'PasswordLabel Password'
        'ErrorMessage ErrorMessage'
        'LoginButton LoginButton';
    grid-template-columns: 100px 1fr;
    grid-template-rows: 70px 50px 50px 50px 50px;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    font-family: ${({ theme }) => theme.defaultFont};
    transition: ${({ theme }) => theme.transitionDuration};

    @media screen and (max-width: ${({ theme }) => theme.stage1responsive}) {
        width: calc(100% - 20px);
        margin-top: 100px;
    }

    @media screen and (max-width: ${({ theme }) => theme.stage2responsive}) {
        grid-template-areas:
            'Label'
            'Username'
            'Password'
            'ErrorMessage'
            'LoginButton';
        grid-template-columns: 1fr;
    }
`;

const PageLabel = styled.h1`
    grid-area: Label;
    font-family: inherit;
    margin: auto;
    transition: inherit;
`;

const LoginLabel = styled.label`
    grid-area: ${props => props.gridArea};
    font-family: inherit;
    font-weight: bold;
    margin: auto;
    transition: inherit;

    @media screen and (max-width: ${({ theme }) => theme.stage2responsive}) {
        display: none;
    }
`;

const LoginInput = styled.input`
    grid-area: ${props => props.gridArea};
    padding-left: 5px;
    width: 100%;
    height: 30px;
    margin: auto;
    border-radius: 10px;
    border: none;
    box-sizing: border-box;
    font-family: inherit;
    transition: inherit;
`;

const ErrorMessage = styled.div`
    grid-area: ErrorMessage;
    width: 70%;
    height: 30px;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.negativeColor};
    color: white;
    border-radius: 10px;
    margin: auto;
    text-align: center;
    vertical-align: middle;
    font-family: inherit;
    padding: 5px;
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
    transition: inherit;
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
        let { fetchState } = this.props;

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
                    <PageLabel>
                        <MediaQuery maxWidth={600}>
                            {matches => {
                                return matches
                                    ? 'Login'
                                    : 'Login to access your Tasks';
                            }}
                        </MediaQuery>
                    </PageLabel>
                    {!fetchState.loading && !fetchState.success && (
                        <ErrorMessage>Login Failed</ErrorMessage>
                    )}
                    <LoginButton type="submit" onClick={this.onLoginClick}>
                        {fetchState.loading ? (
                            <GridLoader
                                size={10}
                                sizeUnit={'px'}
                                css={'margin: auto;'}
                                color={'white'}
                            />
                        ) : (
                            'Login'
                        )}
                    </LoginButton>
                </LoginPanel>
            </Wrapper>
        );
    }
}

const mapStateToProps = ({ auth, fetch }) => ({
    loginFailed: auth.loginFailed,
    fetchState: fetch
});

const mapDispatchToProps = {
    login
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
