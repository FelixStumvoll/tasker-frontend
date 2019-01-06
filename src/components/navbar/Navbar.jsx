import React from 'react';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
    height: ${props => props.theme.navHeight};
    background-color: ${props => props.theme.navColor};
    display: grid;
    grid-template-columns: 100px 1fr 40vw 2fr 100px;
    font-family: ${({ theme }) => theme.defaultFont};
    grid-template-areas: 'HomeArea . SearchArea . ControlsArea';

    @media screen and (max-width: 600px) {
        grid-template-columns: 50px 1fr 40vw 2fr 100px;
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

const Control = styled(FontAwesomeIcon)`
    grid-area: ControlsArea;
    margin: auto;
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

export default () => {
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

            <Searchbar type="text" placeholder="Search..." />
            <Control icon={faCog} />
        </Nav>
    );
};
