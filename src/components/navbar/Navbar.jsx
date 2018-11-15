import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';

const Nav = styled.nav`
    height: ${props => props.theme.navheight}px;
    background-color: ${props => props.theme.mainColor};
    display: grid;
    grid-template-columns: 100px 1fr 400px 2fr 100px;
    overflow: hidden;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    grid-template-areas: 'home . search . controls';
`;

const Home = styled.a`
    grid-area: home;
    font-weight: bold;
    margin: auto;
`;

const Searchbar = styled.input`
    grid-area: search;
    height: 30px;
    width: 100%;
    border: none;
    outline: none;
    border-radius: 5px;
    padding-left: 5px;
    margin: auto;
`;

const Control = styled(FontAwesomeIcon)`
    grid-area: controls;
    margin: auto;
`;

class Navbar extends Component {
    render() {
        return (
            <Nav>
                <Home>Home</Home>
                <Searchbar type="text" placeholder="Search..." />
                <Control icon={faCog} />
            </Nav>
        );
    }
}

export default Navbar;
