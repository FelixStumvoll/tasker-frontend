import React, { Component } from 'react';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../loginPage/authActions';

const Nav = styled.nav`
    height: ${props => props.theme.navHeight};
    background-color: ${props => props.theme.navColor};
    display: grid;
    grid-template-columns: 100px 1fr 40vw 2fr 150px 100px;
    font-family: ${({ theme }) => theme.defaultFont};
    grid-template-areas: 'HomeArea . SearchArea . Name Logout';

    @media screen and (max-width: 600px) {
        grid-template-columns: 50px 1fr 40vw 2fr 100px 100px;
    }
`;

const Home = styled.a`
    grid-area: HomeArea;
    font-weight: bold;
    margin: auto;
`;

const Searchbar = styled.input`
    grid-area: SearchArea;
    height: 30px;
    width: 100%;
    border: none;
    outline: none;
    border-radius: 5px;
    padding-left: 5px;
    margin: auto;
    font-family: inherit;
`;

const BackButton = styled(Link)`
    grid-area: HomeArea;
    margin: auto;
    font-size: 20px;
    cursor: pointer;
    text-decoration: none;
    color: black;
    background-color: inherit;
`;

const LogoutButton = styled.button`
    grid-area: Logout;
    background-color: ${({ theme }) => theme.negativeColor};
    border: none;
    color: white;
    height: 30px;
    border-radius: 10px;
    margin: auto;
    font-weight: bolder;
    cursor: pointer;
`;

const UserName = styled.span`
    grid-area: Name;
    font-weight: bolder;
    margin: auto;
    text-overflow: ellipsis;
`;

class Navbar extends Component {
    render() {
        let { authenticated, user } = this.props;
        return (
            <Nav>
                <MediaQuery maxWidth={600}>
                    {matches => {
                        return matches ? (
                            <BackButton to={'/task'}>
                                <FontAwesomeIcon icon={faBars} />
                            </BackButton>
                        ) : (
                            <Home>Home</Home>
                        );
                    }}
                </MediaQuery>
                {authenticated && (
                    <>
                        <Searchbar type="text" placeholder="Search..." />
                        <UserName>Hello, {user}</UserName>
                        <LogoutButton onClick={this.props.logout}>
                            Logout
                        </LogoutButton>
                    </>
                )}
            </Nav>
        );
    }
}

const mapStateToProps = ({ auth }) => ({
    authenticated: auth.authenticated,
    user: auth.user
});

const mapDispatchToProps = {
    logout
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);
