import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

const RegisterPanel = styled.form`
    display: grid;
    grid-template-areas:
        'Label Label'
        'UsernameLabel Username'
        'PasswordLabel Password'
        'PasswordRepeatLabel PasswordRepeat'
        'RegisterButton RegisterButton';
    grid-template-rows: 70px repeat(3, 30px) 50px;
    grid-row-gap: 20px;
    grid-template-columns: 100px 1fr;
    grid-column-gap: 10px;
    font-family: ${({ theme }) => theme.defaultFont};
    transition: ${({ theme }) => theme.transitionDuration};
`;

const RegisterLabel = styled.h1`
    grid-area: Label;
`;

export class RegisterPage extends Component {
    render() {
        return (
            <RegisterPanel>
                <RegisterLabel>Register</RegisterLabel>
            </RegisterPanel>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterPage);
