import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { GridLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { login } from '../../redux/reducers/authReducer/authActions';
import routes from '../../common/routes';

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
    padding: 10px;
    background-color: ${({ theme }) => theme.primaryColor};
    color: ${({ theme }) => theme.textColor};
    border-radius: ${({ theme }) => theme.borderRadius};
    margin: 150px auto auto auto;
    display: grid;
    grid-template-areas:
        'Label Label'
        'UsernameLabel Username'
        'PasswordLabel Password'
        'LoginButton LoginButton'
        'RegisterText RegisterText';
    grid-template-columns: 100px 1fr;
    grid-template-rows: 70px repeat(2, 30px) 50px auto;
    grid-row-gap: 20px;
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
            'LoginButton'
            'RegisterText';
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
    border-radius: ${({ theme }) => theme.borderRadius};
    border: none;
    box-sizing: border-box;
    font-family: inherit;
    transition: inherit;
`;

const LoginButton = styled.button`
    grid-area: LoginButton;
    background-color: ${({ theme }) => theme.positiveColor};
    border-radius: ${({ theme }) => theme.borderRadius};
    border: none;
    color: white;
    font-size: 20px;
    font-weight: bolder;
    font-family: inherit;
    cursor: pointer;
    transition: inherit;
`;

const RegisterSpan = styled.span`
    grid-area: RegisterText;
    font-size: ${({ theme }) => theme.defaultFontSize};
    color: ${({ theme }) => theme.textColor};
    font-weight: bolder;
`;

const RegisterLink = styled(Link)`
    cursor: pointer;
    color: ${({ theme }) => theme.textColor};
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
                    <LoginLabel
                        gridArea={'UsernameLabel'}
                        htmlFor="user"
                        id="usernameLabel"
                    >
                        Username:
                    </LoginLabel>
                    <LoginInput
                        type="text"
                        id="user"
                        aria-labelledby="usernameLabel"
                        gridArea="Username"
                        placeholder="Username"
                        value={username}
                        onChange={this.onUsernameInput}
                    />
                    <LoginLabel
                        gridArea={'PasswordLabel'}
                        htmlFor="pass"
                        id="passLabel"
                    >
                        Password:
                    </LoginLabel>
                    <LoginInput
                        type="password"
                        id="pass"
                        aria-labelledby="passLabel"
                        gridArea="Password"
                        placeholder="Password"
                        value={password}
                        onChange={this.onPasswordInput}
                    />

                    <PageLabel>
                        <MediaQuery maxWidth={600}>
                            {matches => {
                                return matches
                                    ? 'Login'
                                    : 'Login to access your Tasks';
                            }}
                        </MediaQuery>
                    </PageLabel>
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
                    <RegisterSpan>
                        New to Tasker?{' '}
                        <RegisterLink to={routes.register}>
                            Sign Up
                        </RegisterLink>
                    </RegisterSpan>
                    {/* <OrArea>
                        <OrText>or</OrText>
                    </OrArea>
                    <RegisterButton>Register</RegisterButton> */}
                </LoginPanel>
            </Wrapper>
        );
    }
}

LoginPage.propTypes = {
    fetchState: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
};

const mapStateToProps = ({ fetch }) => ({
    fetchState: fetch
});

const mapDispatchToProps = {
    login
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
