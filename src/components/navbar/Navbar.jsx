import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';

const Nav = styled.div`
    height: ${props => props.theme.navheight};
    background-color: ${props => props.theme.mainColor};
    display: grid;
    grid-template-columns: 100px 1fr 400px 2fr 100px;
    overflow: hidden;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    grid-template-areas: 'Home . Search . Controls';
`;

const HomeButton = styled.div`
    grid-area: Home;
    font-weight: bold;
`;

const VerticalCenter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: ${props => props.area};
`;

const SearchBar = styled.input`
    height: 30px;
    width: 100%;
    border: none;
    outline: none;
    border-radius: 5px;
    padding-left: 5px;
`;

// const Controls = styled.button`
//     grid-area: Controls;
// `;

class Navbar extends Component {
    render() {
        return (
            <Nav>
                <VerticalCenter area="Home">
                    <HomeButton>Home</HomeButton>
                </VerticalCenter>

                <VerticalCenter area="Search">
                    <SearchBar color="red" type="text" placeholder="Search" />
                </VerticalCenter>

                <VerticalCenter area="Controls">
                    <FontAwesomeIcon icon={faCog} />
                </VerticalCenter>
            </Nav>
        );
    }
}

export default Navbar;
